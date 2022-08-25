const typingElement = document.getElementById("typing-animation");
const sentence = "earn Web Development";
let i = 0;
const animation = setInterval(()=> {
    typingElement.textContent += sentence[i++];
    if (i == sentence.length) {
        clearInterval(animation);
    }
}, 100);