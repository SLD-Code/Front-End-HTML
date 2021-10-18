const record = document.querySelector('.record');
const stop = document.querySelector('.stop');
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
   console.log('getUserMedia supported.');
   navigator.mediaDevices.getUserMedia(
      // constraints - only audio needed for this app
      {
         audio: true
      })
      // Success callback
      .then(function (stream) {
         const mediaRecorder = new MediaRecorder(stream);
         record.onclick = function () {
            mediaRecorder.start();
            console.log(mediaRecorder.state);
            console.log("recorder started");
         }
         let chunks = [];
         mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
         }
         stop.onclick = function () {
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
            console.log("recorder stopped");

         }
         mediaRecorder.onstop = function (e) {
            console.log("recorder stopped");

            const clipName = "Ansrecording" + (Math.floor(Math.random() * 1000).toString());
            const audio = document.createElement('audio');
            const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
            chunks = [];
            const audioURL = window.URL.createObjectURL(blob);
            audio.src = audioURL;
            console.log(blob);
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
               var base64data = reader.result;
               console.log(typeof base64data);
               console.log(base64data);
               fetch('/get_audio', {
                  cache: "no-cache",
                  method: 'POST',
                  body: base64data,
                  credentials: 'omit',
                  headers: new Headers({ "content-type": "application/json" })
               })
            }
         }
      })
      // Error callback
      .catch(function (err) {
         console.log('The following getUserMedia error occurred: ' + err);
      }
      );
} else {
   console.log('getUserMedia not supported on your browser!');
}
