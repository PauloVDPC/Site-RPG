function toggleCharacterSheet(id) {
  const container = document.getElementById("sheet-container");

  const existing = container.querySelector(`.sheet-window[data-character-id="${id}"]`);
  if (existing) {
    existing.remove();
    return;
  }

  const lista = JSON.parse(localStorage.getItem("personagens")) || [];
  const personagem = lista.find(p => p.id === id);
  if (!personagem) return;

  const sheet = document.createElement("div");
  sheet.className = "sheet-window";
  sheet.dataset.characterId = id;

  sheet.innerHTML = `
    <div class="sheet-header">
      <span>${personagem.nome}</span>

      <div class="sheet-header-actions">
        <button
          class="sheet-minimize"
          onclick="toggleMinimize(this.closest('.sheet-window'))"
          title="Minimizar"
        >—</button>

        <button
          onclick="this.closest('.sheet-window').remove()"
          title="Fechar"
        >✖</button>
      </div>
    </div>

    <div class="sheet-body">
      <div class="sheet-content">
        <div class="sheet-left">

          <div class="sheet-info">
            <div class="sheet-info-row">
              <span>Nome:</span><strong>${personagem.nome}</strong>
              <span>Jogador:</span><strong>${personagem.jogador || "-"}</strong>
            </div>
            <div class="sheet-info-row">
              <span>Origem:</span><strong>${personagem.origem}</strong>
              <span>Classe:</span><strong>${personagem.classe}</strong>
            </div>
          </div>

          <!-- ATRIBUTTE TREE -->
          <div class="attributes-block" data-character-id="${id}">
            <div class="attr-block-header">
              <span>ATRIBUTOS</span>
              <div class="attr-block-toggle" onclick="toggleAttributeBlock(${id})">✏️</div>
            </div>    
          <div class="attributes-tree">

            <div class="attr-node attr-forca" data-attr="forca" onclick="rollAttribute(${id}, 'forca')">
              <span id="attr-forca-${id}">${personagem.atributos.forca}</span>
              <small>FOR</small>
              <div class="attr-edit" onclick="toggleAttrEdit(${id}, 'forca')">✏️</div>
            </div>

            <div class="attr-node attr-agilidade" data-attr="agilidade" onclick="rollAttribute(${id}, 'agilidade')">
              <span id="attr-agilidade-${id}">${personagem.atributos.agilidade}</span>
              <small>AGI</small>
              <div class="attr-edit" onclick="toggleAttrEdit(${id}, 'agilidade')">✏️</div>
            </div>

            <div class="attr-node attr-intelecto" data-attr="intelecto" onclick="rollAttribute(${id}, 'intelecto')">
              <span id="attr-intelecto-${id}">${personagem.atributos.intelecto}</span>
              <small>INT</small>
              <div class="attr-edit" onclick="toggleAttrEdit(${id}, 'intelecto')">✏️</div>
            </div>

            <div class="attr-node attr-presenca" data-attr="presenca" onclick="rollAttribute(${id}, 'presenca')">
              <span id="attr-presenca-${id}">${personagem.atributos.presenca}</span>
              <small>PRE</small>
              <div class="attr-edit" onclick="toggleAttrEdit(${id}, 'presenca')">✏️</div>
            </div>

            <div class="attr-node attr-vigor" data-attr="vigor" onclick="rollAttribute(${id}, 'vigor')">
              <span id="attr-vigor-${id}">${personagem.atributos.vigor}</span>
              <small>VIG</small>
              <div class="attr-edit" onclick="toggleAttrEdit(${id}, 'vigor')">✏️</div>
            </div>

          </div>
          </div>

          <!-- HEX / PE / DESLOCAMENTO -->
          <div class="sheet-extra-stats">

            <!-- HEX -->
            <div class="sheet-stat-box">
              <select
                class="hex-select"
                id="hex-${id}"
                onchange="updateHexPE(${id})"
              >
                ${renderHexOptions()}
              </select>
              <div class="sheet-stat-label">HEX</div>
            </div>

            <!-- PE -->
            <div class="sheet-stat-box">
              <strong id="pe-${id}">1</strong>
              <div class="sheet-stat-label">PE / TURNO</div>
            </div>

            <!-- DESLOCAMENTO -->
            <div class="sheet-stat-box">
              <strong id="desloc-${id}">9 m / 6 q</strong>
              <div class="sheet-stat-label">DESLOCAMENTO</div>
            </div>

          </div>

          <!-- LIFE BARS --> 
          <div class="sheet-bars">
            ${renderBar(id,"vida","VIDA","bar-life",21)}
            ${renderBar(id,"sanidade","SANIDADE","bar-sanity",12)}
            ${renderBar(id,"esforco","ESFORÇO","bar-effort",3)}
          </div>

          <!-- DEFESA / BLOQUEIO / ESQUIVA -->
          <div class="sheet-defense">

            <!-- DEFESA -->
            <div class="sheet-defense-shield">
              <img src="https://crisordemparanormal.com/assets/shield-icon-FCvc8PM4.png" alt="Defesa">

              <div class="sheet-defense-main">
                <strong>
                  <input
                    class="def-edit"
                    id="defesa-${id}"
                    value="11"
                    onchange="saveDefense(${id})"
                  >
                </strong>
                <div class="sheet-defense-formula">
                  = 10 + AGI + Equip. + Outros
                </div>
                <div class="sheet-defense-formula">DEFESA</div>
              </div>
            </div>

            <!-- BLOQUEIO / ESQUIVA -->
            <div class="sheet-defense-side">

              <div class="sheet-defense-stat">
                <strong>
                  <input
                    class="def-edit"
                    id="bloqueio-${id}"
                    value="5"
                    onchange="saveDefense(${id})"
                  >
                </strong>
                <span>BLOQUEIO</span>
              </div>

              <div class="sheet-defense-stat">
                <strong>
                  <input
                    class="def-edit"
                    id="esquiva-${id}"
                    value="11"
                    onchange="saveDefense(${id})"
                  >
                </strong>
                <span>ESQUIVA</span>
              </div>

            </div>

          </div>

          <!-- PROTEÇÃO / RESISTÊNCIAS / PROFICIÊNCIAS -->
          <div class="sheet-notes">

            <div class="sheet-note-row">
              <span class="sheet-note-label">PROTEÇÃO</span>
              <input
                class="sheet-note-input"
                id="protecao-${id}"
                onblur="saveNotes(${id})"
              >
            </div>

            <div class="sheet-note-row">
              <span class="sheet-note-label">RESISTÊNCIAS</span>
              <input
                class="sheet-note-input"
                id="resistencias-${id}"
                onblur="saveNotes(${id})"
              >
            </div>

            <div class="sheet-note-row">
              <span class="sheet-note-label">PROFICIÊNCIAS</span>
              <input
                class="sheet-note-input"
                id="proficiencias-${id}"
                onblur="saveNotes(${id})"
              >
            </div>

          </div>

        </div>


        <div class="sheet-right">

        <div class="sheet-skills">
          <h3>PERÍCIAS</h3>

          ${renderSkills(id)}

        </div>

      </div>

        </div>
        </div>
      </div>
    </div>
  `;

  container.appendChild(sheet);
  makeDraggable(sheet);

  // WindowManager (se existir) – drag/minimize universal
  if (typeof initWindow === 'function') initWindow(sheet);

  // sincroniza HEX / PE
  setTimeout(() => {
    const lista = JSON.parse(localStorage.getItem("personagens")) || [];
    const personagem = lista.find(p => p.id === id);
    if (!personagem) return;

    const hexSelect = document.getElementById(`hex-${id}`);
    const peSpan = document.getElementById(`pe-${id}`);

    if (hexSelect && personagem.hex != null) {
      hexSelect.value = personagem.hex;
    }

    if (peSpan && personagem.peTurno != null) {
      peSpan.innerText = personagem.peTurno;
    }
  }, 0);

  ["vida","sanidade","esforco"].forEach(tipo => {
    ensureBarDefaults(id, tipo);
    updateBarUI(id, tipo);
  });
  
  // sincroniza defesa / bloqueio / esquiva
  setTimeout(() => {
    const lista = JSON.parse(localStorage.getItem("personagens")) || [];
    const personagem = lista.find(p => p.id === id);
    if (!personagem) return;

    if (personagem.defesa != null)
      document.getElementById(`defesa-${id}`).value = personagem.defesa;

    if (personagem.bloqueio != null)
      document.getElementById(`bloqueio-${id}`).value = personagem.bloqueio;

    if (personagem.esquiva != null)
      document.getElementById(`esquiva-${id}`).value = personagem.esquiva;
  }, 0);

  // sincroniza proteção / resistências / proficiências
  setTimeout(() => {
    const lista = JSON.parse(localStorage.getItem("personagens")) || [];
    const personagem = lista.find(p => p.id === id);
    if (!personagem) return;

    if (personagem.protecao != null)
      document.getElementById(`protecao-${id}`).value = personagem.protecao;

    if (personagem.resistencias != null)
      document.getElementById(`resistencias-${id}`).value = personagem.resistencias;

    if (personagem.proficiencias != null)
      document.getElementById(`proficiencias-${id}`).value = personagem.proficiencias;
  }, 0);
}

