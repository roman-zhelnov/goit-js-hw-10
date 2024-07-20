import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name=delay]');

form.addEventListener('submit', createSubmit);

function createSubmit(event) {
  event.preventDefault();
  const state = document.querySelector('input[type=radio]:checked');
  const delay = Number(delayInput.value);
  const promis = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state.value === 'fulfilled') {
        resolve(delay);
      } else if (state.value === 'rejected') {
        reject(delay);
      }
    }, delay);
  })
    .then(delay =>
      iziToast.success({
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'green',
        message: `✅ Fulfilled promise in ${delay}ms`,
      })
    )
    .catch(delay =>
      iziToast.error({
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'red',
        message: `❌ Rejected promise in ${delay}ms`,
      })
    )
    .finally(() => {
      delayInput.value = '';
      form.reset();
    });
}
