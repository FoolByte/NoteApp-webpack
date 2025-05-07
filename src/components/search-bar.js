import { fetchNotes } from "../data/notes-api.js";
import Utils from "../utils.js";
class SearchBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this._updateStyle();
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      div {
        position: fixed;
        top: 10%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.5);
        padding: 10px 20px;
        border-radius: 8px;
        max-width: 600px;
        min-width: 330px;
        box-sizing: border-box;
        z-index: 1000;
        text-align: center;
      }

      input {
        width: 50%;
        padding: 10px;
        margin-right: 10px;
        border: none;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.0);
        color: white;
        border: 1px solid #ccc;
        cursor: pointer;
      }

      input::placeholder {
        color: white;
        font-weight: bold;
      }

      button {
        padding: 10px;
        background-color: #f0f0f0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
      }

      button:hover {
       background-color: #d9d9d9;
      }

      input:focus, textarea:focus {
        border-color: black; 
        box-shadow: 0 0 0 2px white;
        outline: none;
      }

      @media screen and (max-width: 768px){
        div {
          top: 5%;
          width: 90%;
        }
        
        input {
          width: 55%;
        }
      }
    `;
  }

  render() {
    this._shadowRoot.appendChild(this._style);

    this._shadowRoot.innerHTML += `
      <div>
        <input type="text" id="searchInput" placeholder="Search notes...">
        <button id="addNoteButton">Add Note</button>
      </div>
    `;

    const searchInput = this._shadowRoot.querySelector("#searchInput");
    const addNoteButton = this._shadowRoot.querySelector("#addNoteButton");
    const formAddElement = document.querySelector("form-add");

    addNoteButton.addEventListener("click", () => {
      const form = formAddElement.shadowRoot.querySelector("form");
      form.style.display = "block";
    });

    searchInput.addEventListener("input", async (event) => {
      const query = event.target.value.toLowerCase();

      try {
        const notes = await fetchNotes();
        const filteredNotes = notes.filter(
          (note) =>
            note.title.toLowerCase().includes(query) ||
            note.body.toLowerCase().includes(query),
        );
        window.renderNotes(filteredNotes);
        if (filteredNotes.length === 0) {
          Utils.showMessageNoteList();
        } else {
          Utils.hideMessageNoteList();
        }
      } catch (error) {
        console.error("Failed to search notes:", error);
      }
    });
  }
}

customElements.define("search-bar", SearchBar);
