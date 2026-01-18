const atributosBase = {
  forca: 1,
  agilidade: 1,
  intelecto: 1,
  presenca: 1,
  vigor: 1
};

let atributos = { ...atributosBase };
let pontosDisponiveis = 4;
let origemSelecionada = null;
let classeSelecionada = null;

/* ===== MODAL ===== */
function openCreateCharacter() {
  resetCreation();
  document.getElementById("create-character-modal").classList.remove("hidden");
  showStep("attributes");
  updateUI();
}

function closeCreateCharacter() {
  document.getElementById("create-character-modal").classList.add("hidden");
}

/* ===== RESET ===== */
function resetCreation() {
  atributos = { ...atributosBase };
  pontosDisponiveis = 4;
  origemSelecionada = null;
  classeSelecionada = null;

  document.querySelectorAll(".origin").forEach(o => o.classList.remove("selected"));
  ["char-name","player-name","appearance","personality","history","goal"]
    .forEach(id => document.getElementById(id).value = "");
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

/* ===== ORIGEM ===== */
function selectOrigin(event, nome) {
  origemSelecionada = nome;
  document.querySelectorAll("#step-origin .origin").forEach(o => o.classList.remove("selected"));
  event.currentTarget.classList.add("selected");
  document.getElementById("next-origin").disabled = false;
}

/* ===== CLASSE ===== */
function selectClass(event, nome) {
  classeSelecionada = nome;
  document.querySelectorAll("#step-class .origin").forEach(o => o.classList.remove("selected"));
  event.currentTarget.classList.add("selected");
  document.getElementById("next-class").disabled = false;
}

/* ===== NAVEGAÇÃO ===== */
function showStep(step) {
  ["attributes","origin","class","final"].forEach(s =>
    document.getElementById(`step-${s}`).classList.add("hidden")
  );
  document.getElementById(`step-${step}`).classList.remove("hidden");
}

function goToOrigin(){ showStep("origin"); }
function goToClass(){ showStep("class"); }
function goToFinal(){ showStep("final"); }
function backToAttributes(){ showStep("attributes"); }
function backToOrigin(){ showStep("origin"); }
function backToClass(){ showStep("class"); }

/* ===== FINALIZAÇÃO ===== */
function finishCharacter() {
  const nome = document.getElementById("char-name").value.trim();
  if (!nome) {
    alert("Informe o nome do personagem");
    return;
  }

  const personagem = {
    id: Date.now(),
    nome,
    jogador: document.getElementById("player-name").value,
    atributos,
    origem: origemSelecionada,
    classe: classeSelecionada,
    aparencia: document.getElementById("appearance").value,
    personalidade: document.getElementById("personality").value,
    historico: document.getElementById("history").value,
    objetivo: document.getElementById("goal").value
  };

  const lista = JSON.parse(localStorage.getItem("personagens")) || [];
  lista.push(personagem);
  localStorage.setItem("personagens", JSON.stringify(lista));

  addCharacterToSidebar(personagem.nome);
  closeCreateCharacter();
}
