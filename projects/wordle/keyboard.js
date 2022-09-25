const keyboardElement = document.getElementById("keyboard");
const letters = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ["ENTER", 'Z', 'X', 'C', 'V', 'B', 'N', 'M', "BACKSPACE"]
];
const allKeys = {};

for (let i = 0; i < 3; i++) {
    const rowElement = document.createElement("div");
    rowElement.classList.add("keyboard-row");

    for (let j = 0; j < letters[i].length; j++) {
        const keyElement = document.createElement("button");
        keyElement.innerText = letters[i][j];

        // Add click events
        if (letters[i][j] == "ENTER") {
            keyElement.addEventListener("click", enterWord);
        }
        else if (letters[i][j] == "BACKSPACE") {
            keyElement.addEventListener("click", backspace);
        }
        else {
            keyElement.addEventListener("click", () => addLetter(letters[i][j]));
        }

        allKeys[letters[i][j]] = keyElement;
        rowElement.appendChild(keyElement);
    }

    keyboardElement.appendChild(rowElement);
}