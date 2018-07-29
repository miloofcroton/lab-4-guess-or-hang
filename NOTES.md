
 <!-- markdownlint-disable -->

guess.push('a') // state: guesses = 'a'

for (letter in guess)
    if letter is in wordArray
        show letter
    else

-----------------------------------------


states:
word chosen as string
word chosen as array of characters
number of guesses (and by extension, the gallows body)
letters guessed as array of characters
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
