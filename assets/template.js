// Adds the header, top bar, side bar, and active class to tutorial pages.
function useAll() {
    useTemplate(getLessonType());
    selectActiveLesson();
    setPrevNextButtons();
}

// Adds the header, top bar, and side bar to tutorial pages.
function useTemplate(type) {
    type = type.toLowerCase();

    let valid = new Array("html", "css", "js").includes(type);
    if (!valid) {
        throw `Error: invalid tutorial type (${type})`;
    }

    loadDoc(`/assets/${type}.xml`, function(xhttp) {
        const xmlDoc = xhttp.responseXML;

        let headElem = document.getElementsByTagName("head").item(0);
        let headData = xmlDoc.getElementsByTagName("head").item(0);
        if (headElem && headData) {
            headElem.innerHTML =  headData.innerHTML + headElem.innerHTML;
        }

        let topBarElem = document.getElementById("top-bar");
        let topBarData = xmlDoc.getElementById("top-bar");
        if (topBarElem && topBarData) {
            topBarElem.innerHTML = topBarData.innerHTML + topBarElem.innerHTML;
        }

        let sideBarElem = document.getElementById("side-bar");
        let sideBarData = xmlDoc.getElementById("side-bar");
        if (sideBarElem && sideBarData) {
            sideBarElem.innerHTML = sideBarData.innerHTML + sideBarElem.innerHTML;
        }
    });
}

// Add the 'active' class to relevant html elements in the navbar.
function selectActiveLesson() {
    let pathName = window.location.pathname; // e.g., '/tutorials/html/lesson-1/'
    let href = pathName.substring(0, pathName.length - 1); // '/tutorials/html/lesson-1'

    let activeElems = document.querySelectorAll(`.nav-link[href='${href}']`);

    if (activeElems) {
        for (const elem of activeElems) {
            elem.classList.add('active');
        }
    } else {
        throw "Error: no .active elements";
    }
}

// Sets the previous and next button links in the top bar.
function setPrevNextButtons() {
    // not including the "0th" lesson
    const numLessons = {
        html: 10,
        css: 12,
        js: 8
    };

    let lessonNum = getLessonNum();
    let lessonType = getLessonType();

    let leftButton = document.querySelector('.button.left');
    let rightButton = document.querySelector('.button.right');
    if (lessonNum === 0) {
        leftButton.classList.remove(`${lessonType}-tutorial`);
        rightButton.setAttribute("href", `/tutorials/${lessonType}/lesson-1`);

        switch (lessonType) {
            case "html":
                leftButton.innerHTML = "Home";
                leftButton.setAttribute("href", "/");
                break;
            case "css":
                leftButton.innerHTML = "HTML";
                leftButton.setAttribute("href", `/tutorials/html/lesson-${numLessons["html"]}`);
                leftButton.classList.add("html-tutorial");
                break;
            case "js":
                leftButton.innerHTML = "CSS";
                leftButton.setAttribute("href", `/tutorials/css/lesson-${numLessons["css"]}`);
                leftButton.classList.add("css-tutorial");
                break;
        }
    } else if (lessonNum === 1) {
        leftButton.setAttribute("href", `/tutorials/${lessonType}`);
        rightButton.setAttribute("href", `/tutorials/${lessonType}/lesson-${lessonNum + 1}`);
    } else if (lessonNum === numLessons[lessonType]) {
        leftButton.setAttribute("href", `/tutorials/${lessonType}/lesson-${lessonNum - 1}`);
        rightButton.classList.remove(`${lessonType}-tutorial`);

        switch (lessonType) {
            case "html":
                rightButton.innerHTML = "CSS";
                rightButton.setAttribute("href", "/tutorials/css");
                rightButton.classList.add("css-tutorial");
                break;
            case "css":
                rightButton.innerHTML = "JS";
                rightButton.setAttribute("href", "/tutorials/js");
                rightButton.classList.add("js-tutorial");
                break;
            case "js":
                rightButton.innerHTML = "Home";
                rightButton.setAttribute("href", "/");
                break;
        }
    } else {
        leftButton.setAttribute("href", `/tutorials/${lessonType}/lesson-${lessonNum - 1}`);
        rightButton.setAttribute("href", `/tutorials/${lessonType}/lesson-${lessonNum + 1}`);
    }
}

// Performs callback function on AJAX'd data.
function loadDoc(url, callback) {
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            callback(this);
        } else {
            throw `Error: there was a problem with the XML HTTP request to ${url}.`;
        }
    };

    xhttp.open("GET", url, false); // must be synchronous for selectActiveLesson()
    xhttp.send();
}

// Get the tutorial lesson type using the path name.
function getLessonType() {
    let pathName = window.location.pathname;
    let folders = pathName.split('/');

    if (folders.length === 4) {
        return folders[folders.length - 2];
    } else { // folders.length === 5
        return folders[folders.length - 3];
    }
}

// Get the tutorial lesson number using the path name.
function getLessonNum() {
    let pathName = window.location.pathname;
    let folders = pathName.split('/');
    
    if (folders.length === 4) {
        return 0;
    } else { // folders.length === 5
        let lessonName = folders[folders.length - 2];
        let lessonNum = parseInt(lessonName.substring(7));
        return lessonNum;
    }
}
