const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const scoreDisplay = document.getElementById('score');

canvas.width = 500;
canvas.height = 500;

let fruits = [];
let score = 0;
let gameRunning = false;

class Fruit {
    constructor(x, y, size, color, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speed = speed;
        this.caught = false;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    fall() {
        this.y += this.speed;
        if (this.y > canvas.height) this.caught = true;
    }
}

function spawnFruit() {
    const x = Math.random() * (canvas.width - 20) + 10;
    const size = Math.random() * 20 + 10;
    const color = `hsl(${Math.random() * 360}, 70%, 50%)`;
    const speed = Math.random() * 2 + 1;
    fruits.push(new Fruit(x, -size, size, color, speed));
}

function drawFruits() {
    fruits.forEach((fruit) => {
        if (!fruit.caught) {
            fruit.draw();
            fruit.fall();
        }
    });
    fruits = fruits.filter((fruit) => !fruit.caught);
}

function checkCollision(x, y) {
    fruits.forEach((fruit, index) => {
        const dist = Math.hypot(fruit.x - x, fruit.y - y);
        if (dist < fruit.size) {
            fruits.splice(index, 1);
            score += 1;
            scoreDisplay.textContent = score;
        }
    });
}

function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFruits();

    if (Math.random() < 0.02) {
        spawnFruit();
    }

    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    checkCollision(x, y);
});

startBtn.addEventListener('click', () => {
    gameRunning = true;
    score = 0;
    scoreDisplay.textContent = score;
    fruits = [];
    gameLoop();
});

if (window.Telegram && Telegram.WebApp) {
    const tg = Telegram.WebApp;
    tg.ready(); // Initialize the WebApp context
    tg.expand(); // Expand WebApp to full screen

    // Send the score to the bot when the game ends
    function endGame(score) {
        tg.sendData(JSON.stringify({ score })); // Sends score to bot
    }
}
