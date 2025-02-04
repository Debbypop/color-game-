let score = 0;
let highScore = 0;
let targetColor;
let seconds = 60;
let timerInterval;

let colorOptions = document.querySelectorAll('.color-option');
let colorBox = document.querySelector('.color-box');
let gameStatus = document.querySelector('.game-status');
let scoreDisplay = document.querySelector('#score');
let timeLeftDisplay = document.querySelector('.time-left');
let newGameButton = document.querySelector('#new-game-button');
let playGameButton = document.querySelector('#play-game-button');
let instructionPage = document.querySelector('.instruction-page');
let gamePage = document.querySelector('.game-page');
let gameOverModal = document.querySelector('#game-over-modal');
let finalScoreDisplay = document.querySelector('#final-score');
let continueButton = document.querySelector('#continue-button');
let exitButton = document.querySelector('#exit-button');
let highScoreDisplay = document.querySelector('#high-score');

// Generate a base color
function generateRandomColor() {
    let r = Math.floor(Math.random() * 200);
    let g = Math.floor(Math.random() * 200);
    let b = Math.floor(Math.random() * 200);
    return `rgb(${r}, ${g}, ${b})`;
}

// Generate different shades of the target color
function generateShadesOfColor(color) {
    let shades = [];
    let rgb = color.match(/\d+/g);
    let r = parseInt(rgb[0]);
    let g = parseInt(rgb[1]);
    let b = parseInt(rgb[2]);

    for (let i = 0; i < 6; i++) {
        let variation = (i - 2) * 30; // Adjust brightness
        let shadeR = Math.min(255, Math.max(0, r + variation));
        let shadeG = Math.min(255, Math.max(0, g + variation));
        let shadeB = Math.min(255, Math.max(0, b + variation));
        shades.push(`rgb(${shadeR}, ${shadeG}, ${shadeB})`);
    }

    return shades;
}

// Start a new game
function startNewGame() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    seconds = 60;
    timeLeftDisplay.textContent = `Time left: ${formatTime(seconds)}`;
    startTimer();
    newRound();
}

// Generate a new round with the same base color but different shades
function newRound() {
    targetColor = generateRandomColor();
    colorBox.style.backgroundColor = targetColor;
    let shades = generateShadesOfColor(targetColor);
    shades.sort(() => Math.random() - 0.5);
    
    colorOptions.forEach((option, index) => {
        option.style.backgroundColor = shades[index];
        option.dataset.correct = shades[index] === targetColor ? "true" : "false";
    });

    gameStatus.textContent = '';
}

// Start the countdown timer
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        seconds--;
        timeLeftDisplay.textContent = `Time left: ${formatTime(seconds)}`;
        if (seconds === 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// Format timer display
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// End the game and show final score
function endGame() {
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.textContent = `High Score: ${highScore}`;
    }
    gameOverModal.style.display = 'block';
    finalScoreDisplay.textContent = score;
    gamePage.style.display = 'none';
}

// Handle user guesses
colorOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        if (e.target.dataset.correct === "true") {
            gameStatus.textContent = 'Correct!';
            gameStatus.style.color = 'green';
            score++;
        } else {
            gameStatus.textContent = 'Wrong!';
            gameStatus.style.color = 'red';
        }
        scoreDisplay.textContent = `Score: ${score}`;
        setTimeout(() => {
            gameStatus.textContent = '';
            newRound();
        }, 1000);
    });
});

// Restart game
newGameButton.addEventListener('click', () => {
    gameOverModal.style.display = 'none';
    gamePage.style.display = 'block';
    startNewGame();
});

// Start game on play button click
playGameButton.addEventListener('click', () => {
    instructionPage.style.display = 'none';
    gamePage.style.display = 'block';
    startNewGame();
});

// Continue button restarts game
continueButton.addEventListener('click', () => {
    gameOverModal.style.display = 'none';
    gamePage.style.display = 'block';
    startNewGame();
});

// Exit button