// Elements
const timeElement = document.getElementById("time");

// Puts a zero in front of single digit numbers
function padNumber(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}

// Updates the time element to display current time
function updateTime() {
    let date = new Date();

    let hour = padNumber(date.getHours());
    let min = padNumber(date.getMinutes());
    let sec = padNumber(date.getSeconds());

    timeElement.innerText = `${hour}:${min}:${sec}`;
}

// Update the time every second
setInterval(updateTime, 1000);