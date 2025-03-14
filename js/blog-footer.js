
class BlogFooter extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `

      <link rel="stylesheet" href="/css/bulma.css">
      <link rel="stylesheet" href="/css/main.css">

      <!-- Your static HTML code here -->
      <div class="section has-text-grey-light has-background-dark">
        <div class="columns">

          <div class="column has-background-dark has-text-center">
            <div class="content  has-text-white is-family-monospace">
              <p class = "title is-size-6 has-text-white">
                  GreyNeurons
              </p>
              <p class = "subtitle is-size-7 has-text-grey-light ">
                  Experience the wisdom
              </p>
            </div>
          </div>
          <div class="column has-background-dark">
            <div class="content has-text-white has-text-right is-size-7 is-family-monospace"> &copy; 2025 by GreyNeurons Consulting LLP. All rights reserved. </div>
          </div>
        </div>
      </div>


    `;
  }
  connectedCallback() {
  }
}
customElements.define('blog-footer', BlogFooter);

