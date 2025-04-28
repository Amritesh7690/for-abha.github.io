function playMusic(num) {
    const audio = document.getElementById('audio-player');
    audio.src = `assets/music/song${num}.mp3`;
    audio.play();
}

function openPopup(name) {
    document.getElementById('popup').classList.remove('hidden');
    document.getElementById('popup-img').src = `assets/popups/${name}.png`;
}

function closePopup() {
    document.getElementById('popup').classList.add('hidden');
}

function createFloatingIcons() {
    const container = document.getElementById('floating-icons');

    // Music icons
    for (let i = 1; i <= 5; i++) {
        const img = document.createElement('img');
        img.src = `assets/images/music${i}.png`;
        img.className = 'icon';
        img.style.top = Math.random() * 80 + 'vh'; // vh = viewport height
        img.style.left = Math.random() * 90 + 'vw'; // vw = viewport width
        img.style.animationDelay = (Math.random() * 20) + 's'; // random float timing
        img.onclick = () => playMusic(i);
        container.appendChild(img);
    }

    // Quote icons
    for (let i = 1; i <= 7; i++) {
        const img = document.createElement('img');
        img.src = `assets/images/quote${i}_icon.png`;
        img.className = 'icon';
        img.style.top = Math.random() * 80 + 'vh';
        img.style.left = Math.random() * 90 + 'vw';
        img.style.animationDelay = (Math.random() * 20) + 's';
        img.onclick = () => openPopup(`quote${i}`);
        container.appendChild(img);
    }
}

// Balloons (already correctly set up before)...
const canvas = document.getElementById('balloon-canvas');
const ctx = canvas.getContext('2d');
let balloons = [];

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
        speed: 1 + Math.random() * 2
    };
}

function drawBalloons() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    requestAnimationFrame(drawBalloons);
}

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    balloons = [];
    for (let i = 0; i < 50; i++) {
        balloons.push(createBalloon());
    }
    drawBalloons();
}

// Load everything
window.onload = () => {
    createFloatingIcons();
    setupCanvas();
};

window.addEventListener('resize', setupCanvas);
