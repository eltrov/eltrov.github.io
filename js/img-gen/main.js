function main() {
    var body = document.getElementsByTagName("BODY")[0];
   
    var br = document.createElement("br");
    br.className = "break";

    var palette = document.createElement("div");
    var pCount = 0;

    // 64 x 64
    //var count = 4096;

    // 128 x 128
    var count = 16384;

    // 256 x 256
    //var count = 65536;
    
    var headerCode = makeCode();
    var h1 = document.getElementsByTagName("H1")[0];
    h1.style = "color: " + headerCode + ";";

    for (i = 1; i < count + 1; i++) {
        var code = makeCode();
        var teamLogo = document.createElement("div");
        teamLogo.id = "div" + i;
        teamLogo.className = "team-logo";
        teamLogo.style = "background-color:" + code + ";";
        //teamLogo.innerText = i;
        (document.getElementById("palette" + pCount)).appendChild(teamLogo);

        if (i % Math.sqrt(count) == 0)
        {
            var oldDIR = document.getElementById("palette" + pCount);
            var newDIR = document.createElement("div");
            newDIR.id = 'palette' + (pCount + 1);
            newDIR.className = "palette";
            insertAfter(oldDIR, newDIR);
            pCount += 1;

            /*
            pCount += 1;
            palette.id = 'palette' + pCount;
            
            last.appendChild(palette);
            */
        }
    }
}

function makeCode() {
    var makeColorCode = '0123456789ABCDEF';
    var code = "";
    for (var count = 0; count < 2; count++) {
        code = code + makeColorCode[Math.floor(Math.random() * 16)];
        //code + makeColorCode[Math.floor(Math.random() * 16)];
    }
    code = "#" + code + code + code;
    return code;
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }