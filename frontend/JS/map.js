// ==========================================
// RAJPUTANA — Interactive Journey Map
// File: frontend/JS/map.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const locations = [
        {
            id: "jaisalmer",
            name: "Jaisalmer",
            x: 23,
            y: 43,
            category: "Desert & Heritage",
            description: "Discover the Golden Fort, historic havelis and the Thar Desert.",
            image: "https://images.unsplash.com/photo-1602643163983-ed0babc39797?auto=format&fit=crop&w=900&q=85"
        },
        {
            id: "jodhpur",
            name: "Jodhpur",
            x: 37,
            y: 36,
            category: "Forts & Royal Heritage",
            description: "Explore Mehrangarh Fort, blue-painted streets and the heritage of Marwar.",
            image: "https://images.unsplash.com/photo-1624806992066-5ffcf7ca186b?auto=format&fit=crop&w=900&q=85"
        },
        {
            id: "jaipur",
            name: "Jaipur",
            x: 65,
            y: 34,
            category: "Royal Architecture",
            description: "Discover Hawa Mahal, Amber Fort and the Pink City's royal history.",
            image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=900&q=85"
        },
        {
            id: "ranthambore",
            name: "Ranthambore",
            x: 77,
            y: 51,
            category: "Wildlife & Nature",
            description: "Explore a famous wildlife landscape, forest habitats and historic ruins.",
            image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=900&q=85"
        },
        {
            id: "udaipur",
            name: "Udaipur",
            x: 45,
            y: 67,
            category: "Lakes & Palaces",
            description: "Discover Lake Pichola, City Palace and the heritage of Mewar.",
            image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=900&q=85"
        },
        {
            id: "mount-abu",
            name: "Mount Abu",
            x: 19,
            y: 76,
            category: "Hills & Nature",
            description: "Explore Aravalli mountain scenery, Nakki Lake and Dilwara Temples.",
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85"
        },
        {
            id: "pushkar",
            name: "Pushkar",
            x: 52,
            y: 48,
            category: "Culture & Spirituality",
            description: "Visit sacred ghats, temples and the historic town surrounding Pushkar Lake.",
            image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=900&q=85"
        },
        {
            id: "chittorgarh",
            name: "Chittorgarh",
            x: 60,
            y: 73,
            category: "Historic Forts",
            description: "Discover the monumental fort and the historic architecture of Mewar.",
            image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=900&q=85"
        }
    ];

    const mapCanvas = document.getElementById("mapCanvas");
    const detailTitle = document.getElementById("detailTitle");
    const detailRegion = document.getElementById("detailRegion");
    const detailDescription = document.getElementById("detailDescription");
    const detailCategory = document.getElementById("detailCategory");
    const detailXP = document.getElementById("detailXP");
    const detailImage = document.getElementById("mapDetailImage");
    const detailLink = document.getElementById("detailExploreLink");
    const completeButton = document.getElementById("completeJourney");
    const rewardNote = document.getElementById("rewardNote");

    const playerLevel = document.getElementById("playerLevel");
    const playerXP = document.getElementById("playerXP");
    const placesCompleted = document.getElementById("placesCompleted");
    const progressPercent = document.getElementById("progressPercent");
    const progressFill = document.getElementById("progressFill");
    const progressCounter = document.getElementById("progressCounter");
    const progressMessage = document.getElementById("progressMessage");
    const discoveredList = document.getElementById("discoveredList");
    const resetButton = document.getElementById("resetJourney");

    const STORAGE_KEY = "rajputanaJourneyV1";
    const XP_PER_DESTINATION = 100;

    let selectedLocation = locations[0];

    function loadProgress() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

            if (saved && Array.isArray(saved.discovered)) {
                return {
                    discovered: saved.discovered.filter(id =>
                        locations.some(location => location.id === id)
                    )
                };
            }
        } catch (error) {
            console.warn("Could not read saved journey progress.", error);
        }

        return { discovered: [] };
    }

    let progress = loadProgress();

    function saveProgress() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        } catch (error) {
            console.warn("Could not save journey progress.", error);
            rewardNote.textContent =
                "Browser storage is unavailable; progress may not persist.";
        }
    }

    function isDiscovered(locationId) {
        return progress.discovered.includes(locationId);
    }

    function renderMarkers() {
        mapCanvas.querySelectorAll(".map-marker").forEach(marker => marker.remove());

        locations.forEach(location => {
            const button = document.createElement("button");

            button.type = "button";
            button.className = "map-marker";
            button.dataset.id = location.id;
            button.style.left = `${location.x}%`;
            button.style.top = `${location.y}%`;
            button.setAttribute("aria-label", `Explore ${location.name}`);

            button.innerHTML = `
                <span class="map-marker-dot">✦</span>
                <span class="map-marker-label">${location.name}</span>
            `;

            button.addEventListener("click", () => selectLocation(location.id));

            mapCanvas.appendChild(button);
        });
    }

    function selectLocation(locationId) {
        const location = locations.find(item => item.id === locationId);

        if (!location) return;

        selectedLocation = location;

        mapCanvas.querySelectorAll(".map-marker").forEach(marker => {
            marker.classList.toggle("active", marker.dataset.id === location.id);
        });

        renderDetail();
    }

    function renderDetail() {
        const location = selectedLocation;
        const completed = isDiscovered(location.id);

        detailTitle.textContent = location.name;
        detailRegion.textContent = "RAJASTHAN, INDIA";
        detailDescription.textContent = location.description;
        detailCategory.textContent = location.category;
        detailXP.textContent = completed ? "Earned ✓" : `+${XP_PER_DESTINATION} XP`;

        detailImage.innerHTML = "";

        const image = document.createElement("img");
        image.src = location.image;
        image.alt = `${location.name}, Rajasthan`;
        image.loading = "lazy";

        image.addEventListener("error", () => {
            detailImage.innerHTML = "<span>✦ RAJPUTANA</span>";
        }, { once: true });

        detailImage.appendChild(image);

        detailLink.href = `places.html?place=${encodeURIComponent(location.id)}`;

        completeButton.disabled = completed;
        completeButton.textContent = completed
            ? "✓ Destination Discovered"
            : `✦ Mark as Discovered · +${XP_PER_DESTINATION} XP`;

        rewardNote.textContent = completed
            ? "You've already earned XP for this destination."
            : "Mark this destination as discovered to earn XP.";

        renderMarkersStatus();
    }

    function renderMarkersStatus() {
        mapCanvas.querySelectorAll(".map-marker").forEach(marker => {
            marker.classList.toggle(
                "discovered",
                isDiscovered(marker.dataset.id)
            );
        });
    }

    function renderProgress() {
        const count = progress.discovered.length;
        const xp = count * XP_PER_DESTINATION;
        const percentage = Math.round((count / locations.length) * 100);
        const level = Math.floor(xp / 300) + 1;

        playerLevel.textContent = `Level ${level}`;
        playerXP.textContent = `${xp} XP`;
        placesCompleted.textContent = `${count} / ${locations.length}`;
        progressPercent.textContent = `${percentage}%`;
        progressFill.style.width = `${percentage}%`;
        progressCounter.textContent = `${count} OF ${locations.length} DESTINATIONS`;

        if (count === 0) {
            progressMessage.textContent =
                "Your Rajasthan adventure is waiting to begin.";
        } else if (count === locations.length) {
            progressMessage.textContent =
                "Amazing! You've discovered all eight destinations.";
        } else {
            progressMessage.textContent =
                `You've discovered ${count} destination${count === 1 ? "" : "s"}. Keep exploring!`;
        }

        if (count === locations.length) {
            progressMessage.textContent += " Rajasthan Explorer achieved!";
        }

        if (count === 0) {
            discoveredList.innerHTML =
                '<p class="empty-discoveries">Your discoveries will appear here.</p>';
        } else {
            discoveredList.innerHTML = progress.discovered
                .map(id => locations.find(location => location.id === id))
                .filter(Boolean)
                .map(location => `
                    <span class="discovered-chip">✓ ${location.name}</span>
                `)
                .join("");
        }

        renderMarkersStatus();
    }

    completeButton.addEventListener("click", () => {
        if (isDiscovered(selectedLocation.id)) return;

        progress.discovered.push(selectedLocation.id);
        saveProgress();
        renderProgress();
        renderDetail();
    });

    resetButton.addEventListener("click", () => {
        const confirmed = window.confirm(
            "Reset all discovered destinations and journey XP on this browser?"
        );

        if (!confirmed) return;

        progress = { discovered: [] };
        saveProgress();
        renderProgress();
        renderDetail();
    });

    renderMarkers();
    selectLocation(selectedLocation.id);
    renderProgress();

});