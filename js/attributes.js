const atributos = {
  forca: 1,
  agilidade: 1,
  intelecto: 1,
  presenca: 1,
  vigor: 1
};

let pontosDisponiveis = 4;
let origemSelecionada = null;

/* ===== MODAL ===== */

function openCreateCharacter() {
  document.getElementById("create-character-modal").classList.remove("hidden");
  showAttributes();
  updateUI();
}

function closeCreateCharacter() {
  document.getElementById("create-character-modal").classList.add("hidden");
}

/* ===== ATRIBUTOS ===== */

function changeAttr(attr, delta) {
  const atual = atributos[attr];
  const novo = atual + delta;

  if (novo < 0 || novo > 3) return;
  if (delta === 1 && pontosDisponiveis === 0) return;

  if (novo === 0) {
    const zeros = Object.values(atributos).filter(v => v === 0).length;
    if (zeros >= 1) return;
    pontosDisponiveis += 1;
  }

  if (atual === 0 && novo === 1) pontosDisponiveis -= 1;
  if (delta === 1 && atual >= 1) pontosDisponiveis -= 1;
  if (delta === -1 && novo >= 1) pontosDisponiveis += 1;

  atributos[attr] = novo;
  updateUI();
}

function updateUI() {
  for (const a in atributos) {
    document.getElementById(a).innerText = atributos[a];
  }

  document.getElementById("points").innerText = pontosDisponiveis;
  document.getElementById("next-attributes").disabled = pontosDisponiveis !== 0;
}

/* ===== NAVEGAÇÃO ===== */

function goToOrigin() {
  document.getElementById("step-attributes").classList.add("hidden");
  document.getElementById("step-origin").classList.remove("hidden");
}

function backToAttributes() {
  document.getElementById("step-origin").classList.add("hidden");
  document.getElementById("step-attributes").classList.remove("hidden");
}

function showAttributes() {
  document.getElementById("step-origin").classList.add("hidden");
  document.getElementById("step-attributes").classList.remove("hidden");
}

/* ===== ORIGEM ===== */

function selectOrigin(nome) {
  origemSelecionada = nome;

  document.querySelectorAll(".origin").forEach(o =>
    o.classList.remove("selected")
  );

  event.currentTarget.classList.add("selected");
  document.getElementById("next-origin").disabled = false;
}
