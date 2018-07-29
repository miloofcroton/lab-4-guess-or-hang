/* exported startGame, submitGuess, resetGame */
/* globals wordList */




var word; 

var correctLetters = 0;
var incorrectLetters = 0;
var wordArray;

var guessesLeft;
var lettersGuessed = [];

var submitButton = document.getElementById('submit-button');
var resetButton = document.getElementById('reset-button');


function startGame(){
    randomWordCreator();
    document.getElementById('game-area').style.visibility = 'visible';
    triesLeft();
    startAreaHidden();
}

function randomWordCreator(){
    var arrayLength = wordList.length;
    var randomIndex = Math.floor(Math.random() * arrayLength);
    word = wordList[randomIndex];
    wordArray = word.split('');
    wordSpaceCreator();
    console.log('The new word is:', word);   
}

function wordSpaceCreator() {
    var wordSpace = '';
    for(var i = 0; i < word.length; i++) {
        wordSpace += `<td id="letter-${i}" class="letter-space"></td> <td class="spacer"></td>`;
    }
    document.getElementById('word-space').innerHTML = wordSpace;
}

function submitGuess() {
    var letterGuess = document.getElementById('guess').value.toLowerCase();
    console.log('Their guess was: ', letterGuess);

    document.getElementById("guess").value = "";

    if(lettersGuessed.includes(letterGuess)) {
        alert('You have already guessed that letter. Please try again.');
    } 
    else {
        lettersGuessed.push(letterGuess);
        correctBox(letterGuess);
        incorrectBox(letterGuess);
        triesLeft();
        winLoss();
    }
    
    return false;
}

function correctBox(letterGuess) {
    for(var i = 0; i < word.length; i++){
        
        if(letterGuess === wordArray[i]){
            document.getElementById('letter-' + i).innerText = letterGuess;
            correctLetters ++;
        }
    }
}

function incorrectBox(letterGuess) {
    if(wordArray.indexOf(letterGuess) === -1) {
        document.getElementById('guess-' + incorrectLetters).innerText = letterGuess;
        gallows();
        incorrectLetters ++;
    }
}

function triesLeft() {
    guessesLeft = 7 - incorrectLetters;
    if(guessesLeft > 1) {
        document.getElementById('guesses-left').innerText = `If you make ${guessesLeft} more mistakes, the man hangs.`;
    }
    else {
        document.getElementById('guesses-left').innerText = `If you make ${guessesLeft} more mistake, the man hangs.`;
    }
}

function gallows() {
    var gallowImage = '<img src="/assets/' + (incorrectLetters + 1) + '.jpg">';
    document.getElementById('gallows').innerHTML = gallowImage;
}

function winLoss() {
    
    if(correctLetters === wordArray.length){

        document.getElementById('results').innerText = 'You won!';
        document.getElementById('guesses-left').innerText = '';
        submitButtonDisable();
    }
    
    if(incorrectLetters > 6){
        document.getElementById('results').innerText = 'You lost!';
        document.getElementById('guesses-left').innerText = '';
        submitButtonDisable();
    }

}

function startAreaHidden() {
    document.getElementById('start-area').style.visibility = 'hidden';
}

function startAreaVisible() {
    document.getElementById('start-area').style.visibility = 'visible';
}

function submitButtonEnable() {
    submitButton.disabled = false;
}

function submitButtonDisable() {
    submitButton.disabled = true;
    resetButton.disabled = false;
}



function resetGame() {

    console.log('reset working');

    for(var i = 0; i <= incorrectLetters; i++) {
        document.getElementById('guess-' + i).innerText = '';
    }

    document.getElementById('gallows').innerHTML = '<img src="https://www.oligalma.com/downloads/images/hangman/files/3.jpg">';

    document.getElementById('results').innerText = '';

    word = '';
    correctLetters = 0;
    incorrectLetters = 0;
    wordArray = [];
    lettersGuessed = [];

    submitButtonEnable();
    document.getElementById('game-area').style.visibility = 'hidden';

    startAreaVisible();
    
    console.log(`on reset: word is ${word}, correctLetters is ${correctLetters}, incorrectLetters is ${incorrectLetters}, wordArray is ${wordArray}, lettersGuessed is ${lettersGuessed}`);

    
}