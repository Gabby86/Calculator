const calculatorGrid = document.querySelector('.calculator-grid');
const previousOperandText = document.querySelector('.previous-operand');
const currentOperandText = document.querySelector('.current-operand');
let currentOperand = '';
let previousOperand = '';
let operation = '';

function clear() {
  currentOperand = '';
  previousOperand = '';
  operation = '';
  updateDisplay();
}

function deleteNumber() {
  currentOperand = currentOperand.toString().slice(0, -1);
  updateDisplay();
}

function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) {
    return;
  }
  currentOperand += number.toString();
  updateDisplay();
}

function chooseOperation(op) {
  if (currentOperand === '') {
    return;
  }
  if (previousOperand !== '') {
    compute();
  }
  operation = op;
  previousOperand = currentOperand;
  currentOperand = '';
  updateDisplay();
}

function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) {
    return;
  }
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '÷':
      computation = prev / current;
      break;
    default:
      return;
  }
  currentOperand = computation;
  operation = '';
  previousOperand = '';
  updateDisplay();
}

function getDisplayNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split('.')[0]);
  const decimalDigits = stringNumber.split('.')[1];
  let integerDisplay;
  if (isNaN(integerDigits)) {
    integerDisplay = '';
  } else {
    integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

function updateDisplay() {
  currentOperandText.innerText = getDisplayNumber(currentOperand);
  if (operation != null) {
    previousOperandText.innerText = `${getDisplayNumber(previousOperand)} ${operation}`;
  } else {
    previousOperandText.innerText = '';
  }
}

// Add event listeners to buttons
const numberButtons = document.querySelectorAll('[data-number]');
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText);
  });
});

const operationButtons = document.querySelectorAll('[data-operation]');
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    chooseOperation(button.innerText);
  });
});

const equalsButton = document.querySelector('[data-equals]');
equalsButton.addEventListener('click', () => {
  compute();
});

const allClearButton = document.querySelector('[data-all-clear]');
allClearButton.addEventListener('click', () => {
  clear();
});

const deleteButton = document.querySelector('[data-delete]');
deleteButton.addEventListener('click', () => {
  deleteNumber();
});
