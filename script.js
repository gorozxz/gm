const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const playerTankImg = new Image();
const enemyTankImg = new Image();
const backgroundImg = new Image();
const shootSound = new Audio('sounds/shoot.mp3');
const explosionSound = new Audio('sounds/explosion.mp3');

playerTankImg.src = 'images/tank.png';
enemyTankImg.src = 'images/enemy-tank.png';
backgroundImg.src = 'images/background.jpg';

let playerTank = { x: 100, y: canvas.height / 2 - 25, width: 50, height: 50 };
let bullets = [];
let enemies = [];
let score = 0;
let gameOver = false;

// Menambahkan musuh secara acak
function createEnemyTank() {
    let enemyTank = {
        x: canvas.width,
        y: Math.random() * (canvas.height - 50),
        width: 50,
        height: 50,
        health: 1
    };
    enemies.push(enemyTank);
}

// Memperbarui game
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    
    // Gambar tank pemain
    ctx.drawImage(playerTankImg, playerTank.x, playerTank.y, playerTank.width, playerTank.height);
    
    // Gambar peluru
    bullets.forEach((bullet, bulletIndex) => {
        bullet.x += 5;
        ctx.fillStyle = 'red';
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        // Deteksi tabrakan dengan musuh
        enemies.forEach((enemy, enemyIndex) => {
            if (bullet.x < enemy.x + enemy.width && 
                bullet.x + bullet.width > enemy.x && 
                bullet.y < enemy.y + enemy.height && 
                bullet.y + bullet.height > enemy.y) {
                enemies.splice(enemyIndex, 1);
                bullets.splice(bulletIndex, 1);
                explosionSound.play();
                score++;
            }
        });

        if (bullet.x > canvas.width) {
            bullets.splice(bulletIndex, 1);
        }
    });

    // Gambar musuh dan gerakan
    enemies.forEach((enemy, index) => {
        enemy.x -= 2; // Kecepatan musuh
        ctx.drawImage(enemyTankImg, enemy.x, enemy.y, enemy.width, enemy.height);

        // Jika musuh keluar dari layar
        if (enemy.x + enemy.width < 0) {
            gameOver = true;
        }
    });

    document.getElementById('score').textContent = `Skor: ${score}`;
}

function gameLoop() {
    if (!gameOver) {
        update();
        if (Math.random() < 0.02) createEnemyTank(); // Munculkan musuh secara acak
        requestAnimationFrame(gameLoop);
    } else {
        document.getElementById('restartButton').style.display = 'block';
        alert("Game Over! Skor Anda: " + score);
    }
}

function restartGame() {
    playerTank.x = 100;
    playerTank.y = canvas.height / 2 - 25;
    bullets = [];
    enemies = [];
    score = 0;
    gameOver = false;
    document.getElementById('restartButton').style.display = 'none';
    gameLoop();
}

function moveTank(event) {
    if (event.key === 'ArrowUp' && playerTank.y > 0) {
        playerTank.y -= 20;
    } else if (event.key === 'ArrowDown' && playerTank.y < canvas.height - playerTank.height) {
        playerTank.y += 20;
    } else if (event.key === 'Space') {
        bullets.push({ x: playerTank.x + playerTank.width, y: playerTank.y + 20, width: 10, height: 5 });
        shootSound.play();
    }
}

document.addEventListener('keydown', moveTank);
document.getElementById('restartButton').addEventListener('click', restartGame);

// Mulai permainan
gameLoop();
