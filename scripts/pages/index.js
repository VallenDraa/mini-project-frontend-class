import { getAccessToken } from "../lib/fetch.js";
import {
  renderUserMenu,
  renderUserOrders,
  renderUserTotalPrice,
} from "../lib/render-html.js";
import { getMenu, getOrdersUser, getUser } from "../lib/user-data.js";

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

  if (user.data.role === "admin") {
    alert("Anda bukan user!");
    window.location.href = "/login.html";
  }

  // Elemen notice
  const notice = document.querySelector(".chat-notice");
  const noticeCloseButton = document.querySelector(".chat-notice-close-button");

  // Elemen chatbox
  const chatbox = document.querySelector(".chat-box");
  const chatButton = document.querySelector(".chat-button");

  // Elemen pesanan atau orders
  const ordersDetailButton = document.querySelector("#orders-detail-button");
  const orders = document.querySelector(".orders");
  const ordersList = document.querySelector(".orders-list");
  const ordersCloseButton = document.querySelector(".orders-close-button");
  const ordersTotalPrice = document.querySelector(".orders-total-price");

  // Elemen menu list
  const menuList = document.querySelector(".menu-list");

  // Elemen user
  const userFullName = document.querySelector(".user-info-fullname");
  userFullName.textContent = user.data.username;

  // Ambil data menu dan render ke UI
  const menu = await getMenu();

  if (!menu.status) {
    alert(menu.message);
    return;
  }

  renderUserMenu(menu.data, menuList, ordersList, ordersTotalPrice);

  // Ambil data pesanan dan render ke UI
  const ordersData = await getOrdersUser();

  if (!ordersData.status) {
    alert(ordersData.message);
    return;
  }

  renderUserOrders(ordersData.data, menu.data, ordersList);

  // Render total price
  renderUserTotalPrice(ordersData.data, menu.data, ordersTotalPrice);

  // Event listener untuk notice
  noticeCloseButton.addEventListener("click", function () {
    notice.classList.add("hidden");
  });

  // Event listener untuk chatbox
  chatButton.addEventListener("click", function () {
    notice.classList.add("hidden");
    chatbox.classList.toggle("hidden");
  });

  // Event listener untuk chatbox
  ordersDetailButton.addEventListener("click", function () {
    orders.showModal();
  });
  ordersCloseButton.addEventListener("click", function () {
    orders.close();
  });
}

main();
