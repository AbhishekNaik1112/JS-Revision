const squares = document.querySelectorAll(".square");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
const pauseButton = document.querySelector("#pause");
const resumeButton = document.querySelector("#resume");
const animationContainer = document.querySelector("#animation-container");

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let countDownTimerId = null;
let isPaused = false;

function createScoreAnimation(x, y) {
  const animation = document.createElement("div");
  animation.textContent = "+1";
  animation.classList.add("score-animation");
  animation.style.left = `${x}px`;
  animation.style.top = `${y}px`;
  animationContainer.appendChild(animation);

  setTimeout(() => {
    animation.remove();
  }, 1000);
}

function randomSquare() {
  squares.forEach((square) => {
    square.textContent = "";
    square.classList.remove("mole");
  });

  const randomSquare = squares[Math.floor(Math.random() * squares.length)];
  randomSquare.classList.add("mole");
  randomSquare.textContent = "MOLE";
  hitPosition = randomSquare.id;
}

squares.forEach((square) => {
  square.addEventListener("mousedown", (e) => {
    if (square.id === hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;

      const rect = square.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top;

      createScoreAnimation(x, y);
    }
  });
});

function moveMole() {
  let speed = 600;
  timerId = setInterval(() => {
    randomSquare();
    if (currentTime <= 40 && currentTime > 20) speed = 500;
    if (currentTime <= 20) speed = 400;
    clearInterval(timerId);
    timerId = setInterval(randomSquare, speed);
  }, speed);
}

function countDown() {
  if (!isPaused) {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
      clearInterval(timerId);
      clearInterval(countDownTimerId);
      alert("GAME OVER! Your final score is " + result);
    }
  }
}

pauseButton.addEventListener("click", () => {
  isPaused = true;
  clearInterval(timerId);
});

resumeButton.addEventListener("click", () => {
  if (isPaused) {
    isPaused = false;
    moveMole();
  }
});

countDownTimerId = setInterval(countDown, 1000);
moveMole();
