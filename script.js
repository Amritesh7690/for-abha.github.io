const musicBooths = document.querySelectorAll('.booth.music');
const quoteBooths = document.querySelectorAll('.booth.quote');
const bigLetterBooth = document.querySelector('.booth.big-letter');
const popup = document.getElementById('popup');
const popupContent = document.getElementById('popup-content');
const audioPlayer = document.getElementById('player');

const quotes = [
  "And I'd choose you; in a hundred lifetimes, in a hundred worlds, in any version of reality, I'd find you and I'd choose you.",
  "He's more myself than I am. Whatever our souls are made of, his and mine are the same.",
  "If all else perished, and he remained, I should still continue to be; and if all else remained, and he were annihilated, the universe would turn to a mighty stranger.",
  "She wasn't doing a thing that I could see, except standing there, leaning on the balcony railing, holding the universe together.",
  "You have given me a thing I could never have imagined, before I knew you. It's like I had the word 'book,' and you put one in my hands. I had the word 'game,' and you taught me how to play. I had the word 'life,' and then you came along and said, 'Oh! You mean this.'",
  "I'll be looking for you, every moment, every single moment. And when we do find each other again, we'll cling together so tight that nothing and no one will ever tear us apart. Every atom of you and every atom of me... we'll live in birds and flowers and dragonflies and pine trees and in clouds and in those little specks of light you see floating in sunbeams...",
  "He could not be mistaken. There were no other eyes like those in the world. There was only one creature in the world who could concentrate for him all the brightness and meaning of life. It was she."
];

const loveLetter = `
Dearest Abha,<br><br>
What do I say here that I possibly haven't told you already? That I love you beyond words? That you bring such indescribable joy into my life? That I can stare at you all day long and still not tire? That your existence is my proof that beauty exists in this world? That I love you in all your awkward, cute, gorgeous, sexy, intelligent, beautiful glory? That I feel a deep sense of warmth at thinking of spending the rest of the days with you?<br><br>
I do.<br><br>
I love you.<br><br>
To you and you and you and you and you,<br>
Yours and yours and yours and yours and yours,<br><br>
A.
`;

musicBooths.forEach(booth => {
  booth.addEventListener('click', () => {
    const song = booth.getAttribute('data-song');
    if (audioPlayer.src.includes(song)) {
      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    } else {
      audioPlayer.src = `assets/music/${song}`;
      audioPlayer.play();
    }
    shootConfetti();
  });
});

quoteBooths.forEach(booth => {
  booth.addEventListener('click', () => {
    const index = booth.getAttribute('data-quote');
    showPopup(quotes[index]);
    shootConfetti();
  });
});

bigLetterBooth.addEventListener('click', () => {
  showPopup(loveLetter);
  shootConfetti();
});

popup.addEventListener('click', () => {
  popup.classList.add('hidden');
});

// Confetti burst!
function shootConfetti() {
  const confettiColors = ['#ff6699', '#66ccff', '#ffcc66', '#ccff66', '#66ffcc'];
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = Math.random() * window.innerHeight + 'px';
    confetti.style.opacity = Math.random();
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.zIndex = 10000;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 2000);
  }
}

// Show popup
function showPopup(text) {
  popupContent.innerHTML = text;
  popup.classList.remove('hidden');
}
