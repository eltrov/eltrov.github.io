function main() {
    var boxElement  = document.getElementById("textArea");
    boxElement.value = "";
}

function swapText() {
    var h1 = document.getElementById("bottomText");
    var boxElement  = document.getElementById("textArea");
    var newText = boxElement.value;
    h1.innerText = newText;
}