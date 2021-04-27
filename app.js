const circleContainer = document.querySelector(".circle");
const line = document.querySelector(".timeLine");
const playButton = document.querySelector(".playStop");
const volume = document.querySelector(".volume-range");
const speakerIcon = document.querySelector(".speakerIcon");
const backBtn = document.querySelector(".backButton");
const skipBtn = document.querySelector(".skipButton");
const title = document.querySelector(".music-title");
const author = document.querySelector(".music-author");
//time line
const timeLineInput = document.querySelector(".timeline-input");
const solidTimeLine = document.querySelector(".timeLine");
const timeLineContainer = document.querySelector(".timeline-box");
//get heartIMG
const heartImage = document.getElementsByName("heartBtn");
//player object
class MusicApp {
    constructor(song,queue,e,timeStart = 0) {
        this.e = e;
        this.queue = queue;
        this.songArray = song;
        this.timeStart = timeStart;
        this.songInQue = this.songArray[this.queue];
        //check if song is in fav
        this.fav = Array.from(new Set(returnData()));
        this.isSongFav = this.fav.filter((value) => {
            return value === this.songInQue;
        });
        //change heart sign
        this.heartImg = (this.isSongFav[0] === this.songInQue) ? "/icons/unheart.svg" : "/icons/heart.svg";
        heartBtn[0].src = this.heartImg;
        this.song = new Audio(this.songInQue.url);
        this.song.currentTime = this.timeStart;
        this.circle = circleContainer;
        this.circle.src = this.songInQue.photo;
        title.innerHTML = this.songInQue.name;
        author.innerHTML = this.songInQue.author;
        //song vlume at getting data
        this.song.volume = volume.value/100;
        //song on ended if single element was played
        this.song.onended = () => {
            this.stop();
        }
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
        const colorMode = (getComputedStyle(document.documentElement).getPropertyValue("--base") == " white") ? "light" : "dark";
        this.song.volume = volume.value/100;
        if(+volume.value === 0) {
            speakerIcon.src = `icons/volume/volume0${colorMode}.svg`;
        }
        else if(+volume.value < 33) {
            speakerIcon.src = `icons/volume/volume1${colorMode}.svg`;
        }
        else if(+volume.value < 66) {
            speakerIcon.src = `icons/volume/volume2${colorMode}.svg`;
        }
        else {
            speakerIcon.src = `icons/volume/volume3${colorMode}.svg`;
        }
    }
    currentTime() {
        this.stopInterval = setInterval(() => {
            line.style.width = `${this.song.currentTime/this.song.duration * 100}%`;
            console.log("*");
        },200)
    }
    dropOnLine() {
        const newValue = timeLineInput.value/100;
        this.song.currentTime = this.song.duration * newValue;
    }
    changeTimeLineValue(value = 1) {
        timeLineInput.value = value;
        timeLineInput.style.background = 'linear-gradient(to right, var(--second) 0%, var(--second) ' + value + '%, transparent ' + value + '%, transparent 100%)';
    }
    //check if song is in fav
    IsSongInFav() {
        if(this.e.target.getAttribute("name") === "playlistOpen") {
            if(this.isSongFav[0] === this.songInQue) {
                this.deleteFavourite();
                this.stop();
                quePlaylist(this.e,this.queue,this.song.currentTime);
            }
            else {
                this.addFavourite();
                this.stop();
                quePlaylist(this.e,this.queue,this.song.currentTime);
            }
        }
        else {
            if(this.isSongFav[0] === this.songInQue) {
                this.deleteFavourite();
                this.stop();
                queSingleSong(this.e,this.song.currentTime);
            }
            else {
                this.addFavourite();
                this.stop();
                queSingleSong(this.e,this.song.currentTime);
            }
        }
    }
    //Add to favourite
    addFavourite() {
        console.log("ADD your song to fav");
        const index = songs.findIndex(x => x.name === this.songInQue.name)
        let favSongs = localStorage.getItem("favSongs");
        favSongs = favSongs.split(",");
        favSongs.push(JSON.stringify(index));
        localStorage.setItem("favSongs", favSongs);
    }
    deleteFavourite() {
        const index = songs.findIndex(x => x.name === this.songInQue.name);
        let favLocal = localStorage.favSongs.split(",");
        const separatedData = favLocal.filter((item) => {
            return item != index
        })
        localStorage.setItem("favSongs", separatedData);
        console.log("deleted from favSongs");
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
//time line settings
timeLineInput.addEventListener("change",() => {
    Player.dropOnLine();
    line.style.width = `${Player.song.currentTime/Player.song.duration * 100}%`;
});
timeLineContainer.addEventListener("mouseenter",() => {
    solidTimeLine.style.display = "none";
    timeLineInput.style.display = "flex";
    Player.changeTimeLineValue((Player.song.currentTime/Player.song.duration)*100);
});
timeLineContainer.addEventListener("mouseleave",() => {
    timeLineInput.style.display = "none";
    solidTimeLine.style.display = "flex";
});
timeLineInput.oninput = function() {
    var value = (this.value-this.min)/(this.max-this.min)*100;
    this.style.background = 'linear-gradient(to right, var(--second) 0%,  var(--second) ' + value + '%, transparent ' + value + '%, transparent 100%)';
};