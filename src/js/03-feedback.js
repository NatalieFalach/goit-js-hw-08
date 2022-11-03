import throttle from 'lodash.throttle';
import storage from './storage';

const feedbackForm = document.querySelector('.feedback-form');
const feedbackStateKey = 'feedback-form-state';
let feedbackState = storage.load(feedbackStateKey);

if (feedbackState) {
  const { email, message } = feedbackForm.elements;

  email.value = feedbackState.email;
  message.value = feedbackState.message;
}

feedbackForm.addEventListener('input', throttle(onFormChange, 500));
feedbackForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const { email, message } = feedbackForm.elements;

  if (email.value === '' && message.value === '') {
    alert('Please fill all inputs');

    return;
  }

  console.log(feedbackState);

  storage.remove(feedbackStateKey);
  feedbackForm.reset();
  feedbackState = null;
}

function onFormChange(e) {
  const { email, message } = feedbackForm.elements;
  const feedBackObject = {
    email: email.value,
    message: message.value,
  };

  storage.save(feedbackStateKey, feedBackObject);
}
