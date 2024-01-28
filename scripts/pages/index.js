import { getAccessToken } from "../lib/fetch.js";
import { getMenu, getOrdersUser, getUser } from "../lib/user-data.js";
import {
  renderUserMenu,
  renderUserOrders,
  renderUserTotalPrice,
} from "../lib/render-html.js";

// Event listener untuk notice
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

  if (user.data.role !== "user") {
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

  const menu = await getMenu();
  const userOrders = await getOrdersUser();

  if (!menu.status) {
    alert(menu.message);
    return;
  }

  if (!userOrders.status) {
    alert(userOrders.message);
    return;
  }

  renderUserOrders(userOrders.data, menu.data, ordersList);
  renderUserTotalPrice(userOrders.data, menu.data, ordersTotalPrice);
  renderUserMenu(menu.data, menuList, ordersList, ordersTotalPrice);

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
