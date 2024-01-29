import { signup } from "../lib/auth.js";
import { deleteAccessToken } from "../lib/fetch.js";

deleteAccessToken();

const signupForm = document.querySelector("#sign-up-form");
const signupButton = document.querySelector("#sign-up-button");

signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  signupButton.disabled = true;

  const formData = new FormData(e.target);
  const inputValues = Object.fromEntries(formData);

  const response = await signup(
    inputValues.username,
    inputValues.email,
    inputValues.password,
  );
  signupButton.disabled = false;

  if (!response.status) {
    alert(response.message);
    return;
  }

  window.location.href = "/login.html";
});
