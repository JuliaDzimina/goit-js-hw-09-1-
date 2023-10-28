import Notiflix from 'notiflix';

const form = document.querySelector('form');
form.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    var shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

function onSubmitForm(event) {
  event.preventDefault();

  let delay = Number(form.elements.delay.value);
  let step = Number(form.elements.step.value);
  let amount = Number(form.elements.amount.value);
  let promiseDelay = delay;
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    promiseDelay = delay + step * i;
  }
};


document.body.style.backgroundColor = '#87CEFA';

const createButton = document.querySelector('button');
createButton.style.backgroundColor = '#FFFACD';
