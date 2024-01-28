import { BASE_URL, deleteAccessToken } from "./fetch.js";

export async function login({ email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    return json;
  } catch (error) {
    return { status: false, message: "gagal login!", data: null };
  }
}

export async function signup({ username, email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const json = await response.json();

    return json;
  } catch (error) {
    return { status: false, message: "gagal signup!", data: null };
  }
}

export function logout() {
  deleteAccessToken();
  window.location.href = "/login.html";
}
