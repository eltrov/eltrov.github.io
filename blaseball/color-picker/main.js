function main() {
    var br = document.createElement("br");
    br.className = "break";

    var count = 9780;


    for (i = 0; i < count; i++) {
        var code = makeCode();
        var teamLogo = document.createElement("div");
        teamLogo.className = "team-logo";
        teamLogo.style = "background-color:" + code + ";";
        teamLogo.innerText = "🦄";
        (document.getElementById("palette")).appendChild(teamLogo)
    }
}

function makeCode() {
    var makeColorCode = '0123456789ABCDEF';
    var code = '#';
    for (var count = 0; count < 6; count++) {
        code = code + makeColorCode[Math.floor(Math.random() * 16)];
    }
    return code;
}