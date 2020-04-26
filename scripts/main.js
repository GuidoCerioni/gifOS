/* Giphy Api */
const giphyKey = "jaxtYCDY3LieEnJr0ksg3CAKLFTa7THg";
const giphyApiUrl = "https://api.giphy.com/v1/gifs/";

/* CSS VARIABLES PATH */
const csslight = "styles/variables/light.css";

const cssdark = "styles/variables/dark.css";



/* SUGERENCIAS   */

function renderSugerencias(arrayGifUrl) {

    arrayGifUrl.forEach(element => {
        const sugCont = document.getElementById("sugerenciass");
        const divGif = document.createElement("div");
        const divGifTitle = document.createElement("div");
        const h2Title = document.createElement("h2");
        const Ximg = document.createElement("img");
        const divGifImg = document.createElement("div");
        const Gifimg = document.createElement("img");
        const vermas = document.createElement("button");

        /* seteo clases/atributos */
        divGif.classList.add("gif-container");
        divGifTitle.classList.add("gif-title-container");
        Ximg.setAttribute("src", "assets/button3.svg");
        //https: //giphy.com/gifs/jAYUbVXgESSti/html5
        if (element.data.title) {
            let a = element.data.title;
            h2Title.innerHTML = a.substring(0, 28);
        } else
        if (element.data.username) {
            h2Title.innerHTML = "GIF by " + element.data.username;
        } else {
            h2Title.innerHTML = "Animated GIF"
        }
        divGifImg.classList.add("gif-img-container-sugerencias");
        Gifimg.classList.add("gif-img");
        vermas.classList.add("vermas");
        vermas.innerHTML = "Ver mas...";
        Gifimg.setAttribute("src", element.data.images.fixed_width_downsampled.url);
        /* agrego hijos */
        divGifTitle.append(h2Title);
        divGifTitle.append(Ximg);
        divGifImg.append(vermas);
        divGifImg.append(Gifimg);
        divGif.append(divGifTitle);
        divGif.append(divGifImg);
        sugCont.append(divGif);
    })
}
async function getRandom(ammount) {
    const url = giphyApiUrl + "random?api_key=" + giphyKey;
    let array = [];
    for (let i = 0; i < ammount; i++) {
        let fetchh = await fetch(url);
        let fetched = await fetchh.json();
        array.push(fetched);
    }
    return array;
}
/* SUGERENCIAS   */

/* TENDENCIAS   */
function renderTendenciasandBusqueda(arrayGifUrl) {
    arrayGifUrl.data.forEach(element => {
        const divGif = document.createElement("div");
        const divGifImg = document.createElement("div");
        const Gifimg = document.createElement("img");
        const divGifTitle = document.createElement("div");
        const h2Title = document.createElement("h2");
        const div = document.createElement("div");


        /* seteo clases/atributos */
        divGif.classList.add("gif-container");


        if ((element.images.downsized_large.width / element.images.downsized_large.height) > 1.59) {
            divGif.classList.add("griddoble");
        }

        divGifImg.classList.add("gif-img-container-tendencias");
        Gifimg.setAttribute("src", element.images.fixed_width_downsampled.url);
        Gifimg.classList.add("gif-img");
        divGifTitle.classList.add("gif-title-container");


        if (element.title) {
            let a = element.title;
            let title = a.substring(0, 25);
            h2Title.innerHTML = title.replace(/(^|\s+)/g, "$1#");
        } else
        if (element.username) {
            h2Title.innerHTML = "GIF by " + element.username;
        } else {
            h2Title.innerHTML = "Animated GIF"
        }




        /* agrego hijos */
        divGifImg.append(Gifimg);
        divGifTitle.append(h2Title);
        divGifTitle.append(div);
        divGif.append(divGifImg);
        divGif.append(divGifTitle);


        const tendCont = document.getElementById("tendenciass");
        tendCont.append(divGif);
    });
}
async function getTrending(ammount, offset) {
    tendenciasCont = tendenciasCont + 20;
    const url = giphyApiUrl + "trending?api_key=" + giphyKey + "&limit=" + ammount + "&offset=" + offset;

    let fetchh = await fetch(url);
    return await fetchh.json();
}
/* TENDENCIAS   */

