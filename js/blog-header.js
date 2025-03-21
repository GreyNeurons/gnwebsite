class BlogHeader extends HTMLElement {
  constructor() {
    super();

    const label = this.getAttribute('breadcrumb-label') || 'Blogs';
    const url = this.getAttribute('breadcrumb-url') || '/articles.html';

    this.innerHTML = `
      <div class="section has-text-grey-light has-background-dark">
        <div class="content has-text-white is-family-monospace">
          <p class="title is-size-5 has-text-white is-uppercase">Grey Neurons</p>
          <p class="subtitle has-text-grey-light">Experience the wisdom</p>
        </div>

        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li class="is-dark"><a href="/">Home</a></li>
            <li class="is-dark"><a href="${url}">${label}</a></li>
            <li class="is-active">
              <a href="#" aria-current="page">
                <slot name="bread-crumb-current-page"></slot>
              </a>
            </li>
          </ul>
        </nav>
        <hr class="gn-main">
      </div>
    `;
  }
}

customElements.define('blog-header', BlogHeader);
