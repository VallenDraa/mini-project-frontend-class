import { createOrdersUser, getOrdersUser } from "./user-data.js";

export function renderUserOrders(orders, menu, ordersListElement) {
  ordersListElement.innerHTML = "";

  for (const order of orders) {
    const coffee = menu.find(coffee => coffee.id === order.product_id);
    const orderPrice = coffee.price * order.product_quantity;

    ordersListElement.innerHTML += `
      <li class="order-item">
        <img
          onerror="this.src='./images/placeholder-image.png'"
          class="order-item-image"
          src="${coffee.image}"
        />

        <div class="order-item-detail">
          <h3 class="order-item-name">${order.product_name}</h3>
          <span class="order-item-price">${order.product_quantity}x - Rp. ${orderPrice}</span>
        </div>
      </li>
      `;
  }
}

export function renderUserTotalPrice(orders, menu, totalPriceElement) {
  let totalPrice = 0;

  for (const order of orders) {
    const coffee = menu.find(coffee => coffee.id === order.product_id);
    totalPrice += coffee.price * order.product_quantity;
  }

  totalPriceElement.innerHTML = `Total: Rp. ${totalPrice}`;
}

export function renderUserMenu(
  menu,
  menuListElement,
  ordersListElement,
  totalPriceElement,
) {
  // Menampilkan data coffee
  for (const coffee of menu) {
    // Buat elemen menu list item
    const menuItem = document.createElement("li");
    menuItem.classList.add("menu-item");

    menuItem.innerHTML = `
    <img
      src="${coffee.image}"
      alt="${coffee.name}"
      onerror="this.src='./images/placeholder-image.png'"
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

    button.addEventListener("click", async function () {
      // Mendapatkan kuantitas dari user
      let quantity = 1;
      while (true) {
        quantity = parseInt(prompt(`Masukkan kuantitas ${coffee.name}:`));

        if (!isNaN(quantity) || quantity > 0) {
          break;
        }
      }

      // Bikin order dan kirim ke server
      const order = await createOrdersUser(coffee.id, quantity);

      if (!order.status) {
        alert(order.message);
        return;
      }

      // Ngambil data orderan baru dan render ke UI
      const newUserOrders = await getOrdersUser();

      if (!newUserOrders.status) {
        alert(newUserOrders.message);
        return;
      }

      renderUserOrders(newUserOrders.data, menu, ordersListElement);
      renderUserTotalPrice(newUserOrders.data, menu, totalPriceElement);

      alert(`Anda memesan ${coffee.name}`);
    });

    menuItem.querySelector(".menu-item-action").appendChild(button);
    menuListElement.appendChild(menuItem);
  }
}
