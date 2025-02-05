function adjustNavbar() {
    const navbar = document.getElementById("navbar");
    const screenWidth = window.innerWidth;

    if (screenWidth > 768) {
        navbar.classList.add("is-fixed-top");
        document.body.classList.add("has-fixed-navbar"); // Adjusts body padding
    } else {
        navbar.classList.remove("is-fixed-top");
        document.body.classList.remove("has-fixed-navbar");
    }
}

// Run on page load & window resize
window.addEventListener("load", adjustNavbar);
window.addEventListener("resize", adjustNavbar);

function toggleMenu() {
    document.querySelector('.navbar-menu').classList.toggle('is-active');
}