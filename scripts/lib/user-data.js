import { BASE_URL, fetchWithToken } from "./fetch.js";

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

export async function getOrdersUser() {
  try {
    const json = await fetchWithToken(`${BASE_URL}/product/order-user`, {
      method: "GET",
    });

    return json;
  } catch (error) {
    return {
      status: false,
      message: "gagal mengambil pesanan dari sisi user!",
      data: null,
    };
  }
}

export async function getMenu() {
  try {
    const json = await fetchWithToken(`${BASE_URL}/product`, {
      method: "GET",
    });

    return json;
  } catch (error) {
    return { status: false, message: "gagal mengambil produk!", data: null };
  }
}

export async function createOrderUser({ productId, quantity }) {
  try {
    const json = await fetchWithToken(`${BASE_URL}/product/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });

    return json;
  } catch (error) {
    return { status: false, message: "gagal mengambil produk!", data: null };
  }
}
