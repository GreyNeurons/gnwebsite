class NoAdsCta extends HTMLElement {
  connectedCallback() {
    const hasGnFlag = localStorage.getItem('gn-nl-subscribed') === 'true';

    if (hasGnFlag) {
      // Show the ad-free message
      this.innerHTML = `
        <div class="notification is-light is-size-6 has-text-centered" style="margin-bottom: 1rem;">
          Enjoy an ad‑free reading experience as our valued newsletter member.
        </div>
      `;
    } else {
      // Show the newsletter subscribe CTA
      this.innerHTML = `
        <div class="notification is-light is-size-6 has-text-centered" style="margin-bottom: 1rem;">
          This article may <strong>display ads</strong> if it’s more than a few weeks old.<br>
          Prefer a cleaner, distraction-free experience? Subscribe to our newsletter:
          <div class="beehiiv-embed-wrapper" style="margin-top: 0.5rem;">
            <iframe
              src="https://embeds.beehiiv.com/8fd667ce-4b02-4034-97b7-b96e88fd9afc?slim=true"
              data-test-id="beehiiv-embed"
              height="52" frameborder="0" scrolling="no"
              style="margin: 0; border-radius: 0 !important; background-color: transparent;">
            </iframe>
          </div>
        </div>
      `;
    }
  }
}

customElements.define('no-ads-cta', NoAdsCta);
