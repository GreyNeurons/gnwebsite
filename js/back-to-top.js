class BackToTop extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Component styles
        const style = document.createElement("style");
        style.textContent = `
            .back-to-top {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
                font-size: 20px;
                border: none;
                background: #007bff; /* Blue */
                color: white;
                cursor: pointer;
                border-radius: 50%;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s, visibility 0.3s;
            }

            .show-button {
                opacity: 1;
                visibility: visible;
            }
        `;

        // Button element
        const button = document.createElement("button");
        button.className = "back-to-top";
        button.innerText = "▲";

        // Scroll behavior
        button.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        // Show/hide button based on scroll position
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                button.classList.add("show-button");
            } else {
                button.classList.remove("show-button");
            }
        });

        // Attach elements to shadow DOM
        this.shadowRoot.append(style, button);
    }
}

// Define custom element
customElements.define("back-to-top", BackToTop);
