function writeOnScreen(valueSelected) {
  const elementValue = document.getElementById("resultado");
  elementValue.value = elementValue.value.concat(valueSelected);
}

function getPositionOperantion() {
  const operantionsValid = ["+", "*", "/", "-"];
  const elementValue = document.getElementById("resultado");
  let operantion;

  for (let i = 0; i < operantionsValid.length; i++) {
    operantion = elementValue.value.indexOf(operantionsValid[i]);

    if (operantion != -1) {
      continuesOperation(false);
      break;
    }
  }
  console.log(operantion);
  return { operantion };
}

function decomposeValueForCalculation() {
  let { operantion } = getPositionOperantion();
  const elementValue = document.getElementById("resultado");
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

  const elementValue = document.getElementById("resultado");

  if (elementValue.value != "" && operantionSelected != undefined) {
    switch (operantionSelected) {
      case "*":
        elementValue.value = numberOn * numberTwo;
        break;
      case "/":
        elementValue.value = numberOn / numberTwo;
        if (Number.isNaN(elementValue.value) || !isFinite(elementValue.value)) {
          elementValue.value = 0;
        }
        break;
      case "+":
        elementValue.value = numberOn + numberTwo;
        break;
      case "-":
        elementValue.value = numberOn - numberTwo;
        break;
    }
    continuesOperation(true);
  }
}

function buttonCleanScreen() {
  const elementValue = document.getElementById("resultado");
  elementValue.value = "";
  continuesOperation(false);
}

function continuesOperation(condition) {
  const nodeLIst = document.querySelectorAll(".operationAdNumber");

  nodeLIst.forEach((element) => {
    const operantionsbreak = ["+", "*", "/", "-"];

    for (let i = 0; i < operantionsbreak.length; i++) {
      if (element.value.indexOf(operantionsbreak[i]) != -1) {
        element.disabled = !condition;
      }
    }
  });
}

function events(element) {
  const calculateButton = document.getElementById("caucula");
  calculateButton.addEventListener("click", calculate);

  element.addEventListener("click", () => {
    continuesOperation(true);
    writeOnScreen(element.value);
    getPositionOperantion();
  });

  const cleaningButton = document.querySelector(".ac");
  cleaningButton.addEventListener("click", buttonCleanScreen);
}

function main() {
  continuesOperation(false);

  const nodeLIst = document.querySelectorAll(".operationAdNumber");
  nodeLIst.forEach((element) => {
    events(element);
  });
}

main();
