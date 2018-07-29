
 <!-- markdownlint-disable -->


guess.push('a') // state: guesses = 'a'

for (letter in guess)
    if letter is in wordArray
        show letter
    else

-----------------------------------------



words.js:

app.js:

word = '';

function loadWord(){
    word = words[getrandomIndex(words.length)];
}

function getRandomIndex(max) {
  max = Math.floor(max);
  return Math.floor(Math.random() * max);
}
