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

// Canvas setup for balloons, stardust, and confetti
const canvas = document.getElementById('balloon-canvas');
const ctx = canvas.getContext('2d');

let balloons = [];
let stardust = [];
let confetti = [];

// Random pastel color for balloons
function randomColor() {
    const colors = ['#ffc1cc', '#add8e6', '#fff5ba'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Create a balloon object
function createBalloon() {
    return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        radius: 20 + Math.random() * 10,
        color: randomColor(),
        speed: 1 + Math.random() * 2
    };
}

// Create a stardust particle
function createStardust() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        opacity: Math.random() * 0.5 + 0.3,
        speed: 0.2 + Math.random() * 0.3
    };
}

// Create a confetti piece
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

// Drawing all particles
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

    requestAnimationFrame(draw);
}

// Setup particles on load and resize
function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    balloons = [];
    stardust = [];
    confetti = [];

    for (let i = 0; i < 50; i++) {
        balloons.push(createBalloon());
    }
    for (let i = 0; i < 100; i++) {
        stardust.push(createStardust());
    }
    for (let i = 0; i < 30; i++) {
        confetti.push(createConfetti());
    }

    draw();
}

// Initial setup
window.onload = () => {
    setupCanvas();
};

// Redraw everything on window resize
window.addEventListener('resize', setupCanvas);
