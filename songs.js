const songs = [
    Seiin = {
        type: "song",
        name: "Seiin",
        author: "Yama",
        url: "/music library/Seiin/Seiin.mp3",
        photo: "/music library/Seiin/img.jpg",
    },
    DarkerThanBlack = {
        type: "song",
        name: "Darker Than Black",
        author: "Darker",
        url: "/music library/DarkerThanBlack/Darker.mp3",
        photo: "/music library/DarkerThanBlack/img.png",
    },
    KimiNoToriko = {
        type: "song",
        name: "Kimi no Toriko",
        author: "Rizky Ayuba",
        url: "/music library/KiminoToriko/Kimi No Toriko.mp3",
        photo: "/music library/KiminoToriko/img.jpg",
    },
    CertainRomance = {
        type: "song",
        name: "The Certain Romance",
        author: "Arctic Monkeys",
        url: "/music library/CertainRomance/CertainRomance.mp3",
        photo: "/music library/CertainRomance/img.webp",
    }
];
//creating local storages
const localStorgeExist = () => {
    localFav = localStorage.getItem("favSongs");
    if(!localFav) {
        localStorage.setItem('favSongs',[]);
    }
    else {
        console.log("completed checking existance");
    }
};
const applyDataArray = (localData) => {
    let [...rest] = localData;
    rest.forEach((element,index,object) => object[index] = songs[element]);
    return rest = rest.filter(value => {
        return value !== undefined;
    });
};
//get data from localstorage
const returnData = () => {
    localStorgeExist();
    let localData = localStorage.getItem("favSongs"); 
    localData = localData.split(",");
    return localData = applyDataArray(localData);
}
//and return
let playlists = [
    Favourite = {
        type: "playlist",
        name: "Favourite",
        author: "MusicApp",
        songs: returnData(),
        photo: "/icons/heart.svg",
    },
    Abracadabra = {
        type: "playlist",
        name: "Playlist 1",
        author: "MusicApp",
        songs: [
            songs[0],
        ],
        photo: "",
    },
    Lore = {
        type: "playlist",
        name: "Playlist 2",
        author: "MusicApp",
        songs: [
            songs[0],
            songs[1],
            songs[2],
        ],
        photo: "",
    },
    Seiin = {
        type: "playlist",
        name: "Playlist 3",
        author: "MusicApp",
        songs: [
            songs[1],
        ],
        photo: "",
    },
];