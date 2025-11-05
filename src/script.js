async function carregarDados() {
  const res = await fetch("src/dados.json");
  const dados = await res.json();
  renderizarFase("Fase de Grupos", dados.fase_grupos);
  renderizarFase("Fase Eliminatória", dados.fase_eliminatoria);
}

function renderizarFase(titulo, jogos) {
  const divTabela = document.getElementById("tabela");

  const divFase = document.createElement("div");
  divFase.className = "fase";

  const h2 = document.createElement("h2");
  h2.textContent = titulo;
  divFase.appendChild(h2);

  jogos.forEach((jogo, index) => {
    const divJogo = document.createElement("div");
    divJogo.className = "jogo";

    const time1 = document.createElement("div");
    time1.className = "time";
    time1.textContent = jogo.times[0];

    const input1 = document.createElement("input");
    input1.type = "number";
    input1.min = 0;

    const x = document.createElement("div");
    x.textContent = "x";

    const input2 = document.createElement("input");
    input2.type = "number";
    input2.min = 0;

    const time2 = document.createElement("div");
    time2.className = "time";
    time2.textContent = jogo.times[1];

    const salvar = document.createElement("button");
    salvar.textContent = "Salvar";

    const chave = `${titulo}-${jogo.jogo}`;
    const salvo = JSON.parse(localStorage.getItem(chave));
    if (salvo) {
      input1.value = salvo.gols1;
      input2.value = salvo.gols2;
    }

    salvar.onclick = () => {
      const gols1 = parseInt(input1.value) || 0;
      const gols2 = parseInt(input2.value) || 0;
      const vencedor = gols1 > gols2 ? jogo.times[0] :
                       gols2 > gols1 ? jogo.times[1] : "Empate";

      localStorage.setItem(chave, JSON.stringify({ gols1, gols2, vencedor }));
      alert(`${jogo.jogo}: ${vencedor} venceu!`);
    };

    divJogo.append(time1, input1, x, input2, time2, salvar);
    divFase.appendChild(divJogo);
  });

  divTabela.appendChild(divFase);
}

carregarDados();
