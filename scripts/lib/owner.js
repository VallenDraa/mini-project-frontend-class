import { BASE_URL, fetchWithToken } from "./fetch.js";

export async function getOrdersOwner() {
  try {
    const json = await fetchWithToken(`${BASE_URL}/order-owner`, {
      method: "GET",
    });

    return json;
  } catch (error) {
    return {
      status: false,
      message: "gagal mengambil pesanan dari sisi owner!",
      data: null,
    };
  }
}

export async function addMenu({ name, stock, type }) {
  try {
    const json = await fetchWithToken(`${BASE_URL}/product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, stock, type }),
    });

    return json;
  } catch (error) {
    return { status: false, message: "gagal menambah produk!", data: null };
  }
}

export async function acceptOrder({ productId }) {
  try {
    const json = await fetchWithToken(
      `${BASE_URL}/product/accept-order/${productId}`,
      { method: "PUT" },
    );

    return json;
  } catch (error) {
    return {
      status: false,
      message: "gagal menerima pesanan!",
      data: null,
    };
  }
}
