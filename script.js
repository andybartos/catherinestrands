
const words = ["OFFICE", "PAPER", "PEN", "DESK", "NOTES"];
const spangram = "OFFICE";
const gridLetters = ['T', 'N', 'R', 'P', 'K', 'S', 'E', 'I', 'P', 'E', 'R', 'E', 'R', 'A', 'A', 'H', 'C', 'D', 'P', 'I', 'R', 'P', 'E', 'N', 'P', 'K', 'S', 'E', 'C', 'E', 'O', 'T', 'D', 'I', 'M', 'O', 'O', 'F', 'F', 'R', 'U', 'S', 'R', 'E', 'K', 'A', 'M', 'E'];
const rows = 8;
const cols = 6;

let selected = [];
let foundWords = [];
let isTouching = false;

function drawGrid() {
  const grid = document.getElementById("grid");
  for (let i = 0; i < gridLetters.length; i++) {
    const cell = document.createElement("div");
    cell.textContent = gridLetters[i];
    cell.className = "cell";
    cell.dataset.index = i;
    cell.dataset.row = Math.floor(i / cols);
    cell.dataset.col = i % cols;
    cell.addEventListener("mousedown", () => startSelect(cell));
    cell.addEventListener("mouseenter", () => isTouching && toggleSelect(cell));
    cell.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target && target.classList.contains("cell")) {
        startSelect(target);
      }
    }, { passive: false });
    cell.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target && target.classList.contains("cell")) {
        toggleSelect(target);
      }
    });
    grid.appendChild(cell);
  }

  document.body.addEventListener("mouseup", endSelect);
  document.body.addEventListener("touchend", endSelect);
}

function startSelect(cell) {
  isTouching = true;
  toggleSelect(cell);
}

function endSelect() {
  if (selected.length > 0) {
    const word = selected.map(cell => cell.textContent).join("");
    const reversed = selected.map(cell => cell.textContent).reverse().join("");
    const normalized = word.toUpperCase();
    const normalizedRev = reversed.toUpperCase();
    const isFound = words.includes(normalized) || words.includes(normalizedRev);

    if (isFound) {
      selected.forEach(cell => {
        cell.classList.add(normalized === spangram ? "found-spangram" : "found");
        cell.classList.remove("selected");
      });
      foundWords.push(normalized);
    } else {
      selected.forEach(cell => cell.classList.remove("selected"));
    }
    selected = [];
  }
  isTouching = false;
}

function toggleSelect(cell) {
  const alreadySelected = selected.includes(cell);
  const last = selected[selected.length - 1];
  if (alreadySelected && cell === last) {
    cell.classList.remove("selected");
    selected.pop();
  } else if (!alreadySelected) {
    if (selected.length === 0 || isAdjacent(cell, last)) {
      cell.classList.add("selected");
      selected.push(cell);
    }
  }
}

function isAdjacent(cell1, cell2) {
  if (!cell1 || !cell2) return false;
  const r1 = parseInt(cell1.dataset.row), c1 = parseInt(cell1.dataset.col);
  const r2 = parseInt(cell2.dataset.row), c2 = parseInt(cell2.dataset.col);
  return Math.abs(r1 - r2) <= 1 && Math.abs(c1 - c2) <= 1;
}

drawGrid();
