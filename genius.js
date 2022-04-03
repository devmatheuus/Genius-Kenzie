function modal() {
  
  const main = document.getElementById("main");
  const divModal = document.createElement("div")
  divModal.classList.add("divModal")
  const h1 = document.createElement("h1")
  h1.innerText = "seja bem vindo(a) ao genius,"
  const h2 = document.createElement("h2")
  const form = document.createElement("form")
  const input = document.createElement("input")
  input.id = "change"
  input.placeholder = "Insira seu nome aqui"
  input.maxLength = 10
  const button = document.createElement("button")
  button.innerText ="JOGAR!"
  button.id = "button"

  form.appendChild(input)
  form.appendChild(button)
  divModal.appendChild(h1)
  divModal.appendChild(h2)
  divModal.appendChild(form)
  main.appendChild(divModal) 
  
  const input2 = document.getElementById("change")
  input2.addEventListener('input',()=>{
    h2.innerText =  input.value
  })
}
modal();
const botao = document.getElementById("button");
botao.addEventListener("click", function (e) {
  const input = document.querySelector("input").value;
  input == "" ? alert("Precisa Inserir um nome") : e.preventDefault();   hide(); createLayout(); 
});

botao.addEventListener("click", function ApertarStart() {
    feedBack();
    if (dataGame.botaoAcionado == true) {
      dataGame.botaoAcionado = false;
      randomColors();
      setTimeout(() => {}, 400);
      setTimeout(remove, 500);;
    }
  });
function hide() {
  const div = document.querySelector(".divModal");
  div.classList.replace("divModal", "hide");
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
  p.id = "feed";
  p.innerText = "Bem vindo(a) " + `${valor}`;
  const button = document.createElement("button");
  const score = document.createElement("div");
  score.classList.add("score");
  score.innerText = `${dataGame.score}`;
  const divContador = document.createElement("div");
  divContador.classList.add("contadora");
  divContador.id = "contador";
  arrayCores.push(divBlue, divYellow, divGreen, divVermelho);
  //função clickar nas divs coloridas
  for (let i in arrayCores) {
    arrayCores[i].addEventListener("click", (e)=>{
      const clicado = e.target.id
      console.log(clicado)
      if (clicado == 0){
          const audio = new Audio ("audio/audio_simonSound1.mp3")
          audio.play()
      }else if (clicado == 1){
        const audio = new Audio ("audio/audio_simonSound2.mp3")
          audio.play()
      }else if (clicado == 2){
        const audio = new Audio ("audio/audio_simonSound3.mp3")
          audio.play()
      }else{
        const audio = new Audio ("audio/audio_simonSound4.mp3")
          audio.play()
      }

    })
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
  for (let j in dataGame.sequenciaSorteada) {
    setTimeout(() => {
      switch (dataGame.sequenciaSorteada[j]) {
        case 0:
          arrayCores[0].classList.replace("blue", "lightBlue");  
          setTimeout(()=>{
            const audio = new Audio ("audio/audio_simonSound1.mp3")
            audio.play()
          },100)
          break;
        case 1:
          arrayCores[1].classList.replace("yellow", "lightYellow");
          setTimeout(()=>{
            const audio = new Audio ("audio/audio_simonSound1.mp3")
            audio.play()
          },100)
          break;
        case 2:
          arrayCores[2].classList.replace("green", "lightGreen");
          setTimeout(()=>{
          const audio3 = new Audio ("audio/audio_simonSound3.mp3")
          audio3.play()
          },100)
          break;
        case 3:
          arrayCores[3].classList.replace("red", "lightRed");
          setTimeout(()=>{
            const audio4 = new Audio ("audio/audio_simonSound4.mp3")
          audio4.play()
          },100)   
        break;
      }
    }, j * 1000);
  }
}
function remove() {
  for (let j in dataGame.sequenciaSorteada) {
    setTimeout(() => {
      switch (dataGame.sequenciaSorteada[j]) {
        case 0:
          arrayCores[0].classList.replace("lightBlue", "blue");
        break;
        case 1:
          arrayCores[1].classList.replace("lightYellow", "yellow");
        break;
        case 2:
          arrayCores[2].classList.replace("lightGreen", "green");
        break;
        case 3:
          arrayCores[3].classList.replace("lightRed", "red");
        break;
      }
    }, j * 1000);
  }
  return (dataGame.podeApertar = true);
}
function continuarJogando() {
  const contador = document.getElementById("contador");  
  const score = document.querySelector(".score");
  textoAcerto("Ótimo, ");
  setTimeout(() => {
    textoAcerto("Atenção para a proxima sequencia, ");
  }, 1000);
  setTimeout(randomColors, 1000);
  setTimeout(remove, 1500);
  dataGame.jogadas ++;
  dataGame.score += 10;
  score.innerText = "Score: " + dataGame.score;
  contador.innerText = dataGame.jogadas;
}
function quadro() {
  const section = document.querySelector("section");
  const div = document.createElement("div");
  div.classList.add("divQuadro");
  const p1 = document.createElement("p");
  p1.classList.add("frasedoQuadro");
  p1.innerText = "Que pena, voce errou!";
  const p2 = document.createElement("p");
  p2.classList.add("scoreDoQuadro");
  p2.innerText = `Score:  ${dataGame.score}`;
  const button = document.createElement("button");
  button.id = "recomecar";
  button.innerText = "Recomeçar";
  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(button);
  section.appendChild(div);

  button.addEventListener("click", function () {
    const div = document.querySelector(".divQuadro")
    div.classList.toggle("hide");
  ApertaRecomecar();
  });
}
  function ApertaRecomecar() {
  const contador = document.getElementById("contador");
  const score = document.querySelector(".score");
  dataGame.sequenciaJogada = [];
  dataGame.sequenciaSorteada = [];
  dataGame.jogadas = 1;
  dataGame.score = 0; 
  retornarAoTexto();
  contador.innerText = dataGame.jogadas;
  score.innerText = dataGame.score;
  randomColors();
  setTimeout(() => {}, 400);
  setTimeout(remove, 500);

}
function feedBack() {
  const valor = document.querySelector("input").value;
  const p1 = document.getElementById("feed");
  p1.innerText = "Atenção " + `${valor},` + " ja começou";
}
function retornarAoTexto() {
  const valor = document.querySelector("input").value;
  const p1 = document.getElementById("feed");
  p1.innerText = "Bem vindo " + `${valor}`;
  //setTimeout(feedBack, 1000);
}
function textoAcerto(txt) {
  const valor = document.querySelector("input"). value;
  const p1 = document.getElementById("feed");
  p1.innerText = txt + `${valor}`;
}

