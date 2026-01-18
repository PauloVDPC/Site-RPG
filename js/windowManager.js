
/* ===============================
   WINDOW MANAGER – FINAL
   Drag + Minimizar por botão
   =============================== */

function initWindow(winEl) {
  if (!winEl) return;
  if (winEl.__wm_inited) return;
  winEl.__wm_inited = true;

  makeWindowDraggable(winEl);
}

function getWindowHeader(winEl) {
  return winEl.querySelector(".window-header") || winEl.querySelector(".sheet-header");
}

function makeWindowDraggable(winEl) {
  const header = getWindowHeader(winEl);
  if (!header) return;

  let isDown = false;
  let startMouseX = 0;
  let startMouseY = 0;
  let startWinX = 0;
  let startWinY = 0;

  header.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    isDown = true;

    startMouseX = e.clientX;
    startMouseY = e.clientY;
    startWinX = winEl.offsetLeft;
    startWinY = winEl.offsetTop;

    winEl.style.zIndex = Date.now();
  });

  document.addEventListener("mouseup", () => {
    isDown = false;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDown) return;

    const dx = e.clientX - startMouseX;
    const dy = e.clientY - startMouseY;

    let x = startWinX + dx;
    let y = startWinY + dy;

    const maxX = window.innerWidth - winEl.offsetWidth;
    const maxY = window.innerHeight - winEl.offsetHeight;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    winEl.style.left = x + "px";
    winEl.style.top = y + "px";
  });
}

function toggleMinimize(winEl) {
  if (!winEl) return;
  winEl.classList.toggle("minimized");
}
