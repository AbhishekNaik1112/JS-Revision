const grid = document.getElementById("grid");
const resultDisplay = document.getElementById("result");
let currentShooterIndex = 202;
let results = 0;
const width = 15;
let alienInvaders = [];
let aliensRemoved = [];
const squares = [];
let invaderMovementInterval;
let invaderDirection = 1;
let level = 1;

for (let i = 0; i < 225; i++) {
    const square = document.createElement("div");
    grid.appendChild(square);
    squares.push(square);
}

function startLevel() {
    currentShooterIndex = 202;
    squares[currentShooterIndex].classList.add("shooter");
    alienInvaders = [];
    aliensRemoved = [];
    results = 0;
    resultDisplay.innerHTML = results;

    for (let i = 0; i < level * 5; i++) {
        const invaderIndex = Math.floor(Math.random() * 15);
        alienInvaders.push(invaderIndex);
        squares[invaderIndex].classList.add("invader");
    }

    invaderMovementInterval = setInterval(moveInvaders, 500 - level * 50);
}

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;

    if ((leftEdge && invaderDirection === -1) || (rightEdge && invaderDirection === 1)) {
        invaderDirection = width;
    } else if (invaderDirection === width) {
        if (leftEdge) {
            invaderDirection = 1;
        } else {
            invaderDirection = -1;
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove("invader");
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += invaderDirection;
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.add("invader");
    }

    if (alienInvaders.some(index => index >= 210)) {
        clearInterval(invaderMovementInterval);
        alert("Game Over!");
    }

    if (alienInvaders.length === 0) {
        level++;
        startLevel();
    }
}

document.addEventListener("keydown", (e) => {
    squares[currentShooterIndex].classList.remove("shooter");

    if (e.key === "ArrowLeft" && currentShooterIndex % width !== 0) {
        currentShooterIndex -= 1;
    } else if (e.key === "ArrowRight" && currentShooterIndex % width < width - 1) {
        currentShooterIndex += 1;
    }

    squares[currentShooterIndex].classList.add("shooter");
});

function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser() {
        squares[currentLaserIndex].classList.remove("laser");
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add("laser");

        if (squares[currentLaserIndex].classList.contains("invader")) {
            squares[currentLaserIndex].classList.remove("laser");
            squares[currentLaserIndex].classList.remove("invader");
            squares[currentLaserIndex].classList.add("boom");

            setTimeout(() => squares[currentLaserIndex].classList.remove("boom"), 300);

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
            aliensRemoved.push(alienRemoved);
            alienInvaders.splice(alienRemoved, 1);

            results++;
            resultDisplay.innerHTML = results;
        }
    }

    if (e.key === "ArrowUp") {
        laserId = setInterval(moveLaser, 100);
    }
}

document.addEventListener('keydown', shoot);

startLevel();
