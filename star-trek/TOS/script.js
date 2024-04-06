// List of MST3k episodes (replace with your episode titles)
const episodeList = [
    "1x01 - The Man Trap",
    "1x02 - Charlie X",
    "1x03 - Where No Man Has Gone Before",
    "1x04 - The Naked Time",
    "1x05 - The Enemy Within",
    "1x06 - Mudd's Women",
    "1x07 - What Are Little Girls Made Of?",
    "1x08 - Miri",
    "1x09 - Dagger of the Mind",
    "1x10 - The Corbomite Maneuver",
    "1x11 - The Menagerie",
    "1x13 - The Conscience of the King",
    "1x14 - Balance of Terror",
    "1x15 - Shore Leave",
    "1x16 - The Galileo Seven",
    "1x17 - The Squire of Gothos",
    "1x18 - Arena",
    "1x19 - Tomorrow Is Yesterday",
    "1x20 - Court Martial",
    "1x21 - The Return of the Archons",
    "1x22 - Space Seed",
    "1x23 - A Taste of Armageddon",
    "1x24 - This Side of Paradise",
    "1x25 - The Devil in the Dark",
    "1x26 - Errand of Mercy",
    "1x27 - The Alternative Factor",
    "1x28 - The City on the Edge of Forever",
    "1x29 - Operation -- Annihilate!",
    "2x01 - Amok Time",
    "2x02 - Who Mourns for Adonais?",
    "2x03 - The Changeling",
    "2x04 - Mirror, Mirror",
    "2x05 - The Apple",
    "2x06 - The Doomsday Machine",
    "2x07 - Catspaw",
    "2x08 - I, Mudd",
    "2x09 - Metamorphosis",
    "2x10 - Journey to Babel",
    "2x11 - Friday's Child",
    "2x12 - The Deadly Years",
    "2x13 - Obsession",
    "2x14 - Wolf in the Fold",
    "2x15 - The Trouble with Tribbles",
    "2x16 - The Gamesters of Triskelion",
    "2x17 - A Piece of the Action",
    "2x18 - The Immunity Syndrome",
    "2x19 - A Private Little War",
    "2x20 - Return to Tomorrow",
    "2x21 - Patterns of Force",
    "2x22 - By Any Other Name",
    "2x23 - The Omega Glory",
    "2x24 - The Ultimate Computer",
    "2x25 - Bread and Circuses",
    "2x26 - Assignment: Earth",
    "3x01 - Spock's Brain",
    "3x02 - The Enterprise Incident",
    "3x03 - The Paradise Syndrome",
    "3x04 - And the Children Shall Lead",
    "3x05 - Is There in Truth No Beauty?",
    "3x06 - Spectre of the Gun",
    "3x07 - Day of the Dove",
    "3x08 - For the World Is Hollow and I Have Touched the Sky",
    "3x09 - The Tholian Web",
    "3x10 - Plato's Stepchildren",
    "3x11 - Wink of an Eye",
    "3x12 - The Empath",
    "3x13 - Elaan of Troyius",
    "3x14 - Whom Gods Destroy",
    "3x15 - Let That Be Your Last Battlefield",
    "3x16 - The Mark of Gideon",
    "3x17 - That Which Survives",
    "3x18 - The Lights of Zetar",
    "3x19 - Requiem for Methuselah",
    "3x20 - The Way to Eden",
    "3x21 - The Cloud Minders",
    "3x22 - The Savage Curtain",
    "3x23 - All Our Yesterdays",
    "3x24 - Turnabout Intruder",    
];

// Function to select a random episode from the list
function pickRandomEpisode() {
    const randomIndex = Math.floor(Math.random() * episodeList.length);
    return episodeList[randomIndex];
}

// Function to set the selected episode as the "Episode of the Day"
function setEpisodeOfTheDay() {
    const episodeTitleElement = document.getElementById("episode-title");
    const randomEpisode = pickRandomEpisode();
    episodeTitleElement.textContent = randomEpisode;
}

// Initialize the "Episode of the Day" on page load
setEpisodeOfTheDay(); // Select and display a random episode

function testFunc() {
    const field = document.getElementById("episode-title");
    field.textContent = "POOP";
}
