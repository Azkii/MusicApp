const circleContainer = document.querySelector(".circle");
const line = document.querySelector(".timeLine");
const playButton = document.querySelector(".playStop");
const volume = document.querySelector(".volume-range");
const speakerIcon = document.querySelector(".speakerIcon");
const backBtn = document.querySelector(".backButton");
const skipBtn = document.querySelector(".skipButton");
//player object
class MusicApp {
    constructor(song,circle) {
        this.song = song;
        this.circle = circleContainer;
        this.circle.src = circle;
        this.song.onended = () => {
            //if one song on for
            console.log("song ended");
            this.play();
            //this.stop();
            //if no queue
                //empty for now
        };
    }
    play() {
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
        this.song.currentTime = 0;
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
//////JUST TO TEST ON ONE SONG "LOAD"/////// will be replaced in future with object which contains playlist
    //get data
    let song = new Audio(songs[0].url);
    let circleBcg = songs[0].photo;
    //assaign new song to a object
    let Player = new MusicApp(song,circleBcg);
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