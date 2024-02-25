/*setting variables and display value ad object of calculator, I set the display value to empty so that 
the first appearance of the calc does not display anything, Set the firstOperator 
operator to null because they have no start value, but will get some later on
*/
const calculator = {
  displayValue: ' ',
  firstOperator: null,
  operator: null,
};

/*the function here is declaring input digit so we can use it later on, and giving it 
the parameter of digit, which we will pass through later. I created variables 
waitingForSecondOperator and display values constant, they will never change, and 
set them equal to the variable calculator (above) 
*/
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperator } = calculator;

  /*this if statement resides in the function inputDigit. If the variable is used, 
  it is set to true, and the display value of the variable is updated through its parameter
  display value
  */
  if (waitingForSecondOperator === true) {
    calculator.displayValue = digit;
  
  /*if the display value did not pass the if statement, it is set back to 0
  and the conditional operator is the question mark and the colon. The ternary operator is 
  shortening the if statement asking if it is truthy or falsey
  */
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }

  /*print to screen you dont need this but I like to see what is printing in the
  console. 
  */
  console.log(calculator);
}


/* this function is creating the actual workings of the calculator, giving the 
operations some inital action. The constants in the {} are also assigned to the 
variable calculator. The parseFloat is making the display value return
a floating point number to the display value
*/
function handleOperator(nextOperator) {
  const { firstOperator, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);


  /*we are testing to say that if the firstOperator is set to null and the
  input value is not an illegal number, then do the calculation and set the 
  parameter of the calculator value to the first input value 
  */ 
  if (firstOperator == null && !isNaN(inputValue)) {
    calculator.firstOperator = inputValue;

    //setting display value to empty after pushing the first operator
    calculator.displayValue = String(" ");

    /*if the first operation if false. Setting a variable result to the function
    caclulate (below) which is taking the variabls declared and giving them
    calcualtation variables
    */
  } else if (operator) {
    const result = calculate(firstOperator, inputValue, operator);

    //displaying values from calculator as a string, and displaying the frist operator to result
    calculator.displayValue = String(result);
    calculator.firstOperator = result;
  }

  //settign the waitingForSecondOperator to true if the first if statement is completed, 
  //and the second elseif is false. Setting the object operator to the nextOperator
  calculator.waitingForSecondOperator = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

//this is the main function, doing all basic math through the declared variables abover
//the return statement is returning the second operator which will have the final
//value 
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

//updating screen display through the function updateDisplay(). 
//setting the display.value to the calculator object displayValue
function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}
updateDisplay();

//giving action to buttons, listening for an action, and giving it a click event 
//setting the target and event to buttons returning the button response if the button gets the listener 
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }

  // updating hte target class of the calculator variable, giving the handle operator the 
  //the target value adn updating the display. Returning the results
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