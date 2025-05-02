
const words = ['OFFICE', 'PRINTER', 'PAPER', 'MOUSE', 'DESK', 'PEN', 'CHAIR', 'MARKER'];
const spangram = "OFFICE";
const gridLetters = ['T', 'N', 'R', 'P', 'K', 'S', 'E', 'I', 'P', 'E', 'R', 'E', 'R', 'A', 'A', 'H', 'C', 'D', 'P', 'I', 'R', 'P', 'E', 'N', 'P', 'K', 'S', 'E', 'C', 'E', 'O', 'T', 'D', 'I', 'M', 'O', 'O', 'F', 'F', 'R', 'U', 'S', 'R', 'E', 'K', 'A', 'M', 'E'];
const rows = 8;
const cols = 6;
let selected = [];

function drawGrid() {
  const grid = document.getElementById("grid");
  for (let i = 0; i < gridLetters.length; i++) {
    const cell = document.createElement("div");
    cell.textContent = gridLetters[i];
    cell.className = "cell";
    cell.dataset.index = i;
    cell.dataset.row = Math.floor(i / cols);
    cell.dataset.col = i % cols;
    cell.addEventListener("touchstart", startSelection, { passive: false });
    cell.addEventListener("mousedown", startSelection);
    grid.appendChild(cell);
  }
  document.addEventListener("touchmove", handleTouchMove, { passive: false });
  document.addEventListener("touchend", endSelection);
  document.addEventListener("mouseup", endSelection);
}

function startSelection(e) {
  e.preventDefault();
  clearSelection();
  const target = e.target.closest(".cell");
  if (target) selectCell(target);
}

function handleTouchMove(e) {
  const touch = e.touches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  if (target && target.classList.contains("cell")) {
    const last = selected[selected.length - 1];
    if (!selected.includes(target) && isAdjacent(last, target)) {
      selectCell(target);
    }
  }
}

function selectCell(cell) {
  cell.classList.add("selected");
  selected.push(cell);
}

function endSelection() {
  if (selected.length > 0) {
    const word = selected.map(c => c.textContent).join("").toUpperCase();
    const reverse = selected.map(c => c.textContent).reverse().join("").toUpperCase();
    if (words.includes(word) || words.includes(reverse)) {
      selected.forEach(c => {
        c.classList.remove("selected");
        c.classList.add((word === spangram || reverse === spangram) ? "found-spangram" : "found");
      });
    } else {
      selected.forEach(c => c.classList.remove("selected"));
    }
  }
  selected = [];
}

function clearSelection() {
  selected.forEach(c => c.classList.remove("selected"));
  selected = [];
}

function isAdjacent(a, b) {
  const r1 = parseInt(a.dataset.row), c1 = parseInt(a.dataset.col);
  const r2 = parseInt(b.dataset.row), c2 = parseInt(b.dataset.col);
  return Math.abs(r1 - r2) <= 1 && Math.abs(c1 - c2) <= 1;
}

drawGrid();
