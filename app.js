/* exported hangman, randomWord, submitGuess */
/* globals wordList */


var word; 

var guesses = 0;
var correctLetters = 0;
var incorrectLetters = 0;




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
            document.getElementById('letter-' + i).innerText = letterGuess;
            correctLetters ++;
        }
        else if(wordArray.indexOf(letterGuess) === -1) {
            document.getElementById('guess-' + guesses).innerText = letterGuess;
            incorrectLetters ++;
        }
    }

    if(correctLetters === wordArray.length){
        document.getElementById('results').innerText = 'You won!';
    }

    if(incorrectLetters > 5){
        document.getElementById("results").innerText = "You lost!";
    }

    guesses++;

    return false;
}

