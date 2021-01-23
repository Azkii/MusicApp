const libraryBtn = document.querySelector(".library");
libraryBtn.addEventListener("click", () => {
    const library = document.querySelector(".libraryElements");
    if (library.style.height === "") {
        library.style.height = "calc(100% - 80px)";
    }
    else {
        library.style.height = "";
    }
});