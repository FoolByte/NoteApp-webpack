import { fetchNotes, addNote, deleteNote } from "./data/notes-api.js";
import "./components/index.js";
import "./styles/style.css";
import Utils from "./utils.js";

const notesListElement = document.querySelector("#notesList");
let listOfNoteItem = [];

function renderNotes(notes) {
  notesListElement.innerHTML = "";

  if (notes.length === 0) {
    Utils.showMessageNoteList();
  } else {
    Utils.hideMessageNoteList();
    notes.forEach((note) => {
      const noteItem = document.createElement("note-item");
      noteItem.noteData = note;
      noteItem.addEventListener("delete-note", (event) => {
        deleteNoteHandler(event.detail.id);
      });
      noteItem.addEventListener("archive-note", (event) => {
        listOfNoteItem = listOfNoteItem.filter(
          (note) => note.id !== event.detail.id,
        );
        renderNotes(listOfNoteItem);
      });
      notesListElement.appendChild(noteItem);
    });
  }
}

window.renderNotes = renderNotes;

async function loadNotes() {
  try {
    Utils.showLoading();
    listOfNoteItem = await fetchNotes();
    renderNotes(listOfNoteItem);
  } catch (error) {
    console.error("Failed to load notes:", error);
  } finally {
    Utils.hideLoading();
  }
}

loadNotes();

window.addNoteToList = async function (title, description) {
  try {
    const note = await addNote({ title, body: description });
    listOfNoteItem.unshift(note);
    renderNotes(listOfNoteItem);
  } catch (error) {
    console.error("Failed to add note:", error);
  }
};

window.deleteNoteHandler = async function (noteId) {
  try {
    const success = await deleteNote(noteId);
    if (success) {
      listOfNoteItem = listOfNoteItem.filter((note) => note.id !== noteId);
      renderNotes(listOfNoteItem);
    }
  } catch (error) {
    console.error("Failed to delete note:", error);
  }
};
