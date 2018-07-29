/* exported startGame, submitGuess */
/* globals wordList */



var gameState = {
    word: {
        asString: '',
        asCharArray: [],
    },
    guesses: {
        number: {
            incorrectGuesses: 0,
            correctGuesses: 0,
            totalGuesses: 0,
            remainingGuesses: 0,
        },
        letters: [],
    },
    game: {
        intial: true,
        midGame: false,
        victory: false,
        loss: false,
    }
};




var word; 

var correctLetters = 0;
var incorrectLetters = 0;
var wordArray;

var guessesLeft;
var lettersGuessed = [];

var submitButton = document.getElementById('submit-button');
var resetButton = document.getElementById('reset-button');


function startGame(action){
    switch(action){
        case 'start':
            randomWordCreator();
            document.getElementById('game-area').style.visibility = 'visible';
            triesLeft();
            startArea('hide');
            break;
        case 'reset':
            for(var i = 0; i <= incorrectLetters; i++) {
                document.getElementById('guess-' + i).innerText = '';
            }

            document.getElementById('gallows').innerHTML = '<img src="/assets/0.jpg">';
            document.getElementById('results').innerText = '';
    
            word = '';
            correctLetters = 0;
            incorrectLetters = 0;
            wordArray = [];
            lettersGuessed = [];
    
            buttonControl('enable');
            document.getElementById('game-area').style.visibility = 'hidden';
    
            startArea('show');
    
            console.log(`on reset: word is ${word}, correctLetters is ${correctLetters}, incorrectLetters is ${incorrectLetters}, wordArray is ${wordArray}, lettersGuessed is ${lettersGuessed}`);
            
            break;

        default:
            console.log('startGame must have an action argument');
    }
}

function startArea(action){
    switch(action){
        case 'hide':
            document.getElementById('start-area').style.visibility = 'hidden';
            break;
        case 'show':
            document.getElementById('start-area').style.visibility = 'visible';
            break;
        default:
            console.log('startArea must have an action argument');
    }
}
function buttonControl(action){
    switch(action) {
        case 'enable':
            submitButton.disabled = false;
            break;
        case 'disable':
            submitButton.disabled = true;
            resetButton.disabled = false;            
            break;
        default:
            console.log('buttonControl must have an action argument');
    }
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

    document.getElementById('guess').value = '';

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
        buttonControl('disable');
    }
    
    if(incorrectLetters > 6){
        document.getElementById('results').innerText = 'You lost!';
        document.getElementById('guesses-left').innerText = '';
        buttonControl('disable');
    }

}
