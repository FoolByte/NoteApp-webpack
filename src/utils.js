class Utils {
  static showElement(element) {
    element.style.display = "block";
    element.hidden = false;
  }

  static hideElement(element) {
    element.style.display = "none";
    element.hidden = true;
  }

  static showLoading() {
    const loadingElement = document.querySelector("#loading");
    if (loadingElement) {
      Utils.showElement(loadingElement);
    }
  }

  static hideLoading() {
    const loadingElement = document.querySelector("#loading");
    if (loadingElement) {
      Utils.hideElement(loadingElement);
    }
  }

  static showMessageNoteList() {
    const message = document.querySelector("#notesListEmpty");
    if (message) {
      Utils.showElement(message);
    }
  }

  static hideMessageNoteList() {
    const message = document.querySelector("#notesListEmpty");
    if (message) {
      Utils.hideElement(message);
    }
  }
}

export default Utils;
