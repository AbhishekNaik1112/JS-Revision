const board = document.getElementById('game-board');
const statusText = document.getElementById('game-status');
const resetBtn = document.getElementById('reset-btn');

const rows = 6;
const cols = 7;
const grid = [];
let currentPlayer = 'player-one';
let gameActive = true;

function createBoard() {
  for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;
      grid[r][c] = cell;
      board.appendChild(cell);
    }
  }
}

board.addEventListener('click', (e) => {
  if (!gameActive || !e.target.classList.contains('cell')) return;

  const col = parseInt(e.target.dataset.col, 10);

  for (let r = rows - 1; r >= 0; r--) {
    const cell = grid[r][col];
    if (!cell.classList.contains('taken')) {
      cell.classList.add('taken', currentPlayer);
      cell.classList.add('falling');
      setTimeout(() => cell.classList.remove('falling'), 500);

      checkWin(r, col);
      currentPlayer = currentPlayer === 'player-one' ? 'player-two' : 'player-one';
      statusText.textContent = `${capitalize(currentPlayer)}'s Turn`;
      return;
    }
  }

  alert('Column is full! Choose a different column.');
});

function checkWin(row, col) {
  const directions = [
    { dr: 0, dc: 1 }, 
    { dr: 1, dc: 0 }, 
    { dr: 1, dc: 1 }, 
    { dr: 1, dc: -1 }
  ];

  for (let { dr, dc } of directions) {
    const line = getWinningLine(row, col, dr, dc);
    if (line.length === 4) {
      highlightWinningLine(line);
      statusText.textContent = `${capitalize(currentPlayer)} Wins! 🎉`;
      gameActive = false;
      alert(`${capitalize(currentPlayer)} Wins!`);
      return;
    }
  }

  if (grid.flat().every(cell => cell.classList.contains('taken'))) {
    statusText.textContent = 'Draw!';
    gameActive = false;
  }
}

function getWinningLine(row, col, dr, dc) {
  const line = [];
  for (let i = -3; i <= 3; i++) {
    const r = row + i * dr;
    const c = col + i * dc;
    if (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c].classList.contains(currentPlayer)) {
      line.push(grid[r][c]);
    }
  }
  return line;
}

function highlightWinningLine(line) {
  line.forEach(cell => {
    cell.classList.add('winning-line');
  });
}

function capitalize(player) {
  return player.replace('-', ' ').replace(/(^|\s)\S/g, letter => letter.toUpperCase());
}

resetBtn.addEventListener('click', () => {
  board.innerHTML = '';
  grid.length = 0;
  createBoard();
  currentPlayer = 'player-one';
  gameActive = true;
  statusText.textContent = "Player One's Turn";
});

createBoard();
