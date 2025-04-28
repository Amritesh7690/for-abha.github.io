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
        img.style.top = (10 + Math.random() * 70) + '%'; // safe 10% - 80%
        img.style.left = (10 + Math.random() * 80) + '%'; // safe 10% - 90%
        img.onclick = () => playMusic(i);
        container.appendChild(img);
    }

    // Quote icons
    for (let i = 1; i <= 7; i++) {
        const img = document.createElement('img');
        img.src = `assets/images/quote${i}_icon.png`;
        img.className = 'icon';
        img.style.top = (10 + Math.random() * 70) + '%';
        img.style.left = (10 + Math.random() * 80) + '%';
        img.onclick = () => openPopup(`quote${i}`);
        container.appendChild(img);
    }
}

// Balloons code stays the same
// ...

// Start everything
window.onload = () => {
    createFloatingIcons();
    setupCanvas();
};

window.addEventListener('resize', setupCanvas);
