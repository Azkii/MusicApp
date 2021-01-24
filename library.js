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
});
//section 3
const pushSongsToLibrary = () => {
    songs.forEach(element => {
        createShell(element);
    });
};
const pushPlaylistsToLibrary = () => {
    playlists.forEach(element => {
        createShell(element);
    });
};
//shell creating
const createShell = (Elementinfo) => {
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
        pushingSongs(Elementinfo,image,title,counter,songBox);
    }
    else if (Elementinfo.type === "playlist") {
        pushingPlaylists(Elementinfo,image,title,counter);
    };
    //pushing data
    songBox.appendChild(image);
    songBox.appendChild(title);
    songBox.appendChild(counter);
    libraryContainer.appendChild(songBox);
};
const pushingSongs = (songInfo,image,title,counter) => {
    //applying data
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
const pushingPlaylists = (playlistInfo,image,title,counter) => {
    //applying data
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