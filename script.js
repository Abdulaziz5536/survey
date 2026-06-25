const yesTeasePokes = [
    "try saying no first... I bet you want to know what happens 😏",
    "go on, hit no... just once 👀",
    "you're missing out 😈",
    "click no, I dare you 😏"
];

let yesTeasedCount = 0;
let musicPlaying = true;

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const music = document.getElementById('bg-music');

// Music setup

music.volume = 0.3;

music.play().then(() => {
    music.muted = false;
}).catch(() => {
    document.addEventListener('click', () => {
        music.muted = false;
        music.play().catch(() => {});
    }, { once: true });
});

function toggleMusic() {
    if (musicPlaying) {
        music.pause();
        musicPlaying = false;
        document.getElementById('music-toggle').textContent = '🔇';
    } else {
        music.muted = false;
        music.play();
        musicPlaying = true;
        document.getElementById('music-toggle').textContent = '🔊';
    }
}

function handleYesClick() {
    window.location.href = 'yes.html';
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast');

    toast.textContent = msg;
    toast.classList.add('show');

    clearTimeout(toast._timer);

    toast._timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// Move No button to a random place
function runAway() {
    if (noBtn.style.position !== 'fixed') {
        const rect = noBtn.getBoundingClientRect();

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${rect.left}px`;
        noBtn.style.top = `${rect.top}px`;
    }

    const margin = 20;

    const btnW = noBtn.offsetWidth;
    const btnH = noBtn.offsetHeight;

    const maxX = window.innerWidth - btnW - margin;
    const maxY = window.innerHeight - btnH - margin;

    noBtn.style.left = `${Math.random() * maxX}px`;
    noBtn.style.top = `${Math.random() * maxY}px`;
}

// Make button flee when cursor gets close
function enableRunaway() {
    document.addEventListener('mousemove', (e) => {
        const rect = noBtn.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
            Math.pow(e.clientX - centerX, 2) +
            Math.pow(e.clientY - centerY, 2)
        );

        if (distance < 150) {
            runAway();
        }
    });

    noBtn.addEventListener('touchstart', runAway, { passive: true });
}

window.addEventListener('load', () => {
    enableRunaway();
});
