    let tendenciasCont = 0;
    let busquedaCont = 0;
    let searchFlag = 0;
    let searchQuery = "";
    let t;
    onload();


    getRandom(4).then(response =>
        renderSugerencias(response));

    getTrending(20, tendenciasCont).then(response =>
        renderTendenciasandBusqueda(response));

    function timeout() {
        clearTimeout(t);

        t = setTimeout(mostrarSugerencias, 200);
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