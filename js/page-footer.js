
class PageFooter extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `

      <link rel="stylesheet" href="/css/bulma.css">
      <link rel="stylesheet" href="/css/main.css">

      <!-- Your static HTML code here -->
      <div class="columns">

        <div class="column has-background-dark has-text-center">
          <div class="content  has-text-white is-family-monospace">
            <p class = "title is-size-6 has-text-white  is-uppercase">
                Grey Neurons
            </p>
            <p class = "subtitle is-size-7 has-text-grey-light ">
                Experience the wisdom
            </p>
          </div>
        </div>
        <div class="column has-background-dark">
          <p class="has-text-white has-text-right is-size-7 is-family-monospace"> &copy; 2024 by Grey Neurons Consulting LLC. All rights reserved. </p>
        </div>
      </div>
    `;
  }
  connectedCallback() {
  }
}
customElements.define('page-footer', PageFooter);