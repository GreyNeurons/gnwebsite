
class BlogHeader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `

      <link rel="stylesheet" href="/css/bulma.css">
      <link rel="stylesheet" href="/css/main.css">

      <!-- Your static HTML code here -->
      <div class = "section has-text-grey-light has-background-dark">
        <div class="content has-text-white is-family-monospace">
          <p class = "title is-size-5 has-text-white  is-uppercase">
            Grey Neurons
          </p>
          <p class = "subtitle has-text-grey-light ">
            Experience the wisdom
          </p>
        </div>

        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            
            <li class="is-dark"><a  href="/">Home</a></li>
            <li class="is-dark"><a  href="/articles.html">Blogs</a></li>
            
              <li class="is-active"><a  href="#" aria-current="page">
                  <slot name="bread-crumb-current-page"></slot>
                </a>
              </li>
            
          </ul>
        </nav>
        <hr class = "gn-main"></hr>
      </div>
 
    
    `;
  }
  connectedCallback() {
  }
}
customElements.define('blog-header', BlogHeader);
