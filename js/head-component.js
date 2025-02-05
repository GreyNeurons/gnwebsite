(function() {
    let pageDescription = window.pageMetaDescription || 
    "Grey Neurons - Experience the wisdom";

    document.head.innerHTML += `
        <meta charset="utf-8">
        <title>Grey Neurons - ${pageDescription}</title>
        <meta name="description" content="${pageDescription}">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta property="og:title" content="${pageDescription}">
        <meta property="og:type" content="article">
        <meta property="og:url" content="https://www.greyneuronsconsulting.com/blogs/beware-of-those-free-tiers.html">

        <link rel="manifest" href="site.webmanifest">
        <link rel="apple-touch-icon" href="icon.png">
        <!-- Place favicon.ico in the root directory -->

        <link rel="stylesheet" href="/css/normalize.css">
        <link rel="stylesheet" href="/css/bulma.css">
        <link rel="stylesheet" href="/css/main.css">

        <meta name="theme-color" content="#fafafa">
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="${pageDescription}" />
        <meta name="twitter:site" content="@GreyNeurons" />
    `;

    // Inject Cloudflare Analytics only once
    if (!document.getElementById('cf-analytics')) {
        const script = document.createElement('script');
        script.defer = true;
        script.id = 'cf-analytics';
        script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
        script.setAttribute('data-cf-beacon', '{"token": "d46481215ded45428bf6e7854af04c53"}');
        document.head.appendChild(script);
    }
})();
