import { BASE_URL, deleteAccessToken, fetchWithToken } from "./fetch.js";

// Function untuk Login
export async function login(email, password) {
  try {
    const json = await fetchWithToken(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return json;
  } catch (error) {
    return {
      status: false,
      message: "gagal login!",
      data: null,
    };
  }
}

// Function untuk Signup
export async function signup(username, email, password) {
  try {
    const json = await fetchWithToken(`${BASE_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    return json;
  } catch (error) {
    return {
      status: false,
      message: "gagal sign up!",
      data: null,
    };
  }
}

// Function untuk logout
export function logout() {
  deleteAccessToken();
  window.location.href = "/login.html";
}
