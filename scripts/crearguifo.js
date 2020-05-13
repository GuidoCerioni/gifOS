const giphyKey = "jaxtYCDY3LieEnJr0ksg3CAKLFTa7THg";
const giphyApiUrl = "https://api.giphy.com/v1/gifs/";

let timer;
let globalStream;
let recorder;
let blob;
let blobURL;
let postForm;
const controller = new AbortController();
const signal = controller.signal;

let gifNum;
let mygifsArray = [];
let mygifCont = 0;
let gifId;

const repeatButton = document.getElementById("repetir");
const postButton = document.getElementById("subir");
const divInstrucciones = document.querySelector(".div-instrucciones");
const but = document.querySelector(".crear-buttons");

let videoHeight;
let videoWidth;
let mygifsArraybyId;
let ccontador;

/* localStorage.clear();*/


function buttonMisGuifos() {
    document.querySelector(".box-container").classList.add("noshow");
    document.getElementById("misgifos").classList.add("active");
}

function checkGifsLocalStorage() {
    let bandera = 1;

    do {
        let gifName = "gif" + mygifCont;
        if (localStorage.getItem(gifName)) {
            mygifsArray[mygifCont] = localStorage.getItem(gifName);
            mygifCont += 1;
        } else {
            bandera = 0;
        }
    } while (bandera);

}

async function getMyGifs(mygifsArray) {
    let mygifsArraybyId = [];

    for (let i = 0; i < mygifsArray.length; i++) {
        let url = giphyApiUrl + mygifsArray[i] + "?api_key=" + giphyKey;
        let fetchh = await fetch(url);
        let fetched = await fetchh.json();
        mygifsArraybyId.push(fetched);
    }
    return mygifsArraybyId;

}

function renderMisGuifos(arrayGifId) {
    let ccontador = 1;
    arrayGifId.forEach(element => {
        const divGif = document.createElement("div");
        const divGifImg = document.createElement("div");
        const Gifimg = document.createElement("img");
        const divGifTitle = document.createElement("div");
        const h2Title = document.createElement("h2");
        const div = document.createElement("div");


        /* seteo clases/atributos */
        divGif.classList.add("gif-container-tendencias");


        if ((element.data.images.fixed_width_downsampled.width / element.data.images.fixed_width_downsampled.height) > 1.59) {
            divGif.classList.add("griddoble");
        }

        divGifImg.classList.add("gif-img-container-tendencias");
        Gifimg.setAttribute("src", element.data.images.fixed_width_downsampled.url);
        Gifimg.classList.add("gif-img");
        divGifTitle.classList.add("gif-title-container-tendencias");

        h2Title.innerHTML = "#MyGif" + ccontador;
        ccontador += 1;




        /* agrego hijos */
        divGifImg.append(Gifimg);
        divGifTitle.append(h2Title);
        divGifTitle.append(div);
        divGif.append(divGifImg);
        divGif.append(divGifTitle);


        const MisGuifosNode = document.getElementById("misguifos");
        MisGuifosNode.append(divGif);
    });

}

function saveGifLocalStorage(gifID) { /* creo un array de ids de mis guifos */
    let gifNum = mygifCont;
    let gifName = "gif" + gifNum;
    localStorage.setItem(gifName, gifID)
}
/* timer */
function startTimer() {
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;

    timer = setInterval(setTime, 1000);

    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }
} /* timer */

function noCamera() {
    document.querySelector(".nocameraAlert").classList.add("show");
    but.classList.add('noshow')
}


function returntoCrear() {
    location.reload();
}

function styleUploading() {
    document.querySelector(".box-title-container h2").innerHTML = "Subiendo guifo";

    document.querySelector(".timer").classList.remove("showflex");

    document.querySelector(".twobuttons2").classList.remove("showflex");
    document.getElementById('recordedvideo').classList.add("noshow");

    let div = document.querySelector(".uploadingGuifo");
    div.classList.add("showflex");

    document.querySelector(".crear-buttons").classList.remove("noshow");

    document.getElementById('abortPostButton').classList.add("show");
    /*  */
    but.style.justifyContent = "flex-end";
    document.getElementById("abortPostButton").addEventListener("click", abortPost, false);

}

