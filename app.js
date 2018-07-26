/* exported hangman, randomWord, submitGuess */
/* globals wordList */


var word; 

function randomWord(){
    var arrayLength = wordList.length;
    var random = Math.floor(Math.random() * arrayLength);
    word = wordList[random];

    console.log(word);

    return false;
}

function hangman() {
    console.log('I work');
   

    return false;
}

function submitGuess() {
    console.log('submit guess working');
    console.log('game word', word);

    var wordArray = word.split('');

    var letterGuess = document.getElementById('guess').value;

    for(var i = 0; i < word.length; i++){
        if(letterGuess === wordArray[i]){
            document.getElementById('letter-' + i).innerText(letterGuess);
        }
    }

    return false;
}

