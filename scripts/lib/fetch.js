export const BASE_URL = "https://backend-basic-gdsc.vercel.app";

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

export function deleteAccessToken() {
  localStorage.removeItem("accessToken");
}

export async function fetchWithToken(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  return response.json();
}
