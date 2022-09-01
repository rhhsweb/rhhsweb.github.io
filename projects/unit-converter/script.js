/**
 * All units are relative to a meter
 * https://en.wikipedia.org/wiki/Unit_of_length
 */ 
const units = {
    // metric
    Micrometer: 0.000001,
    Millimeter: 0.001,
    Centimeter: 0.01,
    Meter: 1,
    Kilometer: 1000,
    // imperial
    Inch: 0.0254,
    Foot: 0.3048,
    Yard: 0.9144,
    Mile: 1609.344,
}

// how many decimal places to round our numbers to
const precision = 10000000000;

// Elements
const inputText = document.forms["input"]["input-text"];
const outputText = document.forms["output"]["output-text"];
const inputSelect = document.forms["input"]["input-units"];
const outputSelect = document.forms["output"]["output-units"];

// add all units as options to the input and output select elements
Object.entries(units).forEach(([currentUnit, value]) => {
    let inputOption = document.createElement("option");
    inputOption.value = currentUnit;
    inputOption.innerText = currentUnit;
    inputSelect.append(inputOption);
    
    let outputOption = document.createElement("option");
    outputOption.value = currentUnit;
    outputOption.innerText = currentUnit;
    outputSelect.append(outputOption);
});


// Function to convert the output text to the input value
function updateOutput() {
    let value = Number(inputText.value);

    // Empty output if the input is not a number
    if (isNaN(value) || (inputText.value.length == 0)) {
        outputText.value = "";
        return;
    }

    let inputUnit = inputSelect.value;
    let outputUnit = outputSelect.value;

    // use math to convert 
    let inputRatio = units[inputUnit];
    let outputRatio = units[outputUnit];
    let outputValue = (value * inputRatio) / outputRatio;

    // round output value to handle precision, e.g. 1.000000001 rounds to 1
    outputValue = Math.round(outputValue * precision) / precision;

    // change output text
    outputText.value = outputValue; 
}

// Function to convert the input text to the output value
function updateInput() {
    let value = Number(outputText.value);

    // Empty input if the output is not a number
    if (isNaN(value) || (outputText.value.length == 0)) {
        inputText.value = "";
        return;
    }

    let inputUnit = inputSelect.value;
    let outputUnit = outputSelect.value;

    // use math to convert 
    let inputRatio = units[inputUnit];
    let outputRatio = units[outputUnit];
    let inputValue = (value * outputRatio) / inputRatio;

    // round input value to handle precision, e.g. 1.000000001 becomes 1
    inputValue = Math.round(inputValue * precision) / precision;

    // change input text
    inputText.value = inputValue;
}

// user changes text
inputText.addEventListener("input", updateOutput);
outputText.addEventListener("input", updateInput);

// user changes selected unit
inputSelect.addEventListener("change", updateOutput);
outputSelect.addEventListener("change", updateOutput);

// set initial units
inputSelect.selectedIndex = 3; // Meter
outputSelect.selectedIndex = 2; // Centimeter

// set initial value
inputText.value = 1;
updateOutput();