/* ==========================================
   RAJPUTANA PROFILE
   File: frontend/JS/profile.js
========================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const DESTINATIONS = {
        "jaipur": {
            name: "Jaipur",
            description: "Explore royal palaces, historic forts and the Pink City's vibrant culture."
        },
        "jaisalmer": {
            name: "Jaisalmer",
            description: "Discover golden sandstone architecture and the Thar Desert."
        },
        "udaipur": {
            name: "Udaipur",
            description: "Experience beautiful lakes, palaces and the Aravalli landscape."
        },
        "jodhpur": {
            name: "Jodhpur",
            description: "Discover the Blue City and the mighty Mehrangarh Fort."
        },
        "mount-abu": {
            name: "Mount Abu",
            description: "Enjoy Rajasthan's hill station, scenic views and peaceful surroundings."
        },
        "pushkar": {
            name: "Pushkar",
            description: "Explore the sacred lake, temples and historic streets."
        },
        "chittorgarh": {
            name: "Chittorgarh",
            description: "Discover the legendary fort and the history of Mewar."
        },
        "ranthambore": {
            name: "Ranthambore",
            description: "Explore a historic fort and a celebrated wildlife landscape."
        }
    };

    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const profileAvatar = document.getElementById("profileAvatar");
    const visitedContainer = document.getElementById("visitedDestinations");
    const nextLevelText = document.getElementById("nextLevelText");
    const progressCaption = document.getElementById("progressCaption");
    const logoutButton = document.getElementById("logoutButton");

    function getUser() {
        try {
            const saved = localStorage.getItem("rajputanaUser");
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    }

    function renderUser() {
        const user = getUser();

        if (!user) {
            if (profileName) {
                profileName.textContent = "Guest Traveller";
            }

            if (profileEmail) {
                profileEmail.textContent =
                    "Your journey progress is saved in this browser.";
            }

            if (profileAvatar) {
                profileAvatar.textContent = "G";
            }

            return;
        }

        const name = user.name || "Traveller";

        if (profileName) {
            profileName.textContent = name;
        }

        if (profileEmail) {
            profileEmail.textContent = user.email || "";
        }

        if (profileAvatar) {
            profileAvatar.textContent = name
                .trim()
                .charAt(0)
                .toUpperCase() || "T";
        }
    }

    function renderProgress() {
        if (!window.RajputanaGame) {
            if (nextLevelText) {
                nextLevelText.textContent =
                    "Journey game system is not available.";
            }
            return;
        }

        const progress = window.RajputanaGame.getProgress();

        if (nextLevelText) {
            nextLevelText.textContent = progress.nextLevel
                ? `${progress.xpToNextLevel} XP to Level ${progress.nextLevel}`
                : "Maximum level reached!";
        }

        if (progressCaption) {
            progressCaption.textContent = progress.nextLevel
                ? `${progress.totalXP} total XP earned. Keep exploring to reach your next level.`
                : "Congratulations! You have reached the highest available level.";
        }
    }

    function renderVisitedDestinations() {
        if (!visitedContainer || !window.RajputanaGame) {
            return;
        }

        const progress = window.RajputanaGame.getProgress();

        visitedContainer.replaceChildren();

        if (progress.visitedDestinations.length === 0) {
            const empty = document.createElement("article");
            empty.className = "visited-empty";

            const symbol = document.createElement("span");
            symbol.textContent = "✧";

            const heading = document.createElement("h3");
            heading.textContent = "Your journey starts here.";

            const description = document.createElement("p");
            description.textContent =
                "Visit a destination on the Journey Map to begin collecting XP and building your travel history.";

            const link = document.createElement("a");
            link.href = "map.html";
            link.className = "profile-primary-button";
            link.textContent = "Start Exploring ↗";

            empty.append(symbol, heading, description, link);
            visitedContainer.appendChild(empty);

            return;
        }

        progress.visitedDestinations.forEach(id => {
            const destination = DESTINATIONS[id];

            if (!destination) {
                return;
            }

            const card = document.createElement("article");
            card.className = "visited-card";

            const heading = document.createElement("h3");
            heading.textContent = destination.name;

            const description = document.createElement("p");
            description.textContent = destination.description;

            const reward = document.createElement("span");
            reward.textContent = "✦ Destination discovered";

            card.append(heading, description, reward);
            visitedContainer.appendChild(card);
        });
    }

    function refreshProfile() {
        renderUser();
        renderProgress();
        renderVisitedDestinations();
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", event => {
            event.preventDefault();

            const confirmed = window.confirm(
                "Do you want to sign out of RAJPUTANA?"
            );

            if (!confirmed) {
                return;
            }

            // Remove the local display identity and temporary token.
            // Journey XP is intentionally retained on this browser.
            localStorage.removeItem("rajputanaUser");
            sessionStorage.removeItem("rajputanaToken");

            window.location.href = "login.html";
        });
    }

    document.addEventListener(
        "rajputana:destinationVisited",
        refreshProfile
    );

    document.addEventListener(
        "rajputana:journeyCompleted",
        refreshProfile
    );

    refreshProfile();

});