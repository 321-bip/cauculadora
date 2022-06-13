function calcular() {
  const valorSelecionado = document.querySelectorAll("button");

  valorSelecionado.forEach((element) => {
    element.addEventListener("click", () => {
      const valueSelecionado = element.value;
      escreverNaTela(valueSelecionad);
    });
  });
}

function escreverNaTela(valueSelecionado) {
  const valor = document.getElementById("resultado");
  valor.value = valor.value.concat(valueSelecionado);
  // console.log(valor.value);
}

function man() {
  calcular();
}
man();
