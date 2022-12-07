import throttle from 'lodash.throttle'

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('textarea'),
    input: document.querySelector('input'),
};
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

localText();

refs.form.addEventListener('submit', onForm);
refs.form.addEventListener('input', throttle(onText, 500));

function onText(e) {
    let formData = localStorage.getItem(STORAGE_KEY);
        formData = formData ? JSON.parse(formData) : {};

    formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function onForm(e) {
let formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
console.log(formData);
e.preventDefault();
e.currentTarget.reset();
localStorage.removeItem(STORAGE_KEY);
};

function localText() {
    const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

     if (savedMessage) {
         refs.textarea.value = savedMessage.message || "";
         refs.input.value = savedMessage.email || "";
     }
}
