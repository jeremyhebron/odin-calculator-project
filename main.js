const numberBtns = document.querySelectorAll(".number");
const operationBtns = document.querySelectorAll(".operation");
const equalsBtn = document.querySelector(".equals");
const backSpaceBtn = document.querySelector(".backspace");
const allClearBtn = document.querySelector(".allClear");
const previousDisplayNumber = document.querySelector(".previousOperand");
const currentDisplayNumber = document.querySelector(".currentOperand");
let previousOperand = "";
let currentOperand = "";
let operator = "";

numberBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

operationBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

allClearBtn.addEventListener("click", (e) => {
  clearAll();
});

backSpaceBtn.addEventListener("click", (e) => {
  deleteSpace();
});

equalsBtn.addEventListener("click", (e) => {
  if (currentOperand != "" && previousOperand != "") {
    previousDisplayNumber.textContent =
      previousOperand + " " + operator + " " + currentOperand + " " + "=" + " ";
    compute();
  }
});

function handleNumber(number) {
  currentOperand += number;
  currentDisplayNumber.textContent = currentOperand;
}

function handleOperator(op) {
  if (previousOperand === "") {
    previousOperand = currentOperand;
    operatorCheck(op);
  } else if (currentOperand === "") {
    operatorCheck(op);
  } else {
    compute();
    operator = op;
    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = previousOperand + " " + operator;
  }
}

function operatorCheck(text) {
  operator = text;
  previousDisplayNumber.textContent = previousOperand + " " + operator;
  currentDisplayNumber.textContent = "0";
  currentOperand = "";
}

function compute() {
  previousOperand = Number(previousOperand);
  currentOperand = Number(currentOperand);
  if (operator === "+") {
    previousOperand += currentOperand;
  } else if (operator === "-") {
    previousOperand -= currentOperand;
  } else if (operator === "x") {
    previousOperand *= currentOperand;
  } else if (operator === "÷") {
    if (currentOperand <= 0) {
      previousDisplayNumber.textContent = "Error";
      return;
    }
    previousOperand /= currentOperand;
  }

  previousOperand = roundNumber(previousOperand);
  previousOperand = previousOperand.toString();
  displayResults();
}

function roundNumber(num) {
  return Math.round(num * 100000) / 100000;
}

function displayResults() {
  currentDisplayNumber.textContent = previousOperand;
  currentOperand = "";
  operator = "";
}

function clearAll() {
  previousOperand = "";
  currentOperand = "";
  operator = "";
  previousDisplayNumber.textContent = "";
  currentDisplayNumber.textContent = "0";
}

function deleteSpace() {
  currentOperand = currentOperand.toString().slice(0, -1);
  currentDisplayNumber.textContent = currentOperand;
}
