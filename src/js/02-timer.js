// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from "notiflix";

const refs = {
    dateTime: document.querySelector('input#datetime-picker'),
    dataDay: document.querySelector('[data-days]'),
    dataHours: document.querySelector('[data-hours]'),
    dataMinutes: document.querySelector('[data-minutes]'),
    dataSeconds: document.querySelector('[data-seconds]'),
    buttonStart: document.querySelector('[data-start]'),
  };

let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
     onClose(selectedDates) {
       if (selectedDates[0] <= new Date()) {
         Notiflix.Notify.success('Please choose a date in the future');
       } else {
        refs.buttonStart.removeAttribute('disabled')
       }
    }
}

flatpickr(refs.dateTime, options);


refs.buttonStart.disabled = true;
refs.buttonStart.addEventListener('click', startTimer)

const currentTime = new Date();
let selectedDate = null;

function startTimer() {
 let futureTime = new Date(refs.dateTime.value);
  let targetTime = futureTime - currentTime;

 const selectedDate = setInterval(() => {
    const convertedData =  convertMs(targetTime);
    refs.dataDay.textContent = addLeadingZero(convertedData.days);
    refs.dataHours.textContent = addLeadingZero(convertedData.hours);
    refs.dataMinutes.textContent = addLeadingZero(convertedData.minutes);
    refs.dataSeconds.textContent = addLeadingZero(convertedData.seconds);
    targetTime -= 1000;
    console.log(convertedData);
  }, 1000)
   if (targetTime <= 0) {
    clearInterval(selectedDate);
  }
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }