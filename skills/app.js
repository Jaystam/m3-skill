let timer;
let startTime;
let running = false;

function startStop() {
  if (running) {
    clearInterval(timer);
    document.getElementById('startStopBtn').innerText = 'Start';
    running = false;
  } else {
    startTime = new Date().getTime() - (pausedTime || 0);
    timer = setInterval(updateDisplay, 1000); // Update every second
    document.getElementById('startStopBtn').innerText = 'Stop';
    running = true;
  }
}

function reset() {
  clearInterval(timer);
  document.getElementById('startStopBtn').innerText = 'Start';
  running = false;
  pausedTime = 0;
  document.getElementById('display').innerText = '00:00';
}

function updateDisplay() {
  let elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000); // Elapsed time in seconds
  let minutes = Math.floor(elapsedTime / 60);
  let seconds = elapsedTime % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  document.getElementById('display').innerText = `${minutes}:${seconds}`;
}

let pausedTime;
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    if (running) {
      clearInterval(timer);
      pausedTime = new Date().getTime() - startTime;
      running = false;
    }
  } else {
    if (!running && typeof pausedTime !== 'undefined') {
      startTime = new Date().getTime() - pausedTime;
      timer = setInterval(updateDisplay, 1000); // Update every second
      running = true;
    }
  }
});


const rangeValue = document.getElementById("js--rangeValue");
const slider = document.getElementById("js--slider");
const body = document.getElementById("js--body");
slider.value = 2;
rangeValue.innerText = slider.value + "x";

slider.oninput = function() {
    rangeValue.innerText = slider.value + "x";
    body.style.fontSize = slider.value + "rem";
}

const img = document.getElementById("js--img");
const paragraph = document.getElementById("js--text")

let data = fetch("data.json").then(
    function(binnenGekomenData){
        return binnenGekomenData.json();
    }).then(
        function(echteData){
            paragraph.innerHTML = echteData.text;
            img.setAttribute("src", echteData.img)
        }
    )

