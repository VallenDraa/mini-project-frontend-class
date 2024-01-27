import { getAccessToken } from "../lib/fetch.js";
import { getMenu, getOrdersUser } from "../lib/user.js";
import {
  renderMenu,
  renderUserOrders,
  renderUserTotalPrice,
} from "../render-html.js";

// Event listener untuk notice
async function main() {
  const token = getAccessToken();

  if (!token) {
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

  const menu = await getMenu();
  const userOrders = await getOrdersUser();

  if (!menu.status || !userOrders.status) {
    alert(menu.message || userOrders.message);
    return;
  }

  renderUserOrders(userOrders.data, ordersList);
  renderUserTotalPrice(userOrders.data, ordersTotalPrice);
  renderMenu(menu.data, menuList, ordersList, ordersTotalPrice);

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
