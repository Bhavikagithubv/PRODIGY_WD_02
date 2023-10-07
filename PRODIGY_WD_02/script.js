// script.js
let startTime;
let interval;
let running = false;
let lapCount = 1;

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startPause() {
    if (running) {
        clearInterval(interval);
        startPauseButton.textContent = 'Start';
        running = false;
    } else {
        startTime = Date.now() - (lapCount > 1 ? lapCount - 1 : 0);
        interval = setInterval(updateDisplay, 10);
        startPauseButton.textContent = 'Pause';
        running = true;
    }
}

function reset() {
    clearInterval(interval);
    startPauseButton.textContent = 'Start';
    display.textContent = '00:00:00';
    running = false;
    lapCount = 1;
    lapsList.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = calculateLapTime();
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount++}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

function calculateLapTime() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    startTime = currentTime;
    return formattedTime;
}

function updateDisplay() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
reset();
