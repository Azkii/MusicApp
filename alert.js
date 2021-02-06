const heartBtn = document.getElementsByName("heartBtn");
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