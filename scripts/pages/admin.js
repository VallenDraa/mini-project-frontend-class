import { getAccessToken } from "../lib/fetch.js";
import { getOrdersAdmin } from "../lib/admin-data.js";
import { renderAdminMenu, renderAdminOrders } from "../lib/render-html.js";
import { getMenu, getUser } from "../lib/user-data.js";

async function main() {
  const token = getAccessToken();
  if (!token) {
    window.location.href = "/login.html";
  }

  const user = await getUser();

  if (!user.data) {
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
}

main();
