import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "../css/2-snackbar.css";

const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const delayInput = form.elements.delay.value;
  const stateInput = form.elements.state.value;

  const delay = Number(delayInput);
  const state = stateInput;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      state === "fulfilled"
        ? resolve(delay)
        : reject(delay);
    }, delay);
  });

  promise
    .then((d) => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: "topRight",
        timeout: 5000,
      });
    })
    .catch((d) => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: "topRight",
        timeout: 5000,
      });
    });

  form.reset();
});

