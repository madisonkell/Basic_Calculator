//setting variables and display value

const calculator = {
  displayValue: ' ',
  firstOperator: null,
  operator: null,
};

//first function, setting values
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperator } = calculator;

  //waiting for the user, displaying number
  if (waitingForSecondOperator === true) {
    calculator.displayValue = digit;
  
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }

  //print to screen
  console.log(calculator);
}


//second function, allowing for operation
function handleOperator(nextOperator) {
  const { firstOperator, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);


  //if first vaue is null, print nan
  if (firstOperator == null && !isNaN(inputValue)) {
    calculator.firstOperator = inputValue;

    //setting display value to empty after pushing the first operator
    calculator.displayValue = String(" ");

    //calculate
  } else if (operator) {
    const result = calculate(firstOperator, inputValue, operator);

    //displaying values
    calculator.displayValue = String(result);
    calculator.firstOperator = result;
  }

  //waiting for input
  calculator.waitingForSecondOperator = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

//setting the operators to the numbers inputted
function calculate(firstOperator, secondOperator, operator) {
  if (operator === '+') {
    return firstOperator + secondOperator;
  } else if (operator === '-') {
    return firstOperator - secondOperator;
  } else if (operator === '*') {
    return firstOperator * secondOperator;
  } else if (operator === '/') {
    return firstOperator / secondOperator;
  }
 return secondOperator;
 
}

//updating screen display
function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}
updateDisplay();

//giving action to buttons
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }

  // giving action to operators
    if (target.classList.contains('operator')) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  //creating clear button operation
  if (target.classList.contains('clear')) {
    console.log('clear', target.value);
  }


  //have to update final display 
  inputDigit(target.value);
  updateDisplay();
 
 
});