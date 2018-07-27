/* exported startGame, submitGuess */
/* globals wordList */


var word; 

var correctLetters = 0;
var incorrectLetters = 0;

function startGame(){
    randomWordCreator();
    document.getElementById('game-area').style.visibility = 'visible';
}

function randomWordCreator(){
    var arrayLength = wordList.length;
    var randomIndex = Math.floor(Math.random() * arrayLength);
    word = wordList[randomIndex];

    console.log(word);

    return false;
}

function submitGuess() {
    console.log('submit guess working');
    console.log('game word', word);

    var wordArray = word.split('');
    var letterGuess = document.getElementById('guess').value.toLowerCase();

    for(var i = 0; i < word.length; i++){

        if(letterGuess === wordArray[i]){
            document.getElementById('letter-' + i).innerText = letterGuess;
            correctLetters ++;
        }
    }

    if(wordArray.indexOf(letterGuess) === -1) {
        document.getElementById('guess-' + incorrectLetters).innerText = letterGuess;

        var imageNumber = incorrectLetters + 4;
        document.getElementById('gallows').innerHTML = '<img src="https://www.oligalma.com/downloads/images/hangman/files/' + imageNumber + '.jpg">';
        
        incorrectLetters ++;
    }

    if(correctLetters === wordArray.length){
        document.getElementById('results').innerText = 'You won!';
    }
    
    if(incorrectLetters > 6){
        document.getElementById('results').innerText = 'You lost!';
    }


    return false;
}

function gallows(){
    
}