/* DRAG */
function makeDraggable(el) {
  const header = el.querySelector(".sheet-header");
  let offsetX = 0, offsetY = 0, isDown = false;

  header.onmousedown = e => {
    isDown = true;
    offsetX = el.offsetLeft - e.clientX;
    offsetY = el.offsetTop - e.clientY;
    el.style.zIndex = Date.now();
  };

  document.onmouseup = () => isDown = false;

  document.onmousemove = e => {
    if (!isDown) return;

    let x = e.clientX + offsetX;
    let y = e.clientY + offsetY;

    const maxX = window.innerWidth - el.offsetWidth;
    const maxY = window.innerHeight - el.offsetHeight;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    el.style.left = x + "px";
    el.style.top = y + "px";
  };
}

/* ===============================
   HEX / PE (5% em 5%)
   =============================== */

function renderHexOptions() {
  let html = "";
  for (let i = 5; i <= 95; i += 5) {
    html += `<option value="${i}">${i}%</option>`;
  }
  html += `<option value="99">99%</option>`;
  return html;
}

function updateHexPE(id) {
  const hexSelect = document.getElementById(`hex-${id}`);
  const peSpan = document.getElementById(`pe-${id}`);
  if (!hexSelect || !peSpan) return;

  const hex = Number(hexSelect.value);

  let pe;
  if (hex === 99) {
    pe = 20;
  } else {
    pe = Math.max(1, Math.floor(hex / 5));
  }

  peSpan.innerText = pe;

  // persistência
  const lista = JSON.parse(localStorage.getItem("personagens")) || [];
  const personagem = lista.find(p => p.id === id);
  if (!personagem) return;

  personagem.hex = hex;
  personagem.peTurno = pe;

  localStorage.setItem("personagens", JSON.stringify(lista));
}

