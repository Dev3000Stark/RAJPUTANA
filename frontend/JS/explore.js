// ========================================
// RAJPUTANA — Explore Destinations
// File: frontend/JS/explore.js
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("destinationSearch");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const destinationCards = document.querySelectorAll(".destination-card");
    const resultsCount = document.getElementById("resultsCount");
    const emptyState = document.getElementById("emptyState");

    let activeFilter = "all";

    function filterDestinations() {
        const searchTerm = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        let visibleCount = 0;

        destinationCards.forEach((card) => {
            const title = (
                card.dataset.name ||
                card.querySelector("h3")?.textContent ||
                ""
            ).toLowerCase();

            const category = (
                card.dataset.category || ""
            ).toLowerCase();

            const description = (
                card.textContent || ""
            ).toLowerCase();

            const matchesSearch =
                title.includes(searchTerm) ||
                description.includes(searchTerm);

            const matchesFilter =
                activeFilter === "all" ||
                category.includes(activeFilter);

            const isVisible = matchesSearch && matchesFilter;

            card.style.display = isVisible ? "" : "none";

            if (isVisible) {
                visibleCount++;
            }
        });

        if (resultsCount) {
            resultsCount.textContent = visibleCount;
        }

        if (emptyState) {
            emptyState.style.display =
                visibleCount === 0 ? "block" : "none";
        }
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterDestinations);
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            activeFilter =
                button.dataset.filter || "all";

            filterDestinations();
        });
    });

    filterDestinations();
});