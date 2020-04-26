// HTML ELEMENTS
const minutesHTML = document.querySelector(".minutes");
const secondsHTML = document.querySelector(".seconds");
const buttonHTML = document.querySelector("button p");
const totalTimeNumber = document.querySelector(".total-time__number");

// EVENT LISTENERS
buttonHTML.addEventListener("click", toggleText);
buttonHTML.addEventListener("click", toggleTimer);
buttonHTML.addEventListener("click", displayTotalTime, { once: true });

// TOGGLE TEXT
function toggleText() {
  if (buttonHTML.innerHTML === "start") {
    buttonHTML.innerHTML = "stop";
  } else {
    buttonHTML.innerHTML = "start";
  }
}

// PROGRESS BAR
const circle = document.querySelector("circle");
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

// DISPLAY TOTAL TIME
function displayTotalTime() {
  let totalTime = 0;

  setInterval(() => {
    totalTime++;

    let hours = Math.floor(totalTime / 60 / 60);
    if (hours < 10) {
      hours = "0" + hours;
    }
    let mins = Math.floor(totalTime / 60);
    if (mins < 10) {
      mins = "0" + mins;
    }
    let secs = totalTime % 60;
    if (secs < 10) {
      secs = "0" + secs;
    }

    totalTimeNumber.innerHTML = `${hours}:${mins}:${secs}`;
  }, 1000);
}

// DISPLAY TIME
function displayTime(seconds) {
  const minutesInTimer = Math.floor(seconds / 60);
  const secondsInTimer = seconds % 60;

  minutesHTML.innerHTML = minutesInTimer < 10 ? `0${minutesInTimer}` : minutesInTimer;
  secondsHTML.innerHTML = secondsInTimer < 10 ? `0${secondsInTimer}` : secondsInTimer;
}

// TOGGLE TIMER
let timerRunning = false;
let countDown;

function toggleTimer() {
  session = 1500; // 25 minutes
  displayTime(session);

  const now = Date.now();
  const then = now + session * 1000;

  if (timerRunning === false) {
    countDown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      const percentsLeft = 100 + Math.round(((Date.now() + 100 - then) / 1000 / 1500) * 100);
      displayTime(secondsLeft);
      setProgress(percentsLeft);

      if (secondsLeft === 0) {
        clearInterval(countDown);
        buttonHTML.innerHTML = "well done!";
        return;
      }
    }, 1000);

    timerRunning = true;
  } else {
    clearInterval(countDown);
    timerRunning = false;
  }
}
