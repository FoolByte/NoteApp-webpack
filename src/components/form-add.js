class FormAdd extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this._updateStyle();
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      form {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 2% 3%;
        border: 5px solid #ccc;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        z-index: 1000;
        width: 300px;
      }

      .form-grup {
        display: flex;
        flex-direction: column;
      }
  
      input, textarea {
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
  
      button {
        padding: 10px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
  
      button:hover {
        background-color: #218838;
      }

      .validation-message {
        color: red;
        font-size: 12px;
        margin-top: -10px;
        margin-bottom: 10px;
      }

      input:focus, textarea:focus {
        border-color: black; 
        box-shadow: 0 0 0 2px black;
        outline: none;
      }

      #closeButton{
        position:absolute;
        top:5px; right:10px;
        cursor:pointer;
        font-size:24px;
        font-weight:bold;
      }

      @media screen and (max-width: 768px){
        form{
          top: 15rem;
        }
      }
    `;
  }

  render() {
    this._shadowRoot.appendChild(this._style);

    this._shadowRoot.innerHTML += `
       <form id="noteForm">
        <div class="form-grup">
          <span id="closeButton" >&times;</span>
          <title-section title="Add Note"></title-section>
          <input
            id="input-title"
            type="text"
            placeholder="Enter title"
            required
            aria-describedby="titleValidation"
          />
          <p
            id="titleValidation"
            class="validation-message"
            aria-live="polite"
          ></p>
          <textarea
            id="input-body"
            placeholder="Enter description"
            rows="4"
            required
            aria-describedby="bodyValidation"
          ></textarea>
          <p
            id="bodyValidation"
            class="validation-message"
            aria-live="polite"
          ></p>
          <button
            id="addNoteButton"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    `;

    const form = this._shadowRoot.querySelector("#noteForm");

    const titleInput = form.querySelector("#input-title");
    const bodyTextarea = form.querySelector("#input-body");

    const titleValidationMessage = form.querySelector("#titleValidation");
    const bodyValidationMessage = form.querySelector("#bodyValidation");

    const customValidationHandler = (event, messageEl) => {
      event.target.setCustomValidity("");

      let errorMessage = "";

      if (event.target.validity.valueMissing) {
        errorMessage = "Input tidak boleh kosong.";
      } else {
        const value = event.target.value.trim();

        if (event.target.id === "input-title") {
          if (value.length < 3) {
            errorMessage = "Title minimal harus 3 karakter.";
          } else if (value.length > 100) {
            errorMessage = "Title tidak boleh lebih dari 100 karakter.";
          }
        }

        if (event.target.id === "input-body") {
          if (value.length < 3) {
            errorMessage = "Deskripsi minimal harus 3 karakter.";
          } else if (value.length > 1000) {
            errorMessage = "Deskripsi tidak boleh lebih dari 1000 karakter.";
          }
        }
      }

      event.target.setCustomValidity(errorMessage);

      if (!event.target.validity.valid) {
        messageEl.innerText = event.target.validationMessage;
      } else {
        messageEl.innerText = "";
      }
    };

    titleInput.addEventListener("blur", (event) =>
      customValidationHandler(event, titleValidationMessage),
    );
    bodyTextarea.addEventListener("blur", (event) =>
      customValidationHandler(event, bodyValidationMessage),
    );

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = titleInput.value;
      const description = bodyTextarea.value;

      if (title === "" || description === "") {
        return;
      }

      window.addNoteToList(title, description);
      form.reset();
      form.style.display = "none";
    });

    const closeButton = this._shadowRoot.querySelector("#closeButton");
    closeButton.addEventListener("click", () => {
      form.style.display = "none";
    });
  }
}

customElements.define("form-add", FormAdd);
