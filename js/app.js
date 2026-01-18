function openTab(tab) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
  document.querySelector(`[onclick="openTab('${tab}')"]`).classList.add("active");
  document.getElementById(tab).classList.add("active");
}

/* ===== CHAT ===== */
function sendMessage(event) {
  if (event.key !== "Enter") return;
  const input = event.target;
  if (!input.value.trim()) return;

  const div = document.createElement("div");
  div.textContent = input.value;
  document.getElementById("chat-log").appendChild(div);
  input.value = "";
}

/* ===== PERSONAGENS ===== */
function addCharacterToSidebar(name) {
  const li = document.createElement("li");
  li.textContent = name;
  document.getElementById("character-list").appendChild(li);
}

/* ===== CARREGAR AO INICIAR ===== */
window.onload = () => {
  const lista = JSON.parse(localStorage.getItem("personagens")) || [];
  lista.forEach(p => addCharacterToSidebar(p.nome));
};
