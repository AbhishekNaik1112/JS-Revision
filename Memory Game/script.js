let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let timerInterval;
let seconds = 0;
let minutes = 0;

const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('#result');
const timerDisplay = document.querySelector('#timer');

const cardArray = [
  { name: '1', color: 'red' },
  { name: '2', color: 'blue' },
  { name: '3', color: 'green' },
  { name: '4', color: 'yellow' },
  { name: '5', color: 'purple' },
  { name: '6', color: 'orange' },
  { name: '7', color: 'pink' },
  { name: '8', color: 'cyan' },
  { name: '1', color: 'red' },
  { name: '2', color: 'blue' },
  { name: '3', color: 'green' },
  { name: '4', color: 'yellow' },
  { name: '5', color: 'purple' },
  { name: '6', color: 'orange' },
  { name: '7', color: 'pink' },
  { name: '8', color: 'cyan' },
];

cardArray.sort(() => 0.5 - Math.random());

function startNewGame() {
  cardsChosen = [];
  cardsChosenId = [];
  cardsWon = [];
  seconds = 0;
  minutes = 0;
  resultDisplay.textContent = 'Score: 0';
  timerDisplay.textContent = 'Time: 00:00';
  clearInterval(timerInterval);
  startTimer();
  createBoard();
}

function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    timerDisplay.textContent = `Time: ${formatTime(minutes)}:${formatTime(seconds)}`;
  }, 1000);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function createBoard() {
  grid.innerHTML = ''; 
  cardArray.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.setAttribute('data-id', index);
    cardElement.classList.add('card');
    cardElement.addEventListener('click', flipCard);
    grid.appendChild(cardElement);
  });
}

function flipCard() {
  const cardId = this.getAttribute('data-id');
  if (cardsChosenId.length < 2 && !cardsChosenId.includes(cardId)) {
    this.style.backgroundColor = cardArray[cardId].color;
    this.classList.add('flip');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);

    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }
}

function checkForMatch() {
  const cards = document.querySelectorAll('.grid div');
  const [optionOneId, optionTwoId] = cardsChosenId;

  if (cardsChosen[0] === cardsChosen[1]) {
    cards[optionOneId].removeEventListener('click', flipCard);
    cards[optionTwoId].removeEventListener('click', flipCard);
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].style.backgroundColor = 'gray';
    cards[optionTwoId].style.backgroundColor = 'gray';
    cards[optionOneId].classList.remove('flip');
    cards[optionTwoId].classList.remove('flip');
  }

  cardsChosen = [];
  cardsChosenId = [];
  resultDisplay.textContent = `Score: ${cardsWon.length}`;

  if (cardsWon.length === cardArray.length / 2) {
    clearInterval(timerInterval);
    resultDisplay.textContent = 'Congratulations!';
  }
}

startNewGame();
