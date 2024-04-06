function toggleVisibility(id) {
    // Toggle the 'visible' class for the selected sums
    const selectedSum = document.getElementById(id);
    selectedSum.classList.toggle('visible');

    // Toggle between toggleON and toggleOFF for the clicked digit
    const selectedDigit = document.querySelector(`.digit[data-id="${id}"]`);
    selectedDigit.classList.toggle('toggleON');
    selectedDigit.classList.toggle('toggleOFF');
}

function mark(element) {

    let currentClass = element.className;
    let classes = ["green", "red", "none"];
    let currentIndex = classes.indexOf(currentClass);

    if (currentIndex === -1) {
        // If the current class is not in the array, apply the first class
        element.className = classes[0];
    } else {
        // Cycle to the next class in the array
        var nextIndex = (currentIndex + 1) % classes.length;
        element.className = classes[nextIndex];
    }
}