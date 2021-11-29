import Notiflix from 'notiflix';
const formEl = document.querySelector('.form');
const buttonEl = document.querySelector('button');
formEl.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
     setTimeout(() => {
      if (shouldResolve) {
        resolve ({ position, delay });
      } else {
        reject ({ position, delay });
      }
    }, delay)
  });
}

function onFormSubmit(event) {
  event.preventDefault();
  const formElements = event.currentTarget.elements;
  const delayOnStart = Number(formElements.delay.value);
  const step = Number(formElements.step.value);
  const amount = Number(formElements.amount.value);
  let delayOnStep = 0;
  for (let i = 0; i < amount; i += 1) {
    delayOnStep = delayOnStart + i*step;
    createPromise(i+1, delayOnStep)
      .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      })
      .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
 
}