function abortPost() {
    console.log('Now aborting');
    controller.abort()
    window.location.reload();
}

function downloadGuifo() {
    recorder.save("myGuifo.gif");
}

async function copylinkGuifo() {
    let url = giphyApiUrl + gifId + "?api_key=" + giphyKey;
    let fetchh = await fetch(url);
    let fetched = await fetchh.json();

    navigator.clipboard.writeText(fetched.data.images.original.url);
    document.getElementById("copied").classList.add("show");
    setTimeout(function() {
        document.getElementById("copied").classList.remove("show");
    }, 2000);
}


function styleUploaded() {

    document.getElementById('recordedvideo').classList.remove("noshow");

    but.classList.remove("showflex");
    but.classList.add("noshow");

    document.querySelector(".guifouploaded").classList.add("show");
    document.getElementById("download").addEventListener("click", downloadGuifo, false);
    document.getElementById("copylink").addEventListener("click", copylinkGuifo, false);

    divInstrucciones.classList.remove("noshow");
    divInstrucciones.classList.add("showflex");
    let div = document.querySelector(".uploadingGuifo");
    div.classList.remove("showflex");

    document.getElementById("abortPostButton").classList.remove("show");

}

function postGif() {
    postForm = new FormData();
    postForm.append('file', blob, 'myGifo.gif');

    fetch('https://upload.giphy.com/v1/gifs?api_key=' + giphyKey + '&source_image_url=' + blobURL, {
            method: "POST",
            body: postForm,
            signal: signal
        }).then(async response => {

            jsonRes = await response.json();
            return jsonRes;
        })
        .catch(error => console.error('Error:', error))
        .then((response) => {
            gifId = response.data.id;
            saveGifLocalStorage(response.data.id);
            styleUploaded();
            console.log('Success:', response);
            getMyGifs(mygifsArray).then(response => renderMisGuifos(response));
        });

    styleUploading();
}

function styleRecording() {
    document.querySelector(".box-title-container h2").innerHTML = "Capturando tu guifo";


    document.querySelector(".camerabutton").classList.remove("showflex");

    const readybutton = document.querySelector(".readybutton");
    readybutton.classList.remove("noshow");

    readybutton.classList.add("showflex");

    readybutton.addEventListener("click", stopRecord, false);


    but.classList.add("showflex");


    document.querySelector(".timer").classList.add("showflex");
    document.querySelector(".timer").classList.remove("noshow");

    startTimer();
    but.style.justifyContent = "space-between";
}

function styleStopRecord() {
    document.querySelector(".box-title-container h2").innerHTML = "Vista previa";


    if (document.getElementById('recordedvideo')) {
        document.getElementById('recordedvideo').classList.remove("noshow")
    }
    /* buttons */
    document.querySelector(".readybutton").classList.remove("showflex");
    document.querySelector(".twobuttons2").classList.remove("noshow");
    document.querySelector(".twobuttons2").classList.add("showflex");

    /* video preview */
    document.getElementById('videostream').classList.add("noshow");


    if (!(document.querySelector("#recordedvideo"))) { //me fijo si ya está creado (ej. caso REPEAT)
        let recordedImg = document.createElement("img");
        recordedImg.setAttribute("id", "recordedvideo");
        let child = document.querySelector(".crear-buttons");
        divInstrucciones.insertBefore(recordedImg, child);
        recordedImg.setAttribute("src", blobURL);
    } else {
        document.getElementById("recordedvideo").src = blobURL;

    }



}

function stopRecord() {
    clearInterval(timer); /* timer */
    stopRecordVideo(); /* RTC record */
    styleStopRecord(); /* STYLE video preview, buttons, timer */

    /* buttons event listeners */
    postButton.addEventListener("click", postGif, false);
    repeatButton.addEventListener("click", repeatRecord, false);

}

