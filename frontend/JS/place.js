// ==========================================
// RAJPUTANA — City and Attraction Data
// File: frontend/JS/places.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const destinations = {

        // =====================================
        // JAIPUR
        // =====================================

        jaipur: {
            name: "Jaipur",
            nickname: "The Pink City",
            region: "JAIPUR · RAJASTHAN",
            experience: "Royal Heritage",

            tagline:
                "Discover magnificent palaces, historic forts and the royal traditions of Rajasthan's Pink City.",

            description:
                "Jaipur is known for its historic architecture, colourful bazaars and royal heritage. Explore remarkable monuments that reflect the art, astronomy and history of the region.",

            image:
                "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=2000&q=90",

            tip:
                "Visit popular monuments early to avoid crowds. Check current opening hours and photography rules before entering.",

            attractions: [

                {
                    name: "Hawa Mahal",
                    category: "ROYAL ARCHITECTURE",
                    description:
                        "An iconic pink sandstone palace known for its elaborate façade and numerous small windows. It is one of Jaipur's most recognisable landmarks.",
                    image:
                        "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1000&q=85",
                    duration: "1–2 hours"
                },

                {
                    name: "Amber Fort",
                    category: "HISTORIC FORT",
                    description:
                        "A hilltop fort complex featuring grand courtyards, ornate halls and impressive Rajput architecture overlooking the surrounding landscape.",
                    image:
                        "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1000&q=85",
                    duration: "2–3 hours"
                },

                {
                    name: "Jal Mahal",
                    category: "LAKESIDE PALACE",
                    description:
                        "A picturesque palace situated in Man Sagar Lake. Visitors commonly admire and photograph the palace from the lakeside promenade.",
                    image:
                        "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1000&q=85",
                    duration: "30–60 minutes"
                },

                {
                    name: "Jantar Mantar",
                    category: "ASTRONOMICAL HERITAGE",
                    description:
                        "A historic astronomical observatory containing monumental instruments designed to observe celestial positions and measure time.",
                    image:
                        "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1000&q=85",
                    duration: "1–2 hours"
                }

            ]
        },


        // =====================================
        // JAISALMER
        // =====================================

        jaisalmer: {
            name: "Jaisalmer",
            nickname: "The Golden City",
            region: "JAISALMER · THAR DESERT",
            experience: "Desert & Heritage",

            tagline:
                "Explore golden sandstone architecture, historic havelis and the spectacular Thar Desert.",

            description:
                "Jaisalmer is famous for its golden sandstone fort, intricately carved merchant houses and desert landscapes. Its historic streets and surrounding dunes offer a distinctive experience of western Rajasthan.",

            image:
                "https://images.unsplash.com/photo-1602643163983-ed0babc39797?auto=format&fit=crop&w=2000&q=90",

            tip:
                "Plan desert activities for the cooler hours of the day. Use licensed operators and confirm safari conditions before booking.",

            attractions: [

                {
                    name: "Jaisalmer Fort",
                    category: "HISTORIC FORT",
                    description:
                        "Also known as Sonar Qila, this golden sandstone fort rises above the city and contains historic lanes, temples, shops and homes.",
                    image:
                        "https://images.unsplash.com/photo-1602643163983-ed0babc39797?auto=format&fit=crop&w=1000&q=85",
                    duration: "2–3 hours"
                },

                {
                    name: "Sam Sand Dunes",
                    category: "DESERT ADVENTURE",
                    description:
                        "A popular area near Jaisalmer for experiencing the Thar Desert, watching sunset over the dunes and arranging permitted desert activities.",
                    image:
                        "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1000&q=85",
                    duration: "2-4 hours"
                },

                {
                    name: "Patwon Ki Haveli",
                    category: "HISTORIC HAVELI",
                    description:
                        "A remarkable group of historic merchant havelis celebrated for detailed stone carving, decorative façades and traditional architecture.",
                    image:
                        "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1000&q=85",
                    duration: "1–2 hours"
                },

                {
                    name: "Gadisar Lake",
                    category: "LAKE & HERITAGE",
                    description:
                        "A historic water reservoir surrounded by temples, shrines and carved sandstone structures, offering a peaceful place to explore.",
                    image:
                        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
                    duration: "45–90 minutes"
                }

            ]
        },


        // =====================================
        // UDAIPUR
        // =====================================

        udaipur: {
            name: "Udaipur",
            nickname: "The City of Lakes",
            region: "UDAIPUR · MEWAR REGION",
            experience: "Lakes & Heritage",

            tagline:
                "Discover lakeside palaces, scenic waterfronts and the historic elegance of Mewar.",

            description:
                "Udaipur combines historic royal architecture with lakes and views of the Aravalli hills. Its palaces, waterfronts and cultural landmarks make it one of Rajasthan's best-known destinations.",

            image:
                "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=2000&q=90",

            tip:
                "Allow extra time for the City Palace complex. Lake activities and boat services can depend on weather and water conditions.",

            attractions: [

                {
                    name: "City Palace",
                    category: "ROYAL PALACE",
                    description:
                        "A large palace complex overlooking Lake Pichola, featuring courtyards, galleries and architectural details associated with Mewar's royal history.",
                    image:
                        "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=1000&q=85",
                    duration: "2–3 hours"
                },

                {
                    name: "Lake Pichola",
                    category: "LAKE EXPERIENCE",
                    description:
                        "A scenic lake known for its views of the surrounding palaces, ghats and hills. Boat trips may be available depending on operating conditions.",
                    image:
                        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
                    duration: "1–2 hours"
                },

                {
                    name: "Fateh Sagar Lake",
                    category: "SCENIC WATERFRONT",
                    description:
                        "A popular lake surrounded by hills and a waterfront promenade, enjoyed for its views and relaxed atmosphere.",
                    image:
                        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85",
                    duration: "1–2 hours"
                },

                {
                    name: "Sajjangarh Palace",
                    category: "HILLTOP PALACE",
                    description:
                        "Also called the Monsoon Palace, this hilltop landmark offers sweeping views of Udaipur and the surrounding countryside.",
                    image:
                        "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1000&q=85",
                    duration: "1–2 hours"
                }

            ]
        },


        // =====================================
        // JODHPUR
        // =====================================

        jodhpur: {
            name: "Jodhpur",
            nickname: "The Blue City",
            region: "JODHPUR · MARWAR REGION",
            experience: "Royal Heritage",

            tagline:
                "Walk through blue-painted lanes and discover the mighty forts and palaces of Marwar.",

            description:
                "Jodhpur is known for its historic hilltop fort, blue-painted old city and impressive royal architecture. Its monuments tell stories of the former Marwar kingdom.",

            image:
                "https://images.unsplash.com/photo-1624806992066-5ffcf7ca186b?auto=format&fit=crop&w=2000&q=90",

            tip:
                "Wear comfortable shoes when exploring the old city and fort. Summer afternoons can be very hot, so carry water.",

            attractions: [

                {
                    name: "Mehrangarh Fort",
                    category: "HISTORIC FORT",
                    description:
                        "A monumental fort overlooking Jodhpur, featuring high stone walls, historic courtyards and museum collections.",
                    image:
                        "https://images.unsplash.com/photo-1624806992066-5ffcf7ca186b?auto=format&fit=crop&w=1000&q=85",
                    duration: "2–3 hours"
                },

                {
                    name: "Umaid Bhawan Palace",
                    category: "ROYAL PALACE",
                    description:
                        "An imposing palace built in the twentieth century. Parts of the complex serve different purposes, so public access varies by section.",
                    image:
                        "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1000&q=85",
                    duration: "1–2 hours"
                },

                {
                    name: "Jaswant Thada",
                    category: "ROYAL MEMORIAL",
                    description:
                        "A beautifully detailed marble memorial surrounded by gardens and offering views toward Mehrangarh Fort.",
                    image:
                        "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1000&q=85",
                    duration: "45–90 minutes"
                },

                {
                    name: "Mandore Gardens",
                    category: "HISTORIC GARDENS",
                    description:
                        "A historic garden complex known for memorial structures, landscaped areas and architectural remains associated with the region's past.",
                    image:
                        "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1000&q=85",
                    duration: "1–2 hours"
                }

            ]
        },


        // =====================================
        // MOUNT ABU
        // =====================================

        "mount-abu": {
            name: "Mount Abu",
            nickname: "Rajasthan's Hill Station",
            region: "MOUNT ABU · ARAVALLI HILLS",
            experience: "Nature & Mountains",

            tagline:
                "Find peaceful lakes, intricate temples and panoramic views in the Aravalli hills.",

            description:
                "Mount Abu is Rajasthan's best-known hill station. Its cooler upland setting, religious architecture, lake and viewpoints offer a different side of the state.",

            image:
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=90",

            tip:
                "Mountain weather can change quickly. Check local conditions and temple visiting rules before travelling.",

            attractions: [

                {
                    name: "Nakki Lake",
                    category: "LAKE EXPERIENCE",
                    description:
                        "A popular lake surrounded by hills, walking areas and viewpoints, offering a relaxed place to spend time outdoors.",
                    image:
                        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85",
                    duration: "1–2 hours"
                },

                {
                    name: "Dilwara Temples",
                    category: "TEMPLE ARCHITECTURE",
                    description:
                        "A celebrated group of Jain temples renowned for their highly detailed marble carvings and intricate architectural craftsmanship.",
                    image:
                        "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1000&q=85",
                    duration: "1–2 hours"
                },

                {
                    name: "Guru Shikhar",
                    category: "MOUNTAIN VIEWPOINT",
                    description:
                        "The highest peak in the Aravalli Range, known for mountain scenery and views across the surrounding landscape.",
                    image:
                        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
                    duration: "1–2 hours"
                },

                {
                    name: "Sunset Point",
                    category: "SCENIC VIEWPOINT",
                    description:
                        "A popular viewpoint for watching the changing colours of the sky and hills near sunset.",
                    image:
                        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85",
                    duration: "45–90 minutes"
                }

            ]
        },


        // =====================================
        // PUSHKAR
        // =====================================

        pushkar: {
            name: "Pushkar",
            nickname: "The Sacred Town",
            region: "PUSHKAR · AJMER REGION",
            experience: "Culture & Spirituality",

            tagline:
                "Explore sacred temples, historic ghats and the cultural traditions of Pushkar.",

            description:
                "Pushkar is a historic pilgrimage town centred around a sacred lake. Its temples, ghats, colourful streets and nearby hills create a distinctive cultural atmosphere.",

            image:
                "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=2000&q=90",

            tip:
                "Dress respectfully at religious sites and follow local customs. Ask before photographing worshippers or ceremonies.",

            attractions: [

                {
                    name: "Brahma Temple",
                    category: "RELIGIOUS HERITAGE",
                    description:
                        "A famous Hindu temple dedicated to Lord Brahma and an important pilgrimage landmark in Pushkar.",
                    image:
                        "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=85",
                    duration: "45–90 minutes"
                },

                {
                    name: "Pushkar Lake",
                    category: "SACRED LAKE",
                    description:
                        "A sacred lake surrounded by bathing ghats and temples, central to the town's religious and cultural life.",
                    image:
                        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
                    duration: "1–2 hours"
                },

                {
                    name: "Savitri Temple",
                    category: "HILLTOP TEMPLE",
                    description:
                        "A hilltop temple overlooking Pushkar and the surrounding landscape. Access and transport options may vary.",
                    image:
                        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
                    duration: "1–2 hours"
                },

                {
                    name: "Pushkar Ghats",
                    category: "CULTURAL HERITAGE",
                    description:
                        "Historic steps around the sacred lake where visitors can observe the town's traditional religious practices and architecture.",
                    image:
                        "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=85",
                    duration: "45–90 minutes"
                }

            ]
        },


        // =====================================
        // CHITTORGARH
        // =====================================

        chittorgarh: {
            name: "Chittorgarh",
            nickname: "The Land of Legends",
            region: "CHITTORGARH · MEWAR REGION",
            experience: "Historic Heritage",

            tagline:
                "Discover the legendary fort, monumental towers and historic architecture of Mewar.",

            description:
                "Chittorgarh is renowned for its vast hilltop fort and its importance in the history of Mewar. Its towers, palaces and monuments reflect centuries of regional history.",

            image:
                "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=2000&q=90",

            tip:
                "The fort complex covers a large area. Plan your route in advance and allow sufficient time to travel between its monuments.",

            attractions: [

                {
                    name: "Chittorgarh Fort",
                    category: "HISTORIC FORT",
                    description:
                        "A vast hilltop fort complex containing historic gateways, temples, palaces and monuments connected with the history of Mewar.",
                    image:
                        "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1000&q=85",
                    duration: "3–4 hours"
                },

                {
                    name: "Vijay Stambh",
                    category: "VICTORY TOWER",
                    description:
                        "An elaborate victory tower within Chittorgarh Fort, celebrated for its sculptural details and historical significance.",
                    image:
                        "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1000&q=85",
                    duration: "30–60 minutes"
                },

                {
                    name: "Kirti Stambh",
                    category: "HISTORIC TOWER",
                    description:
                        "A historic tower associated with Jain heritage and known for its detailed stone carvings.",
                    image:
                        "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1000&q=85",
                    duration: "30–45 minutes"
                },

                {
                    name: "Rana Kumbha Palace",
                    category: "PALACE RUINS",
                    description:
                        "Historic palace remains inside Chittorgarh Fort associated with the royal history and architecture of Mewar.",
                    image:
                        "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1000&q=85",
                    duration: "45–60 minutes"
                }

            ]
        },


        // =====================================
        // RANTHAMBORE
        // =====================================

        ranthambore: {
            name: "Ranthambore",
            nickname: "The Wild Side of Rajasthan",
            region: "RANTHAMBORE · SAWAI MADHOPUR",
            experience: "Wildlife & Adventure",

            tagline:
                "Discover forest landscapes, historic ruins and the remarkable wildlife of Ranthambore.",

            description:
                "Ranthambore is widely known for its national park and tiger conservation landscape. Its forest habitats, lakes and historic fort make it a distinctive destination for nature and heritage enthusiasts.",

            image:
                "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=2000&q=90",

            tip:
                "Safaris must follow park rules and authorised routes. Wildlife sightings are never guaranteed, and entry depends on permits and availability.",

            attractions: [

                {
                    name: "Ranthambore National Park",
                    category: "WILDLIFE RESERVE",
                    description:
                        "A well-known protected area in Rajasthan, recognised for tiger conservation and a range of wildlife habitats.",
                    image:
                        "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=85",
                    duration: "According to safari booking"
                },

                {
                    name: "Ranthambore Fort",
                    category: "HISTORIC FORT",
                    description:
                        "A historic fort overlooking the surrounding landscape and located within the broader Ranthambore area.",
                    image:
                        "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1000&q=85",
                    duration: "2–3 hours"
                },

                {
                    name: "Padam Talao",
                    category: "WILDLIFE LAKE",
                    description:
                        "A prominent lake in the national park landscape, known for its scenic setting and role in the area's wildlife habitat.",
                    image:
                        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85",
                    duration: "During an authorised safari"
                },

                {
                    name: "Jogi Mahal Area",
                    category: "HERITAGE LANDMARK",
                    description:
                        "A historic landmark near Padam Talao. Access is subject to current park regulations and visitor restrictions.",
                    image:
                        "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1000&q=85",
                    duration: "Check local access rules"
                }

            ]
        }

    };


    // =====================================
    // READ CITY FROM URL
    // =====================================

    const params = new URLSearchParams(window.location.search);

    const requestedPlace = (
        params.get("place") || "jaipur"
    ).toLowerCase();

    const destination = destinations[requestedPlace];


    // =====================================
    // HANDLE UNKNOWN CITY
    // =====================================

    if (!destination) {

        document.title = "Destination Not Found | RAJPUTANA";

        const title = document.getElementById("placeTitle");
        const tagline = document.getElementById("placeTagline");
        const grid = document.getElementById("attractionGrid");
        const intro = document.getElementById("placeDescription");

        if (title) {
            title.innerHTML = 'Destination <em>Not Found</em>';
        }

        if (tagline) {
            tagline.textContent =
                "We couldn't find that destination.";
        }

        if (intro) {
            intro.textContent =
                "Please return to Explore Rajasthan and select one of the available destinations.";
        }

        if (grid) {
            grid.innerHTML = `
                <div class="place-attraction-card">
                    <div class="place-attraction-content">
                        <h3>Explore Rajasthan</h3>
                        <p>
                            Choose Jaipur, Jaisalmer, Udaipur,
                            Jodhpur, Mount Abu, Pushkar,
                            Chittorgarh or Ranthambore.
                        </p>
                        <a class="attraction-map-link"
                           href="explore.html">
                            View destinations ↗
                        </a>
                    </div>
                </div>
            `;
        }

        return;
    }


    // =====================================
    // UPDATE CITY INFORMATION
    // =====================================

    document.title =
        `${destination.name} — ${destination.nickname} | RAJPUTANA`;

    document.getElementById("placeRegion").textContent =
        destination.region;

    document.getElementById("placeTitle").innerHTML =
        `${destination.name}<br><em>${destination.nickname}</em>`;

    document.getElementById("placeTagline").textContent =
        destination.tagline;

    document.getElementById("placeHeroLabel").textContent =
        `${destination.name.toUpperCase()}, RAJASTHAN`;

    document.getElementById("placeHeroImage").style.backgroundImage =
        `url("${destination.image}")`;

    document.getElementById("breadcrumbCity").textContent =
        destination.name;

    document.getElementById("placeHeading").innerHTML =
        `Discover <em>${destination.name}.</em>`;

    document.getElementById("placeDescription").textContent =
        destination.description;

    document.getElementById("placeFactRegion").textContent =
        destination.region.split("·")[0].trim();

    document.getElementById("placeFactExperience").textContent =
        destination.experience;

    document.getElementById("placeFactCount").textContent =
        `${destination.attractions.length} Places`;

    document.getElementById("attractionsIntro").textContent =
        `Discover ${destination.attractions.length} featured attractions in ${destination.name}.`;

    document.getElementById("placeTravelTip").textContent =
        destination.tip;


    // =====================================
    // DISPLAY ATTRACTION CARDS
    // =====================================

    const attractionGrid = document.getElementById("attractionGrid");

    attractionGrid.innerHTML = destination.attractions
        .map((attraction, index) => {

            const number = String(index + 1).padStart(2, "0");

            const searchQuery = encodeURIComponent(
                `${attraction.name}, ${destination.name}, Rajasthan, India`
            );

            return `
                <article class="place-attraction-card">

                    <div class="place-attraction-image">

                        <img
                            src="${attraction.image}"
                            alt="${attraction.name} in ${destination.name}, Rajasthan"
                            loading="lazy">

                        <span class="attraction-number">
                            ${number}
                        </span>

                        <span class="attraction-category">
                            ${attraction.category}
                        </span>

                    </div>

                    <div class="place-attraction-content">

                        <h3>${attraction.name}</h3>

                        <p>${attraction.description}</p>

                        <div class="attraction-meta">

                            <span>
                                VISIT: ${attraction.duration}
                            </span>

                            <span>
                                ${destination.name.toUpperCase()}
                            </span>

                        </div>

                        <a
                            class="attraction-map-link"
                            href="https://www.google.com/maps/search/?api=1&query=${searchQuery}"
                            target="_blank"
                            rel="noopener noreferrer">

                            Find on Google Maps <span>↗</span>

                        </a>

                    </div>

                </article>
            `;

        })
        .join("");

});