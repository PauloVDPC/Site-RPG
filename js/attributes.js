const atributos = {
  forca: 1,
  agilidade: 1,
  intelecto: 1,
  presenca: 1,
  vigor: 1
};

let pontosDisponiveis = 4;

function openCreateCharacter() {
  document.getElementById("create-character-modal").classList.remove("hidden");
  updateUI();
}

function closeCreateCharacter() {
  document.getElementById("create-character-modal").classList.add("hidden");
}

function changeAttr(attr, delta) {
  const valorAtual = atributos[attr];
  const novoValor = valorAtual + delta;

  // Limites básicos
  if (novoValor < 0 || novoValor > 3) return;

  // Controle de pontos
  if (delta === 1 && pontosDisponiveis === 0) return;

  // Regra: apenas UM atributo pode ficar em 0
  if (novoValor === 0) {
    const jaTemZero = Object.values(atributos).filter(v => v === 0).length;
    if (jaTemZero >= 1) return;
    pontosDisponiveis += 1;
  }

  if (valorAtual === 0 && novoValor === 1) {
    pontosDisponiveis -= 1;
  }

  if (delta === 1 && valorAtual >= 1) {
    pontosDisponiveis -= 1;
  }

  if (delta === -1 && novoValor >= 1) {
    pontosDisponiveis += 1;
  }

  atributos[attr] = novoValor;
  updateUI();
}

function updateUI() {
  for (const attr in atributos) {
    document.getElementById(attr).innerText = atributos[attr];
  }

  document.getElementById("points").innerText = pontosDisponiveis;

  // Só libera avançar se não sobrar ponto
  document.getElementById("next-step").disabled = pontosDisponiveis !== 0;
}
