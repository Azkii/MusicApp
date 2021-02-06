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
//player object
class MusicApp {
    constructor(song,queue,e) {
        this.e = e;
        this.queue = queue;
        this.songArray = song;
        this.songInQue = this.songArray[this.queue];
        //check if song is in fav
        this.fav = Array.from(new Set(returnData()));
        this.isSongFav = this.fav.filter((value) => {
            return value === this.songInQue;
        });
        this.song = new Audio(this.songInQue.url);
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
            //console.log("*");
        },200)
    }
    dropOnLine() {
        const newValue = timeLineInput.value/100;
        this.song.currentTime = this.song.duration * newValue;
    }
    changeTimeLineValue(value = 1) {
        timeLineInput.value = value;
        timeLineInput.style.background = 'linear-gradient(to right, black 0%, black ' + value + '%, transparent ' + value + '%, transparent 100%)';
    }
    //check if song is in fav
    IsSongInFav() {
        if(this.e.target.getAttribute("name") === "playlistOpen") {
            if(this.isSongFav[0] === this.songInQue) {
                this.deleteFavourite();
                this.stop();
                quePlaylist(this.e,this.queue);
            }
            else {
                this.addFavourite();
                this.stop();
                quePlaylist(this.e,this.queue);
            }
        }
        else {
            if(this.isSongFav[0] === this.songInQue) {
                this.deleteFavourite();
                this.stop();
                queSingleSong(this.e);
                console.log("passed");
            }
            else {
                this.addFavourite();
                this.stop();
                queSingleSong(this.e);
                console.log("passed too");
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
    this.style.background = 'linear-gradient(to right, black 0%, black ' + value + '%, transparent ' + value + '%, transparent 100%)';
};