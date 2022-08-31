// Adds the header, top navbar, and side navbar to tutorial pages.
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

// Add the 'active' class to relevant html elements in the navbar.
function selectActiveLesson() {
	let pathName = window.location.pathname; // e.g., '/tutorials/html/lesson-1/'
	let href = pathName.substr(0, pathName.length - 1); // '/tutorials/html/lesson-1'

	let activeElems = document.querySelectorAll(`a[href='${href}']`);

	if (activeElems) {
		for (const elem of activeElems) {
			elem.classList.add('active');
		}
	} else {
		throw "Error: no .active elements";
	}
}
