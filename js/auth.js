function handleLogin() {
  const name = document.getElementById("username").value.trim();
  const role = document.querySelector('input[name="role"]:checked').value;

  if (!name) {
    alert("Informe seu nome");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ name, role }));
  location.reload();
}

function logout() {
  localStorage.removeItem("user");
  location.reload();
}
