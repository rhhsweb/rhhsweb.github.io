function getName() {
    // Get name from browser's local storage.
    let name = sessionStorage.getItem("name");

    if (name !== null) {
        return name;
    } 

    // Prompt user for name.
    name = window.prompt("What is your name?");

    // Use default name if name not given.
    if (name !== null && name !== "") {
        // Save name to browser's local storage.
        sessionStorage.setItem("name", name);

        return name;
    } else {
        // Use default name. Do not save to browser's local storage.
        return "Player";
    }
}

function setTitle(title) {
    // Find the first h1 element
    let h1 = document.querySelector("h1"); 

    h1.innerText = title;
    document.title = title;
}

// Get the count saved in the browser's local storage.
function getCountFromStorage() {
    let count = parseInt(sessionStorage.getItem("count"));

    // Handle if count not in local storage.
    if (isNaN(count)) {
        count = 0;
    }

    return count;
}

// Displays cookie count on page.
function displayCount(count) {
    let cookieCounter = document.getElementById("cookie-counter");
    let formattedCount = count.toLocaleString("en-us");

    if (count == 1) {
        cookieCounter.innerText = formattedCount + " Cookie";
    } 
    else {
        cookieCounter.innerText = formattedCount + " Cookies";
    }
}

let userName = getName();
setTitle(userName + "'s Bakery");

cookieCount = getCountFromStorage();
displayCount(cookieCount);

let presetMilestones = [50, 100, 200, 300, 400, 500, 750];

let cookie = document.getElementById("cookie");

// Cookie pressed animation.
cookie.addEventListener("mousedown", (e) => {
    cookie.style.scale = 0.99;
});

cookie.addEventListener("mouseup", (e) => {
    cookie.style.scale = null;

    // Increment cookie count.
    cookieCount++;

    displayCount(cookieCount);

    // Alert when reaching preset milestone or every 1000.
    if (presetMilestones.includes(cookieCount) || cookieCount % 1000 === 0) {
        alert("Congrats! You have " + cookieCount + " cookies!");
    }

    // Save cookie count.
    sessionStorage.setItem("count", cookieCount);
});

cookie.addEventListener("contextmenu", (e) => {
    // Remove right click popup.
    e.preventDefault();
});