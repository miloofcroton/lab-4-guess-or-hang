/* exported startGame, submitGuess */
/* globals wordList */

var gameState = {
    word: {
        asString: '',
        asCharArray: [],
    },
    guesses: {
        number: {
            incorrectGuesses: 3,
            correctGuesses: 5,
            totalGuesses: correctLetters + incorrectLetters,
            remainingGuesses: 7 - incorrectLetters,
        },
        letters: [],
    },
    game: {
        intial: true,
        midGame: false,
        victory: false,
        loss: false,
    },
    elements: {
        gallowsImage: '',
        submitButton: document.getElementById('submit-button'),
        resetButton: document.getElementById('reset-button'),
    }

};




var word; //gameState.word.asString
var wordArray; //gameState.word.asCharArray

var correctLetters = 0; //gameState.guesses.number.correctLetters
var incorrectLetters = 0; //gameState.guesses.number.incorrectLetters

var guessesLeft; //gameState.guesses.number.remainingGuesses
var lettersGuessed = []; //gameState.guesses.letters

var submitButton = document.getElementById('submit-button'); //gameState.elements.submitButton
var resetButton = document.getElementById('reset-button'); 


var setGameState = {
    setVars: function() {
        word = '';
        wordArray = [];
        correctLetters = 0;
        incorrectLetters = 0;
        lettersGuessed = [];
    },
    setElements: function() {
        document.getElementById('gallows').innerHTML = '<img src="/assets/0.jpg">';
        document.getElementById('results').innerText = '';
        for(var i = 0; i < 7; i++) {
            document.getElementById('guess-' + i).innerText = '';
        }
    }
};



function startGame(action){
    switch(action){
        case 'start':
            randomWordCreator();
            triesLeft();

            elementControl('startArea', 'hide');
            elementControl('gameArea', 'show');
            
            break;
        case 'reset':
            setGameState.setElements;    
            setGameState.setVars;

            elementControl('buttonControl', 'show');
            elementControl('gameArea', 'hide');
            elementControl('startArea', 'show');

            console.log(`on reset: word is ${word}, correctLetters is ${correctLetters}, incorrectLetters is ${incorrectLetters}, wordArray is ${wordArray}, lettersGuessed is ${lettersGuessed}`);
            
            break;

        default:
            console.log('startGame must have an action argument');
    }
}

function elementControl(element, action){
    switch(element) {
        case 'startArea':
            switch(action) {
                case 'hide':
                    document.getElementById('start-area').style.visibility = 'hidden';
                    break;
                case 'show':
                    document.getElementById('start-area').style.visibility = 'visible';
                    break;
                default:
                    console.log('startArea must have an action argument');
            }

            break;

        case 'gameArea':
            switch(action) {
                case 'hide':
                    document.getElementById('game-area').style.visibility = 'hidden';
                    break;
                case 'show':
                    document.getElementById('game-area').style.visibility = 'visible';
                    break;
                default:
                    console.log('gameArea must have an action argument');
            }

            break;

        case 'buttonControl':
            switch(action) {
                case 'show':
                    submitButton.disabled = false;
                    break;
                case 'hide':
                    submitButton.disabled = true;
                    resetButton.disabled = false;
                    break;
                default:
                    console.log('buttonControl must have an action argument');
            }

            break;

        default:
            console.log('elementControl was called incorrectly');
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

        elementControl('buttonControl', 'hide');
    }
    
    if(incorrectLetters > 6){
        document.getElementById('results').innerText = 'You lost!';
        document.getElementById('guesses-left').innerText = '';

        elementControl('buttonControl', 'hide');
    }

}