/* BUSCAR   */
async function getSearchResults(ammount, search, offset) {
    busquedaCont = busquedaCont + 20;
    const url = giphyApiUrl + "search?api_key=" + giphyKey + "&q=" + search + "&limit=" + ammount + "&offset=" + offset;
    let fetchh = await fetch(url);
    return await fetchh.json();

}

async function getSearchSugerencias(search) {
    const url = "https://api.datamuse.com/sug?s=" + search + "&max=3";

    let fetchh = await fetch(url);
    return await fetchh.json();
}

function changetoSearch() {
    searchFlag = 1;

    document.getElementsByClassName("sugerencias-section")[0].classList.add("noshow");
    document.getElementsByClassName("buscar-sugerencias")[0].classList.remove("toogle");
    document.getElementById("tendenciass").innerHTML = "";
    let inputSearch = document.getElementById("input-buscar-text");
    inputSearch = inputSearch.value;
    inputSearch = inputSearch.trim();
    document.getElementById("search-change").innerHTML = inputSearch + " (resultados):";
    document.getElementById("input-buscar-text").value = "";
    searchQuery = inputSearch;
    getSearchResults(20, inputSearch, busquedaCont)
        .then(response => renderTendenciasandBusqueda(response))
        /*     .catch(document.getElementById("search-change").innerHTML = "No se encontraron resultados :(");
         */

}



function renderSugerenciasdeBusqueda(inputSearch) {
    let buttons = document.getElementsByClassName("buscar-sugerencias");
    buttons[0].innerHTML = "";


    getSearchSugerencias(inputSearch).then(response => {
        if (response.length == 0) {
            let button = document.createElement("button");
            button.classList.add("button-sugerencia");
            buttons[0].appendChild(button);
            document.getElementsByClassName("button-sugerencia")[0].innerHTML = inputSearch;


        } else {

            for (let i = 0; i < response.length; i++) {
                let button = document.createElement("button");
                button.classList.add("button-sugerencia");
                buttons[0].appendChild(button);
                document.getElementsByClassName("button-sugerencia")[i].innerHTML = response[i].word;




            }
        }
    })
}

function mostrarSugerencias() {

    let inputSearch = document.getElementById("input-buscar-text").value;

    inputSearch = inputSearch.trim();

    if ((inputSearch.length) > 1) {
        document.getElementsByClassName("buscar-sugerencias")[0].classList.add("toogle");

        renderSugerenciasdeBusqueda(inputSearch.replace(/\s/g, '+'));

        document.getElementsByClassName("search-button")[0]
            .addEventListener("click", changetoSearch, false);


    } else {
        document.getElementsByClassName("buscar-sugerencias")[0].classList.remove("toogle");

    }

}
/* BUSCAR   */



/* DROPDOWN */
//abre y cierra el dropdown con los temas
function toogleDropdown() {
    let dropdown = document.getElementsByClassName("themeslist");
    dropdown[0].classList.toggle("toogle");
}

function changeTheme(change) {
    document.getElementById("stylesheet").setAttribute("href", change);
    localStorage.setItem("theme", change);

}

function checkStoredTheme() {
    let change = localStorage.getItem("theme");

    if (change == csslight || change == cssdark) {
        document.getElementById("stylesheet").setAttribute("href", change);

    } else {
        document.getElementById("stylesheet").setAttribute("href", cssdark);
    }
}



function change_page() {
    window.location.href = "search.html";
    checkStoredTheme();
}

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
}







let tendenciasCont = 0;
let busquedaCont = 0;
let searchFlag = 0;
let searchQuery = "";

onload();


getRandom(4).then(response => {
    renderSugerencias(response);
});
getTrending(20, tendenciasCont).then(response =>
    renderTendenciasandBusqueda(response));

document.getElementById("input-buscar-text")
    .addEventListener("input", mostrarSugerencias, false);


document.getElementById("input-buscar-text").
addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("search-button").click();
    }
});

/* INFINITE SCROLL */
function getScrollTop() {
    let scrollTop = 0;

    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

document.addEventListener('scroll', function() {
    let top = getScrollTop();
    if (document.body.scrollHeight == (top + window.innerHeight)) {
        if (searchFlag) {
            getSearchResults(20, searchQuery, busquedaCont).then(response =>
                renderTendenciasandBusqueda(response));

        } else {
            getTrending(20, tendenciasCont).then(response =>
                renderTendenciasandBusqueda(response));
        }
    }
});
/* INFINITE SCROLL */