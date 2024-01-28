import { signup } from "../lib/auth.js";
import { deleteAccessToken, putAccessToken } from "../lib/fetch.js";

deleteAccessToken();

const registerForm = document.querySelector("#sign-up-form");
const signUpButton = document.querySelector("#sign-up-button");

registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  signUpButton.disabled = true;

  const formData = new FormData(e.target);
  const inputValues = Object.fromEntries(formData);

  const response = await signup({
    username: inputValues.username,
    email: inputValues.email,
    password: inputValues.password,
  });

  signUpButton.disabled = false;

  if (!response.status) {
    alert(response.message);
  } else {
    putAccessToken(response.data.accessToken);
    window.location.href = "/login";
  }
});
