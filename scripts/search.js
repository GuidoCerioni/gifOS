onload();

document.getElementsByClassName("arrowimg")[0]
    .addEventListener("click", function() { changePage("index.html"); }, false);


function startVideoStream() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        let video = document.getElementById('video');
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                console.log(stream);

                //video.src = window.URL.createObjectURL(stream);
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