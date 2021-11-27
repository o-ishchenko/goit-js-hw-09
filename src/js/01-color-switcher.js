const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let intervalId = null;

startBtnEl.addEventListener('click', onStartButtonClick);
stopBtnEl.addEventListener('click', onStopButtonClick);

function onStartButtonClick() {
    intervalId = setInterval(changeColor, 1000);
    startBtnEl.setAttribute('disabled', true);
    stopBtnEl.removeAttribute('disabled');
};

function onStopButtonClick() {
    clearInterval(intervalId);
    startBtnEl.removeAttribute('disabled');
    stopBtnEl.setAttribute('disabled', true);
    };

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function changeColor() {
    bodyEl.style.backgroundColor = getRandomHexColor();
}
