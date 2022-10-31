import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const feedbackStateKey = 'feedback-form-state';
let feedbackState = localStorage.getItem(feedbackStateKey);

if (feedbackState) {
  const data = JSON.parse(feedbackState);
  const { email, message } = feedbackForm.elements;

  email.value = data.email;
  message.value = data.message;
}

feedbackForm.addEventListener('input', throttle(onFormChange, 500));
feedbackForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  console.log(JSON.parse(feedbackState));

  localStorage.removeItem(feedbackStateKey);
  feedbackForm.reset();
  feedbackState = null;
}

function onFormChange(e) {
  const { email, message } = feedbackForm.elements;
  const feedBackObject = {
    email: email.value,
    message: message.value,
  };

  localStorage.setItem(feedbackStateKey, JSON.stringify(feedBackObject));
}
