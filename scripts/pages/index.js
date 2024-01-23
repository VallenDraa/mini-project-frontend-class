import { COFFEE_DATA } from "../data.js";

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

const ordersItem = [];

// Menampilkan data coffee
for (const coffee of COFFEE_DATA) {
  // Buat elemen menu list item
  const menuItem = document.createElement("li");
  menuItem.classList.add("menu-item");

  menuItem.innerHTML = `
    <img
      src="${coffee.image}"
      alt="${coffee.name}"
    />

    <h2 class="menu-item-name">${coffee.name}</h2>

    <div class="menu-item-action">
      <span>Rp. ${coffee.price}</span>
    </div>
  `;

  // Buat button untuk menambahkan event listener
  const button = document.createElement("button");
  button.innerHTML = "Pesan";
  button.classList.add("main-button");

  button.addEventListener("click", function () {
    alert(`Anda memesan ${coffee.name}`);

    const indexOrder = ordersItem.findIndex(function (order) {
      return order.name === coffee.name;
    });

    if (indexOrder === -1) {
      ordersItem.push({
        name: coffee.name,
        image: coffee.image,
        price: coffee.price,
        quantity: 1,
      });
    } else {
      ordersItem[indexOrder].quantity += 1;
    }

    ordersList.innerHTML = "";

    for (const order of ordersItem) {
      ordersList.innerHTML += `
        <li class="order-item">
          <img
            class="order-item-image"
            src="${order.image}"
          />

          <div class="order-item-detail">
            <h3 class="order-item-name">${order.name}</h3>
            <span class="order-item-price">${order.quantity}x - Rp. ${order.price}</span>
          </div>
        </li>
      `;
    }

    let totalPrice = 0;
    for (const order of ordersItem) {
      totalPrice += order.price * order.quantity;
    }

    ordersTotalPrice.innerHTML = `Total: Rp. ${totalPrice}`;
  });

  menuItem.querySelector(".menu-item-action").appendChild(button);
  menuList.appendChild(menuItem);
}
