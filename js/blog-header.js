class BlogHeader extends HTMLElement {
  constructor() {
    super();

    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/svg+xml';
    favicon.href = '/favicon.svg';
    document.head.appendChild(favicon);

    const label = this.getAttribute('breadcrumb-label') || 'Blogs';
    const url = this.getAttribute('breadcrumb-url') || '/articles.html';

    this.innerHTML = `
      <div class="section has-text-grey-light has-background-dark">
        <a href="/" style="display: inline-block; margin-bottom: 0.75rem;">
          <img src="/img/greyneurons-logo-horizontal.svg" alt="GreyNeurons - Experience the wisdom" style="height: 54px;">
        </a>

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
