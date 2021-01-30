const circleContainer = document.querySelector(".circle");
const line = document.querySelector(".timeLine");
const playButton = document.querySelector(".playStop");
const volume = document.querySelector(".volume-range");
const speakerIcon = document.querySelector(".speakerIcon");
const backBtn = document.querySelector(".backButton");
const skipBtn = document.querySelector(".skipButton");
const title = document.querySelector(".music-title");
const author = document.querySelector(".music-author");
//player object
class MusicApp {
    constructor(song,queueNum,e) {
        this.e = e;
        this.queue = queueNum;
        //
        this.songInQue = song[this.queue];
        this.song = new Audio(this.songInQue.url);
        this.circle = circleContainer;
        this.circle.src = this.songInQue.photo;
        title.innerHTML = this.songInQue.name;
        author.innerHTML = this.songInQue.author;
        this.song.onended = () => {
            this.stop();
        }
    }
    play() {
        console.log(this.song);
        this.song.play();
        this.currentTime();
        playButton.src = "/icons/pause.svg";
        playButton.setAttribute("name","stop");
        this.circle.style.animation = `rotation 20s infinite linear`;
    }
    stop() {
        this.song.pause();
        clearInterval(this.stopInterval);
        playButton.src = "/icons/play.svg";
        playButton.setAttribute("name","play");
        this.circle.style.animationPlayState = "paused";
    }
    goBack() {
        if (this.song.currentTime < 2) {
            if (this.queue === 0) {
                showAlert("thats a first song");
            }
            else {
                this.stop();
                this.circle.style.animation = "";
                setTimeout(() => {quePlaylist(this.e,this.queue-1)},0);
            }
        }
        else {
            this.stop();
            this.circle.style.animation = "";
            this.song.currentTime = 0;
            setTimeout(() => {this.play()})
        }
    }
    skip() {
        this.song.currentTime = this.song.duration;
        this.circle.style.animation = '';
        clearInterval(this.stopInterval);
    }
    volumeSetting() {
        this.song.volume = volume.value/100;
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
    }
    currentTime() {
        this.stopInterval = setInterval(() => {
            line.style.width = `${this.song.currentTime/this.song.duration * 100}%`;
            console.log("*");
        },200)
    }
}
    //assaign new song to a object
    let Player
    window.addEventListener("load",() => {
        Player = new MusicApp(songs,0);
    });
    // play or stop music
    playButton.addEventListener('click', () => {
        if(playButton.name === "play") {
            Player.play();
        }
        else {
            Player.stop();
        }
    });
    //back btn set song time to 0
    backBtn.addEventListener('click', () => {
        Player.goBack();
    });
    //skip song
    skipBtn.addEventListener('click', () => {
        Player.skip();
    });
    //volume settings with animated speaker
    volume.addEventListener('change', () => {
        Player.volumeSetting();
    });
    volume.addEventListener('mousemove', () => {
        Player.volumeSetting();
    });
    //speaker hover
    speakerIcon.addEventListener("mouseover", () => {
        volume.style.display = "flex";
        speakerIcon.style.opacity = "0.5";
    });
    speakerIcon.parentElement.addEventListener("mouseleave", () => {
        volume.style.display = "";
        speakerIcon.style.opacity = "";
    });
    //stop/start rotation manually
    /*
    circleContainer.addEventListener("click", () => {
        const option = document.querySelector(".hoverCircle");
        if (option.children[0].name == "play") {
            Player.circle.style.animation = "";
            option.children[0].src = "/icons/pause.svg";
            option.children[0].name = "pause";
            option.style.display = "flex";
            setTimeout(() => {
                option.style.display = "";
            },300)
        }
        else {
            Player.circle.style.animation = `rotation 20s infinite linear`;
            option.children[0].src = "/icons/play.svg";
            option.children[0].name = "play";
            option.style.display = "flex";
            setTimeout(() => {
                option.style.display = "";
            },300)
        }
    });
    */