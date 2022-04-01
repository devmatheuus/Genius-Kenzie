function modal() {
  const main = document.getElementById("main");

  const div = document.createElement("div");
  div.classList.add("divModal");

  const h1 = document.createElement("h1");
  h1.innerText = "Bem vindo(a) ao Genius";

  const form = document.createElement("form");

  const input = document.createElement("input");
  input.placeholder = "Insira seu nome Aqui";

  const button = document.createElement("button");
  button.id = "button"; //criação da primeira Pagina com input
  button.innerText = "Enviar";

  main.appendChild(div);
  div.appendChild(h1);
  div.appendChild(form);
  form.appendChild(input);
  form.appendChild(button);
}
modal();

const botao = document.getElementById("button");
botao.addEventListener("click", function (e) {
  const input = document.querySelector("input").value;
  if (input == "") {
    alert("Precisa Inserir um nome");
  } else {
    e.preventDefault(); // botao de enviar no input onde ele redireciona para o jogo
    hide();
    createLayout();
    ApertarStart();
  }
});

function hide() {
  const div = document.querySelector(".divModal"); // função que esconde a div da primeira pagina para mostrar o tabuleiro.
  div.classList.remove("divModal");
  div.classList.add("hide");
}

function createLayout() {
  const main = document.getElementById("main");
  const valor = document.querySelector("input").value;

  const section = document.createElement("section");

  const divBlue = document.createElement("div");
  divBlue.classList.add("blue");
  divBlue.id = 0;

  const divYellow = document.createElement("div"); // função que cria o tabuleiro
  divYellow.classList.add("yellow");
  divYellow.id = 1;

  const divGreen = document.createElement("div");
  divGreen.classList.add("green");
  divGreen.id = 2;

  const divVermelho = document.createElement("div");
  divVermelho.classList.add("red");
  divVermelho.id = 3;

  const divCircle = document.createElement("div");
  divCircle.id = "circle";

  const p = document.createElement("p");
  p.innerText = "Bem vindo(a) " + `${valor}`;

  const button = document.createElement("button");
  button.classList.add("button");
  button.id = "start";
  button.innerText = "START";

  const score = document.createElement("div");
  score.classList.add("score");
  score.innerText = `${dataGame.score}`;

  const divContador = document.createElement("div");
  divContador.classList.add("contadora");
  divContador.id = "contador";

  arrayCores.push(divBlue, divYellow, divGreen, divVermelho);

  for (let i = 0; i < arrayCores.length; i++) {
    arrayCores[i].addEventListener("click", () => {
      if (dataGame.podeApertar == true) {
        dataGame.sequenciaJogada.push(arrayCores[i].id);

        if (
          dataGame.sequenciaJogada.length ===
            dataGame.sequenciaSorteada.length &&
          dataGame.sequenciaSorteada.every(
            (value, index) => value == dataGame.sequenciaJogada[index]
          ) == true
        ) {
          dataGame.sequenciaJogada = [];
          setTimeout(continuarJogando, 1000);
        } else {
          dataGame.sequenciaJogada.forEach(function (elemento, indice) {
            if (elemento != dataGame.sequenciaSorteada[indice]) {
              console.log(elemento, dataGame.sequenciaSorteada[indice]);
              quadro();
            }
          });
        }
      }
    });
  }

  main.appendChild(section);
  section.appendChild(divBlue);
  section.appendChild(divYellow);
  section.appendChild(divGreen);
  section.appendChild(divVermelho);
  section.appendChild(divCircle);
  divCircle.appendChild(score);
  divCircle.appendChild(p);
  section.appendChild(button);
  section.appendChild(divContador);
}

const dataGame = {
  jogadas: 1,
  score: 0,
  sequenciaSorteada: [],
  sequenciaJogada: [],
  botaoAcionado: true, // objeto que armazena dados
  podeApertar: false,
};

const arrayCores = [];

function randomColors() {
  for (let i = 0; i < 1; i++) {
    const numeroSorteado = Math.floor(Math.random() * 4);
    dataGame.sequenciaSorteada.push(numeroSorteado);
  }

  for (let j = 0; j < dataGame.sequenciaSorteada.length; j++) {
    setTimeout(() => {
      if (dataGame.sequenciaSorteada[j] === 0) {
        arrayCores[0].classList.replace("blue", "lightBlue");
      }

      if (dataGame.sequenciaSorteada[j] === 1) {
        arrayCores[1].classList.replace("yellow", "lightYellow"); //função que randomiza as cores
      }

      if (dataGame.sequenciaSorteada[j] === 2) {
        arrayCores[2].classList.replace("green", "lightGreen");
      }

      if (dataGame.sequenciaSorteada[j] === 3) {
        arrayCores[3].classList.replace("red", "lightRed");
      }
    }, j * 1000);
  }
}

function remove() {
  for (let j = 0; j <= dataGame.sequenciaSorteada.length; j++) {
    setTimeout(() => {
      if (dataGame.sequenciaSorteada[j] === 0) {
        arrayCores[0].classList.replace("lightBlue", "blue");
      }

      if (dataGame.sequenciaSorteada[j] === 1) {
        arrayCores[1].classList.replace("lightYellow", "yellow");
      }
      //função que faz o tabuleiro brilhar
      if (dataGame.sequenciaSorteada[j] === 2) {
        arrayCores[2].classList.replace("lightGreen", "green");
      }

      if (dataGame.sequenciaSorteada[j] === 3) {
        arrayCores[3].classList.replace("lightRed", "red");
      }
    }, j * 1000);
  }
  return (dataGame.podeApertar = true);
}

function continuarJogando() {
  const contador = document.getElementById("contador");
  const score = document.querySelector(".score");
  score.innerText = "Score: " + dataGame.score;
  contador.innerText = dataGame.jogadas;
  randomColors();
  setTimeout(() => {}, 400); //função que continua quando acerta a sequencia
  setTimeout(remove, 500);
  dataGame.jogadas += 1;
  dataGame.score += 1000;
}

function ApertarStart() {
  const comecar = document.getElementById("start");

  comecar.addEventListener("click", () => {
    if (dataGame.botaoAcionado == true) {
      dataGame.botaoAcionado = false;
      const contador = document.getElementById("contador"); //botao start para comecar
      contador.innerText = dataGame.jogadas;

      randomColors();
      setTimeout(() => {}, 400);
      setTimeout(remove, 500);
      dataGame.jogadas += 1;
      dataGame.score += 1000;
    }
  });
}

function quadro() {
  const section = document.querySelector("section");

  const div = document.createElement("div");
  div.classList.add("divQuadro");
  const p1 = document.createElement("p");
  p1.classList.add("frasedoQuadro");
  p1.innerText = "Que pena, voce errou";
  const p2 = document.createElement("p"); //quadro que aparece quando perde com botao de recomecar
  p2.classList.add("scoreDoQuadro");
  p2.innerText = "Score: " + `${dataGame.score}`;
  const button = document.createElement("button");
  button.id = "recomecar";
  button.innerText = "Recomeçar";

  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(button);
  section.appendChild(div);

  button.addEventListener("click", function () {
    div.classList.replace("divQuadro", "hide");
    ApertaRecomecar();
  });
}

// function ApertaRecomecar() {
//   if (dataGame.botaoAcionado == true) {
//     dataGame.botaoAcionado = false;
//     const contador = document.getElementById("contador"); //botao start para recomecar
//     contador.innerText = "";
//     randomColors();
//     setTimeout(() => {}, 400);
//     setTimeout(remove, 500);
//     dataGame.jogadas += 1;
//     dataGame.score += 1000;
//   }
// }
