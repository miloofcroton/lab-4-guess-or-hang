/* exported startGame, submitGuess */
/* globals wordList */


var word; 

var correctLetters = 0;
var incorrectLetters = 0;

var wordArray;
var letterGuess;

function startGame(){
    randomWordCreator();
    document.getElementById('game-area').style.visibility = 'visible';
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
        wordSpace += `<td id="letter-${i}"></td>`;
    }
    document.getElementById('word-space').innerHTML = wordSpace;
}

function submitGuess() {
    console.log('submit guess working');
    console.log('game word', word);
    
    letterGuess = document.getElementById('guess').value.toLowerCase();
    
    correctBox();
    
    incorrectBox();
    
    winLoss();
    
    return false;
}




function correctBox() {
    for(var i = 0; i < word.length; i++){
        
        if(letterGuess === wordArray[i]){
            document.getElementById('letter-' + i).innerText = letterGuess;
            correctLetters ++;
        }
    }
}

function incorrectBox() {
    if(wordArray.indexOf(letterGuess) === -1) {
        document.getElementById('guess-' + incorrectLetters).innerText = letterGuess;
        gallows();
        incorrectLetters ++;
    }
}

function gallows() {
    var imageNumber = incorrectLetters + 4;
    document.getElementById('gallows').innerHTML = '<img src="https://www.oligalma.com/downloads/images/hangman/files/' + imageNumber + '.jpg">';
}
function winLoss() {
    
    if(correctLetters === wordArray.length){
        document.getElementById('results').innerText = 'You won!';
    }
    
    if(incorrectLetters > 6){
        document.getElementById('results').innerText = 'You lost!';
    }
}