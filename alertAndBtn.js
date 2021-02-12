const heartBtn = document.getElementsByName("heartBtn");
const darkModeBtn = document.querySelector(".darkMode");
showAlert = (text) => {
    const alertBox = document.querySelector(".alert");
    const alertText = alertBox.children[0];
    alertText.innerHTML = text;
    alertBox.style.height = "80px";
    alertText.style.opacity = "1";
    setTimeout(() => {
        alertText.style.opacity = "0";
        alertBox.style.height = "0px";
    },1500);
};
heartBtn.forEach(element => {
    element.addEventListener("click", (e) => {
        e.preventDefault();
        Player.IsSongInFav();
        const heartContainer = document.querySelector(".animateHeart");
        const heart = document.createElement('img');
        heart.src = "/icons/heart.svg";
        heartContainer.appendChild(heart);
        heart.style.animation = "heartAnim 1s";
        document.addEventListener("animationend",() => {
            heartContainer.innerHTML = "";
        });
        playlists[0].songs = returnData();
    });
});
darkModeBtn.addEventListener("click", () => {
    const lightMode = ["white","black","black","rgb(253, 253, 253)"];
    const darkMode = ["#111111","#FF7597","pink","#1f1f1f"];
    (getComputedStyle(document.documentElement).getPropertyValue("--base") == lightMode[0]) ?
    setColorMode(darkMode) : setColorMode(lightMode);
})
const setColorMode = (mode) => {
    darkModeBtn.src = `/icons/${mode[2]}Moon.svg`;
    document.documentElement.style.setProperty(`--base`,mode[0]);
    document.documentElement.style.setProperty(`--second`,mode[1]);
    document.documentElement.style.setProperty(`--alert`,mode[3]);
}