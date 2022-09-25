// Elements
const boardElement = document.getElementById("board");
const boardCells = [];

const notif = document.getElementById("notif");
const newGameButton = document.getElementById("new-game-btn");

// Game logic
let wordsGuessed = 0;
let currentGuess = "";
let answer = allAnswers[Math.floor(Math.random() * allAnswers.length)];
let gameOver = false;

// Create the 6 x 5 board
for (let i = 0; i < 6; i++) {
    const rowElement = document.createElement("tr");
    const rowArray = [];
    for (let j = 0; j < 5; j++) {
        const cell = document.createElement("td");
        rowElement.appendChild(cell);
        rowArray.push(cell);
    }   
    boardElement.appendChild(rowElement);
    boardCells.push(rowArray);
}

// Checks if a key pressed event is valid
function isValidKeyPressed(event) {
    if (event.repeat == true || event.ctrlKey == true) {
        return false;
    }
    if (event.key == "Backspace" || event.key == "Enter") { 
        return true;
    }
    if (event.key.length == 1 && event.key >= 'a' && event.key <= 'z') {
        return true;
    }
    if (event.key.length == 1 && event.key >= 'A' && event.key <= 'Z') {
        return true;
    }
    return false;
}

// Updates the board with typed letters
function updateGuess() {
    for (let i = 0; i < 5; i++) {
        if (i < currentGuess.length) {
            boardCells[wordsGuessed][i].innerText = currentGuess[i];
        }
        else {
            boardCells[wordsGuessed][i].innerText = " ";
        }
    }
}

// Changes colour of guess (green, yellow, grey)
function giveClues() {
    let colour = [];
    let remaining = answer;
    // Initially set all letters to grey
    for (let i = 0; i < 5; i++) {
        colour.push("grey");
    }
    // Add green if letter is correct
    for (let i = 4; i >= 0; i--) {
        if (currentGuess[i] == remaining[i]) {
            colour[i] = "green";
            // Remove letter from available letters
            remaining = remaining.substring(0, i) + remaining.substring(i + 1);
        }
    }
    // Add yellow if letter is wrong spot
    for (let i = 0; i < 5; i++) {
        let index = remaining.indexOf(currentGuess[i]);
        if (colour[i] == "green" || index == -1) {
            continue;
        }
        colour[i] = "yellow";
        remaining = remaining.substring(0, index) + remaining.substring(index + 1);
    }
    // Change CSS
    for (let i = 0; i < 5; i++) {
        boardCells[wordsGuessed][i].classList.add(colour[i]);
        allKeys[currentGuess[i]].classList.add(colour[i]);
    }
}

// Popup for invalid words and win/lose
function displayMessage(message, permanent) {
    notif.innerText = message;
    notif.style.opacity = 1;
    if (!permanent) {
        setTimeout(()=>{
            if (!gameOver) {
                notif.style.opacity = 0;
            }
        }, 2000);
    }
}

// Runs when a user enters a letterr
function addLetter(key) {
    if (gameOver) return;

    if (currentGuess.length < 5) {
        currentGuess += key.toUpperCase();
        updateGuess();
    }
}

// Runs when user hits backspace
function backspace() {
    if (gameOver) return;

    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    updateGuess();
}

// Runs when user hits enter
function enterWord() {
    if (gameOver) return;

    // Check if it's a valid word
    if (currentGuess.length < 5) {
        displayMessage("Not enough letters", false);
        return;
    }
    if (!validGuesses.has(currentGuess)) {
        displayMessage("Not in word list", false);
        return;
    }

    // Change colour of text
    giveClues();
    wordsGuessed++;

    // Guess is correct
    if (currentGuess == answer) {
        displayMessage("Well done!", true);
        gameOver = true;
    }
    // Out of guesses
    else if (wordsGuessed == 6) {
        displayMessage(answer, true);
        gameOver = true;
    }
    
    // Reset for next word
    currentGuess = "";
}

function keyPressed(event) {
    if (!isValidKeyPressed(event)) {
        return;
    }
    if (event.key == "Enter") {
        enterWord();
    } 
    else if (event.key == "Backspace") {
        backspace();
    }
    // Key is a letter
    else {
        addLetter(event.key);
    }
}

// Reset Game
function newGame() {
    // Update board
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            boardCells[i][j].innerText = " ";
            boardCells[i][j].classList.remove("grey", "yellow", "green");
        }   
    }

    // Update keyboard
    Object.values(allKeys).forEach((keyElement) => {
        keyElement.classList.remove("grey", "yellow", "green");
    });

    // Reset variables
    wordsGuessed = 0;
    currentGuess = "";
    answer = allAnswers[Math.floor(Math.random() * allAnswers.length)];
    gameOver = false;
    notif.style.opacity = 0;
    newGameButton.blur(); // Remove focus
}

document.addEventListener("keydown", keyPressed);
newGameButton.addEventListener("click", newGame);