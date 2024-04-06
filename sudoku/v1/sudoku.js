document.oncontextmenu = new Function("return false;");

var highlightingEnabled = true;

function toggleHighlight(element) {
    if (highlightingEnabled) {
        element.classList.toggle('highlight');
    }
}

function toggleLowlight(element) {
    if (highlightingEnabled) {
        element.classList.toggle('lowlight');
    }
}

function toggleHighlighting() {
    highlightingEnabled = !highlightingEnabled;
    var toggleButton = document.getElementById('toggleHighlightingButton');
    toggleButton.textContent = highlightingEnabled ? 'Disable Highlighting' : 'Enable Highlighting';

    // Toggle the 'no-highlight' class on the body
    document.body.classList.toggle('no-highlight');
}


function clearHighlight() {
    // Remove both 'highlight' and 'lowlight' classes from all elements with the class 'sum-item'
    var sumItems = document.getElementsByClassName('sum-item');
    for (var i = 0; i < sumItems.length; i++) {
        sumItems[i].classList.remove('highlight', 'lowlight');
    }
}

function setJustification(justification) {
    document.body.style.textAlign = justification;
}
