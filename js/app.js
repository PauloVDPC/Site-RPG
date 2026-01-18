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
  const msg = input.value.trim();
  if (!msg) return;

  const log = document.getElementById("chat-log");
  const div = document.createElement("div");
  div.textContent = msg;
  log.appendChild(div);

  input.value = "";
  log.scrollTop = log.scrollHeight;
}

/* ===== PERSONAGENS ===== */
function addCharacterToList(name) {
  const list = document.getElementById("character-list");
  const li = document.createElement("li");
  li.textContent = name;
  list.appendChild(li);
}
