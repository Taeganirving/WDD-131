
const themeSelect = document.querySelector("#theme-select");

function changeTheme() {
    const selectedTheme = themeSelect.value;

    if (selectedTheme === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
}

themeSelect.addEventListener("change", changeTheme);
