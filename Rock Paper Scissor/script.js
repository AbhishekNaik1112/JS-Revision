let playerScore = 0;
let computerScore = 0;
let gameMode = '';
let remainingTime = 60;
let remainingRounds = 10;

const choices = ['rock', 'paper', 'scissors'];
const playerScoreSpan = document.getElementById('player-score');
const computerScoreSpan = document.getElementById('computer-score');
const resultDiv = document.getElementById('result');
const buttons = document.querySelectorAll('.choice');
const timeLeftDisplay = document.getElementById('time-left');
const roundsLeftDisplay = document.getElementById('rounds-left');
const timeSecondsSpan = document.getElementById('time-seconds');
const roundsSpan = document.getElementById('rounds');
const backButton = document.getElementById('back-button');
const modeSelection = document.getElementById('mode-selection');

const timeAttackBtn = document.getElementById('time-attack');
const survivalBtn = document.getElementById('survival');

timeAttackBtn.addEventListener('click', () => {
    gameMode = 'time-attack';
    startGame();
});

survivalBtn.addEventListener('click', () => {
    gameMode = 'survival';
    startGame();
});

backButton.addEventListener('click', () => {
    resetGame();
});

function startGame() {
    modeSelection.style.display = 'none';
    document.querySelector('.choices').style.display = 'flex';
    backButton.style.display = 'block';
    if (gameMode === 'time-attack') {
        timeLeftDisplay.style.display = 'block';
        startTimeAttackCountdown();
    }
    if (gameMode === 'survival') {
        roundsLeftDisplay.style.display = 'block';
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.id;
        const computerChoice = getComputerChoice();
        const winner = determineWinner(playerChoice, computerChoice);
        updateScores(winner);
        displayResult(winner, playerChoice, computerChoice);
    });
});

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    }
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'player';
    } else {
        return 'computer';
    }
}

function updateScores(winner) {
    if (winner === 'player') {
        playerScore++;
    } else if (winner === 'computer') {
        computerScore++;
    }
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
}

function displayResult(winner, playerChoice, computerChoice) {
    let resultMessage = '';
    let resultClass = '';
    if (winner === 'draw') {
        resultMessage = `It's a draw! Both chose ${capitalize(playerChoice)}.`;
        resultClass = 'draw';
    } else if (winner === 'player') {
        resultMessage = `You win! ${capitalize(playerChoice)} beats ${capitalize(computerChoice)}.`;
        resultClass = 'win';
    } else {
        resultMessage = `You lose! ${capitalize(computerChoice)} beats ${capitalize(playerChoice)}.`;
        resultClass = 'lose';
    }
    resultDiv.classList.add(resultClass);
    resultDiv.textContent = resultMessage;
    document.body.classList.add(resultClass);
    document.body.classList.add('blink');
    setTimeout(() => {
        document.body.classList.remove('blink');
        document.body.classList.remove(resultClass);
    }, 3000);
    setTimeout(() => resultDiv.classList.remove(resultClass), 2000);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function startTimeAttackCountdown() {
    const interval = setInterval(() => {
        remainingTime--;
        timeSecondsSpan.textContent = remainingTime;
        if (remainingTime <= 0) {
            clearInterval(interval);
            alert('Time is up! Game Over!');
        }
    }, 1000);
}

function updateSurvivalRounds() {
    roundsSpan.textContent = remainingRounds;
    if (remainingRounds <= 0) {
        alert('Game Over! You lost the game!');
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    remainingTime = 60;
    remainingRounds = 10;
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
    timeSecondsSpan.textContent = remainingTime;
    roundsSpan.textContent = remainingRounds;

    modeSelection.style.display = 'flex';
    document.querySelector('.choices').style.display = 'none';
    timeLeftDisplay.style.display = 'none';
    roundsLeftDisplay.style.display = 'none';
    backButton.style.display = 'none';
    resultDiv.textContent = '';
}
