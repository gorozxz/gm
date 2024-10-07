const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let roket = { x: canvas.width / 2 - 15, y: canvas.height - 60, width: 30, height: 60 };
let rintangan = [];
let score = 0;
let gameOver = false;
let frame = 0;

function drawRoket() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(roket.x, roket.y, roket.width, roket.height);
}

function drawRintangan() {
    ctx.fillStyle = 'red';
    rintangan.forEach(r => {
        ctx.fillRect(r.x, r.y, r.width, r.height);
    });
}

function update() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw roket dan rintangan
    drawRoket();
    drawRintangan();

    // Update dan random rintangan
    frame++;
    if (frame % 60 === 0) {
        let rintanganWidth = Math.random() * (canvas.width - 30) + 30;
        rintangan.push({ x: Math.random() * (canvas.width - rintanganWidth), y: 0, width: rintanganWidth, height: 20 });
    }
    
    rintangan.forEach((r, index) => {
        r.y += 3;
        // Check collision
        if (r.y + r.height > roket.y && r.x < roket.x + roket.width && r.x + r.width > roket.x) {
            gameOver = true;
        }
        if (r.y > canvas.height) {
            rintangan.splice(index, 1);
            score++;
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
    roket.y = canvas.height - 60;
    rintangan = [];
    score = 0;
    gameOver = false;
    frame = 0;
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

// Mulai permainan
gameLoop();
