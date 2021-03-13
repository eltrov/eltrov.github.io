// global stuff
// (scope/context is all new-ish to me)

// jQuery function to read/get from data
// https://www.sitepoint.com/jquery-read-text-file/
// https://api.jquery.com/jQuery.get/

var bingo = new Array;
$.get('bingo.txt', function (data) {
    // reads from file, splitting array entries on line breaks
    bingo = data.split('\n');
    //console.log(bingo);
});

function newName() {

    // table starts hidden, gets un-hidden when button is pressed
    var container = document.getElementById("container");
    container.style.display = "block";

    // variable-izing the table so we can add children later
    var table = document.getElementById("table");

    // change button text after clicking it once
    var button = document.getElementById("button");
    button.innerText = "Again!";

    for (i = 0; i < 24; i++) {

        var rng = Math.floor(Math.random() * Math.floor(bingo.length));

        (document.getElementById(i)).innerText = bingo[rng];

        bingo.splice(rng, 1);
    }
}