function startRecord() {
    styleRecording();
    startRecordVideo();
}

function repeatRecord() {

    document.querySelector(".twobuttons2").classList.add('noshow');
    document.querySelector(".timer").classList.add('noshow');
    document.querySelector(".timer").classList.remove('showflex');

    document.getElementById("recordedvideo").classList.add('noshow');

    document.getElementById("seconds").innerHTML = "00";

    console.log('hola');
    startVideoStream();
    but.style.justifyContent = "flex-end";

}

function styleVideoStream() {

    divInstrucciones.classList.add("whenrecording");


    document.getElementsByClassName("window-img")[0]
        .classList.add("noshow");

    document.getElementsByClassName("instrucciones")[0]
        .classList.add("noshow");

    document.querySelector(".twobuttons")
        .classList.add("noshow");


    const camerabutton = document.querySelector(".camerabutton");
    camerabutton.classList.add("showflex");
    camerabutton.addEventListener("click", startRecord, false);


    const section = document.querySelector("section .box-container");
    section.classList.add("fitcontent");

    const titleCont = document.querySelector(".box-title-container");
    titleCont.classList.add("flex");

    document.querySelector(".box-title-container h2").innerHTML = "Un chequeo antes de empezar";

    const cruzimg = document.querySelector(".box-title-container img");
    cruzimg.classList.add("show");
    cruzimg.addEventListener("click", returntoCrear, false);
    divInstrucciones.classList.add("loadingcamera");

    let divv = document.createElement("div");
    divv.classList.add("divloadingcamera");
    let child = document.querySelector(".crear-buttons");
    divInstrucciones.insertBefore(divv, child);

}

function startVideoStream() {

    /* styles */
    styleVideoStream();

    /* video */
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

        function success(stream) {
            globalStream = stream;
            if (!(document.getElementById('videostream'))) {


                /* append VIDEO tag*/
                let vid = document.createElement("video");
                vid.setAttribute("id", "videostream");
                let child = document.querySelector(".crear-buttons");
                divInstrucciones.insertBefore(vid, child);
            }
            /*style after stream*/
            divInstrucciones.classList.remove("loadingcamera");
            let divLoadingCamera = document.querySelector(".divloadingcamera");
            divLoadingCamera.parentNode.removeChild(divLoadingCamera);
            /**/

            let video = document.getElementById('videostream');

            video.srcObject = stream;
            video.play();
            video.classList.remove("noshow");

            videoWidth = video.offsetWidth;
            videoHeight = video.offsetHeight;



        }

        function error(error) {
            console.log(error);
            noCamera();
        }

        navigator.getUserMedia({ video: true }, success, error);

    } else {
        console.log("Hubo un problema al capturar el video");
    }
}

/* RTC record */
function stopRecordVideo() {

    recorder.stopRecording(() => {
        blob = recorder.getBlob();
    });

    blobURL = URL.createObjectURL(blob);

    globalStream.stop(); /* apaga la cámara */
    console.log("Camera off");
}

function startRecordVideo() {
    console.log("empiezo a grabar");

    let constraits = {
        type: 'gif',
        frameRate: 1,
        quality: 10,
    }

    recorder = RecordRTC(globalStream, constraits);
    recorder.startRecording();
}
/* RTC record */

document.getElementsByClassName("arrowimg")[0]
    .addEventListener("click", function() { changePage("index.html"); }, false);

document.getElementById("comenzar")
    .addEventListener("click", startVideoStream, false);

document.getElementById("misgifos")
    .addEventListener("click", buttonMisGuifos, false);

document.getElementById("crear")
    .addEventListener("click", function() {
        location.reload();
        document.getElementById("crear").classList.add("active");
    }, false);
document.getElementById("listo")
    .addEventListener("click", function() {
        location.reload();

    }, false);


document.querySelector(".box-container").classList.remove("noshow");

onload();
checkGifsLocalStorage();
getMyGifs(mygifsArray).then(response => renderMisGuifos(response));