class FooterBar extends HTMLElement {
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
        padding: 24px 20px;
        text-align: center;
        font-family: "Protest Strike", sans-serif;
        font-weight: 1;
        background: #1F1F1F;
        color: #E5E3DD;
      }
    `;
  }

  render() {
    this._shadowRoot.appendChild(this._style);
    const footerDiv = document.createElement("div");
    footerDiv.innerHTML = `      
      Notes App by Khairul &copy; 2024
    `;
    this._shadowRoot.appendChild(footerDiv);
  }
}

customElements.define("footer-bar", FooterBar);
