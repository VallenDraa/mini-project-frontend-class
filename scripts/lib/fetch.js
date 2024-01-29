export const BASE_URL = "https://backend-basic-gdsc.vercel.app";

// Function untuk ambil access token
export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

// Function untuk naro access token
export function putAccessToken(accessToken) {
  localStorage.setItem("accessToken", accessToken);
}

// Function untuk hapus access token
export function deleteAccessToken() {
  localStorage.removeItem("accessToken");
}

// Function buat ngefetch data
export async function fetchWithToken(url, options) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  return response.json();
}
