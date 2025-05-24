import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "../css/1-timer.css";

const datePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const daysField = document.querySelector("[data-days]");
const hoursField = document.querySelector("[data-hours]");
const minutesField = document.querySelector("[data-minutes]");
const secondsField = document.querySelector("[data-seconds]");

const disableStartButton = () => {
  startBtn.disabled = 'disabled';
};

const enableStartButton = () => {
  if (startBtn.hasAttribute('disabled')) {
    startBtn.removeAttribute('disabled');
  }
};

const disableDatePicker = () => {
  datePicker.disabled = true;
};

const enableDatePicker = () => {
  if (datePicker.hasAttribute('disabled')) {
    datePicker.removeAttribute('disabled');
  }
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const remainingDays = Math.floor(ms / day);
  const remainingHours = Math.floor((ms % day) / hour);
  const remainingMinutes = Math.floor(((ms % day) % hour) / minute);
  const remainingSeconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { remainingDays, remainingHours, remainingMinutes, remainingSeconds };
}

const addLeadingZero = (value) => {
  value = String(value);
  return value.padStart(2, '0');
}

const timeTicking = () => {
  const timer = setInterval( () => {
    const now = new Date();
    const timeLeft = convertMs(userSelectedDate - now)

    if (userSelectedDate - now < 0) {
      clearInterval(timer);
      enableStartButton();
      enableDatePicker();
      return;
    }

    daysField.textContent =  addLeadingZero(timeLeft.remainingDays);
    hoursField.textContent = addLeadingZero(timeLeft.remainingHours);
    minutesField.textContent = addLeadingZero(timeLeft.remainingMinutes);
    secondsField.textContent = addLeadingZero(timeLeft.remainingSeconds);
  }, 1000);
}

// початок роботи програми
disableStartButton();

let userSelectedDate = '';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: (selectedDates) => {
    if (selectedDates[0] <= new Date()) {
      alert('Please choose a date in the future');
      disableStartButton();
    } else {
      userSelectedDate = selectedDates[0];
      enableStartButton();
    }
  },
};

flatpickr(datePicker, options);

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  disableDatePicker();
  disableStartButton();
  timeTicking();
})



