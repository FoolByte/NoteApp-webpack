class Loading extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = `
		<style>
		  .placeholder {
			font-weight: bolder;
		  }
		</style>
		<div class="placeholder" id="loading">
		  <h2>Loading...</h2>
		</div>
	  `;

    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("loading-element", Loading);
