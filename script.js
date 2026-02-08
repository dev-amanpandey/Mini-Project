// Select elements
const audioPlayer = document.getElementById('audio-player');
const playButton = document.querySelector('.play');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const shuffleButton = document.querySelector('.shuffle');
const repeatButton = document.querySelector('.repeat');
const progressBar = document.querySelector('.progress-slider');
const currentTimeDisplay = document.querySelector('.current-time');
const totalTimeDisplay = document.querySelector('.total-time');
const volumeSlider = document.querySelector('.volume-slider');

// Song list
const songs = [
    { title: "Since Tum", artist: "Jani x Talha Anjum", src: "/music/song1.mp3", albumArt: "/assests/song_cover1.jpg" },
    { title: "Channa Ve", artist: "Rahul Sathu x Talha Anjum", src: "/music/song2.mp3", albumArt: "/assests/Channa Ve - 640x480.jpg" },
    { title: "Window Shopper Freestyle", artist: "KR$NA", src: "/music/song3.mp3", albumArt: "/assests/KR$NA - Window Shopper Freestyle - 1280x720.jpg" },
    { title: "Downers at Dusk ", artist: "Talha Anjum", src: "/music/song4.mp3", albumArt: "/assests/Downers at Dusk - 1280x720.jpg" },
    { title: "Runnin' ", artist: "JJ47 x Talha Anjum", src: "/music/song5.mp3", albumArt: "/assests/Runnin_ - JJ47 x Talha Anjum (Prod. @Jokhay ) MUSIC VIDEO - 1280x720.jpg" },
    { title: "Red Leather ", artist: "Future", src: "/music/song6.mp3", albumArt: "/assests/Red Leather - 640x480.jpg" },
    { title: "DNA", artist: "Kendrick Lamar", src: "/music/song7.mp3", albumArt:"/assests/DNA. - 1280x720.jpg" },
    { title: "Woh Raat", artist: "Raftaar x KR$NA", src: "/music/song8.mp3", albumArt:"/assests/Woh Raat - 1280x720.jpg" },
    { title: "Change", artist: "Sedhe Maut", src: "/music/song9.mp3", albumArt:"/assests/Shekhinah & Seedhe Maut - _Change_ (Live)  Jameson Distilled Sounds - 1280x720.jpg" },
    { title: "BADA", artist: "KARMA", src: "/music/song10.mp3", albumArt:"/assests/BADA - 1280x720.jpg" },
];

let currentIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

// Load the first song
function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    document.querySelector('.song-title').textContent = song.title;
    document.querySelector('.artist-name').textContent = song.artist;
    document.querySelector('.album-art').src = song.albumArt;
}

// Play or Pause the audio
function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        playButton.innerHTML = `<i class="fa-solid fa-play"></i>`;
    } else {
        audioPlayer.play();
        playButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    }
    isPlaying = !isPlaying;
}

// Play the previous song
function playPrevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audioPlayer.play();
    isPlaying = true;
    playButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

// Play the next song
function playNextSong() {
    if (isShuffle) {
        currentIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentIndex = (currentIndex + 1) % songs.length;
    }
    loadSong(currentIndex);
    audioPlayer.play();
    isPlaying = true;
    playButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

// Update progress bar and time
function updateProgress() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    progressBar.value = (currentTime / duration) * 100;

    // Update time displays
    currentTimeDisplay.textContent = formatTime(currentTime);
    totalTimeDisplay.textContent = formatTime(duration);
}

// Format time (seconds to mm:ss)
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

// Seek the audio
function seekAudio() {
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (progressBar.value / 100) * duration;
}

// Toggle shuffle
function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleButton.classList.toggle('active');
}

// Toggle repeat
function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatButton.classList.toggle('active');
}

// Adjust volume
function adjustVolume() {
    audioPlayer.volume = volumeSlider.value / 100;
}

// Handle end of audio
audioPlayer.addEventListener('ended', () => {
    if (isRepeat) {
        audioPlayer.play();
    } else {
        playNextSong();
    }
});

// Event listeners
playButton.addEventListener('click', togglePlay);
prevButton.addEventListener('click', playPrevSong);
nextButton.addEventListener('click', playNextSong);
shuffleButton.addEventListener('click', toggleShuffle);
repeatButton.addEventListener('click', toggleRepeat);
progressBar.addEventListener('input', seekAudio);
volumeSlider.addEventListener('input', adjustVolume);
audioPlayer.addEventListener('timeupdate', updateProgress);

// Load the first song initially
loadSong(currentIndex);

function playSong(index) {
    currentIndex = index;
   loadSong(currentIndex);
   audioPlayer.play();
   console.log(`Playing: ${songs[index].title}`);
}

