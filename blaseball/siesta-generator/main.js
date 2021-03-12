function main() {
    var boxElement = document.getElementById("textArea");
    boxElement.value = "Enter your new bottom text here...";

    var bottomText = document.getElementById("bottomText");

    var textbox = document.getElementById('type');

    var siesta = document.getElementById('siesta');
    var peanut = document.getElementById('peanut');
    var monitor = document.getElementById('monitor');
    var boss = document.getElementById('boss');
    
    textbox.value = "siesta";


    textbox.onchange = function () {
        var textboxValue = document.getElementById('type').value;
        siesta.className = "main hidden"
        peanut.className = "content hidden";
        monitor.className = "content hidden";
        boss.className = "content hidden";

        switch(textboxValue) {
            case "siesta":
                siesta.className = "siesta visible"
                bottomText.className = "siesta";
                bottomText.innerText = "Siesta"
                break;
            case "peanut":
                peanut.className = "content visible";
                bottomText.className = "peanut";
                bottomText.innerText = "THE SHELLED ONE"
                break;
            case "monitor":
                monitor.className = "content invert visible";
                bottomText.className = "montior";
                bottomText.innerText = "The Hall Monitor"
                break;
            case "boss":
                boss.className = "content visible";
                bottomText.className = "boss";
                bottomText.innerText = "Boss"
                break;


        }
        bottomText.className = textboxValue;


    }
}

function swapText() {
    var h1 = document.getElementById("bottomText");
    var boxElement = document.getElementById("textArea");
    var newText = boxElement.value;
    h1.innerText = newText;
}