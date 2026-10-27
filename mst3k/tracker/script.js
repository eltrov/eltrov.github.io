// List of MST3k episodes (replace with your episode titles)
const mst3kEpisodes = [
    "101: The Crawling Eye",
    "102: The Robot vs the Aztec Mummy",
    "103: The Mad Monster",
    "104: Women of the Prehistoric Planet",
    "105: The Corpse Vanishes",
    "106: The Crawling Hand",
    "107: Robot Monster",
    "108: The Slime People",
    "109: Project Moon Base",
    "110: Robot Holocaust",
    "111: Moon Zero Two",
    "112: Untamed Youth",
    "113: The Black Scorpion",
    "201: Rocketship X-M",
    "202: The Side Hackers",
    "203: Jungle Goddess",
    "204: Catalina Caper",
    "205: Rocket Attack U.S.A.",
    "206: Ring of Terror",
    "207: Wild Rebels",
    "208: Lost Continent",
    "209: The Hellcats",
    "210: King Dinosaur",
    "211: First Spaceship on Venus",
    "212: Godzilla vs. Megalon",
    "213: Godzilla vs. the Sea Monster",
    "301: Cave Dwellers",
    "302: Gamera",
    "303: Pod People",
    "304: Gamera vs Barugon",
    "305: Stranded in Space",
    "306: Time of the Apes",
    "307: Daddy-O",
    "308: Gamera vs Gaos",
    "309: The Amazing Colossal Man",
    "310: Fugitive Alien",
    "311: It Conquered the World",
    "312: Gamera vs Guiron",
    "313: Earth vs the Spider",
    "314: Mighty Jack",
    "315: Teenage Cave Man",
    "316: Gamera vs Zigra",
    "317: The Saga of the Viking Women and Their Voyage to the Waters of the Great Sea Serpent",
    "318: Star Force: Fugitive Alien II",
    "319: War of the Colossal Beast",
    "320: The Unearthly",
    "321: Santa Claus Conquers the Martians",
    "322: Master Ninja I",
    "323: The Castle of Fu Manchu",
    "324: Master Ninja II",
    "401: Space Travelers",
    "402: The Giant Gila Monster",
    "403: City Limits",
    "404: Teenagers from Outer Space",
    "405: Being from Another Planet",
    "406: Attack of the Giant Leeches",
    "407: The Killer Shrews",
    "408: Hercules Unchained",
    "409: Indestructible Man",
    "410: Hercules Against the Moon Men",
    "411: The Magic Sword",
    "412: Hercules and the Captive Women",
    "413: Manhunt in Space",
    "414: Tormented",
    "415: The Beatniks",
    "416: Fire Maidens of Outer Space",
    "417: Crash of Moons",
    "418: Attack of the Eye Creatures",
    "419: The Rebel Set",
    "420: The Human Duplicators",
    "421: Monster A-Go Go",
    "422: The Day the Earth Froze",
    "423: Bride of the Monster",
    "424: \"Manos\" The Hands of Fate",
    "501: Warrior of the Lost World",
    "502: Hercules",
    "503: Swamp Diamonds",
    "504: Secret Agent Super Dragon",
    "505: The Magic Voyage of Sinbad",
    "506: Eegah",
    "507: I Accuse My Parents",
    "508: Operation Double 007",
    "509: The Girl in Lovers Lane",
    "510: The Painted Hills",
    "511: Gunslinger",
    "512: Mitchell",
    "513: The Brain That Wouldn't Die",
    "514: Teen-Age Strangler",
    "515: The Wild Wild World of Batwoman",
    "516: Alien from L.A.",
    "517: Beginning of the End",
    "518: The Atomic Brain",
    "519: Outlaw Of Gor",
    "520: Radar Secret Service",
    "521: Santa Claus",
    "522: Teen-Age Crime Wave",
    "523: Village of the Giants",
    "524: 12 to the Moon",
    "601: Girls Town",
    "602: Invasion USA",
    "603: The Dead Talk Back",
    "604: Zombie Nightmare",
    "605: Colossus and the Headhunters",
    "606: The Creeping Terror",
    "607: Bloodlust!",
    "608: Code Name: Diamond Head",
    "609: The Skydivers",
    "610: The Violent Years",
    "611: Last of the Wild Horses",
    "612: The Starfighters",
    "613: The Sinister Urge",
    "614: San Francisco International",
    "615: Kitten with a Whip",
    "616: Racket Girls",
    "617: The Sword and the Dragon",
    "618: High School Big Shot",
    "619: Red Zone Cuba",
    "620: Danger!! Death Ray",
    "621: The Beast of Yucca Flats",
    "622: Angels Revenge",
    "623: The Amazing Transparent Man",
    "624: Samson vs. the Vampire Women",
    "701: Night of the Blood Beast",
    "702: The Brute Man",
    "703: Deathstalker and the Warriors from Hell",
    "704: The Incredible Melting Man",
    "705: Escape 2000",
    "706: Laserblast",
    "801: Revenge of the Creature",
    "802: The Leech Woman",
    "803: The Mole People",
    "804: The Deadly Mantis",
    "805: The Thing That Couldn't Die",
    "806: The Undead",
    "807: Terror from the Year 5000",
    "808: The She-Creature",
    "809: I Was a Teenage Werewolf",
    "810: The Giant Spider Invasion",
    "811: Parts: The Clonus Horror",
    "812: The Incredibly Strange Creatures Who Stopped Living and Became Mixed-Up Zombies!!?",
    "813: Jack Frost",
    "814: Riding with Death",
    "815: Agent for H.A.R.M.",
    "816: Prince of Space",
    "817: The Horror of Party Beach",
    "818: Devil Doll",
    "819: Invasion of the Neptune Men",
    "820: Space Mutiny",
    "821: Time Chasers",
    "822: Overdrawn at the Memory Bank",
    "901: The Projected Man",
    "902: The Phantom Planet",
    "903: The Pumaman",
    "904: Werewolf",
    "905: The Deadly Bees",
    "906: The Space Children",
    "907: Hobgoblins",
    "908: The Touch of Satan",
    "909: Gorgo",
    "910: The Final Sacrifice",
    "911: Devil Fish",
    "912: The Screaming Skull",
    "913: Quest of the Delta Knights",
    "1001: Soultaker",
    "1002: Girl in Gold Boots",
    "1003: Merlin's Shop of Mystical Wonders",
    "1004: Future War",
    "1005: Blood Waters of Dr. Z",
    "1006: Boggy Creek II: and the Legend Continues…",
    "1007: Track of the Moon Beast",
    "1008: Final Justice",
    "1009: Hamlet",
    "1010: It Lives by Night",
    "1011: Horrors of Spider Island",
    "1012: Squirm",
    "1013: Diabolik",
    "1101: Reptilicus",
    "1102: Cry Wilderness",
    "1103: The Time Travelers",
    "1104: Avalanche",
    "1105: The Beast of Hollow Mountain",
    "1106: Starcrash",
    "1107: The Land That Time Forgot",
    "1108: The Loves of Hercules",
    "1109: Yongary",
    "1110: Wizards of the Lost Kingdom",
    "1111: Wizards of the Lost Kingdom II",
    "1112: Carnival Magic",
    "1113: The Christmas That Almost Wasn't",
    "1114: At the Earths' Core",
    "1201: Mac and Me",
    "1202: Atlantic Rim",
    "1203: Lords of the Deep",
    "1204: The Day Time Ended",
    "1205: Killer Fish",
    "1206: Ator, the Fighting Eagle",
    "1301: Santo in the Treasure of Dracula",
    "1302: Robot Wars",
    "1303: Beyond Atlantis",
    "1304: Munchie",
    "1305: Doctor Mordrid",
    "1306: Demon Squad",
    "1307: Gamera vs. Jiger",
    "1308: The Batwoman",
    "1309: The Million Eyes of Sumuru",
    "1310: H. G. Wells' The Shape of Things to Come",
    "1311: The Mask",
    "1312: The Bubble",
    "1313: The Christmas Dragon",
    "1401: Sting of Death",
    "1402: Deathsport",
    "1403: Something Weird",
    "1404: Space Raiders"
    ];

