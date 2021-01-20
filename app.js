const line = document.querySelector(".timeLine");
const playButton = document.querySelector(".playStop");
const volume = document.querySelector(".volume-range");
//dodac zmniejsdzone volume
class MusicApp {
    constructor(song) {
        this.song = song;
        this.song.onended = () => {
            this.stop();
        };
    }
    play() {
        this.song.play();
        this.currentTime();
        playButton.src = "/icons/pause.svg";
        playButton.setAttribute("name","stop");
    }
    stop() {
        this.song.pause();
        clearInterval(this.stopInterval);
        playButton.src = "/icons/play.svg";
        playButton.setAttribute("name","play");
    }
    volumeSetting() {
        this.song.volume = volume.value/100;
    }
    currentTime() {
        this.stopInterval = setInterval(() => {
            line.style.width = `${this.song.currentTime/this.song.duration * 100}%`;
        },200)
    }
}
let song = new Audio('Seiin.mp3');
let Player = new MusicApp(song);

playButton.addEventListener('click', () => {
    if(playButton.name === "play") {
        Player.play();
    }
    else {
        Player.stop();
    }
});
volume.addEventListener('change', () => {
    Player.volumeSetting();
});
volume.addEventListener('mousemove', () => {
    Player.volumeSetting();
});