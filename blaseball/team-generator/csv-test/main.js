function loadCSV() {
    // jQuery stuff goes here

    var firstNames = new Array;
    $.get('firstNames.csv', function(data){
            var array = data.split('\n');
            console.log(cardRules);
        });


}

function newName() {

    // un-hide the table
    var container = document.getElementById("container");
    container.style.display = "block";

    var table = document.getElementById("table");

    // change button text
    var button = document.getElementById("button");
    button.innerText = "Again!";

    // clear out box after each run

    var fullNameList = [];

    for (i = 0; i < 14; i++) {
        var rngFirst = Math.floor(Math.random() * Math.floor(firstNames.length));
        var rngLast = Math.floor(Math.random() * Math.floor(lastNames.length));
        var fullName = firstNames[rngFirst] + " " + lastNames[rngLast] + "\n";
        fullNameList.push(fullName);
        //console.log(fullNameList);
    }

    // populating Lineup
    for (i = 0; i < 9; i++) {
        table.rows[i + 1].children[0].children[0].innerText = fullNameList[i];
    }

    // populating Rotation
    for (i = 9; i < 14; i++) {
        table.rows[i + 2].children[0].children[0].innerText = fullNameList[i];
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
}