/* ===============================
   DEFESA / BLOQUEIO / ESQUIVA
   =============================== */

function saveDefense(id) {
  const defesa = Number(document.getElementById(`defesa-${id}`)?.value) || 0;
  const bloqueio = Number(document.getElementById(`bloqueio-${id}`)?.value) || 0;
  const esquiva = Number(document.getElementById(`esquiva-${id}`)?.value) || 0;

  const lista = JSON.parse(localStorage.getItem("personagens")) || [];
  const personagem = lista.find(p => p.id === id);
  if (!personagem) return;

  personagem.defesa = defesa;
  personagem.bloqueio = bloqueio;
  personagem.esquiva = esquiva;

  localStorage.setItem("personagens", JSON.stringify(lista));
}

/* ===============================
   PROTEÇÃO / RESISTÊNCIAS / PROFICIÊNCIAS
   =============================== */

function saveNotes(id) {
  const lista = JSON.parse(localStorage.getItem("personagens")) || [];
  const personagem = lista.find(p => p.id === id);
  if (!personagem) return;

  personagem.protecao =
    document.getElementById(`protecao-${id}`)?.value || "";

  personagem.resistencias =
    document.getElementById(`resistencias-${id}`)?.value || "";

  personagem.proficiencias =
    document.getElementById(`proficiencias-${id}`)?.value || "";

  localStorage.setItem("personagens", JSON.stringify(lista));
}

/* ===============================
   PERÍCIAS – TABELA 2.1
   =============================== */

const SKILLS_TABLE = [
  ["Acrobacia", "AGI", false, true, false],
  ["Adestramento", "PRE", true, false, false],
  ["Artes", "PRE", true, false, false],
  ["Atletismo", "FOR", false, false, false],
  ["Atualidades", "INT", false, false, false],
  ["Ciências", "INT", true, false, false],
  ["Crime", "AGI", true, true, true],
  ["Diplomacia", "PRE", false, false, false],
  ["Enganação", "PRE", false, false, true],
  ["Fortitude", "VIG", false, false, false],
  ["Furtividade", "AGI", false, true, false],
  ["Iniciativa", "AGI", false, false, false],
  ["Intimidação", "PRE", false, false, false],
  ["Intuição", "INT", false, false, false],
  ["Investigação", "INT", false, false, false],
  ["Luta", "FOR", false, false, false],
  ["Medicina", "INT", false, false, true],
  ["Ocultismo", "INT", true, false, false],
  ["Percepção", "PRE", false, false, false],
  ["Pilotagem", "AGI", true, false, false],
  ["Pontaria", "AGI", false, false, false],
  ["Profissão", "INT", true, false, false],
  ["Reflexos", "AGI", false, false, false],
  ["Religião", "PRE", true, false, false],
  ["Sobrevivência", "INT", false, false, false],
  ["Tática", "INT", true, false, false],
  ["Tecnologia", "INT", true, false, true],
  ["Vontade", "PRE", false, false, false]
];

