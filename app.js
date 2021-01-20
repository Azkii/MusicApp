const line = document.querySelector(".timeLine");
const playButton = document.querySelector(".playStop");
const volume = document.querySelector(".volume-range");
const speakerIcon = document.querySelector(".speakerIcon");
const backBtn = document.querySelector(".backButton");
//dodac zmniejsdzone volume
class MusicApp {
    constructor(song) {
        this.song = song;
        this.song.onended = () => {
            this.stop();
            //if no queue
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
    goBack() {
        this.song.currentTime = 0;
        line.style.width = "";
        this.stop();
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
backBtn.addEventListener('click', () => {
    Player.goBack();
});
volume.addEventListener('change', () => {
    Player.volumeSetting();
    IconAnimation();
});
volume.addEventListener('mousemove', () => {
    Player.volumeSetting();
    IconAnimation();
});
speakerIcon.addEventListener("mouseover", () => {
    volume.style.display = "flex";
    speakerIcon.style.opacity = "0.5";

});
speakerIcon.parentElement.addEventListener("mouseleave", () => {
    volume.style.display = "";
    speakerIcon.style.opacity = "";
});
//functions
const IconAnimation = () => {
    if(+volume.value === 0) {
        speakerIcon.src = "icons/volume/volume0.svg";
    }
    else if(+volume.value < 33) {
        speakerIcon.src = "icons/volume/volume1.svg";
    }
    else if(+volume.value < 66) {
        speakerIcon.src = "icons/volume/volume2.svg";
    }
    else {
        speakerIcon.src = "icons/volume/volume3.svg";
    }
};