// Function to parse CSV data and populate the mst3kEpisodes array
function parseCSVData(data) {
    const episodes = [];
    const rows = data.split('\n');

    for (let i = 1; i < rows.length; i++) {
        const columns = rows[i].split(',');
        if (columns.length >= 2) {
            const episodeTitle = columns[0].trim();
            const episodeDescription = columns[1].trim();
            episodes.push(`${episodeTitle}: ${episodeDescription}`);
        }
    }

    return episodes;
}

// Function to load the CSV file in the background
function loadCSVFile() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "list.csv", true); // Replace with the path to your CSV file
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const episodes = parseCSVData(xhr.responseText);
            if (episodes.length > 0) {
                mst3kEpisodes = episodes;
                alert("Episodes loaded from CSV file.");
            } else {
                alert("No valid episode data found in the CSV file.");
            }
        }
    };
    xhr.send();
}

// Function to select a random episode from the list
function pickRandomEpisode() {
    const randomIndex = Math.floor(Math.random() * mst3kEpisodes.length);
    return mst3kEpisodes[randomIndex];
}

// Function to set the selected episode as the "Episode of the Day"
function setEpisodeOfTheDay() {
    const episodeTitleElement = document.getElementById("episode-title");
    const randomEpisode = pickRandomEpisode();
    episodeTitleElement.textContent = randomEpisode;
}

// Initialize the "Episode of the Day" on page load
loadCSVFile(); // Load CSV data
setEpisodeOfTheDay(); // Select and display a random episode

function testFunc() {
    const field = document.getElementById("episode-title");
    field.textContent = "POOP";
}
