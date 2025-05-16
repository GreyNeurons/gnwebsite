class ShowAd extends HTMLElement {
  connectedCallback() {
    const hasGnFlag = localStorage.getItem('gn-nl-subscribed') === 'true';
    if (hasGnFlag) { this.remove(); return; }

    const slotId      = this.dataset.slot;
    const published   = this.dataset.published;
    const delayWeeks  = parseInt(this.dataset.delayWeeks || "0", 10);
    const containerId = `container-${slotId}`;

    if (published) {
      const pub = new Date(published);
      const showDate = new Date(pub.getTime());
      showDate.setDate(pub.getDate() + delayWeeks * 7);
      if (Date.now() < showDate.getTime()) return;
    }

    if (document.getElementById(containerId)) return;

    const container = document.createElement('div');
    container.id    = containerId;
    container.className = 'section';
    container.style.padding = '1rem 0';
    this.replaceWith(container);

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // 1️⃣ the atOptions block
        container.insertAdjacentHTML('afterend', `
<script type="text/javascript">
  atOptions = {
    'key'    : '660d8a9251dc959ac46a45e1fb3d7a6b',
    'format' : 'iframe',
    'height' : 60,
    'width'  : 468,
    'params' : {}
  };
</script>`);

        // 2️⃣ the invoke.js loader
        container.insertAdjacentHTML('afterend', `
<script type="text/javascript" src="//www.highperformanceformat.com/660d8a9251dc959ac46a45e1fb3d7a6b/invoke.js"></script>`);

        obs.unobserve(container);
      });
    }, {
      rootMargin: '200px',
      threshold: 0.1
    });

    observer.observe(container);
  }
}

customElements.define('show-ad', ShowAd);
