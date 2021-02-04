const songs = [
    Seiin = {
        type: "song",
        name: "Seiin",
        author: "Yama",
        url: "/music library/Seiin/Seiin.mp3",
        photo: "/music library/Seiin/img.jpg",
    },
    Seiin = {
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
const playlists = [
    Favourite = {
        type: "playlist",
        name: "Favourite",
        author: "MusicApp",
        songs: [],
        photo: "/icons/heart.svg",
    },
    Abracadabra = {
        type: "playlist",
        name: "Abracadabra",
        author: "MusicApp",
        songs: [
            songs[0],
        ],
        photo: "",
    },
    Lore = {
        type: "playlist",
        name: "Lore",
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
        name: "Seiin",
        author: "MusicApp",
        songs: [
            songs[1],
        ],
        photo: "",
    },
];