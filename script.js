const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const audio = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music

const songs = [
    { name: 'music-1', displayName: 'Dark Beach', artist: 'Pastel Ghost' },
    { name: 'music-2', displayName: 'Memory Reboot', artist: 'VØJ & Narvent' },
    { name: 'music-3', displayName: 'Resonance', artist: 'Home' },
    { name: 'music-4', displayName: 'Iris', artist: 'Pastel Ghost' },
    { name: 'music-5', displayName: 'Goth', artist: 'Sidewalks and Skeletons' },
];

// Checking playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    audio.volume = 0.5;
    audio.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    audio.pause();
}

// Play or pause Event listener
playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

// Current Song
let songIndex = 0;

// Previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update Dom
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = `img/${song.name}.jpg`;
    audio.src = `music/${song.name}.mp3`;
}

// Update Progress Bar & Time
function updateProgressBar(e) {
    const { currentTime, duration } = e.srcElement;
    // Update the progrees bar
    const progressPorcent = (currentTime / duration) * 100;
    progress.style.width = `${progressPorcent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    // Delay switching duration element to avoid NaN
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }

    if (durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //  Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
}

// Set progress bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = audio;
    audio.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

// Keyword  play controls
document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }
});
