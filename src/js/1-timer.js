import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = String(Math.floor(ms / day)).padStart(2, '0');
  const hours = String(Math.floor((ms % day) / hour)).padStart(2, '0');
  const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(
    2,
    '0'
  );
  const seconds = String(
    Math.floor((((ms % day) % hour) % minute) / second)
  ).padStart(2, '0');
  return { days, hours, minutes, seconds };
}

const buttonEl = document.querySelector('button[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() < Date.now) {
      buttonEl.disabled = false;
      iziToast.warning({
        position: 'center',
        backgroundColor: 'red',
        messageColor: 'black',
        message: 'Please choose a date in the future',
      });
    } else {
      buttonEl.disabled = true;
    }
  },
};

flatpickr(inputEl, options);

function recordingTimerDisplay({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
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
