/* exported gameState, guessHandler */
/* globals wordList */

var word; //gameState.word.asString
var wordArray; //gameState.word.asCharArray

var correctLetters = 0; //gameState.guesses.number.correctLetters
var incorrectLetters = 0; //gameState.guesses.number.incorrectLetters

var guessesLeft; //gameState.guesses.number.remainingGuesses
var lettersGuessed = []; //gameState.guesses.letters

var submitButton = document.getElementById('submit-button'); //gameState.elements.submitButton
var resetButton = document.getElementById('reset-button');



var gameState = {



    value: {
        word: {
            string: {
                state: '',
                create: function() {
                    var arrayLength = wordList.length;
                    var randomIndex = Math.floor(Math.random() * arrayLength);
                    gameState.value.word.asString = wordList[randomIndex];
                    gameState.value.word.asCharArray = gameState.value.word.asString.split('');
                    gameState.set.wordSpace();
                    console.log('The new word is:', word);
                }
            },
            array: {
                state: [],
            },
        },
        guesses: {
            number: {
                state: {
                    incorret: {
                        state: 3,
                    },
                    correct: {
                        state: 5,
                    },
                    total: {
                        state: correctLetters + incorrectLetters,
                    },
                    remaining: {
                        state: 7 - incorrectLetters,
                    },
                },
            },
            letter: {
                current: '',
                total: [],
            },
        },
        game: {
            result: {
                victory: false,
                loss: false,
            },
        },
        elements: {
            gallows: {
                image: '',
                html: document.getElementById('gallows').innerHTML,
            },
            results: {
                html: document.getElementById('results').innerText,
            },
            submitButton: {
                html: document.getElementById('submit-button'),
            },
            resetButton: {
                html: document.getElementById('reset-button'),
            },
            guessBox: {
                html: function(id) {
                    document.getElementById('guess-' + id).innerText = '';
                },
            },
            wordSpace: {
                html: document.getElementById('word-space').innerHTML,
                create: function() {
                    var wordSpace = '';
                    for (var i = 0; i < word.length; i++) {
                        wordSpace += `<td id="letter-${i}" class="letter-space"></td> <td class="spacer"></td>`;
                    };
                },
            }
        },
    },

    god: {
        start: function() {
            gameState.set.word();

            triesLeft();

            elementControl('startArea', 'hide');
            elementControl('gameArea', 'show');
        },
        restart: function() {
            gameState.reset.elements;
            gameState.reset.vars;

            elementControl('buttonControl', 'show');
            elementControl('gameArea', 'hide');
            elementControl('startArea', 'show');

            console.log(`on reset: word is ${word}, correctLetters is ${correctLetters}, incorrectLetters is ${incorrectLetters}, wordArray is ${wordArray}, lettersGuessed is ${lettersGuessed}`);
        },
    },

    reset: {
        vars: function() {
            word = '';
            wordArray = [];
            correctLetters = 0;
            incorrectLetters = 0;
            lettersGuessed = [];
        },
        elements: function() {
            document.getElementById('gallows').innerHTML = '<img src="/assets/0.jpg">';
            document.getElementById('results').innerText = '';
            for(var i = 0; i < 7; i++) {
                document.getElementById('guess-' + i).innerText = '';
            }
        },
        guess: function() {
            document.getElementById('guess').value = '';
        },
    },
    set: {

        guess: function(letterGuess) {
            gameState.get.guess();
            gameState.reset.guess();

            if(gameState.value.guesses.letters.includes(letterGuess)) {
                alert('You have already guessed that letter. Please try again.');
            }
            else {
                gameState.value.guesses.letters.push(letterGuess);
                correctBox(letterGuess);
                incorrectBox(letterGuess);
                triesLeft();
                winLoss();
            }
            return false;
        },
        correctBox: function(letterGuess) {
            for(var i = 0; i < word.length; i++) {

                if(letterGuess === wordArray[i]) {
                    document.getElementById('letter-' + i).innerText = letterGuess;
                    correctLetters++;
                }
            }
        },
        incorrectBox: function(letterGuess) {
            if(wordArray.indexOf(letterGuess) === -1) {
                document.getElementById('guess-' + incorrectLetters).innerText = letterGuess;
                gallows();
                incorrectLetters++;
            }
        },
        winLoss: function() {

            if(correctLetters === wordArray.length) {
                document.getElementById('results').innerText = 'You won!';
                document.getElementById('guesses-left').innerText = '';

                elementControl('buttonControl', 'hide');
            }

            if(incorrectLetters > 6) {
                document.getElementById('results').innerText = 'You lost!';
                document.getElementById('guesses-left').innerText = '';

                elementControl('buttonControl', 'hide');
            }
        },
        gallows: function() {
            var gallowImage = '<img src="/assets/' + (incorrectLetters + 1) + '.jpg">';
            document.getElementById('gallows').innerHTML = gallowImage;
        },
        triesLeft: function() {
            guessesLeft = 7 - incorrectLetters;
            if(guessesLeft > 1) {
                document.getElementById('guesses-left').innerText = `If you make ${guessesLeft} more mistakes, the man hangs.`;
            }
            else {
                document.getElementById('guesses-left').innerText = `If you make ${guessesLeft} more mistake, the man hangs.`;
            }
        },
    },
    get: {
        guess: function() {
            gameState.value.guesses.letter.current = document.getElementById('guess').value.toLowerCase();
            console.log('Their guess was: ', letterGuess);
        },
        all: console.log('I will log gameState.value'),
    },

};


function elementControl(element, action) {
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

function randomWordCreator() {

}

function wordSpaceCreator() {

}


function guessHandler() {

}

function correctBox(letterGuess) {

}

function incorrectBox(letterGuess) {

}

function triesLeft() {

}

function gallows() {

}

function winLoss() {


}
