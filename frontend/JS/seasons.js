"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".season-tab");
    const cards = document.querySelectorAll(".season-card");
    const emptyMessage = document.getElementById("seasonEmpty");

    function filterSeasons(selectedSeason) {
        let visibleCount = 0;

        cards.forEach(function (card) {
            const cardSeason = card.dataset.season;
            const shouldShow =
                selectedSeason === "all" ||
                cardSeason === selectedSeason;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }
        });

        tabs.forEach(function (tab) {
            const isActive = tab.dataset.season === selectedSeason;

            tab.classList.toggle("active", isActive);
            tab.setAttribute("aria-pressed", String(isActive));
        });

        if (emptyMessage) {
            emptyMessage.hidden = visibleCount !== 0;
        }
    }

    tabs.forEach(function (tab) {
        tab.setAttribute(
            "aria-pressed",
            String(tab.classList.contains("active"))
        );

        tab.addEventListener("click", function () {
            filterSeasons(tab.dataset.season || "all");
        });
    });

    filterSeasons("all");
});