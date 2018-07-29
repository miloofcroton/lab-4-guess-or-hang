/* eslint-disable */

// I went to http://www.simpsoncrazy.com/dictionary and ran this in the console

wordElements = document.getElementsByTagName('h3');
var wordArray = [];
var wordString = "";

function elementToArray(){
    for (var i = 0; i < wordElements.length; i++) {
        wordArray.push(wordElements[i].innerText);
    }
}

function cleanArray(){
    for (var i = 0; i < 9; i++) {
        wordArray.shift();
    }

}

function arrayToString(){
    for (var i = 0; i < wordArray.length; i++) {
        wordString += `'${wordArray[i]}', `;
    }
}

function returnWords() {
    elementToArray();
    cleanArray();
    arrayToString();
    return wordString;
}

returnWords();


