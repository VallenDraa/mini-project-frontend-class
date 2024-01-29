import { getAccessToken } from "../lib/fetch.js";
import { addMenu, getOrdersAdmin } from "../lib/admin-data.js";
import { renderAdminMenu, renderAdminOrders } from "../lib/render-html.js";
import { getMenu, getUser } from "../lib/user-data.js";

async function main() {
  const token = getAccessToken();
  if (!token) {
    window.location.href = "/login.html";
  }

  const user = await getUser();

  if (!user.data) {
    alert("Sesi anda habis atau terdapat kesalahan!");
    window.location.href = "/login.html";
  }

  if (user.data.role !== "admin") {
    alert("Anda bukan admin!");
    window.location.href = "/login.html";
  }

  // Elemen menu list
  const menuList = document.querySelector("#menu-list");

  // Elemen orders list
  const ordersList = document.querySelector("#order-list");

  // Elemen tambah menu
  const newMenuCloseButton = document.querySelector(".new-menu-close-button");
  const newMenuButton = document.querySelector(".new-menu-button");
  const newMenu = document.querySelector(".new-menu");
  const newMenuForm = document.querySelector(".new-menu-form");

  // Elemen user
  const userFullName = document.querySelector(".user-info-fullname");
  userFullName.textContent = user.data.username;

  const menu = await getMenu();
  const orders = await getOrdersAdmin();

  if (!menu.status) {
    alert(menu.message);
    return;
  }

  if (!orders.status) {
    alert(orders.message);
    return;
  }

  await renderAdminOrders(orders.data, menu.data, ordersList);
  await renderAdminMenu(menu.data, menuList);

  // Event listener dialog tambah menu
  newMenuButton.addEventListener("click", function () {
    newMenu.showModal();
  });

  newMenuCloseButton.addEventListener("click", function () {
    newMenu.close();
  });

  // Event listener form tambah menu
  newMenuForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(newMenuForm);
    const data = Object.fromEntries(formData);

    const response = await addMenu({
      name: data.nama,
      price: data.harga,
      stock: data.stock,
      image: `https://source.unsplash.com/random/150x150?${data.nama}`,
    });

    if (!response.status) {
      alert(response.message);
      return;
    }

    // Refresh data kopi dari backend
    const menu = await getMenu();
    if (menu.status) {
      await renderAdminMenu(menu.data, menuList);

      alert("Berhasil menambah kopi baru!");
      newMenu.close();
    } else {
      alert(menu.message);
    }
  });
}

main();
