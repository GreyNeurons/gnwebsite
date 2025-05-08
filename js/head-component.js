(function() {
    let pageDescription = window.pageMetaDescription || "Grey Neurons - Experience the wisdom";
    let canonicalLink = window.canonicalLink || "";

    // Ensure page stays hidden until everything loads
    document.documentElement.style.visibility = "hidden";
    document.documentElement.style.opacity = "0";

    function showPage() {
        document.documentElement.style.visibility = "visible";
        document.documentElement.style.opacity = "1";
    }

    // Ensure meta tags are added
    const metaElements = [
        { name: "charset", value: "utf-8" },
        { name: "title", value: `${pageDescription}` },
        { name: "name", content: "description", value: pageDescription },
        { name: "name", content: "viewport", value: "width=device-width, initial-scale=1" },
        { name: "property", content: "og:title", value: pageDescription },
        { name: "property", content: "og:type", value: "article" },
        { name: "property", content: "og:url", value: "https://www.greyneuronsconsulting.com/" },
        { name: "name", content: "theme-color", value: "#fafafa" },
        { name: "name", content: "twitter:card", value: "summary" },
        { name: "name", content: "twitter:title", value: pageDescription },
        { name: "name", content: "twitter:site", value: "@GreyNeurons" }
    ];

    metaElements.forEach(metaData => {
        const metaTag = document.createElement(metaData.name === "title" ? "title" : "meta");
        if (metaData.name === "title") {
            metaTag.textContent = metaData.value;
        } else {
            metaTag.setAttribute(metaData.name, metaData.content);
            metaTag.setAttribute("content", metaData.value);
        }
        document.head.appendChild(metaTag);
    });

    // Add canonical link if defined
    if (canonicalLink) {
        const linkTag = document.createElement('link');
        linkTag.setAttribute('rel', 'canonical');
        linkTag.setAttribute('href', canonicalLink);
        document.head.appendChild(linkTag);
    }

    // Inject Cloudflare Analytics only once
    if (!document.getElementById('cf-analytics')) {
        const script = document.createElement('script');
        script.defer = true;
        script.id = 'cf-analytics';
        script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
        script.setAttribute('data-cf-beacon', '{"token": "d46481215ded45428bf6e7854af04c53"}');
        document.head.appendChild(script);
    }

    // Inject Google AdSense only once
    if (!document.getElementById('adsbygoogle')) {
        const adsScript = document.createElement('script');
        adsScript.async = true;
        adsScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5824878456375803";
        adsScript.id = 'adsbygoogle';
        adsScript.setAttribute('crossorigin', 'anonymous');
        document.head.appendChild(adsScript);
    }

    // Show page only after styles and scripts have fully loaded
    if (document.readyState === "complete") {
        showPage();
    } else {
        window.addEventListener("load", showPage);
    }

})();

window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
        console.log("Page restored from cache, forcing styles to reapply.");
        document.documentElement.classList.add("loaded");
    }
})

