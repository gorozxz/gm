const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const rocketImg = new Image();
const obstacleImg = new Image();
const explosionSound = new Audio('sounds/explosion.mp3');
const scoreSound = new Audio('sounds/score.mp3');

rocketImg.src = 'images/rocket.png';
obstacleImg.src = 'images/obstacle.png';

let roket = { x: canvas.width / 2 - 15, y: canvas.height - 80, width: 30, height: 60 };
let rintangan = [];
let score = 0;
let gameOver = false;
let frame = 0;
let rintanganSpeed = 3;

function drawRoket() {
    ctx.drawImage(rocketImg, roket.x, roket.y, roket.width, roket.height);
}

function drawRintangan() {
    rintangan.forEach(r => {
        ctx.drawImage(obstacleImg, r.x, r.y, r.width, r.height);
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawRoket();
    drawRintangan();

    frame++;
    if (frame % 60 === 0) {
        let rintanganWidth = Math.random() * (canvas.width - 30) + 30;
        rintangan.push({ x: Math.random() * (canvas.width - rintanganWidth), y: 0, width: rintanganWidth, height: 20 });
    }
    
    rintangan.forEach((r, index) => {
        r.y += rintanganSpeed;

        // Check collision
        if (r.y + r.height > roket.y && r.x < roket.x + roket.width && r.x + r.width > roket.x) {
            gameOver = true;
            explosionSound.play(); // Play explosion sound
        }
        if (r.y > canvas.height) {
            rintangan.splice(index, 1);
            score++;
            scoreSound.play(); // Play score sound
            rintanganSpeed += 0.2; // Increase speed for difficulty
        }
    });

    document.getElementById('score').textContent = `Skor: ${score}`;
}

function gameLoop() {
    if (!gameOver) {
        update();
        requestAnimationFrame(gameLoop);
    } else {
        document.getElementById('restartButton').style.display = 'block';
        alert("Game Over! Skor Anda: " + score);
    }
}

function restartGame() {
    roket.x = canvas.width / 2 - 15;
    roket.y = canvas.height - 80;
    rintangan = [];
    score = 0;
    gameOver = false;
    frame = 0;
    rintanganSpeed = 3; // reset speed
    document.getElementById('restartButton').style.display = 'none';
    gameLoop();
}

function moveRoket(event) {
    if (event.key === 'ArrowLeft' && roket.x > 0) {
        roket.x -= 15;
    } else if (event.key === 'ArrowRight' && roket.x < canvas.width - roket.width) {
        roket.x += 15;
    }
}

document.addEventListener('keydown', moveRoket);
document.getElementById('restartButton').addEventListener('click', restartGame);

// Start the game
gameLoop();
