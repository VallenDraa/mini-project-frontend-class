import { login } from "../lib/auth.js";
import { deleteAccessToken, putAccessToken } from "../lib/fetch.js";

deleteAccessToken();

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const inputValues = Object.fromEntries(formData);

  const response = await login({
    email: inputValues.email,
    password: inputValues.password,
  });

  if (!response.status) {
    alert(response.message);
  } else {
    putAccessToken(response.data.accessToken);
    window.location.href = "/";
  }
});
