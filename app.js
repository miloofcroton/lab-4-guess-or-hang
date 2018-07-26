/* exported hangman */
/* globals wordList */


function hangman() {
    console.log('I work');


    function randomWord(){
        var arrayLength = wordList.length;
        var random = Math.floor(Math.random() * arrayLength);
        var word = wordList[random];
        console.log(random, word);

    }

    var gameWord = randomWord();


    return false;
}