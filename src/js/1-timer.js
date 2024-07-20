import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const buttonEl = document.querySelector('button[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

let userSelectedDate;

buttonEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() < Date.now()) {
      buttonEl.disabled = true;
      iziToast.error({
        position: 'topRight',
        backgroundColor: 'red',
        messageColor: 'black',
        message: 'Please choose a date in the future',
      });
    } else {
      buttonEl.disabled = false;
    }
  },
};

flatpickr(inputEl, options);

function recordingTimerDisplay({ days, hours, minutes, seconds }) {
  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

buttonEl.addEventListener('click', madeBtnClick);

function madeBtnClick() {
  inputEl.disabled = true;
  buttonEl.disabled = true;

  const intervalId = setInterval(() => {
    let diff = userSelectedDate - Date.now();

    if (diff <= 0) {
      inputEl.disabled = false;
      clearInterval(intervalId);
      recordingTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }
    const timeLeft = convertMs(diff);
    recordingTimerDisplay(timeLeft);
  }, 1000);
}
