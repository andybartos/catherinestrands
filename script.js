
const words = ["OFFICE", "PAPER", "PEN", "DESK", "NOTES"];
const spangram = "OFFICE";
const gridLetters = ['T', 'N', 'R', 'P', 'K', 'S', 'E', 'I', 'P', 'E', 'R', 'E', 'R', 'A', 'A', 'H', 'C', 'D', 'P', 'I', 'R', 'P', 'E', 'N', 'P', 'K', 'S', 'E', 'C', 'E', 'O', 'T', 'D', 'I', 'M', 'O', 'O', 'F', 'F', 'R', 'U', 'S', 'R', 'E', 'K', 'A', 'M', 'E'];
const rows = 8;
const cols = 6;

let selected = [];
let foundWords = [];

function drawGrid() {
  const grid = document.getElementById("grid");
  for (let i = 0; i < gridLetters.length; i++) {
    const cell = document.createElement("div");
    cell.textContent = gridLetters[i];
    cell.className = "cell";
    cell.dataset.index = i;
    cell.dataset.row = Math.floor(i / cols);
    cell.dataset.col = i % cols;
    cell.addEventListener("click", () => handleTap(cell));
    grid.appendChild(cell);
  }
}

function handleTap(cell) {
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
  } else {
    selected.forEach(c => c.classList.remove("selected"));
    selected = [];
  }

  if (selected.length > 0) {
    const word = selected.map(c => c.textContent).join("");
    const reversed = selected.map(c => c.textContent).reverse().join("");
    const norm = word.toUpperCase();
    const revNorm = reversed.toUpperCase();

    if (words.includes(norm) || words.includes(revNorm)) {
      selected.forEach(c => {
        c.classList.add(norm === spangram ? "found-spangram" : "found");
        c.classList.remove("selected");
      });
      foundWords.push(norm);
      selected = [];
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
