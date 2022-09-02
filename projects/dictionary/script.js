// Elements
const formElement = document.forms["search-form"];
const inputElement = document.forms["search-form"]["search-bar"];
const wordElement = document.getElementById("word");
const definitionElement = document.getElementById("definition");

// Runs when a word is entered in the search bar
formElement.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // remove leading and trailing whitespace, e.g. "    abc   " -> "abc"
    let word = inputElement.value.trim(); 
    inputElement.value = "";

    requestDefinition(word);
});

// Use AJAX to get the definition from an online dictionary
function requestDefinition(word) {
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    const xhttp = new XMLHttpRequest();
    
    // Code that runs when we receive the definition from api
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {

            // Word exists
            if (this.status == 200) {
                let definition = JSON.parse(this.responseText);
                updateDefinition(definition);

            // Word doesn't exist
            } else if (this.status == 404) {
                updateWordNotFound(word);
            }
        }
    }

    // Send request to dictionary api
    xhttp.open("GET", url, true);
    xhttp.send();
}

// Display definition of word
function updateDefinition(definition) {    
    // Set the title to the word
    wordElement.innerText = definition[0].word;
    definitionElement.innerHTML = '';

    // Used to number the different definitions
    let index = 1;

    // Loop through all definitions
    definition.forEach(function(allDefs) {
        allDefs.meanings.forEach(function(currentDef) {

            // Part of speech
            let partOfSpeech = document.createElement('h3');
            partOfSpeech.innerText = currentDef.partOfSpeech;
            definitionElement.append(partOfSpeech);

            // Definition List
            let definitionList = document.createElement('ol');
            definitionList.setAttribute('start', index);
            index += currentDef.definitions.length;

            // Add individual definitions to the list
            currentDef.definitions.forEach(function(singleDef) {
                let definitionText = document.createElement('li');
                definitionText.innerText = singleDef.definition;
                definitionList.append(definitionText);
            });

            definitionElement.append(definitionList);
        });
    });
}

// Display error message for words that don't exist
function updateWordNotFound(word) {
    wordElement.innerText = `No results found for "${word}"`;
    definitionElement.innerHTML = '';
}