const MAX_TRIES = 6;
const WORDS = ['javascript', 'programming', 'computer', 'algorithm', 'developer, algebra'];

let word = '';
let displayWord = [];
let guessedLetters = [];
let remainingTries = MAX_TRIES;

let playerName = prompt("Enter your name:");

word = WORDS[Math.floor(Math.random() * WORDS.length)];


for (let i = 0; i < word.length; i++) {
    displayWord[i] = '_';
}

function updateDisplay() {
    document.getElementById('word-display').textContent = displayWord.join(' ');
    document.getElementById('guesses-left').textContent = `Tries left: ${remainingTries}`;
    document.getElementById('guessed-letters').textContent = `Guessed letters: ${guessedLetters.join(', ')}`;
}

function makeGuess() {
    let letterInput = document.getElementById('letter-input');
    let letter = letterInput.value.toLowerCase();
    letterInput.value = '';
    
    if (letter.length !== 1 || !/[a-z]/.test(letter)) {
        document.getElementById('message').textContent = 'Please enter a single letter!';
        return;
    }
    
    if (guessedLetters.includes(letter)) {
        document.getElementById('message').textContent = 'You already guessed that letter!';
        return;
    }
    
    guessedLetters.push(letter);
    let foundLetter = false;
    
    while (word.includes(letter)) {
        let index = word.indexOf(letter);
        displayWord[index] = letter;
        word = word.substring(0, index) + '_' + word.substring(index + 1);
        foundLetter = true;
    }
    
    if (!foundLetter) {
        remainingTries--;
    }
    
    if (!displayWord.includes('_')) {
        document.getElementById('message').textContent = 
            `Congratulations ${playerName}! You won! The word was ${displayWord.join('')}`;
        disableGame();
    } else if (remainingTries === 0) {
        document.getElementById('message').textContent = 
            `Sorry ${playerName}, you lost! Better luck next time!`;
        disableGame();
    } else {
        document.getElementById('message').textContent = 
            foundLetter ? 'Good guess!' : 'Wrong guess!';
    }
    
    updateDisplay();
}

function disableGame() {
    document.getElementById('letter-input').disabled = true;
    document.getElementById('guess-button').disabled = true;
}

document.addEventListener('DOMContentLoaded', function() {
  
    document.getElementById('guess-button').addEventListener('click', makeGuess);
    
    document.getElementById('letter-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            makeGuess();
        }
    });
});


updateDisplay();