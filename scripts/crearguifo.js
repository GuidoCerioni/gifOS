onload();
/* timer */
let timer;

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
}
/* timer */
document.getElementsByClassName("arrowimg")[0]
    .addEventListener("click", function() { changePage("index.html"); }, false);

function noCamera() {
    document.querySelector(".nocameraAlert").classList.add("show");
}

function returntoCrear() {
    location.reload();

}



function styleRecording() {
    document.querySelector(".camerabutton").classList.remove("showflex");

    const readybutton = document.querySelector(".readybutton");
    readybutton.classList.add("showflex");
    readybutton.addEventListener("click", stopRecord, false);

    const but = document.querySelector(".crear-buttons");
    but.classList.add("showflex");
    but.style["justify-content"] = "space-between";

    document.querySelector(".timer").classList.add("showflex");


    startTimer();





}


function startRecord() {
    styleRecording();
    startRecordVideo();
}

function styleStopRecord() {
    document.querySelector(".readybutton").classList.remove("showflex");

    document.querySelector(".twobuttonsfinal").classList.add("showflex");

}

let globalStream;

function stopRecord() {
    let blob = stopRecordVideo();
    clearInterval(timer);
    styleStopRecord();


    let videoStream = document.getElementById('videostream');
    /* videoStream.pause(); 
    globalStream.stop(); */

    globalStream.getTracks().forEach(track => track.stop());

    console.log("Vid off");
    /*

           videoStream.classList.add("noshow");
        */
    let div = document.querySelector(".div-instrucciones");

    let vid = document.createElement("img");
    vid.setAttribute("id", "recordedvideo");
    let child = document.querySelector(".crear-buttons");
    div.insertBefore(vid, child);
    /*style  */
    vid.setAttribute("src", blob);




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
        /*  navigator.mediaDevices.getUserMedia({ video: true })
             .then(function(stream) {
                 recorder = RecordRTC(stream, constraits);
                 recorder.startRecording();
             }) */
    recorder = RecordRTC(globalStream, constraits);
    recorder.startRecording();
}

function stopRecordVideo() {
    console.log("dejo a grabar");

    recorder.stopRecording(() => {
        blobb = recorder.getBlob();
    })

    const blobURL = URL.createObjectURL(blobb);
    return blobURL;

}

function styleVideoStream() {
    const div = document.getElementsByClassName("div-instrucciones")[0];
    div.classList.add("whenrecording");


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
    document.querySelector(".div-instrucciones").classList.add("loadingcamera");


}

function startVideoStream1() {
    let div = document.querySelector(".div-instrucciones");

    /* styles */
    styleVideoStream();

    /* video */
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                globalStream = stream;
                /* creo VIDEO tag*/
                let vid = document.createElement("video");
                vid.setAttribute("id", "videostream");
                let child = document.querySelector(".crear-buttons");
                div.insertBefore(vid, child);
                /*style  */
                div.classList.remove("loadingcamera");

                /**/

                let video = document.getElementById('videostream');
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

function startVideoStream() {
    let div = document.querySelector(".div-instrucciones");

    /* styles */
    styleVideoStream();

    /* video */
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

        function success(stream) {
            globalStream = stream;
            /* creo VIDEO tag*/
            let vid = document.createElement("video");
            vid.setAttribute("id", "videostream");
            let child = document.querySelector(".crear-buttons");
            div.insertBefore(vid, child);
            /*style  */
            div.classList.remove("loadingcamera");

            /**/

            let video = document.getElementById('videostream');
            video.srcObject = stream;
            video.play();



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

document.getElementById("comenzar")
    .addEventListener("click", startVideoStream, false);