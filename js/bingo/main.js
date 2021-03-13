// jQuery function to read/get from data
// https://www.sitepoint.com/jquery-read-text-file/
// https://api.jquery.com/jQuery.get/

var bingoBackup = new Array;
$.get('bingo.txt', function (data) {
    // reads from file, splitting array entries on line breaks
    bingoBackup = data.split('\n');
    //console.log(bingo);
});

function newName() {
    // you must define the source type when trying to clone an array
    // var bingo = bingoBackup DOES NOT WORK
    var bingo = [...bingoBackup];

    // change button text after clicking it once
    var button = document.getElementById("button");
    button.innerText = "Again!";

    for (i = 0; i < 24; i++) {

        var rng = Math.floor(Math.random() * Math.floor(bingo.length));

        (document.getElementById(i)).innerText = bingo[rng];

        bingo.splice(rng, 1);
    }
}