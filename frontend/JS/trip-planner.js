
// RAJPUTANA — Smart Trip Planner
// Estimates are illustrative demo values, not live travel prices.

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("tripForm");
    const results = document.getElementById("tripResults");
    const formMessage = document.getElementById("formMessage");

    const destinationData = {
        jaipur: {
            name: "Jaipur",
            nickname: "The Pink City",
            places: {
                heritage: ["Amber Fort", "City Palace", "Hawa Mahal", "Jantar Mantar"],
                adventure: ["Nahargarh Fort", "Jaigarh Fort", "Amber surroundings"],
                culture: ["Johari Bazaar", "Hawa Mahal", "Traditional food streets"],
                nature: ["Central Park", "Jal Mahal viewpoint", "Sisodia Rani Garden"],
                mixed: ["Amber Fort", "Hawa Mahal", "City Palace", "Local market"]
            }
        },
        udaipur: {
            name: "Udaipur",
            nickname: "The City of Lakes",
            places: {
                heritage: ["City Palace", "Bagore Ki Haveli", "Sajjangarh Palace"],
                adventure: ["Sajjangarh hill area", "Fateh Sagar Lake", "Old city walk"],
                culture: ["Bagore Ki Haveli", "Local handicraft markets", "Old city"],
                nature: ["Lake Pichola", "Fateh Sagar Lake", "Saheliyon-ki-Bari"],
                mixed: ["City Palace", "Lake Pichola", "Saheliyon-ki-Bari"]
            }
        },
        jodhpur: {
            name: "Jodhpur",
            nickname: "The Blue City",
            places: {
                heritage: ["Mehrangarh Fort", "Jaswant Thada", "Umaid Bhawan Palace"],
                adventure: ["Mehrangarh Fort area", "Rao Jodha Desert Rock Park"],
                culture: ["Clock Tower Market", "Blue City lanes", "Local food streets"],
                nature: ["Rao Jodha Desert Rock Park", "Kaylana Lake"],
                mixed: ["Mehrangarh Fort", "Jaswant Thada", "Clock Tower Market"]
            }
        },
        jaisalmer: {
            name: "Jaisalmer",
            nickname: "The Golden City",
            places: {
                heritage: ["Jaisalmer Fort", "Patwon Ki Haveli", "Salim Singh Ki Haveli"],
                adventure: ["Sam Sand Dunes", "Desert safari area", "Desert camping area"],
                culture: ["Jaisalmer Fort lanes", "Local craft markets", "Traditional food spots"],
                nature: ["Gadisar Lake", "Desert landscape viewpoints"],
                mixed: ["Jaisalmer Fort", "Patwon Ki Haveli", "Sam Sand Dunes"]
            }
        },
        pushkar: {
            name: "Pushkar",
            nickname: "The Sacred City",
            places: {
                heritage: ["Brahma Temple", "Pushkar ghats", "Old market"],
                adventure: ["Savitri Temple hill", "Desert outskirts"],
                culture: ["Pushkar market", "Local craft shops", "Pushkar ghats"],
                nature: ["Pushkar Lake", "Savitri Temple viewpoint"],
                mixed: ["Brahma Temple", "Pushkar Lake", "Local market"]
            }
        },
        mountabu: {
            name: "Mount Abu",
            nickname: "The Hill Station",
            places: {
                heritage: ["Dilwara Temples", "Achalgarh Fort"],
                adventure: ["Guru Shikhar", "Trekking areas"],
                culture: ["Dilwara Temples", "Local market"],
                nature: ["Nakki Lake", "Guru Shikhar", "Sunset Point"],
                mixed: ["Nakki Lake", "Dilwara Temples", "Sunset Point"]
            }
        },
        bikaner: {
            name: "Bikaner",
            nickname: "The Desert Heritage",
            places: {
                heritage: ["Junagarh Fort", "Lalgarh Palace", "Rampuria Havelis"],
                adventure: ["Desert outskirts", "Camel research farm area"],
                culture: ["Old city market", "Rampuria Havelis", "Local food shops"],
                nature: ["Gajner Lake area", "Gajner Wildlife Sanctuary"],
                mixed: ["Junagarh Fort", "Rampuria Havelis", "Local market"]
            }
        },
        chittorgarh: {
            name: "Chittorgarh",
            nickname: "The Land of Forts",
            places: {
                heritage: ["Chittorgarh Fort", "Vijay Stambh", "Kirti Stambh"],
                adventure: ["Chittorgarh Fort complex", "Fort ramparts"],
                culture: ["Chittorgarh Fort", "Local market"],
                nature: ["Gaumukh Reservoir", "Fort landscape viewpoints"],
                mixed: ["Chittorgarh Fort", "Vijay Stambh", "Gaumukh Reservoir"]
            }
        }
    };

    // Illustrative per-person daily cost assumptions in INR.
    const dailyCosts = {
        bus:   { transport: 250, food: 400, stay: 700, tickets: 250 },
        train: { transport: 350, food: 400, stay: 700, tickets: 250 },
        car:   { transport: 1000, food: 500, stay: 1000, tickets: 300 },
        bike:  { transport: 450, food: 400, stay: 700, tickets: 250 }
    };

    const formatRupees = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(amount);

    function createElement(tag, className, text) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (text !== undefined) {
            element.textContent = text;
        }

        return element;
    }

    function makeDayPlan(dayNumber, places, style) {
        const placeCount = places.length;
        const first = places[(dayNumber - 1) % placeCount];
        const second = places[dayNumber % placeCount];
        const third = places[(dayNumber + 1) % placeCount];

        const activityText = {
            heritage: "Explore historical landmarks and architectural heritage.",
            adventure: "Enjoy outdoor exploration and adventure experiences.",
            culture: "Discover local culture, markets and regional cuisine.",
            nature: "Enjoy scenic views and a more relaxed sightseeing day.",
            mixed: "Combine sightseeing, local culture and relaxation."
        };

        return {
            title: `Discover ${first}`,
            places: [first, second, third].filter(
                (place, index, array) => array.indexOf(place) === index
            ),
            description: activityText[style] || activityText.mixed
        };
    }

    function buildExpenseRows(expenses) {
        const container = document.getElementById("expenseBreakdown");
        container.replaceChildren();

        const labels = [
            ["transport", "Estimated transport"],
            ["food", "Food and refreshments"],
            ["stay", "Accommodation"],
            ["tickets", "Entry tickets and activities"]
        ];

        labels.forEach(([key, label]) => {
            const row = createElement("div", "expense-row");
            row.append(
                createElement("span", "", label),
                createElement("strong", "", formatRupees(expenses[key]))
            );
            container.appendChild(row);
        });

        const totalRow = createElement("div", "expense-row");
        totalRow.append(
            createElement("strong", "", "Estimated total"),
            createElement("strong", "", formatRupees(expenses.total))
        );
        container.appendChild(totalRow);
    }

    function buildItinerary(destination, days, style) {
        const container = document.getElementById("itineraryDays");
        container.replaceChildren();

        const places = destination.places[style] || destination.places.mixed;

        for (let day = 1; day <= days; day++) {
            const plan = makeDayPlan(day, places, style);
            const card = createElement("article", "itinerary-card");

            card.append(
                createElement("span", "day-label", `DAY ${day}`),
                createElement("h4", "", plan.title),
                createElement("p", "", plan.description),
                createElement("p", "", `Suggested stops: ${plan.places.join(", ")}.`),
                createElement(
                    "p",
                    "",
                    "Tip: Check opening hours, transport availability and entry fees before visiting."
                )
            );

            container.appendChild(card);
        }
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        formMessage.textContent = "";

        const travellers = Number(document.getElementById("travellers").value);
        const days = Number(document.getElementById("days").value);
        const destinationKey = document.getElementById("destination").value;
        const style = document.getElementById("travelStyle").value;
        const season = document.getElementById("season").value;
        const budget = Number(document.getElementById("budget").value);
        const transport = document.getElementById("transport").value;

        if (
            !Number.isInteger(travellers) || travellers < 1 || travellers > 50 ||
            !Number.isInteger(days) || days < 1 || days > 30 ||
            !Number.isFinite(budget) || budget < 500 || budget > 10000000
        ) {
            formMessage.textContent =
                "Please enter valid values for travellers, trip duration and budget.";
            return;
        }

        const destination = destinationData[destinationKey];
        const rates = dailyCosts[transport];

        if (!destination || !rates) {
            formMessage.textContent = "Please select a valid destination and transport.";
            return;
        }

        const expenses = {
            transport: rates.transport * travellers * days,
            food: rates.food * travellers * days,
            stay: rates.stay * travellers * days,
            tickets: rates.tickets * travellers * days
        };

        expenses.total =
            expenses.transport +
            expenses.food +
            expenses.stay +
            expenses.tickets;

        document.getElementById("tripSummary").textContent =
            `${days} day${days === 1 ? "" : "s"} in ${destination.name} ` +
            `(${destination.nickname}) for ${travellers} traveller${travellers === 1 ? "" : "s"}.`;

        document.getElementById("totalBudget").textContent = formatRupees(budget);
        document.getElementById("estimatedCost").textContent =
            formatRupees(expenses.total);

        document.getElementById("budgetBalance").textContent =
            formatRupees(budget - expenses.total);

        const budgetMessage = document.getElementById("budgetMessage");

        if (expenses.total > budget) {
            budgetMessage.textContent =
                `Your estimated trip cost exceeds your budget by ` +
                `${formatRupees(expenses.total - budget)}. Consider fewer days, ` +
                `lower-cost transport or a smaller group.`;
        } else {
            budgetMessage.textContent =
                `Your estimated expenses are within your budget, with approximately ` +
                `${formatRupees(budget - expenses.total)} remaining. Keep a reserve ` +
                `for unexpected expenses.`;
        }

        buildExpenseRows(expenses);
        buildItinerary(destination, days, style);

        results.hidden = false;
        results.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    document.getElementById("printTrip").addEventListener("click", () => {
        window.print();
    });

    document.getElementById("editTrip").addEventListener("click", () => {
        document.getElementById("planner-form").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        document.getElementById("travellers").focus();
    });
});

