/* ============================================
   RAJPUTANA — JOURNEY GAME SYSTEM
   File: frontend/JS/game.js
============================================ */

"use strict";

const RajputanaGame = (() => {

    const STORAGE_KEY = "rajputanaJourneyGame";

    const XP_PER_DESTINATION = 100;

    const LEVELS = [
        { level: 1, title: "Desert Explorer", xp: 0 },
        { level: 2, title: "Heritage Seeker", xp: 300 },
        { level: 3, title: "Royal Traveller", xp: 700 },
        { level: 4, title: "Adventure Master", xp: 1200 },
        { level: 5, title: "Rajasthan Legend", xp: 2000 }
    ];

    const DESTINATIONS = [
        "jaipur",
        "jaisalmer",
        "udaipur",
        "jodhpur",
        "mount-abu",
        "pushkar",
        "chittorgarh",
        "ranthambore"
    ];

    function getDefaultData() {
        return {
            totalXP: 0,
            visitedDestinations: [],
            completedJourneys: []
        };
    }

    function loadData() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);

            if (!saved) {
                return getDefaultData();
            }

            const parsed = JSON.parse(saved);

            return {
                totalXP: Number(parsed.totalXP) || 0,
                visitedDestinations: Array.isArray(
                    parsed.visitedDestinations
                ) ? parsed.visitedDestinations : [],
                completedJourneys: Array.isArray(
                    parsed.completedJourneys
                ) ? parsed.completedJourneys : []
            };

        } catch (error) {
            console.error("Could not load journey progress:", error);
            return getDefaultData();
        }
    }

    function saveData(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error("Could not save journey progress:", error);
            return false;
        }
    }

    function getLevel(totalXP) {
        let currentLevel = LEVELS[0];

        for (const level of LEVELS) {
            if (totalXP >= level.xp) {
                currentLevel = level;
            }
        }

        return currentLevel;
    }

    function getNextLevel(totalXP) {
        return LEVELS.find(level => totalXP < level.xp) || null;
    }

    function getProgress() {
        const data = loadData();
        const currentLevel = getLevel(data.totalXP);
        const nextLevel = getNextLevel(data.totalXP);

        let progressPercent = 100;

        if (nextLevel) {
            const xpWithinLevel = data.totalXP - currentLevel.xp;
            const xpNeeded = nextLevel.xp - currentLevel.xp;

            progressPercent = Math.max(
                0,
                Math.min(100, (xpWithinLevel / xpNeeded) * 100)
            );
        }

        return {
            totalXP: data.totalXP,
            visitedDestinations: [...data.visitedDestinations],
            completedJourneys: [...data.completedJourneys],
            currentLevel: currentLevel.level,
            levelTitle: currentLevel.title,
            nextLevel: nextLevel ? nextLevel.level : null,
            nextLevelTitle: nextLevel ? nextLevel.title : null,
            xpToNextLevel: nextLevel
                ? nextLevel.xp - data.totalXP
                : 0,
            progressPercent: Math.round(progressPercent)
        };
    }

    function visitDestination(destinationId) {
        const id = String(destinationId || "")
            .trim()
            .toLowerCase();

        if (!DESTINATIONS.includes(id)) {
            return {
                success: false,
                message: "Destination not found."
            };
        }

        const data = loadData();

        if (data.visitedDestinations.includes(id)) {
            return {
                success: false,
                message: "You have already visited this destination!"
            };
        }

        const oldLevel = getLevel(data.totalXP).level;

        data.visitedDestinations.push(id);
        data.totalXP += XP_PER_DESTINATION;

        if (!saveData(data)) {
            return {
                success: false,
                message: "Progress could not be saved in this browser."
            };
        }

        const newLevel = getLevel(data.totalXP).level;

        const result = {
            success: true,
            destination: id,
            xpEarned: XP_PER_DESTINATION,
            totalXP: data.totalXP,
            level: newLevel,
            levelUp: newLevel > oldLevel,
            message: `Journey complete! You earned ${XP_PER_DESTINATION} XP.`
        };

        if (result.levelUp) {
            result.message += ` Level up! You are now ${getLevel(data.totalXP).title}.`;
        }

        updateInterface();

        document.dispatchEvent(
            new CustomEvent("rajputana:destinationVisited", {
                detail: result
            })
        );

        return result;
    }

    function completeJourney(journeyId) {
        const id = String(journeyId || "").trim().toLowerCase();

        if (!id) {
            return {
                success: false,
                message: "Journey ID is required."
            };
        }

        const data = loadData();

        if (data.completedJourneys.includes(id)) {
            return {
                success: false,
                message: "This journey has already been completed."
            };
        }

        data.completedJourneys.push(id);
        data.totalXP += 200;

        if (!saveData(data)) {
            return {
                success: false,
                message: "Progress could not be saved."
            };
        }

        const result = {
            success: true,
            journey: id,
            xpEarned: 200,
            totalXP: data.totalXP,
            message: "Journey completed! You earned 200 bonus XP."
        };

        updateInterface();

        document.dispatchEvent(
            new CustomEvent("rajputana:journeyCompleted", {
                detail: result
            })
        );

        return result;
    }

    function updateInterface() {
        const progress = getProgress();

        const xpElements = document.querySelectorAll("[data-game-xp]");
        const levelElements = document.querySelectorAll("[data-game-level]");
        const titleElements = document.querySelectorAll("[data-game-title]");
        const visitedElements = document.querySelectorAll(
            "[data-game-visited]"
        );
        const progressElements = document.querySelectorAll(
            "[data-game-progress]"
        );

        xpElements.forEach(element => {
            element.textContent = progress.totalXP;
        });

        levelElements.forEach(element => {
            element.textContent = progress.currentLevel;
        });

        titleElements.forEach(element => {
            element.textContent = progress.levelTitle;
        });

        visitedElements.forEach(element => {
            element.textContent = progress.visitedDestinations.length;
        });

        progressElements.forEach(element => {
            element.style.width = `${progress.progressPercent}%`;
            element.setAttribute(
                "aria-valuenow",
                String(progress.progressPercent)
            );
        });
    }

    function resetProgress() {
        const success = saveData(getDefaultData());

        if (success) {
            updateInterface();
        }

        return success;
    }

    document.addEventListener("DOMContentLoaded", updateInterface);

    return {
        getProgress,
        visitDestination,
        completeJourney,
        updateInterface,
        resetProgress,
        destinations: [...DESTINATIONS]
    };

})();

/* ============================================
   OPTIONAL GLOBAL SHORTCUTS
============================================ */

window.RajputanaGame = RajputanaGame;