// ---------- Seeded shuffle ----------
// The episode list must keep its order (append-only) or a given seed will
// produce a different shuffle.

const STORAGE_KEY = "mst3k-state";
const MAX_SEED = 4294967295;

// mulberry32: small seeded PRNG
function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
        a = (a + 0x6D2B79F5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// Fisher-Yates shuffle driven by the seed
function shuffledOrder(seed) {
    const rand = mulberry32(seed);
    const order = mst3kEpisodes.slice();
    for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
}

// ---------- State (seed + number watched) ----------

function randomSeed() {
    return Math.floor(Math.random() * 1000000) + 1;
}

function loadState() {
    try {
        const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (s && Number.isInteger(s.seed) && s.seed >= 1 && s.seed <= MAX_SEED &&
            Number.isInteger(s.watched) && s.watched >= 0 && s.watched <= mst3kEpisodes.length) {
            return s;
        }
    } catch (e) { /* ignore and start fresh */ }
    return { seed: randomSeed(), watched: 0 };
}

function saveState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* storage unavailable; state lasts until reload */ }
}

let state = loadState();
let order = shuffledOrder(state.seed);

function setGame(seed, watched) {
    state = { seed: seed, watched: watched };
    order = shuffledOrder(seed);
    saveState();
    render();
}

// ---------- Rendering ----------

