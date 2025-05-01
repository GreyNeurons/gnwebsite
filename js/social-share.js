// social-share.js
// Standalone JS module: programmatically creates the <template> and defines <social-share> web component.

// 1) Create & append the template to the document
const tpl = document.createElement('template');
tpl.id = 'social-share-template';
tpl.innerHTML = `
  <style>
    :host { display: flex; gap: 0.5rem; align-items: center; }
    a, button { display: inline-flex; align-items: center; justify-content: center; padding: 0.5rem; border: none; background: #fff; cursor: pointer; text-decoration: none; color: inherit; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.2); transition: background 0.2s; }
    a:hover, button:hover { background: #f0f0f0; }
    svg { width: 20px; height: 20px; }
    :host([hidden]) { display: none; }
  </style>
 
  <div>SHARE</div>
  
  <!-- Facebook -->
  <a id="facebook-share" class="icon-button" target="_blank" title="Share on Facebook">
    <svg fill="#1877F2" viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.54 9.87v-6.99h-2.1v-2.88h2.1V9.41c0-2.07 1.23-3.22 3.11-3.22.9 0 1.84.16 1.84.16v2.02h-1.04c-1.03 0-1.35.64-1.35 1.29v1.56h2.3l-.37 2.88h-1.93v6.99A10 10 0 0 0 22 12"/></svg>
  </a>
  
  <!-- Twitter / X -->
  <a id="twitter-share" class="icon-button" target="_blank" title="Share on X (Twitter)">
    <svg fill="#1DA1F2" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.6 8.6 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.3 3.9A12.13 12.13 0 0 1 3.15 4.7a4.28 4.28 0 0 0 1.32 5.72 4.24 4.24 0 0 1-1.94-.54v.06a4.28 4.28 0 0 0 3.43 4.2 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.97A8.6 8.6 0 0 1 2 19.54a12.11 12.11 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.39-.02-.58A8.7 8.7 0 0 0 24 5.5a8.6 8.6 0 0 1-2.54.7z"/></svg>
  </a>
  
  <!-- LinkedIn -->
  <a id="linkedin-share" class="icon-button" target="_blank" title="Share on LinkedIn">
    <svg fill="#0077B5" viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 0 .02 5 2.5 2.5 0 0 0-.02-5zm.02 7h4.96v12h-4.96v-12zm7 0h4.76v1.65h.07c.66-1.25 2.27-2.56 4.67-2.56 5 0 5.93 3.28 5.93 7.54v8.37h-4.96v-7.4c0-1.76-.03-4.03-2.46-4.03-2.46 0-2.84 1.92-2.84 3.91v7.52h-4.96v-12z"/></svg>
  </a>
  
  <!-- Bluesky -->
  <a id="bluesky-share" class="icon-button" target="_blank" title="Share on Bluesky">
    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1DA1F2"/><text x="12" y="16" text-anchor="middle" font-size="12" fill="#ffffff" font-family="Arial, sans-serif">b</text></svg>
  </a>
  
  <!-- WhatsApp -->
  <a id="whatsapp-share" class="icon-button" target="_blank" title="Share on WhatsApp">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#25D366">
      <path d="M380.9 97.1C339-1.3 211.3-26.4 122.7 48.2c-89.3 74.6-106.7 205.6-38.2 300.6L2.2 480l137.9-41.1c48.3 25.4 108.2 25.7 157.3 0 89.4-44.6 121.5-154.1 83.5-241.8zM224 413c-27.6 0-54.5-7.6-77.7-21.9l-5.5-3.3-81.8 24.4 24.7-79.5-3.6-5.8C63.4 294.5 56 260.8 63.6 229c15.8-66.5 75.1-111.5 143.5-111.5 96.2 0 174.3 83.8 149.4 180.1-12.5 50.1-53.7 91.6-105.6 102.2-8.7 1.8-17.3 2.7-26 2.7zm83.1-138.2c-4.5-2.3-26.5-13-30.7-14.5-4.2-1.5-7.3-2.3-10.3 2.3s-11.8 14.5-14.5 17.5-5.3 3.5-9.8 1.2c-4.5-2.3-19-7-36.2-22.4-13.4-11.9-22.4-26.7-25-31.2-2.6-4.5-.3-7 2-9.3 2-2 4.5-5.3 6.7-8s2.9-4.6 4.5-7.6c1.5-3 0.8-5.6-.3-8-1.2-2.3-10.3-24.8-14.1-34.1-3.7-8.9-7.5-7.6-10.3-7.7l-8.8-.1c-3 0-7.8 1.1-11.9 5.5-4.1 4.5-15.7 15.4-15.7 37.5s16.1 43.5 18.3 46.5c2.3 3 31.7 48.4 76.9 67.9 45.3 19.5 45.3 13 53.4 12.2 8.1-.7 26.5-10.8 30.3-21.3 3.8-10.4 3.8-19.3 2.7-21.2-1.2-1.9-4.2-3.1-8.7-5.3z"/>
    </svg>
  </a>
  
  <!-- Email -->
  <a id="email-share" class="icon-button" target="_blank" title="Share via Email">
    <svg fill="#EA4335" viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>
  </a>
  
  <div class="content">
    <br/>
    <hr class="separator" />
  </div>
`;
document.body.appendChild(tpl);

// 2) Define the <social-share> component
class SocialShare extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    try {
      const template = document.getElementById('social-share-template');
      if (!template) throw new Error('Template not found');
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      const rawUrl = this.getAttribute('page-url') || window.location.href;
      const rawTitle = this.getAttribute('page-title') || document.title;
      const pageUrl = encodeURIComponent(rawUrl);
      const pageTitle = encodeURIComponent(rawTitle);

      const platforms = ['facebook', 'twitter', 'linkedin', 'bluesky', 'whatsapp', 'email'];
      platforms.forEach(platform => {
        const el = this.shadowRoot.getElementById(`${platform}-share`);
        if (!el) return;
        let href;
        switch(platform) {
          case 'facebook': href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`; break;
          case 'twitter': href = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`; break;
          case 'linkedin': href = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}`; break;
          case 'bluesky': href = `https://bsky.app/compose/post?text=${pageTitle}%20${pageUrl}`; break;
          case 'whatsapp': href = `https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}`; break;
          case 'email': href = `mailto:?subject=${pageTitle}&body=${pageUrl}`; break;
        }
        el.setAttribute('href', href);
      });

      const shareBtn = this.shadowRoot.getElementById('share-api-btn');
      if (shareBtn) {
        if (navigator.share) {
          shareBtn.addEventListener('click', async () => {
            try { await navigator.share({ title: rawTitle, url: rawUrl }); }
            catch (err) { console.error('Web Share API error', err); alert('Share failed; try a direct link.'); }
          });
        } else {
          shareBtn.setAttribute('hidden', '');
        }
      }
    } catch (err) {
      console.error('SocialShare init error:', err);
      this.setAttribute('hidden', '');
    }
  }
}
customElements.define('social-share', SocialShare);
