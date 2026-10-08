
const menuButton = document.querySelector(".menu-btn");
const navigation = document.querySelector("nav");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");
    menuButton.setAttribute("aria-expanded", isOpen);
});
