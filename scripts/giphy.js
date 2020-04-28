/* Giphy Api */
const giphyKey = "jaxtYCDY3LieEnJr0ksg3CAKLFTa7THg";
const giphyApiUrl = "https://api.giphy.com/v1/gifs/";

async function getTrending(ammount, offset) {
    tendenciasCont = tendenciasCont + 20;
    const url = giphyApiUrl + "trending?api_key=" + giphyKey + "&limit=" + ammount + "&offset=" + offset;

    let fetchh = await fetch(url);
    return await fetchh.json();
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

async function getSearchResults(ammount, search, offset) {
    busquedaCont = busquedaCont + 20;
    const url = giphyApiUrl + "search?api_key=" + giphyKey + "&q=" + search + "&limit=" + ammount + "&offset=" + offset;
    let fetchh = await fetch(url);

    return await fetchh.json();

}



