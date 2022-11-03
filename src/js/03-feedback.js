import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

if (localStorage.getItem('feedback-form-state')) {
  const { email: emailValue, message: messageValue } = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );
  const { email, message } = form.elements;

  email.value = emailValue;
  message.value = messageValue;
}

function onFormSubmit(e) {
  e.preventDefault();

  console.log(getFeedbackObj());

  localStorage.removeItem('feedback-form-state');
  form.reset();
}

function onFormInput(e) {
  localStorage.setItem('feedback-form-state', JSON.stringify(getFeedbackObj()));
}

function getFeedbackObj() {
  const { email, message } = form.elements;

  return {
    email: email.value,
    message: message.value,
  };
}
