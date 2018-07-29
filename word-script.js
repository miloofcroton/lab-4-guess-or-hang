/* eslint-disable */

// I went to http://www.simpsoncrazy.com/dictionary and ran this in the console.
// I figured we could add the capacity to display non-letter characters, but it was easier to remove them for now.
// Plus, Hangman users wouldn't expect to be guessing a word that has special characters or spaces. That's Jeopardy, not Hangman.

var wordElements;
var wordArray = [];
var wordString = "";

function initiate(){
    wordElements = document.getElementsByTagName('h3');
    var wordArray = [];
    var wordString = "";
}

function elementToArray(){
    for (var i = 0; i < wordElements.length; i++) {
        wordArray.push(wordElements[i].innerText);
    }
}

function onlyVocab(){
    var newArray = [];
    for (var i = 0; i < 9; i++) {
        wordArray.shift();
    }
}

function onlyLetters(){
    for (var i = 0; i < wordArray.length; i++) {
        var onlyLetters = new RegExp('[a-z, A-Z]');
        newArray.push(onlyLetters.exec(wordArray[i]))
    }
    wordArray = newArray;
}

function cleanArray(){
    onlyVocab();
    onlyLetters();
}

function arrayToString(){
    for (var i = 0; i < wordArray.length; i++) {
        wordString += `'${wordArray[i]}', `;
    }
}

function returnWords() {
    initiate();
    elementToArray();
    cleanArray();
    arrayToString();
    return wordString;
}

returnWords();


