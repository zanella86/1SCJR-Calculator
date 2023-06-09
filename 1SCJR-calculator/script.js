const display = document.querySelector("#display");
const keys = document.querySelectorAll("[id*=tecla]");
const operators = document.querySelectorAll("[id*=operador]");

let newNumber = true;
let operator;
let previousNumber;

function updateDisplay(numero) {
    if (newNumber) {
        display.textContent = numero;
        newNumber = false;
    } else {
        display.textContent += numero;
    }
}

const insertNumber = (number) => updateDisplay(number);

keys.forEach(function (key) {
    key.addEventListener("click", function (event) {
        insertNumber(event.target.textContent);
    })
});

const selectOperator = (event) => {
    previousNumber = getDisplay();
    operator = event.target.textContent;
    newNumber = true;
}

operators.forEach((key) => key.addEventListener("click", selectOperator));

const calculate = () => {
    const actualNumber = getDisplay();
    const result = eval(previousNumber + operator + actualNumber);
    newNumber = true;
    updateDisplay(result.toString().replace(".",","));
}

const equal = document.querySelector("#igual");

equal.addEventListener('click', calculate);

const decimalValue = () => { 
    if (display.textContent === ""){
        updateDisplay("0,");
    }

    if (!display.textContent.includes(",")) {
        updateDisplay(",");
    }
}

document.querySelector("#decimal").addEventListener("click", decimalValue);

const clearDisplay = () => display.textContent = "";

document.querySelector("#limparDisplay").addEventListener("click", clearDisplay);

const clearCalc = () => {
    newNumber = true;
    operator = undefined;
    previousNumber = undefined;
    clearDisplay();
};

document.querySelector("#limparCalculo").addEventListener("click", clearCalc);

const removeLastNumber = () => {
    newNumber = true;
    updateDisplay(display.textContent.slice(0, -1));
}

document.querySelector("#apagar").addEventListener("click", removeLastNumber);

const invertSignal = () => {
    newNumber = true;
    let invertValue = getDisplay();
    invertValue *= (-1);
    updateDisplay(invertValue.toString().replace(".",","));
}

document.querySelector("#inverter").addEventListener("click", invertSignal);

const getDisplay = () => display.textContent.replace(",",".");