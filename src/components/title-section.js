class TitleSection extends HTMLElement {
  static get observedAttributes() {
    return ["title"];
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this._title = "INSERT TITLE HERE";
  }

  _updateStyle() {
    this._style.textContent = `
      div {
        font-family: "Protest Strike", sans-serif;
        font-size: 24px;
        color: #333;
        margin: 1% auto;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name}`] = newValue;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);
    const titleDiv = document.createElement("div");
    titleDiv.textContent = this._title;
    this._shadowRoot.appendChild(titleDiv);
  }
}

customElements.define("title-section", TitleSection);
