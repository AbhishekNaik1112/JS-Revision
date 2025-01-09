const grid = document.querySelector('.grid');
const user = document.querySelector('.user');
const ball = document.querySelector('.ball');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const levelDisplay = document.getElementById('level');
const startBtn = document.getElementById('start-btn');

let score = 0;
let lives = 3;
let level = 1;
let timerId;
let ballSpeed = 20;

const gridWidth = grid.offsetWidth;
const gridHeight = grid.offsetHeight;
const ballDiameter = 20;
let userWidth = gridWidth * 0.15;

let ballPosition = [gridWidth / 2 - ballDiameter / 2, gridHeight / 2];
let ballDirection = [2, 2];

let userPosition = [gridWidth / 2 - userWidth / 2, gridHeight - 30];

let blocks = [];

function createBlocks(rows = 4, columns = 10) {
  const blockWidth = gridWidth / columns;
  const blockHeight = 20;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const block = document.createElement('div');
      block.classList.add('block');
      block.style.left = `${col * blockWidth}px`;
      block.style.top = `${row * blockHeight}px`;
      block.style.width = `${blockWidth}px`;
      grid.appendChild(block);
      blocks.push(block);
    }
  }
}

function moveUser(e) {
  if (e.key === 'ArrowLeft' && userPosition[0] > 0) {
    userPosition[0] -= 20;
  }
  if (e.key === 'ArrowRight' && userPosition[0] < gridWidth - userWidth) {
    userPosition[0] += 20;
  }
  user.style.left = `${userPosition[0]}px`;
}

function moveBall() {
  ballPosition[0] += ballDirection[0];
  ballPosition[1] += ballDirection[1];

  if (ballPosition[0] <= 0 || ballPosition[0] >= gridWidth - ballDiameter) {
    ballDirection[0] *= -1;
  }
  if (ballPosition[1] <= 0) {
    ballDirection[1] *= -1;
  }

  if (
    ballPosition[1] >= userPosition[1] - ballDiameter &&
    ballPosition[0] > userPosition[0] &&
    ballPosition[0] < userPosition[0] + userWidth
  ) {
    ballDirection[1] *= -1;
  }

  blocks.forEach((block, index) => {
    const blockLeft = parseInt(block.style.left);
    const blockTop = parseInt(block.style.top);
    const blockWidth = parseInt(block.style.width);
    const blockHeight = 20;

    if (
      ballPosition[0] > blockLeft &&
      ballPosition[0] < blockLeft + blockWidth &&
      ballPosition[1] > blockTop &&
      ballPosition[1] < blockTop + blockHeight
    ) {
      block.remove();
      blocks.splice(index, 1);
      ballDirection[1] *= -1;
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      if (blocks.length === 0) {
        nextLevel();
      }
    }
  });

  if (ballPosition[1] >= gridHeight) {
    lives--;
    livesDisplay.textContent = `Lives: ${lives}`;
    if (lives === 0) {
      clearInterval(timerId);
      alert('Game Over!');
      location.reload();
    } else {
      resetBall();
    }
  }

  ball.style.left = `${ballPosition[0]}px`;
  ball.style.top = `${ballPosition[1]}px`;
}

function nextLevel() {
  clearInterval(timerId);
  level++;
  ballSpeed -= 2;
  levelDisplay.textContent = `Level: ${level}`;
  blocks = [];
  grid.innerHTML = '<div class="user"></div><div class="ball"></div>';
  createBlocks(level + 3);
  resetBall();
  timerId = setInterval(moveBall, ballSpeed);
}

function resetBall() {
  ballPosition = [gridWidth / 2 - ballDiameter / 2, gridHeight / 2];
  ballDirection = [2, 2];
}

function startGame() {
  createBlocks();
  document.addEventListener('keydown', moveUser);
  timerId = setInterval(moveBall, ballSpeed);
  startBtn.style.display = 'none';
}

startBtn.addEventListener('click', startGame);
