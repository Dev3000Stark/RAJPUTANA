// ==========================================
// RAJPUTANA — Shared Website JavaScript
// File: frontend/JS/main.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // PAGE LOADER

    const pageLoader = document.getElementById("pageLoader");

    function hideLoader() {
        if (pageLoader) {
            pageLoader.classList.add("loaded");
        }
    }

    window.addEventListener("load", hideLoader);

    // Fallback in case an external image takes too long.

    window.setTimeout(hideLoader, 2500);


    // NAVIGATION

    const navbar = document.getElementById("navbar");

    function updateNavbar() {
        if (!navbar) return;

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );
    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });


    // MOBILE MENU

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        function closeMenu() {
            navLinks.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

            menuToggle.textContent = "☰";
        }

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });

    }

});