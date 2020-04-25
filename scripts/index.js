    onload();


    getRandom(4).then(response => {
        renderSugerencias(response);
    });
    getTrending(20).then(response =>
        renderTendencias(response));

    document.getElementById("input-buscar-text")
        .addEventListener("input", mostrarSugerencias, false);


    document.getElementsByClassName("search-button")[0]
        .addEventListener("click", changetoSearch, false);