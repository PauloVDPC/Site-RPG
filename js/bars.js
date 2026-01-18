function renderBar(id, tipo, label, classe, padraoMax) {
  return `
    <div class="sheet-bar">
      <label>${label}</label>
      <div class="bar-container ${classe}">
        <div class="bar-fill" id="${tipo}-fill-${id}"></div>

        <div class="bar-content">
          <div class="bar-controls left">
            <button onclick="changeBar(${id}, '${tipo}', -1)">‹</button>
          </div>

          <div class="bar-value">
            <span class="bar-current" id="${tipo}-${id}" onclick="startEditBar(${id}, '${tipo}')">${padraoMax}</span>
            <span>/</span>
            <span id="${tipo}-max-${id}">${padraoMax}</span>
          </div>

          <div class="bar-controls right">
            <button onclick="changeBar(${id}, '${tipo}', 1)">›</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function ensureBarDefaults(id, tipo) {
  const lista = JSON.parse(localStorage.getItem("personagens")) || [];
  const personagem = lista.find(p => p.id === id);
  if (!personagem) return;

  const defaults = { vida: 21, sanidade: 12, esforco: 3 };
  if (personagem[`${tipo}Max`] == null) personagem[`${tipo}Max`] = defaults[tipo];
  if (personagem[tipo] == null) personagem[tipo] = personagem[`${tipo}Max`];

  localStorage.setItem("personagens", JSON.stringify(lista));
}

function changeBar(id, tipo, delta) {
  const lista = JSON.parse(localStorage.getItem("personagens")) || [];
  const personagem = lista.find(p => p.id === id);
  if (!personagem) return;

  ensureBarDefaults(id, tipo);
  personagem[tipo] = Math.max(0, personagem[tipo] + delta);

  localStorage.setItem("personagens", JSON.stringify(lista));
  updateBarUI(id, tipo);
}

function startEditBar(id, tipo) {
  const span = document.getElementById(`${tipo}-${id}`);
  if (!span) return;

  const input = document.createElement("input");
  input.type = "number";
  input.className = "bar-edit-input";
  input.value = span.innerText;

  span.replaceWith(input);
  input.focus();

  input.onkeydown = e => {
    if (e.key === "Enter") setBarValue(id, tipo, input.value);
    if (e.key === "Escape") updateBarUI(id, tipo);
  };

  input.onblur = () => setBarValue(id, tipo, input.value);
}

function setBarValue(id, tipo, valor) {
  const lista = JSON.parse(localStorage.getItem("personagens")) || [];
  const personagem = lista.find(p => p.id === id);
  if (!personagem) return;

  personagem[tipo] = Math.max(0, Number(valor) || 0);
  localStorage.setItem("personagens", JSON.stringify(lista));
  updateBarUI(id, tipo);
}

function updateBarUI(id, tipo) {
  const lista = JSON.parse(localStorage.getItem("personagens")) || [];
  const personagem = lista.find(p => p.id === id);
  if (!personagem) return;

  const atual = personagem[tipo];
  const max = personagem[`${tipo}Max`];

  const fill = document.getElementById(`${tipo}-fill-${id}`);
  if (fill) fill.style.width = Math.min((atual / max) * 100, 100) + "%";

  const barValue = document.getElementById(`${tipo}-max-${id}`)?.closest(".bar-value");
  if (!barValue) return;

  barValue.innerHTML = `
    <span class="bar-current" id="${tipo}-${id}" onclick="startEditBar(${id}, '${tipo}')">${atual}</span>
    <span>/</span>
    <span id="${tipo}-max-${id}">${max}</span>
  `;
}
