const startBtn = document.getElementById('startBtn');
const replayBtn = document.getElementById('replayBtn');
const gameBoard = document.getElementById('game-board');
const messageEl = document.getElementById('message');
const turnsEl = document.getElementById('turns');
const winsEl = document.getElementById('wins');
const lossesEl = document.getElementById('losses');

let colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
let gameColors = [];
let flippedCards = [];
let matchedPairs = 0;
let turns = 0;
let wins = 0;
let losses = 0;

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    gameBoard.innerHTML = '';
    gameColors = shuffleArray([...colors, ...colors]);
    gameColors.forEach((color) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard(e) {
    const card = e.target;
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.style.backgroundColor = card.dataset.color;
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            turns--;
            turnsEl.textContent = turns;
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.color === card2.dataset.color) {
        matchedPairs++;
        messageEl.textContent = 'Match found!';

        if (matchedPairs === colors.length) {
            messageEl.textContent = '🎉 You Won!';
            wins++;
            winsEl.textContent = wins;

            // Example win actions
            document.body.style.backgroundColor = "#d4edda"; // green background
            if (matchedPairs === colors.length) {
                messageEl.textContent = '🎉 You Won!';
                wins++;
                winsEl.textContent = wins;

                document.body.style.backgroundColor = "#d4edda"; // green background
                showSparkles(50); // trigger sparkling effect
                alert("Congratulations! You won the game!");
            }

            // Optional: play sound or show confetti if implemented
        }

    } else {
        // Not a match: flip cards back
        card1.style.backgroundColor = '#ccc';
        card2.style.backgroundColor = '#ccc';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];

    // Check for loss
    if (turns === 0 && matchedPairs !== colors.length) {
        messageEl.textContent = 'Game Over!';
        losses++;
        lossesEl.textContent = losses;
    }
}

function startGame() {
    flippedCards = [];
    matchedPairs = 0;
    turns = colors.length * 2;
    turnsEl.textContent = turns;
    messageEl.textContent = 'Game started!';
    document.body.style.backgroundColor = "#d4edda"; // reset background
    createBoard();
}
function showSparkles(count = 30) {
    const container = document.getElementById('sparkle-container');
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        // Random position
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';

        // Random size
        const size = Math.random() * 8 + 4;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';

        container.appendChild(sparkle);

        // Remove sparkle after animation
        sparkle.addEventListener('animationend', () => sparkle.remove());
    }
}

function replayGame() {
    startGame();
}

startBtn.addEventListener('click', startGame);
replayBtn.addEventListener('click', replayGame);
