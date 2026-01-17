const user = JSON.parse(localStorage.getItem("user"));

const loginScreen = document.getElementById("login-screen");
const app = document.getElementById("app");

if (!user) {
  loginScreen.classList.remove("hidden");
  app.classList.add("hidden");
} else {
  loginScreen.classList.add("hidden");
  app.classList.remove("hidden");

  document.body.classList.add(
    user.role === "master" ? "is-master" : "is-player"
  );

  document.getElementById("user-info").innerText =
    `${user.name} (${user.role === "master" ? "Mestre" : "Jogador"})`;
}

function rollD20() {
  const value = Math.floor(Math.random() * 20) + 1;
  document.getElementById("dice-result").innerText =
    `Resultado: ${value}`;
}
