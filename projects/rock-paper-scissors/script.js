// Elements
const userScoreElement = document.getElementById("user-score");
const compScoreElement = document.getElementById("comp-score");

const userRock = document.getElementById("user-rock");
const userPaper = document.getElementById("user-paper");
const userScissors = document.getElementById("user-scissors");

const compRock = document.getElementById("comp-rock");
const compPaper = document.getElementById("comp-paper");
const compScissors = document.getElementById("comp-scissors");

const userArray = [userRock, userPaper, userScissors];
const compArray = [compRock, compPaper, compScissors];

// Game logic
let currentlyPlaying = false;
let userScore = 0;
let compScore = 0;

function enlargeItem(item) {
    if (!currentlyPlaying) {
        item.style.opacity = 1;
        item.style.transform = "scale(1.1)";
    }
}

function shrinkItem(item) {
    if (!currentlyPlaying) {
        item.style.opacity = 0.5;
        item.style.transform = "scale(1)";
    }
}

function resetItems() {
    currentlyPlaying = false;
    for (let i = 0; i < 3; i++) {
        shrinkItem(userArray[i]);
        shrinkItem(compArray[i]);
    }
}

// User clicks an item
function onClick(userChoice) {

    // Make sure user doesn't pick items during the animation
    if (currentlyPlaying) {
        return;
    }

    // Computer chooses a random item
    const compChoice = Math.floor(Math.random() * 3);

    // Hide the items that aren't played
    for (let i = 0; i < 3; i++) {
        if (i != userChoice) {
            userArray[i].style.opacity = 0;
        }
        if (i != compChoice) {
            compArray[i].style.opacity = 0;
        }
    }

    // Animate items
    enlargeItem(userArray[userChoice]);
    enlargeItem(compArray[compChoice]);
    currentlyPlaying = true;
    setTimeout(resetItems, 3000);

    /**
     * Update Score
     * [rock, paper, scissors] is numbered [0, 1, 2] respectively
     * Each item beats the item before it, and rock (the first item) beats scissors (the last item)
     * To see if x beats y, we can increment y and check if it equals to x
     * Modulo handles the rock-scissors case
     */ 
    if ((userChoice + 1) % 3 == compChoice) {
        compScore++;
        compScoreElement.innerText = compScore;
    }
    else if ((compChoice + 1) % 3 == userChoice){
        userScore++;
        userScoreElement.innerText = userScore;
    }
}

// Add mouse event listeners to the user's items
for (let i = 0; i < 3; i++) {
    userArray[i].addEventListener("mouseover", () => enlargeItem(userArray[i]));
    userArray[i].addEventListener("mouseout", () => shrinkItem(userArray[i]));
    userArray[i].addEventListener("click", () => onClick(i));
}