class ShowAd extends HTMLElement {
    connectedCallback() {
      const slotId = this.dataset.slot;
      const containerId = `container-${slotId}`;
  
      // Prevent duplicate ad slots
      if (document.getElementById(containerId)) return;
  
      // Create ad container and insert into DOM *before* the script
      const container = document.createElement('div');
      container.id = containerId;
      container.className = 'section';
      container.style.padding = '1rem 0';
      this.replaceWith(container); // ← IMPORTANT: Place it in DOM where <show-ad> was
  
      // Dynamically insert the Adsterra script into <head> or <body>
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = `//pl26528177.profitableratecpm.com/${slotId}/invoke.js`;
  
      // Append the script right after the container
      container.insertAdjacentElement('afterend', script);
    }
  }
  
  customElements.define('show-ad', ShowAd);
  