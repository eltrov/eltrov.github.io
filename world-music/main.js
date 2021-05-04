function main() {
    var rng1 = Math.floor(Math.random() * Math.floor(langs.length));
    var rng2 = Math.floor(Math.random() * Math.floor(genres2.length));
    var output = langs[rng1] + " " + genres2[rng2];
    var linkLang = langs[rng1].replace(/\s/g, "+");
    var linkGenre = genres2[rng2].replace(/\s/g, "+");
    // replaces ampersand (&) with url encode 
    var linkGenre = genres2[rng2].replace(/&/g, "%26");
    console.log(linkLang);
    console.log(linkGenre);
    var h2 = document.getElementById("output");
    h2.innerHTML = `<a href='https://www.youtube.com/results?search_query=${linkLang}+${linkGenre}' target='_new'>${output}</a>`


}