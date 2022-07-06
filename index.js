function writeOnScreen(valueSelected) {
  let { valorRecuperado } = getValue();
  valorRecuperado.value = valorRecuperado.value.concat(valueSelected);
}

function decomposeValueForCalculation() {
  const operantionsValid = ["+", "*", "/", "-"];
  let { valorRecuperado } = getValue();
  let operantion;
  for (let i = 0; i < operantionsValid.length; i++) {
    operantion = valorRecuperado.value.indexOf(operantionsValid[i]);
    if (operantion != -1) {
      continueOperation(false);
      break;
    }
  }

  let numberOn = valorRecuperado.value.substring(0, operantion);
  let numberTwo = valorRecuperado.value.substring(++operantion);
  operantion = operantion - 1;
  numberOn = Number(numberOn);
  numberTwo = Number(numberTwo);
  let operantionSelected = valorRecuperado.value[operantion];
  return { operantionSelected, numberOn, numberTwo };
}

function calculate() {
  let { operantionSelected, numberOn, numberTwo } =
    decomposeValueForCalculation();
  let { valorRecuperado } = getValue();
  let result;
  if (valorRecuperado.value != "" && operantionSelected != undefined) {
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
  }
  continueOperation(true);
  valorRecuperado.value = result;
}

function getValue() {
  const elementValue = document.getElementById("resultado");
  let valorRecuperado = elementValue;
  return { valorRecuperado };
}

function buttonCleanScreen() {
  let { valorRecuperado } = getValue();
  valorRecuperado.value = "";
  continueOperation(false);
}

function continueOperation(condition) {
  const nodeLIst = document.querySelectorAll(".operationAdNumber");

  for (let index = 0; index < nodeLIst.length; index++) {
    const element = nodeLIst[index];

    const operantionsbreak = ["+", "*", "/", "-"];
    for (let i = 0; i < operantionsbreak.length; i++) {
      if (element.value.indexOf(operantionsbreak[i]) != -1) {
        element.disabled = !condition;
      }
    }
  }
}

function events(element) {
  const calculateButton = document.getElementById("caucula");
  calculateButton.addEventListener("click", calculate);

  element.addEventListener("click", () => {
    continueOperation(true);

    let valueSelected = element.value;
    writeOnScreen(valueSelected);
    decomposeValueForCalculation();
  });

  const cleaningButton = document.querySelector(".ac");
  cleaningButton.addEventListener("click", buttonCleanScreen);
}

function main() {
  continueOperation(false);

  const nodeLIst = document.querySelectorAll(".operationAdNumber");
  nodeLIst.forEach((element) => {
    events(element);
  });
}

main();
