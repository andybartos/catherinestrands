
const words = ["OFFICE", "PAPER", "PEN", "DESK", "CHAIR", "MOUSE", "MARKER", "PRINTER"];
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
  if (cell.classList.contains("found") || cell.classList.contains("found-spangram")) return;

  const r = parseInt(cell.dataset.row);
  const c = parseInt(cell.dataset.col);

  if (selected.length === 0) {
    selected.push(cell);
    cell.classList.add("selected");
    return;
  }

  const r0 = parseInt(selected[0].dataset.row);
  const c0 = parseInt(selected[0].dataset.col);

  const dr = r - r0;
  const dc = c - c0;

  const len = selected.length;
  const nextRow = r0 + (len * Math.sign(dr));
  const nextCol = c0 + (len * Math.sign(dc));

  if (parseInt(cell.dataset.row) === nextRow && parseInt(cell.dataset.col) === nextCol) {
    selected.push(cell);
    cell.classList.add("selected");

    const word = selected.map(c => c.textContent).join("").toUpperCase();
    const revWord = selected.map(c => c.textContent).reverse().join("").toUpperCase();

    if (words.includes(word) || words.includes(revWord)) {
      selected.forEach(c => {
        c.classList.remove("selected");
        c.classList.add(word === spangram || revWord === spangram ? "found-spangram" : "found");
      });
      foundWords.push(word);
      selected = [];
    }
  } else {
    resetSelection();
  }
}

function resetSelection() {
  selected.forEach(c => c.classList.remove("selected"));
  selected = [];
}

drawGrid();
