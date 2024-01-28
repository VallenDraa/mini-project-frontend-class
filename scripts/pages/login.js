import { login } from "../lib/auth.js";
import { deleteAccessToken, putAccessToken } from "../lib/fetch.js";
import { getUser } from "../lib/user-data.js";

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
    return;
  }

  putAccessToken(response.data.accessToken);
  const userData = await getUser();

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
