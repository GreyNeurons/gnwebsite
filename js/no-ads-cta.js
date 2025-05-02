
  class NoAdsCta extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div class="notification is-light is-size-6 has-text-centered" style="margin-bottom: 1rem;">
          This article is ad-supported to keep it free for everyone.<br>
          Prefer a cleaner, distraction-free experience? Subscribe to our newsletter
            <iframe src="https://embeds.beehiiv.com/8fd667ce-4b02-4034-97b7-b96e88fd9afc?slim=true" data-test-id="beehiiv-embed" height="52" frameborder="0" scrolling="no" style="margin: 0; border-radius: 0px !important; background-color: transparent;"></iframe>

            </div>
        </div>    
      `;
    }
  }

  customElements.define('no-ads-cta', NoAdsCta);


