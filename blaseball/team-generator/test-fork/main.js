// run on body load
function main() {

    // global stuff
    // (scope/context is all new-ish to me)

    // jQuery function to read/get from data
    // https://www.sitepoint.com/jquery-read-text-file/
    // https://api.jquery.com/jQuery.get/

    var firstNames = new Array;
    $.get('firstNames.txt', function (data) {
        // reads from file, splitting array entries on line breaks
        firstNames = data.split('\n');
        //console.log(firstNames);
    });

    var lastNames = new Array;
    $.get('lastNames.txt', function (data) {
        // reads from file, splitting array entries on line breaks
        lastNames = data.split('\n');
        //console.log(lastNames);
    });

    // table starts hidden, gets un-hidden when button is pressed
    var container = document.getElementById("container");

    // variable-izing the table so we can add children later
    var table = document.getElementById("table");

    // change button text after clicking it once
    var button = document.getElementById("button");

    newName(firstNames, lastNames);

}

// run on button click
function newName(firstNames, lastNames) {

    container.style.display = "block";

    if (button.innerHTML == "Again!") {
        // do(nothing);
    } else {
        button.innerText = "Again!";
    }

    // clear out the array after each run
    var fullNameList = [];

    for (i = 0; i < 14; i++) {
        var rngFirst = Math.floor(Math.random() * Math.floor(firstNames.length));
        var rngLast = Math.floor(Math.random() * Math.floor(lastNames.length));
        var fullName = firstNames[rngFirst] + " " + lastNames[rngLast] + "\n";
        fullNameList.push(fullName);
        //console.log(fullNameList);
    }

    var rngCity = Math.floor(Math.random() * Math.floor(teamCity.length));
    var rngTeam = Math.floor(Math.random() * Math.floor(teamName.length));
    var rngColor = Math.floor(Math.random() * Math.floor(colors.length));
    //var rngEmoji = Math.floor(Math.random() * Math.floor(emoji.length));

    var teamLogo = document.getElementById("team-logo");
    teamLogo.style = "background-color: #" + colors[rngColor];
    //teamLogo.innerText = emoji[rngEmoji];
    // pairing team emoji with names instead of doing it randomly
    teamLogo.innerText = emoji[rngTeam];


    var fullTeamName = teamCity[rngCity] + " " + teamName[rngTeam];

    var teamNameHeader = document.getElementById("team-name");
    teamNameHeader.innerText = fullTeamName;

    return null;
}