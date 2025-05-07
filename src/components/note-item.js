import { archiveNote } from "../data/notes-api.js";
import { animate } from "motion";

class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set noteData({ id, title, body }) {
    this.render(id, title, body);
    this._updateStyle();
  }

  _updateStyle() {
    const style = document.createElement("style");
    style.textContent = `
      .note-item-list {
          padding: 4px 8px;
          background-color: white;
          padding: 2% 3%;
          border: 2px solid #ccc;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          padding: 0.8rem;
      }
      h3 {
        margin: 0 0 10px;
        font-weight: 50px;
      }
      button {
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 5px;
        margin-right: 5px;
      }
      #deleteBtn {
        background-color: #ff6b6b;
      }
      #archiveBtn {
        background-color: #fe9022;
      }
      #deleteBtn:hover {
        background-color: #ff4c4c;
      }
      #archiveBtn:hover {
        background-color: #fea64e;
      }
    `;
    this.shadowRoot.appendChild(style);
  }

  render(id, title, body) {
    this.shadowRoot.innerHTML = `
      <div data-noteid="${id}" class="note-item-list">
        <h3>${title}</h3>
        <p>${body}</p>
        <button id="deleteBtn">Delete</button>
        <button id="archiveBtn">Archive</button>
      </div> 
    `;

    this.shadowRoot
      .querySelector("#deleteBtn")
      .addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("delete-note", {
            detail: { id },
            bubbles: true,
            composed: true,
          }),
        );
      });

    this.shadowRoot
      .querySelector("#archiveBtn")
      .addEventListener("click", async () => {
        try {
          await archiveNote(id);
          this.dispatchEvent(
            new CustomEvent("archive-note", {
              detail: { id },
              bubbles: true,
              composed: true,
            }),
          );
        } catch (error) {
          console.error("Gagal mengarsipkan catatan:", error);
        }
      });

    this._animateNoteItem();
  }

  _animateNoteItem() {
    const noteElement = this.shadowRoot.querySelector("[data-noteid]");
    animate(
      noteElement,
      {
        opacity: [0, 1],
        scale: [0.9, 1],
        translateY: [20, 0],
      },
      {
        duration: 0.5,
        easing: "ease-in-out",
        delay: 0.1,
      },
    );
  }
}

customElements.define("note-item", NoteItem);
