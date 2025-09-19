let previousDisplayed = null, previousSelected = null;

const DisplayCal = (imgID, calcID) => {
    document.getElementById(imgID).addEventListener('click', () => {
        document.getElementById('LogoIMG').style.display = 'none';

        if (previousSelected) previousSelected.style.backgroundColor = 'white';
        previousSelected = document.getElementById(imgID);
        previousSelected.style.backgroundColor = 'yellow';

        if (previousDisplayed) previousDisplayed.style.display = "none";
        previousDisplayed = document.getElementById(calcID);
        previousDisplayed.style.display = "flex";
    });
};

['temperature', 'length', 'num', 'currency', 'home', 'time', 'network'].forEach(id =>
    DisplayCal(id, id + 'box')
);

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key)) appendToDisplay(key);
    else if (['+', '-', '*', '/'].includes(key)) appendToDisplay(key);
    else if (key === 'Enter') calculateResult();
    else if (key === 'Backspace') clearLastCharacter();
    else if (key.toLowerCase() === 'c') clearDisplay();
});


function clearLastCharacter() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1); // Remove the last character
}


let userId;
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    userId = params.get('userId');
    if (userId) {
        sessionStorage.setItem('user', userId);
    }
};

function Back() {

    if (userId != null) {
        location.href = `LoggedIN.html?userId=${userId}`
    } else {
        location.href = 'index.html';
    }
}


function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}


function convertLength() {
    const lengthInput = parseFloat(document.getElementById("lengthInput").value);
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;

    if (isNaN(lengthInput)) {
        document.getElementById("lengthResult").innerText = "Converted Length: 0";
        return;
    }

    const conversionRates = {
        meters: { meters: 1, kilometers: 0.001, inches: 39.3701, feet: 3.28084 },
        kilometers: { meters: 1000, kilometers: 1, inches: 39370.1, feet: 3280.84 },
        inches: { meters: 0.0254, kilometers: 0.0000254, inches: 1, feet: 0.0833333 },
        feet: { meters: 0.3048, kilometers: 0.0003048, inches: 12, feet: 1 }
    };

    const convertedValue = lengthInput * conversionRates[fromUnit][toUnit];
    document.getElementById("lengthResult").innerText = `Converted Length: ${convertedValue.toFixed(2)}`;
}




function convertTemperature() {
    const tempInput = parseFloat(document.getElementById('tempInput').value);
    const fromUnit = document.getElementById('fromTempUnit').value;
    const toUnit = document.getElementById('toTempUnit').value;
    let result;

    if (isNaN(tempInput)) {
        document.getElementById('tempResult').textContent = 'Converted Temperature: Invalid input';
        return;
    }

    // Convert from the initial unit to Celsius
    let tempInCelsius;
    if (fromUnit === 'celsius') {
        tempInCelsius = tempInput;
    } else if (fromUnit === 'fahrenheit') {
        tempInCelsius = (tempInput - 32) * (5 / 9);
    } else if (fromUnit === 'kelvin') {
        tempInCelsius = tempInput - 273.15;
    }

    // Convert from Celsius to the target unit
    if (toUnit === 'celsius') {
        result = tempInCelsius;
    } else if (toUnit === 'fahrenheit') {
        result = (tempInCelsius * (9 / 5)) + 32;
    } else if (toUnit === 'kelvin') {
        result = tempInCelsius + 273.15;
    }

    // Display the result
    document.getElementById('tempResult').textContent = `Converted Temperature: ${result.toFixed(2)}`;
}




function convertTime() {
    const timeInput = parseFloat(document.getElementById('timeInput').value);
    const fromUnit = document.getElementById('fromTimeUnit').value;
    const toUnit = document.getElementById('toTimeUnit').value;
    let result;

    if (isNaN(timeInput)) {
        document.getElementById('timeResult').textContent = 'Converted Time: Invalid input';
        return;
    }

    // Convert from the initial unit to seconds as the base unit
    let timeInSeconds;
    switch (fromUnit) {
        case 'seconds':
            timeInSeconds = timeInput;
            break;
        case 'minutes':
            timeInSeconds = timeInput * 60;
            break;
        case 'hours':
            timeInSeconds = timeInput * 3600;
            break;
        case 'days':
            timeInSeconds = timeInput * 86400;
            break;
    }

    // Convert from seconds to the target unit
    switch (toUnit) {
        case 'seconds':
            result = timeInSeconds;
            break;
        case 'minutes':
            result = timeInSeconds / 60;
            break;
        case 'hours':
            result = timeInSeconds / 3600;
            break;
        case 'days':
            result = timeInSeconds / 86400;
            break;
    }

    // Display the result
    document.getElementById('timeResult').textContent = `Converted Time: ${result.toFixed(2)}`;
}
