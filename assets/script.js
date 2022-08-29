// Typing Animation
const typingElement = document.getElementById("typing-animation");
const sentence = "Learn Web Development";
let letter = 0;
const animation = setInterval(()=> {
    typingElement.textContent += sentence[letter++];
    if (letter == sentence.length) {
        clearInterval(animation);
    }
}, 100);

/**
 * Fireflies animation
 * https://www.youtube.com/watch?v=OepMHOnhwn4&ab_channel=MinzCode
 */ 

const container = document.getElementsByTagName('header')[0];
let num = 30;
let w, h;

// reduce number of flies depending on screen size
function changeNum(val) {
    if (val.matches) {
        num = 15;
    }
}
let check = window.matchMedia("(max-width: 768px)");
changeNum(check);

function createUnit() {
    let unit = document.createElement("div");
    w = window.innerWidth;
    // h = document.body.scrollHeight-50; // Entire document height
    h = container.offsetHeight; // Only header height
    unit.classList.add("unit");
    container.appendChild(unit);

    gsap.set(unit, {
        x: gsap.utils.random(0, w),
        y: gsap.utils.random(0, h),
        scale: gsap.utils.random(0.5, 1.0),
        opacity: 0
    });

    // movement
    gsap.to(unit, {
        x: "+=" + gsap.utils.random(-w/2, w/2),
        y: "+=" + gsap.utils.random(-h/2, h/2),
        duration: gsap.utils.random(20, 23),
        ease: Linear.easeNone
    });

    // blinking opacity
    gsap.to(unit, {
        opacity: 1,
        repeat: 1,
        yoyo: true,
        duration: gsap.utils.random(2, 3),
        delay: gsap.utils.random(0, 2),
        ease: Power2.easeInOut,
        // Repeat
        onComplete: () => {
            unit.parentNode.removeChild(unit);
            createUnit();
        }
    });
}

for (let i = 0; i < num; i++) {
    createUnit();
}