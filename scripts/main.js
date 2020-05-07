/* CSS VARIABLES PATH */
const csslight = "styles/variables/light.css";
const cssdark = "styles/variables/dark.css";

/* DROPDOWN */

//abre y cierra el dropdown con los temas
function toogleDropdown() {
    let dropdown = document.getElementsByClassName("themeslist");
    dropdown[0].classList.toggle("toogle");
}

/* cambio css de variables */
function changeTheme(change) {
    document.getElementById("stylesheet").setAttribute("href", change);
    localStorage.setItem("theme", change);

}

/* reviso tema usado antes */
function checkStoredTheme() {
    let change = localStorage.getItem("theme");


    if (change == csslight || change == cssdark) {
        document.getElementById("stylesheet").setAttribute("href", change);

    } else {

        document.getElementById("stylesheet").setAttribute("href", cssdark);
    }
}

/* cambio el archivo html */
function changePage(html) {
    window.location.href = html;
}

/* eventlisteners de botones del menu & checkStoredTheme*/
function onload() {

    checkStoredTheme();

    document.getElementById("dropdown")
        .addEventListener("click", toogleDropdown, false);

    document.getElementById("light")
        .addEventListener("click", function() {
            changeTheme(csslight);
        }, false);

    document.getElementById("dark")
        .addEventListener("click", function() {
            changeTheme(cssdark);
        }, false);

    /* logo te lleva al inicio */
    document.getElementsByClassName("divlogoimg")[0]
        .addEventListener("click", function() { changePage("index.html"); }, false);
}