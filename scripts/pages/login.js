import { login } from "../lib/auth.js";
import { deleteAccessToken, putAccessToken } from "../lib/fetch.js";
import { getUser } from "../lib/user-data.js";

deleteAccessToken();

const loginForm = document.querySelector("#login-form");
const loginButton = document.querySelector("#login-button");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  loginButton.disabled = true;

  const formData = new FormData(e.target);
  const inputValues = Object.fromEntries(formData);

  const response = await login({
    email: inputValues.email,
    password: inputValues.password,
  });

  if (!response.status) {
    alert(response.message);
    loginButton.disabled = false;
    return;
  }

  putAccessToken(response.data.accessToken);
  const userData = await getUser();

  loginButton.disabled = false;

  if (!userData.status) {
    alert(userData.message);
    return;
  }

  if (userData.data.role === "user") {
    window.location.href = "/";
  } else {
    window.location.href = "/admin.html";
  }
});
