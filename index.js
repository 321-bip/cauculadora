function getValue() {
  const nodeLIst = document.querySelectorAll(".operationAdNumber");

  nodeLIst.forEach((element) => {
    element.addEventListener("click", () => {
      let valueSelected = element.value;
      writeOnScreen(valueSelected);
    });
  });
}

function buttonCleanScreen(elementValue, element) {
  const cleaningButton = document.querySelector(".ac");

  cleaningButton.addEventListener("click", () => {
    const newValue = (elementValue.value = elementValue.slice(0, -0));
    element.value = newValue;
  });
}

function writeOnScreen(valueSelected) {
  const elementValue = document.getElementById("resultado");
  elementValue.value = elementValue.value.concat(valueSelected);
  buttonCleanScreen(elementValue.value, elementValue);
  decomposeString(elementValue);
}

function decomposeString(elementValue) {
  const calculateButton = document.getElementById("caucula");

  calculateButton.addEventListener("click", () => {
    const operantionsValid = ["+", "*", "/", "-"];
    let operantion;

    for (let i = 0; i < operantionsValid.length; i++) {
      operantion = elementValue.value.indexOf(operantionsValid[i]);
      if (operantion != -1) {
        break;
      }
    }
    let numberOn = elementValue.value.substring(0, operantion);
    let numberTwo = elementValue.value.substring(++operantion);
    operantion = operantion - 1;
    numberOn = Number(numberOn);
    numberTwo = Number(numberTwo);
    calculate(numberOn, numberTwo, elementValue.value[operantion]);
  });
}

function calculate(numberOn, numberTwo, operantion) {
  let result;

  switch (operantion) {
    case "*":
      result = numberOn * numberTwo;
      console.log(result);
      break;
    case "/":
      result = numberOn / numberTwo;
      console.log(result);
      break;
    case "+":
      result = numberOn + numberTwo;
      console.log(result);
      break;
    case "-":
      result = numberOn - numberTwo;
      console.log(result);
      break;
  }
}

function man() {
  getValue();
}
man();
