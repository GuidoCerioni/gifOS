onload();

document.getElementsByClassName("arrowimg")[0]
    .addEventListener("click", function() { changePage("index.html"); }, false);

function noCamera() {
    document.querySelector(".nocameraAlert").classList.add("show");
}

function returntoCrear() {
    location.reload();

}

function styleVideoStream() {
    let div = document.getElementsByClassName("div-instrucciones")[0];
    div.classList.add("width");
    div.style.padding = "0px";

    document.getElementsByClassName("window-img")[0]
        .classList.add("noshow");

    document.getElementsByClassName("instrucciones")[0]
        .classList.add("noshow");

    document.getElementById("cancelar")
        .classList.add("noshow");

    document.getElementById("comenzar")
        .classList.add("noshow");

    let camerabutton = document.querySelector(".camerabutton");
    camerabutton.classList.add("showflex");
    camerabutton.addEventListener("click", startRecord, false);


    let section = document.querySelector("section .buscar-container");
    section.classList.add("fitcontent");

    let titleCont = document.querySelector(".box-title-container");
    titleCont.classList.add("flex");

    document.querySelector(".box-title-container h2").innerHTML = "Un chequeo antes de empezar";

    let cruzimg = document.querySelector(".box-title-container img");
    cruzimg.classList.add("show");
    cruzimg.addEventListener("click", returntoCrear, false)


}


let recorder;
let blobb;

function startRecordVideo() {
    console.log("empiezo a grabar");
    let constraits = {
        type: 'gif',
        frameRate: 1,
        quality: 10,
    }
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            recorder = RecordRTC(stream, constraits);
            recorder.startRecording();
        })
}

function stopRecordVideo() {
    console.log("dejo a grabar");

    recorder.stopRecording(() => {
        blobb = recorder.getBlob();
    })

    const blobURL = URL.createObjectURL(blobb);
    document.getElementById("videox").src = blobURL;


}


function startVideoStream() {
    let div = document.getElementsByClassName("div-instrucciones")[0];
    /* styles */
    styleVideoStream();
    console.log(navigator.mediaDevices);
    console.log(navigator.mediaDevices.getUserMedia);

    /* video */
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {

                /* creo VIDEO tag*/
                let vid = document.createElement("video");
                vid.setAttribute("id", "videostream");
                let child = document.querySelector(".crear-buttons");
                div.insertBefore(vid, child);

                /**/

                let video = document.getElementById('videostream');
                video.srcObject = stream;
                video.play();


            })
            .catch(error => {
                console.log(error);
                /* noCamera(); */
            });
    } else {
        console.log("Hubo un problema al capturar el video");
    }
}

document.getElementById("comenzar")
    .addEventListener("click", startVideoStream, false);