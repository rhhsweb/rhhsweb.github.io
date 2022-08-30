/*
 * This is a questionable way to make templates for the tutorial pages.
 */

const defaultTemplate = {
	head: `    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- stylesheets -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    <link rel="stylesheet" href="/assets/navigation.css">
	<link rel="stylesheet" href="/assets/tutorials.css">

    <!-- icon -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-tilecolor" content="#da532c">
    <meta name="theme-color" content="#ffffff">`,
	topBar: `    <nav class="navbar fixed-top" id="top-navbar">
        <div class="container px-5">
            <a href="/">
                <img src="/assets/site-logo.png">
            </a>
            <h4>RHHS Web Development</h4>
        </div>
    </nav>`,
	sideBar: ``
};

const htmlTemplate = {
	head: defaultTemplate.head,
	topBar: defaultTemplate.topBar, 
	sideBar: `<nav id="side-navbar">
			<a href="/tutorials/html">HTML</a></li>
			<div>
				<header>HTML Basics</header>
				<ul>
					<li><a href="/tutorials/html/lesson-1">Doctype</a></li>
					<li><a href="/tutorials/html/lesson-2">Elements</a></li>
					<li><a href="/tutorials/html/lesson-3">Text Formatting</a></li>
					<li><a href="/tutorials/html/lesson-4">Lists</a></li>
					<li><a href="/tutorials/html/lesson-5">Attributes</a></li>
					<li><a href="/tutorials/html/lesson-6">Commments</a></li>
				</ul>
			</div>
			<div>
				<header>HTML Advanced</header>
				<ul>
					<li><a href="/tutorials/html/lesson-7">Content Division</a></li>
					<li><a href="/tutorials/html/lesson-8">Tables</a></li>
					<li><a href="/tutorials/html/lesson-9">Forms</a></li>
					<li><a href="/tutorials/html/lesson-10">Head Element</a></li>
				</ul>
			</div>
		</nav>`
};

const cssTemplate = {
	head: defaultTemplate.head,
	topBar: defaultTemplate.topBar,
	sideBar: ``
};

const jsTemplate = {
	head: defaultTemplate.head,
	topBar: defaultTemplate.topBar,
	sideBar: ``
};

// Adds the header, top navbar, and side navbar to tutorial pages.
function useTemplate(type) {
	let template;

	type = type.toUpperCase();
	if (type === "HTML") {
		template = htmlTemplate;
	} else if (type === "CSS") {
		template = cssTemplate;
	} else if (type === "JS") {
		template = jsTemplate;
	} else {
		console.log(`Error: unrecognized template type: ($type)`);
		return;
	}

	let headElem = document.getElementsByTagName("head").item(0);
	if (headElem) {
		headElem.innerHTML = template.head + headElem.innerHTML;
	}
	
	let topBarElem = document.getElementById("top-bar");
	if (topBarElem) {
		topBarElem.innerHTML = template.topBar + topBarElem.innerHTML;
	}

	let sideBarElem = document.getElementById("side-bar");
	if (sideBarElem) {
		sideBarElem.innerHTML = template.sideBar + sideBarElem.innerHTML;
	}
}

// Add the 'active' class to relevant html elements in the navbar.
function selectActiveLesson() {
	let pathName = window.location.pathname; // e.g., '/tutorials/html/lesson-1/'
	let href = pathName.substr(0, pathName.length - 1); // '/tutorials/html/lesson-1'

	let activeElems = document.querySelectorAll(`[href='${href}']`);

	if (activeElems) {
		for (const elem of activeElems) {
			elem.classList.add('active');
		}
	} else {
		console.log("something is up");
	}
}
