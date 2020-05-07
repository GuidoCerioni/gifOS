onload();

document.getElementsByClassName("arrowimg")[0]
    .addEventListener("click", function() { changePage("index.html"); }, false);

function noCamera() {
    document.getElementsByClassName("nocameraAlert")[0].classList.add("show");
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


let recorder;
let blobb;

function startRecordVideo() {
    console.log("empiezo a grabar");
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
            });
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
                console.log(stream);
                /* style*/
                let section = document.querySelector("section .buscar-container");
                section.classList.add("fitcontent");
                let vid = document.createElement("video");
                vid.classList.add("fit");
                vid.setAttribute("id", "video");
                let comenzar = document.getElementsByClassName("instrucciones-buttons")[0];
                div.insertBefore(vid, comenzar);
                /* style*/
                let video = document.getElementById('video');
                video.srcObject = stream;
                video.play();


            })
            .catch(error => {
                console.log(error);
                noCamera();
            });
    } else {
        console.log("Hubo un problema al capturar el video");
    }
}

document.getElementById("comenzar")
    .addEventListener("click", startVideoStream, false);