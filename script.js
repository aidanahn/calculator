const numButtons = document.getElementsByClassName('num-button')
const calcButtons = document.getElementsByClassName('calc-button');
const clearButton = document.querySelector('.clear-button');
const equalButton = document.querySelector('.equal-button');
const decimalButton = document.querySelector('.decimal-button');
const display = document.querySelector('.output');

let buffer = 0;
let tempValue = '';
let firstValue = '';
let secondValue = '';
let operator = '';
let answer;

createDefaultNumButtons();
createDefaultCalcButtons();
createClearButton();
createEqualButton();
createDecimalButton();

function createDecimalButton() {
    decimalButton.addEventListener('click', function() {
        setValues('decimal');
    })
}

function createEqualButton() {
    equalButton.addEventListener('click', function() {
        calculate();
    })
}

function createClearButton() {
    clearButton.addEventListener('click', function() {
        flushOperation();
    })
}

function createDefaultNumButtons() {
    for (let i = 0; i < numButtons.length; i++) {
        numButtons[i].addEventListener('click', function() {
            setValues(i);
        }) 
    }
}

function createDefaultCalcButtons() {
    for (let i = 0; i < calcButtons.length; i++) {
        calcButtons[i].addEventListener('click', function() {
            setOperator(i);
        })
    }
}

function getInnerValue(i) {
    if (i === 'decimal') {
        return decimalButton.textContent;
    }
    return numButtons[i].textContent;
} 

function setOperator(i) {
    operator = calcButtons[i].textContent;
    if (firstValue !== '' && secondValue !== '') {
        calculate();
    }
    buffer = 1;
    tempValue = '';
    debug();
}

function setValues(i) {
    tempValue += getInnerValue(i);
    if (operator === '') {
        firstValue = tempValue;
        buffer = 0;
        display.textContent = firstValue;
    }
    else if (operator !== '' && buffer == 1) {
        secondValue = tempValue;
        display.textContent = secondValue;
    }


    // IGNORE BELOW
    debug();
}

function flushOperation() {
    tempValue = '';
    firstValue = '';
    secondValue = '';
    buffer = 0;
    operator = '';
    answer = 0;
    display.textContent = '0';


    // IGNORE BELOW
    debug();
}

function calculate() {
    if (secondValue === '' && operator !== '') {
        secondValue = firstValue;
    }
    else if (secondValue === '') {
        secondValue = 1;
    }
    switch (operator) {
        case '+':
            answer = Number(firstValue) + Number(secondValue);
            break;
        case '-':
            answer = Number(firstValue) - Number(secondValue);
            break;
        case 'x':
            answer = Number(firstValue) * Number(secondValue);
            break;
        case '%':
            answer = Number(firstValue) / Number(secondValue);
            break;
    }    
    debug();
    firstValue = answer;
    tempValue = '';
    secondValue = '';
    console.log(answer); 
    display.textContent = answer;
}

function debug() {
    console.clear();
    console.log(`tempValue: ${tempValue}`);
    console.log(`firstValue: ${firstValue}`);
    console.log(`secondValue: ${secondValue}`);
    console.log(`operator: ${operator}`)
    console.log(`answer: ${operator}`)
}
//set value 1 and 2