
file: words.js

wordList = [...]

file: app.js

function that selects random word from wordList

function that reveals correct letters
function that adds bodypart to gallows

array for all letters guessed

html:

button to start the game
show line blanks

letter guess form
letter guess button

list of all wrong letters the user has guessed

---------------------------------

guessTotal = 0

var word = 'dog'
var wordArray = ['d','o','g']
var guesses = []
guess.push('a') // state: guesses = 'a'

for (letter in guess)
    if letter is in wordArray
        show letter
    else

-----------------------------------------


states:
which word chosen
number of guesses (and by extension, the gallows body)
letters guessed
game status: { 
    initial: not started, 
    started: [mid-game, victory, loss]
}



words.js:

var words = [
    'dog',
    'cat',
    mouse',
]

app.js:

word = '';

function loadWord(){
    word = words[getrandomIndex(words.length)];
}

function getRandomIndex(max) {
  max = Math.floor(max);
  return Math.floor(Math.random() * max);
}

for letter in word:
    document.getElementById('word-display').innerHTML('<td id="letter-space">__</td> <td id="between-letter"></td' * i)



index.html:

<table>
    <tr id="word-display">
    
    </tr>
</table>

<table>
    <tr class="guess-display">
        <td class="guess-space" id="guess-1"></td>
        <td class="between-guess"></td>
        <td class="guess-space" id="guess-2"></td>
    </tr>
    <tr class="guess-display">
        <td class="guess-space" id="guess-3"></td>
        <td class="between-guess"></td>
        <td class="guess-space" id="guess-4"></td>    
    </tr>
    <tr class="guess-display">
        <td class="guess-space" id="guess-5"></td>
        <td class="between-guess"></td>
        <td class="guess-space" id="guess-6"></td>    
    </tr>
</table>


main.css:

.letter-space {
    width: ;
}
.between-letter {
    width: ;
}
.guess-space {
    width: ;
}
.between-guess {
    width: ;
}


