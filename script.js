// Play music when a music icon is clicked
function playMusic(num) {
    const audio = document.getElementById('audio-player');
    audio.src = `assets/music/song${num}.mp3`;
    audio.play();
}

// Open a popup image (love letter or quotes)
function openPopup(name) {
    document.getElementById('popup').classList.remove('hidden');
    document.getElementById('popup-img').src = `assets/popups/${name}.png`;
}

// Close the popup
function closePopup() {
    document.getElementById('popup').classList.add('hidden');
}

// Canvas setup for balloons, stardust, confetti, sparkles
const canvas = document.getElementById('balloon-canvas');
const ctx = canvas.getContext('2d');

let balloons = [];
let stardust = [];
let confetti = [];
let sparkles = [];

function randomColor() {
    const colors = ['#ffc1cc', '#add8e6', '#fff5ba'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createBalloon() {
    return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        radius: 20 + Math.random() * 10,
        color: randomColor(),
        speed: 1 + Math.random() * 2,
        alive: true
    };
}

function createStardust() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        opacity: Math.random() * 0.5 + 0.3,
        speed: 0.2 + Math.random() * 0.3
    };
}

function createConfetti() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 5 + Math.random() * 5,
        height: 5 + Math.random() * 5,
        color: ['#FFC0CB', '#ADD8E6', '#FFF5BA', '#FFB347', '#E0BBE4'][Math.floor(Math.random() * 5)],
        speedY: 1 + Math.random() * 2,
        speedX: (Math.random() - 0.5) * 1,
        angle: Math.random() * 360
    };
}

function createSparkle(x, y) {
    for (let i = 0; i < 10; i++) {
        sparkles.push({
            x: x,
            y: y,
            size: 2 + Math.random() * 2,
            dx: (Math.random() - 0.5) * 4,
            dy: (Math.random() - 0.5) * 4,
            life: 30 // frames to live
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw stardust
    stardust.forEach(dust => {
        ctx.beginPath();
        ctx.arc(dust.x, dust.y, dust.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dust.opacity})`;
        ctx.fill();
        dust.y += dust.speed;
        if (dust.y > canvas.height) {
            dust.y = 0;
            dust.x = Math.random() * canvas.width;
        }
    });

    // Draw balloons
    balloons.forEach((balloon, index) => {
        if (!balloon.alive) return;
        ctx.beginPath();
        ctx.arc(balloon.x, balloon.y, balloon.radius, 0, Math.PI * 2);
        ctx.fillStyle = balloon.color;
        ctx.fill();
        balloon.y -= balloon.speed;
        if (balloon.y + balloon.radius < 0) {
            balloons[index] = createBalloon();
        }
    });

    // Draw confetti
    confetti.forEach((piece, index) => {
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.angle * Math.PI / 180);
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.width/2, -piece.height/2, piece.width, piece.height);
        ctx.restore();

        piece.y += piece.speedY;
        piece.x += piece.speedX;
        piece.angle += piece.speedX * 5;

        if (piece.y > canvas.height) {
            confetti[index] = createConfetti();
        }
    });

    // Draw sparkles
    sparkles.forEach((sparkle, index) => {
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${sparkle.life / 30})`; // fade out
        ctx.fill();
        sparkle.x += sparkle.dx;
        sparkle.y += sparkle.dy;
        sparkle.life--;
    });

    // Remove dead sparkles
    sparkles = sparkles.filter(sparkle => sparkle.life > 0);

    requestAnimationFrame(draw);
}

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    balloons = [];
    stardust = [];
    confetti = [];
    sparkles = [];

    for (let i = 0; i < 50; i++) {
        balloons.push(createBalloon());
    }
    for (let i = 0; i < 100; i++) {
        stardust.push(createStardust());
    }
    for (let i = 0; i < 90; i++) {
        confetti.push(createConfetti());
    }

    draw();
}

// Balloon popping on click, with sparkles
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    balloons.forEach(balloon => {
        const dx = balloon.x - mouseX;
        const dy = balloon.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < balloon.radius && balloon.alive) {
            balloon.alive = false;
            createSparkle(balloon.x, balloon.y);
        }
    });
});

// Initial setup
window.onload = () => {
    setupCanvas();
};

window.addEventListener('resize', setupCanvas);