function render() {
    const total = order.length;
    const done = state.watched;
    const pct = Math.round((done / total) * 100);
    const finished = done >= total;

    const titleEl = document.getElementById("episode-title");
    titleEl.textContent = finished ? "All episodes watched!" : order[done];
    // Shrink the text a bit for very long episode names
    titleEl.classList.toggle("long", titleEl.textContent.length > 60);
    document.getElementById("watched-btn").hidden = finished;
    document.getElementById("progress-fill").style.width = pct + "%";
    document.getElementById("progress-text").textContent = done + " / " + total + " (" + pct + "%)";
    document.getElementById("seed").textContent = state.seed;
    // document.getElementById("history-count").textContent = done;

    // Watch history, in the order the episodes were watched
    const list = document.getElementById("history-list");
    list.innerHTML = "";
    order.slice(0, done).forEach(function (ep, i) {
        const row = document.createElement("tr");
        const num = document.createElement("td");
        const name = document.createElement("td");
        num.textContent = (i + 1) + ".";
        name.textContent = ep;
        row.appendChild(num);
        row.appendChild(name);
        list.appendChild(row);
    });
}

// ---------- Events ----------

document.getElementById("watched-btn").addEventListener("click", function () {
    if (state.watched < order.length) {
        state.watched++;
        saveState();
        render();
    }
});

document.getElementById("reset-btn").addEventListener("click", function () {
    if (confirm("Start over with a new random seed? Your watch progress will be cleared.")) {
        setGame(randomSeed(), 0);
    }
});

// Secret hotkey: press ` (backtick) to enter a custom seed and watched count
function promptForGame() {
    const total = mst3kEpisodes.length;

    const seedInput = prompt("Enter a seed number:", state.seed);
    if (seedInput === null) return;
    const seed = Number(seedInput.trim());
    if (!Number.isInteger(seed) || seed < 1 || seed > MAX_SEED) {
        alert("Seed must be a whole number from 1 to " + MAX_SEED + ".");
        return;
    }

    const countInput = prompt("Episodes already watched (0 - " + total + "):",
        seed === state.seed ? state.watched : 0);
    if (countInput === null) return;
    const count = Number(countInput.trim());
    if (!Number.isInteger(count) || count < 0 || count > total) {
        alert("Watched count must be a whole number from 0 to " + total + ".");
        return;
    }

    setGame(seed, count);
}

document.addEventListener("keydown", function (e) {
    if (e.key === "`") {
        e.preventDefault();
        promptForGame();
    }
});

render();
