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

  const response = await login(inputValues.email, inputValues.password);
  loginButton.disabled = false;

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

  // Redirect ke halaman yang tepat seesuai role
  if (userData.data.role === "user") {
    window.location.href = "/index.html";
  } else {
    window.location.href = "/admin.html";
  }
});
