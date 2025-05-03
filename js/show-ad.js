
  class ShowAd extends HTMLElement {
    connectedCallback() {

      const hasGnFlag    = localStorage.getItem('gn-nl-subscribed') === 'true';
    
      // 2) If either is set, don’t show the CTA at all
      if (hasGnFlag ) {

        this.remove();
        return;
      }

      const slotId = this.dataset.slot;
      const publishedDate = this.dataset.published;
      const delayWeeks = parseInt(this.dataset.delayWeeks || "0", 10);
      const containerId = `container-${slotId}`;

      // Timing check only if publishedDate is provided
      if (publishedDate) {
        const publishDate = new Date(publishedDate);
        const showDate = new Date(publishDate.getTime());
        showDate.setDate(publishDate.getDate() + (delayWeeks * 7));

        const now = new Date();
        if (now < showDate) return; // Not time yet — skip rendering
      }

      // Prevent duplicate ad injection
      if (document.getElementById(containerId)) return;

      // Create container
      const container = document.createElement('div');
      container.id = containerId;
      container.className = 'section';
      container.style.padding = '1rem 0';
      this.replaceWith(container);

      // Lazy-load only when visible
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const script = document.createElement('script');
            script.async = true;
            script.setAttribute('data-cfasync', 'false');
            script.src = `//pl26528177.profitableratecpm.com/${slotId}/invoke.js`;
            container.insertAdjacentElement('afterend', script);
            obs.unobserve(container);
          }
        });
      }, {
        rootMargin: '200px',
        threshold: 0.1
      });

      observer.observe(container);
    }
  }

  customElements.define('show-ad', ShowAd);

