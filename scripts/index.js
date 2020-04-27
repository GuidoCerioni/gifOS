let tendenciasCont = 0;
let busquedaCont = 0;
let searchFlag = 0;
let searchQuery = "";
let t;

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
/* TENDENCIAS   */

/* BUSCAR   */

/* const controller = new AbortController();
const signal = controller.signal;
 */

async function getSearchSugerencias(search) {
    /* controller.abort(); */

    const url = "https://api.datamuse.com/sug?s=" + search + "&max=4";

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
        .catch(err => document.getElementById("search-change").innerHTML = "No se encontraron resultados :(");


}

function searchSugerencia(button) {
    let search = button.innerHTML;
    document.getElementById("input-buscar-text").value = search;
    changetoSearch();
}

function renderSugerenciasdeBusqueda(inputSearch) {
    let buttons = document.getElementsByClassName("buscar-sugerencias");
    buttons[0].innerHTML = "";
    let resp;

    getSearchSugerencias(inputSearch).then(response => {
        console.log(response.ok + " y " + response.StatusCode);
        resp = response;
        if (!response) {
            resp = [{ word: "Tendencias" }, { word: "Mas vistos" }, { word: "Más recientes" }];
        }

        if (resp.length == 0) {
            resp = ["Tendencias", "Más vistos", "Recientes"];
            let button = document.createElement("button");
            button.classList.add("button-sugerencia");
            buttons[0].appendChild(button);
            document.getElementsByClassName("button-sugerencia")[0].innerHTML = "No se encontraron resultados";
        } else {
            for (let i = 0; i < resp.length; i++) {
                if (resp[i].word == '') {} else {
                    let button = document.createElement("button");
                    button.classList.add("button-sugerencia");
                    buttons[0].appendChild(button);
                    document.getElementsByClassName("button-sugerencia")[i].innerHTML = resp[i].word;
                    document.getElementsByClassName("button-sugerencia")[i].addEventListener("click", function() { searchSugerencia(document.getElementsByClassName("button-sugerencia")[i]) }, false);
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
    } else {
        document.getElementsByClassName("buscar-sugerencias")[0].classList.remove("toogle");
    }
}
/* BUSCAR   */

onload();

/* sugerencias */
getRandom(4).then(response =>
    renderSugerencias(response));

/* tendencias */
getTrending(20, tendenciasCont).then(response =>
    renderTendenciasandBusqueda(response));

let update = setTimeout(() => {});

function timeout() {

    clearTimeout(update);
    update = setTimeout(mostrarSugerencias, 500);

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
    .addEventListener("click", function() { changePage("search.html"); }, false);

document.getElementById("misgifos")
    .addEventListener("click", function() { changePage("search.html"); }, false);

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