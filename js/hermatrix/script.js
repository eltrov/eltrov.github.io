const alphabet = 'abcdefghijklmnopqrstuvwxyz'

var title = document.title;

titleArray = title.split('');

var h1 = document.getElementById("content");

h1.textContent = title;

function updateTitle() {

    // rng 0 - array length
	do {
    var char = Math.floor(Math.random() * titleArray.length);
	}
	while (char == charLast);

    var charValue = alphabet.indexOf(titleArray[char]);

    var upDown = Math.floor(Math.random() * 2);

    if (upDown == 0) {
        charValue -= 1;
        if (charValue <= 0) {
            charValue = 25;
        }
    } else if (upDown == 1) {
        charValue += 1;
        if (charValue > 25) {
            charValue = 0;
        }
    }
	
	var charLast = char;
	console.log(charLast);

    titleArray[char] = alphabet[charValue];

    // update title
    document.title = titleArray.join("");

    //update h1
    h1.textContent = titleArray.join("");
}

// runs function every 100 MS
setInterval(updateTitle, 100);