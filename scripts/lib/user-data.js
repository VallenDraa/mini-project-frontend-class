import { BASE_URL, fetchWithToken } from "./fetch.js";

// Function untuk ambil data user
export async function getUser() {
  try {
    const json = await fetchWithToken(`${BASE_URL}/user`, {
      method: "GET",
    });

    return json;
  } catch (error) {
    return {
      status: false,
      message: "gagal mengambil data user!",
      data: null,
    };
  }
}

// Function untuk ambil data order user
export async function getOrdersUser() {
  try {
    const json = await fetchWithToken(`${BASE_URL}/product/order-user`, {
      method: "GET",
    });

    return json;
  } catch (error) {
    return {
      status: false,
      message: "gagal mengambil data pesanan user!",
      data: null,
    };
  }
}

// Function untuk ambil data menu
export async function getMenu() {
  try {
    const json = await fetchWithToken(`${BASE_URL}/product`, {
      method: "GET",
    });

    return json;
  } catch (error) {
    return {
      status: false,
      message: "gagal mengambil data menu!",
      data: null,
    };
  }
}

// Function untuk membuat pesanan
export async function createOrdersUser(productId, quantity) {
  try {
    const json = await fetchWithToken(`${BASE_URL}/product/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    });

    return json;
  } catch (error) {
    return {
      status: false,
      message: "gagal mengambil data menu!",
      data: null,
    };
  }
}
