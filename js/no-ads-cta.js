
  class NoAdsCta extends HTMLElement {
      connectedCallback() {
          // 1) Check your subscription flags
        const hasGnFlag    = localStorage.getItem('gn-nl-subscribed') === 'true';
    
        // 2) If either is set, don’t show the CTA at all
        if (hasGnFlag ) {

          this.innerHTML = `
          <div class="notification is-light is-size-6 has-text-centered" style="margin-bottom: 1rem;">
             This article may <b>display ads</b> if it's more than a few weeks old..<br>
            Prefer a cleaner, distraction-free experience? Subscribe to our newsletter
              <iframe src="https://embeds.beehiiv.com/8fd667ce-4b02-4034-97b7-b96e88fd9afc?slim=true" data-test-id="beehiiv-embed" height="52" frameborder="0" scrolling="no" style="margin: 0; border-radius: 0px !important; background-color: transparent;"></iframe>
          </div> 
          `;
          return;
        }
      this.innerHTML = `
        <div class="notification is-light is-size-6 has-text-centered" style="margin-bottom: 1rem;">
           This article may <b>display ads</b> if it's more than a few weeks old..<br>
          Prefer a cleaner, distraction-free experience? Subscribe to our newsletter
            <iframe src="https://embeds.beehiiv.com/8fd667ce-4b02-4034-97b7-b96e88fd9afc?slim=true" data-test-id="beehiiv-embed" height="52" frameborder="0" scrolling="no" style="margin: 0; border-radius: 0px !important; background-color: transparent;"></iframe>
      
        </div>    
      `;
    }
  }

  customElements.define('no-ads-cta', NoAdsCta);


