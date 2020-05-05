onload();

document.getElementsByClassName("arrowimg")[0]
    .addEventListener("click", function() { changePage("index.html"); }, false);

function noCamera() {
    document.getElementById


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
}


function startVideoStream() {
    let div = document.getElementsByClassName("div-instrucciones")[0];
    /* styles */
    styleVideoStream();

    /* video */


    let section = document.querySelector("section .buscar-container");
    section.classList.add("fitcontent");

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                let vid = document.createElement("video");
                vid.classList.add("fit");
                vid.setAttribute("id", "video");
                let comenzar = document.getElementsByClassName("instrucciones-buttons")[0];
                div.insertBefore(vid, comenzar);
                let video = document.getElementById('video');
                video.srcObject = stream;
                video.play();
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        console.log("Hubo un problema al capturar el video");
    }
}

document.getElementById("comenzar")
    .addEventListener("click", startVideoStream, false);