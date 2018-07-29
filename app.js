/* exported startGame, submitGuess */
/* globals wordList */


var word; 

var correctLetters = 0;
var incorrectLetters = 0;
var guessesLeft;

var wordArray;
var lettersGuessed = [];


function startGame(){
    randomWordCreator();
    document.getElementById('game-area').style.visibility = 'visible';
    triesLeft();
}

function randomWordCreator(){
    var arrayLength = wordList.length;
    var randomIndex = Math.floor(Math.random() * arrayLength);
    word = wordList[randomIndex];
    wordArray = word.split('');
    wordSpaceCreator();
    console.log(word);   
}

function wordSpaceCreator() {
    var wordSpace = '';
    for(var i = 0; i < word.length; i++) {
        wordSpace += `<td id="letter-${i}" class="letter-space"></td> <td class="spacer"></td>`;
    }
    document.getElementById('word-space').innerHTML = wordSpace;
}

function submitGuess() {
    console.log('submit guess working');
    console.log('game word', word);
    var letterGuess = document.getElementById('guess').value.toLowerCase();
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
    document.getElementById('guesses-left').innerText = `If you make ${guessesLeft} more mistakes, the man hangs.`;
}

function gallows() {
    var gallowImage = '<img src="/assets/' + (incorrectLetters + 1) + '.jpg">';
    document.getElementById('gallows').innerHTML = gallowImage;
}
function winLoss() {
    
    if(correctLetters === wordArray.length){
        document.getElementById('results').innerText = 'You won!';
    }
    
    if(incorrectLetters > 6){
        document.getElementById('results').innerText = 'You lost!';
    }
}