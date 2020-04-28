onload();

document.getElementsByClassName("arrowimg")[0]
    .addEventListener("click", function() { changePage("index.html"); }, false);


function startVideoStream() {
    let div = document.getElementsByClassName("instrucciones")[0];
    div.innerHTML = "";

    let vid = document.createElement("video");
    vid.setAttribute("id", "video");
    div.appendChild(vid);

    let buttons = document.getElementsByClassName("instrucciones-buttons")[0];
    buttons.style.display = "none";
    let img = document.getElementsByClassName("window-img")[0];
    img.style.display = "none";



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

document.getElementById("comenzar")
    .addEventListener("click", startVideoStream, false);