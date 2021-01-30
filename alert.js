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