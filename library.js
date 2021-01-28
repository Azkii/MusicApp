//section 1
const libraryBtn = document.querySelector(".library");
const songsBtn = document.querySelector(".songs");
const playlistsBtn = document.querySelector(".playlists");
const libraryContainer = document.querySelector(".playlist-container");
//section 2
window.addEventListener("load", () => {
    pushSongsToLibrary();
});
libraryBtn.addEventListener("click", () => {
    const library = document.querySelector(".libraryElements");
    if (library.style.height === "") {
        library.style.height = "calc(100% - 80px)";
    }
    else {
        library.style.height = "";
    }
});
songsBtn.addEventListener("click", (e) => {
    if(songsBtn.classList[1] !== "clicked"){
        checkBtn(e);
        libraryContainer.innerHTML = "";
        pushSongsToLibrary();
    }
});
playlistsBtn.addEventListener("click", (e) => {
    if(playlistsBtn.classList[1] !== "clicked"){
        checkBtn(e);
        libraryContainer.innerHTML = "";
        pushPlaylistsToLibrary();
    }
    const playListDesc = document.getElementsByName("playlistOpen");
    playListDesc.forEach(element => {
        element.addEventListener("click", (e) => {
            openPlaylist(e);
        });
    });
});
//section 3
const pushSongsToLibrary = () => {
    songs.forEach((element,index) => {
        createShell(element,index);
    });
    playSingle();
};
const pushPlaylistsToLibrary = () => {
    playlists.forEach((element,index) => {
        createShell(element,index);
    });
    playPlaylist();
};
//shell creating
const createShell = (Elementinfo,index) => {
    //creating box
    const songBox = document.createElement('div');
    songBox.classList.add("playlist-component");
    //creating img
    const image = document.createElement('img');
    image.classList.add("playlist-image");
    //creating title
    const title = document.createElement('h1');
    title.classList.add("playlist-title");
    //creating counter
    const counter = document.createElement('p');
    counter.classList.add("playlist-counter");
    //data
    if (Elementinfo.type === "song") {
        pushingSongs(Elementinfo,image,title,counter,songBox,index);
    }
    else if (Elementinfo.type === "playlist") {
        pushingPlaylists(Elementinfo,image,title,counter,songBox,index);
    };
    //pushing data
    songBox.appendChild(image);
    songBox.appendChild(title);
    songBox.appendChild(counter);
    libraryContainer.appendChild(songBox);
};
const pushingSongs = (songInfo,image,title,counter,songBox,index) => {
    //applying data
    songBox.setAttribute("key",index);
    title.innerHTML = songInfo.name;
    image.src = songInfo.photo;
    //creating and applying data for duration 
    const songq = new Audio(songInfo.url);
    songq.onloadedmetadata = function() {
        const minutes = parseInt(this.duration / 60, 10);
        const seconds = parseInt(this.duration % 60);
        counter.innerHTML = `${minutes}:${seconds} min`
    }
};
const pushingPlaylists = (playlistInfo,image,title,counter,songBox,index) => {
    //applying data
    songBox.setAttribute("name","playlistOpen");
    songBox.setAttribute("key",index);
    title.innerHTML = playlistInfo.name;
    //checking if photo is declared
    if (playlistInfo.photo === "" || playlistInfo.photo === undefined) {
        image.src = "/icons/music.svg";
    }
    else {
        image.src = playlistInfo.photo;
    }
    //checking length of playlist
    if (playlistInfo.songs.length === 1) {
        counter.innerHTML = `${playlistInfo.songs.length} song`;
    }
    else {
        counter.innerHTML = `${playlistInfo.songs.length} songs`;
    }
};
///check clicked button
const checkBtn = (e) => {
    if(e.target.getAttribute("name") === "songs") {
        playlistsBtn.classList.remove("clicked");
        songsBtn.classList.add("clicked");
        songsBtn.style.borderBottom = "5px solid black";
        playlistsBtn.style.borderBottom = "";
    }
    else if (e.target.getAttribute("name") === "playlists") {
        songsBtn.classList.remove("clicked");
        playlistsBtn.classList.add("clicked");
        playlistsBtn.style.borderBottom = "5px solid black";
        songsBtn.style.borderBottom = "";
    }
};
//test area
const openPlaylist = (e) => {
    const object = playlists[e.target.getAttribute("key")];

    const playlistBox = document.createElement('div');
    playlistBox.classList.add("playlistInfo");

    const playlisth1 = document.createElement('h1');
    playlisth1.innerHTML = object.name;

    const playlistp = document.createElement('p');
    playlistp.innerHTML = object.author;

    const songsContainer = document.createElement('div');
    songsContainer.classList.add("playlistInfo-songsContainer");

    object.songs.forEach(song => {
        const playlistSong = document.createElement('div');
        playlistSong.classList.add("playlistInfo-songInfo");

        const songh1 = document.createElement('h1');
        songh1.innerHTML = song.name;

        const songp = document.createElement('p');
        songp.innerHTML = song.author;

        const songDesc = document.createElement('div');
        songDesc.innerHTML = "empty";

        //append data
        playlistSong.appendChild(songh1);
        playlistSong.appendChild(songp);
        playlistSong.appendChild(songDesc);
        //apend to a container
        songsContainer.appendChild(playlistSong);
    });
    //append components
    playlistBox.appendChild(playlisth1);
    playlistBox.appendChild(playlistp);
    playlistBox.appendChild(songsContainer);
    document.querySelector(".holder").appendChild(playlistBox);
};
//Play single song
const playSingle = () => {
    const singleSong = document.querySelectorAll(".playlist-component");
    singleSong.forEach(element => {
        element.addEventListener("click", (e) => {
            Player.stop();
            document.querySelector(".libraryElements").style.height = "";
            queue = [songs[e.target.getAttribute("key")]];
            Player = new MusicApp(queue);
            Player.play();
        });
    });
};
//Play playlist
const playPlaylist = () => {
    const playlist = document.querySelectorAll(".playlist-component");
    playlist.forEach(element => {
        element.addEventListener("click", (e) => {
            Player.stop();
            document.querySelector(".libraryElements").style.height = "";
            quePlaylist(e);
        })
    })
}
const quePlaylist = (e,queue = 0) => {
    Player = new MusicApp(playlists[e.target.getAttribute("key")].songs, queue);
    Player.play();
    Player.song.onended = () => {
        Player.stop();
        if(queue +1 < playlists[e.target.getAttribute("key")].songs.length) {
            queue++;
            quePlaylist(e,queue);
        }
    }
};