function renderSkills(id) {
  let html = "";

  SKILLS_TABLE.forEach(skill => {
    const [name, attr, trained, carga, kit] = skill;

    html += `
      <div class="skill-row">
        <div class="skill-name">${name}</div>
        <div class="skill-attr">${attr}</div>

        <div class="skill-check">
          <input type="checkbox" ${trained ? "checked" : ""} disabled>
        </div>

        <div class="skill-check">
          <input type="checkbox" ${carga ? "checked" : ""} disabled>
        </div>

        <div class="skill-check">
          <input type="checkbox" ${kit ? "checked" : ""} disabled>
        </div>
      </div>
    `;
  });

  return html;
}



/* ===============================
   CONTROLE DE EDIÇÃO DO BLOCO DE ATRIBUTOS
   =============================== */

var ATTR_EDIT_MODE = {};

function toggleAttributeBlock(id) {
  ATTR_EDIT_MODE[id] = !ATTR_EDIT_MODE[id];

  const block = document.querySelector(`.attributes-block[data-character-id="${id}"]`);
  const btn = block.querySelector(".attr-block-toggle");

  // Entrou em modo edição
  if (ATTR_EDIT_MODE[id]) {
    block.classList.add("editing");
    btn.innerText = "✔";

    // transforma TODOS os atributos em input automaticamente
    const nodes = block.querySelectorAll(".attr-node");
    nodes.forEach(node => {
      const attr = node.getAttribute("data-attr");
      const span = node.querySelector("span");
      if (!span) return;

      const input = document.createElement("input");
      input.type = "number";
      input.className = "attr-input";
      input.value = span.innerText;
      input.min = 0;
      input.max = 5;
      input.inputMode = "numeric";

      span.replaceWith(input);
    });

    return;
  }

  // Saiu do modo edição (CONFIRMOU)
  const lista = JSON.parse(localStorage.getItem("personagens")) || [];
  const personagem = lista.find(p => p.id === id);
  if (!personagem) return;

  const nodes = block.querySelectorAll(".attr-node");
  nodes.forEach(node => {
    const attr = node.getAttribute("data-attr");
    if (!attr) return;

    const input = node.querySelector(".attr-input");
    if (!input) return;

    let value = Number(input.value);
    if (isNaN(value)) value = 0;
    value = Math.max(0, Math.min(5, value));

    personagem.atributos[attr] = value;

    const span = document.createElement("span");
    span.id = `attr-${attr}-${id}`;
    span.innerText = value;
    input.replaceWith(span);
  });

  localStorage.setItem("personagens", JSON.stringify(lista));

  block.classList.remove("editing");
  btn.innerText = "✏️";
}


function rollAttribute(id, attr) {
  if (ATTR_EDIT_MODE[id]) return;

  const lista = JSON.parse(localStorage.getItem("personagens")) || [];
  const personagem = lista.find(p => p.id === id);
  if (!personagem) return;

  const user = JSON.parse(localStorage.getItem("user")) || { name: "Mestre" };

  const qtd = Math.max(1, personagem.atributos[attr] || 1);
  let rolls = [];

  for (let i = 0; i < qtd; i++) {
    rolls.push(Math.floor(Math.random() * 20) + 1);
  }

  const max = Math.max(...rolls);
  const min = Math.min(...rolls);

  const rollsHtml = rolls.map(v => {
    if (v === max) return `<span class="roll die-max">${v}</span>`;
    if (v === min) return `<span class="roll die-min">${v}</span>`;
    return `<span class="roll">${v}</span>`;
  }).join("");

  const html = `
    <div class="chat-roll-header">
      <strong>${user.name}</strong> → ${personagem.nome}
    </div>
    <div class="chat-roll-attr">
      Rolagem de <strong>${attr.toUpperCase()}</strong> (${qtd}d20)
    </div>
    <div class="chat-roll-dice">
      ${rollsHtml}
    </div>
  `;

  postToChat(html);
}



/* ===============================
   EDIÇÃO DE ATRIBUTOS NA FICHA
   =============================== */

function toggleAttrEdit(id, attr) { /* visual apenas */ }
