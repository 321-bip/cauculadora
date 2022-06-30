const nodeLIst = document.querySelectorAll(".operationAdNumber");
const elementValue = document.getElementById("resultado");

function getValue() {
  nodeLIst.forEach((element) => {
    element.addEventListener("click", () => {
      let valueSelected = element.value;
      writeOnScreen(valueSelected);
      breakOperation(false);
      decomposeValueForCalculation();
    });
  });
}

function writeOnScreen(valueSelected) {
  elementValue.value = elementValue.value.concat(valueSelected);
  buttonCleanScreen(elementValue.value, elementValue);
}

function decomposeValueForCalculation() {
  const operantionsValid = ["+", "*", "/", "-"];
  let operantion;
  for (let i = 0; i < operantionsValid.length; i++) {
    operantion = elementValue.value.indexOf(operantionsValid[i]);
    if (operantion != -1) {
      breakOperation(true);
      break;
    }
  }

  let numberOn = elementValue.value.substring(0, operantion);
  let numberTwo = elementValue.value.substring(++operantion);
  operantion = operantion - 1;
  numberOn = Number(numberOn);
  numberTwo = Number(numberTwo);
  let operantionSelected = elementValue.value[operantion];
  return { operantionSelected, numberOn, numberTwo };
}

function calculate() {
  let { operantionSelected, numberOn, numberTwo } =
    decomposeValueForCalculation();
  let result;
  if (elementValue.value != "" && operantionSelected != undefined) {
    switch (operantionSelected) {
      case "*":
        result = numberOn * numberTwo;
        break;
      case "/":
        result = numberOn / numberTwo;
        if (Number.isNaN(result) || !isFinite(result)) {
          result = 0;
        }
        break;
      case "+":
        result = numberOn + numberTwo;
        break;
      case "-":
        result = numberOn - numberTwo;
        break;
    }
  } else {
    return decomposeValueForCalculation();
  }
  breakOperation(false);
  elementValue.value = result;
}

function buttonCleanScreen(elementValue, element) {
  const cleaningButton = document.querySelector(".ac");

  cleaningButton.addEventListener("click", () => {
    element.value = elementValue.slice(0, -0);
    breakOperation(false);
  });
}

function breakOperation(condition) {
  const operantionsbreak = ["+", "*", "/", "-"];
  nodeLIst.forEach((element) => {
    for (let i = 0; i < operantionsbreak.length; i++) {
      if (element.value.indexOf(operantionsbreak[i]) != -1) {
        element.disabled = condition;
      }
    }
  });
}

function events() {
  const calculateButton = document.getElementById("caucula");
  calculateButton.addEventListener("click", calculate);
}

function man() {
  events();
  breakOperation(true);
  getValue();
}
man();
