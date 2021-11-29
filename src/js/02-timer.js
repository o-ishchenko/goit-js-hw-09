import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const startBtnEl = document.querySelector('[data-start]');
const secsEl = document.querySelector('[data-seconds]');
const minsEl = document.querySelector('[data-minutes]');
const hoursEl = document.querySelector('[data-hours]');
const daysEl = document.querySelector('[data-days]');
let intervalId = null;
  
startBtnEl.setAttribute('disabled', true);
startBtnEl.addEventListener('click', countdownTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.warning("Please choose a date in the future")
    } else {
      startBtnEl.removeAttribute('disabled');
    }
  }
}

const calendar = flatpickr('#datetime-picker', options);

function countdownTimer() {
  intervalId = setInterval(changeTimerValue, 1000);
  startBtnEl.setAttribute('disabled', true)
};

function changeTimerValue() {
    const deltaTime = calendar.selectedDates[0] - Date.now();
    const timeComponents = convertMs(deltaTime);
    daysEl.textContent = timeComponents.days;
    hoursEl.textContent = timeComponents.hours;
    minsEl.textContent = timeComponents.minutes;
    secsEl.textContent = timeComponents.seconds;
    if (deltaTime < 1000) {
    clearInterval(intervalId);
  };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
    


