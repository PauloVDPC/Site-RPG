/* ===============================
   TABS
   =============================== */
function openTab(tab) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

  document.querySelector(`[onclick="openTab('${tab}')"]`).classList.add("active");
  document.getElementById(tab).classList.add("active");
}

/* ===============================
   CHAT
   =============================== */
function sendMessage(event) {
  if (event.key !== "Enter") return;

  const input = event.target;
  const msg = input.value.trim();
  if (!msg) return;

  const div = document.createElement("div");
  div.textContent = msg;
  document.getElementById("chat-log").appendChild(div);
  input.value = "";
}

/* ===============================
   PERSONAGENS – SIDEBAR
   =============================== */
function addCharacterToSidebar(name, id) {
  const li = document.createElement("li");
  li.textContent = name;
  li.style.cursor = "pointer";
  li.onclick = () => toggleCharacterSheet(id);
  document.getElementById("character-list").appendChild(li);
}

window.onload = () => {
  const lista = JSON.parse(localStorage.getItem("personagens")) || [];
  lista.forEach(p => addCharacterToSidebar(p.nome, p.id));
};



/* ===============================
   CHAT – ROLAGENS DE DADO
   =============================== */
function postToChat(html) {
  const chat = document.getElementById("chat-log");
  if (!chat) return;

  const div = document.createElement("div");
  div.className = "chat-roll";
  div.innerHTML = html;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
