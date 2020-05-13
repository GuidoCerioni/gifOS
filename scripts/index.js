let tendenciasCont = 0;
let busquedaCont = 0;
let searchFlag = 0;
let searchQuery = "";
let t;

/* SUGERENCIAS   */
function renderSugerencias(arrayGifUrl) {
    for (let i = 0; i < arrayGifUrl.length; i++) {
        const element = arrayGifUrl[i];

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

        Ximg.classList.add("Ximg");
        Ximg.setAttribute("src", "assets/button3.svg");
        Ximg.setAttribute("id", "X" + i);

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

        document.getElementsByClassName("vermas")[i]
            .addEventListener("click", function() {
                searchVermas(element.data.title);
            }, false);

        document.getElementsByClassName("Ximg")[i]

        .addEventListener("click", function() { rando(i) }, false);


    }
}
async function rando(c) {
    let imggg = document.querySelectorAll(".gif-img-container-sugerencias .gif-img")[c];
    imggg.setAttribute("src", "assets/loading-gif.gif");
    let fetchh = await fetch(giphyApiUrl + "random?api_key=" + giphyKey);
    let fetched = await fetchh.json();
    imggg.setAttribute("src", fetched.data.images.fixed_width_downsampled.url);


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
        divGif.classList.add("gif-container-tendencias");


        if ((element.images.downsized_large.width / element.images.downsized_large.height) > 1.59) {
            divGif.classList.add("griddoble");
        }

        divGifImg.classList.add("gif-img-container-tendencias");
        Gifimg.setAttribute("src", element.images.fixed_width_downsampled.url);
        Gifimg.classList.add("gif-img");
        divGifTitle.classList.add("gif-title-container-tendencias");


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
/* TENDENCIAS   */

/* BUSCAR   */

let searchSugerenciaAbortController;

async function getSearchSugerencias(search) {

    if (searchSugerenciaAbortController) {
        searchSugerenciaAbortController.abort();
    }

    const url = "https://api.giphy.com/v1/tags/related/" + search + "?api_key=" + giphyKey;

    searchSugerenciaAbortController = new AbortController();

    let fetchh = await fetch(url, { signal: searchSugerenciaAbortController.signal });

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
        .catch(err => document.getElementById("search-change").innerHTML = "No se encontraron resultados :(");


}

function searchSugerencia(button) {
    let search = button.innerHTML;
    document.getElementById("input-buscar-text").value = search;
    changetoSearch();
}

function searchVermas(search) {
    document.getElementById("input-buscar-text").value = search;
    changetoSearch();

}

function renderSugerenciasdeBusqueda(inputSearch) {
    let buttons = document.getElementsByClassName("buscar-sugerencias");
    buttons[0].innerHTML = "";
    let resp;

    getSearchSugerencias(inputSearch).then(response => {
        console.log(response);
        searchSugerenciaAbortController = null;

        resp = response;

        if (resp.data.length == 0) {
            let button = document.createElement("button");
            button.classList.add("button-sugerencia");
            button.classList.add("noresult");
            buttons[0].appendChild(button);
            document.getElementsByClassName("button-sugerencia")[0].innerHTML = "No se encontraron resultados";
        } else {
            if (resp.data.length > 5) {
                resp.data = resp.data.slice(0, 4);
            }
            for (let i = 0; i < resp.data.length; i++) {
                if (resp.data[i].name == '') {} else {
                    let button = document.createElement("button");
                    button.classList.add("button-sugerencia");
                    buttons[0].appendChild(button);
                    document.getElementsByClassName("button-sugerencia")[i].innerHTML = resp.data[i].name;
                    document.getElementsByClassName("button-sugerencia")[i]
                        .addEventListener("click", function() {
                            searchSugerencia(document.getElementsByClassName("button-sugerencia")[i])
                        }, false);
                }
            }
        }
    })

}

function mostrarSugerencias() {
    let inputSearch = document.getElementById("input-buscar-text").value;

    inputSearch = inputSearch.trim();

    if ((inputSearch.length) = 2) {
        document.getElementsByClassName("search-button")[0]
            .addEventListener("click", changetoSearch, false);

        document.getElementsByClassName("buscar-sugerencias")[0].classList.add("toogle");
    }

    if ((inputSearch.length) > 1) {
        renderSugerenciasdeBusqueda(inputSearch.replace(/\s/g, '+'));
        document.querySelector(".search-button img").src = "assets/lupa.svg";
        document.querySelector(".search-button img").classList.add("active");


        document.querySelector(".search-button").classList.add("searchButtonActive");
    } else {

        document.querySelector(".buscar-sugerencias").classList.remove("toogle");

        document.querySelector(".search-button img").src = "assets/lupa_inactive.svg";

        document.querySelector(".search-button img").classList.remove("active");

        document.querySelector(".search-button").classList.remove("searchButtonActive");


        document.getElementsByClassName("search-button")[0]
            .removeEventListener("click", changetoSearch, false);
    }
}
/* BUSCAR   */

onload();

/* sugerencias */
getRandom(4).then(response =>
    renderSugerencias(response));
/* sugerencias */


/* tendencias */
getTrending(20, tendenciasCont).then(response =>
    renderTendenciasandBusqueda(response));
/* tendencias */


let update = setTimeout(() => {});

function timeout() {

    clearTimeout(update);
    update = setTimeout(mostrarSugerencias, 200);

}

document.getElementById("input-buscar-text")
    .addEventListener("input", timeout, false);


document.getElementById("input-buscar-text")
    .addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("search-button").click();
        }
    });


document.getElementById("crear")
    .addEventListener("click", function() { changePage("crearguifo.html"); }, false);

document.getElementById("misgifos")
    .addEventListener("click", function() { changePage("crearguifo.html"); }, false);

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

document.addEventListener('scroll',
    function() {
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