import { acceptOrder } from "./admin-data.js";
import { createOrderUser, getOrdersUser } from "./user-data.js";

// Kode untuk render elemen pada halaman user
export function renderUserOrders(orders, menu, ordersListElement) {
  ordersListElement.innerHTML = "";

  for (const order of orders) {
    const coffee = menu.find(coffee => coffee.id === order.product_id);

    const image = coffee.image;
    const orderPrice = coffee.price * order.product_quantity;

    ordersListElement.innerHTML += `
      <li class="order-item">
        <img
          class="order-item-image"
          src="${
            image || "https://source.unsplash.com/random/150x150?moccha-coffee"
          }"
        />

        <div class="order-item-detail">
          <h3 class="order-item-name">${order.product_name}</h3>
          <span class="order-item-price">${
            order.product_quantity
          }x - Rp. ${orderPrice}</span>
          <span class="order-item-status">${
            order.is_accepted ? "Done" : "Belum Diproses"
          }</span>
        </div>
      </li>
    `;
  }
}

export function renderUserTotalPrice(orders, menu, totalPriceElement) {
  // Hitung dan tampilkan ulang harga pesanan
  let totalPrice = 0;

  for (const order of orders) {
    const orderPrice =
      menu.find(coffee => coffee.id === order.product_id).price *
      order.product_quantity;

    totalPrice += orderPrice;
  }

  totalPriceElement.innerHTML = `Total: Rp. ${totalPrice}`;
}

export function renderUserMenu(
  menu,
  menuListElement,
  ordersListElement,
  totalPriceElement,
) {
  for (const coffee of menu) {
    // Buat elemen menu list item
    const menuItem = document.createElement("li");
    menuItem.classList.add("menu-item");
    menuItem.innerHTML = `
      <img
        src="${
          coffee.image ||
          "https://source.unsplash.com/random/150x150?moccha-coffee"
        }"
        alt="${coffee.name}"
      />

      <h2>${coffee.name}</h2>

      <div class="menu-item-action">
        <span>Rp. ${coffee.price}</span>
      </div>
    `;

    // Buat button untuk menambahkan event listener
    const button = document.createElement("button");
    button.innerHTML = "Pesan";
    button.classList.add("main-button");
    button.addEventListener("click", async function () {
      let quantity = 1;
      while (true) {
        quantity = parseInt(
          prompt(`Berapa banyak ${coffee.name} yang ingin dipesan?`),
        );

        if (!isNaN(quantity) && quantity > 0) {
          break;
        }
      }

      const order = await createOrderUser({
        productId: coffee.id,
        quantity,
      });

      const newUserOrders = await getOrdersUser();

      if (!order.status || !newUserOrders.status) {
        alert(order.message || newUserOrders.message);
        return;
      }

      // Render data yang baru
      renderUserOrders(newUserOrders.data, menu, ordersListElement);
      renderUserTotalPrice(newUserOrders.data, menu, totalPriceElement);

      alert(`Anda memesan ${coffee.name}`);
    });

    menuItem.querySelector(".menu-item-action").appendChild(button);
    menuListElement.appendChild(menuItem);
  }
}

// Kode untuk render elemen pada halaman admin
export function renderAdminMenu(menu, menuListElement) {
  for (const coffee of menu) {
    // Buat elemen menu list item
    const menuItem = document.createElement("li");
    menuItem.classList.add("menu-item");
    menuItem.innerHTML = `
      <img
        src="${
          coffee.image ||
          "https://source.unsplash.com/random/150x150?moccha-coffee"
        }"
        alt="${coffee.name}"
      />

      <h2>${coffee.name}</h2>
      <p>Stock: ${coffee.stock}</p>

      <div class="menu-item-action">
        <span>Rp. ${coffee.price}</span>
      </div>
    `;

    menuListElement.appendChild(menuItem);
  }
}

export function renderAdminOrders(orders, menu, ordersListElement) {
  for (const order of orders) {
    const coffee = menu.find(coffee => coffee.id === order.product_id);

    const image = coffee.image;
    const orderPrice = coffee.price * order.product_quantity;

    // Buat elemen menu list item
    const orderItem = document.createElement("li");
    orderItem.classList.add("menu-item");
    orderItem.innerHTML = `
      <img
        src="${
          image || "https://source.unsplash.com/random/150x150?moccha-coffee"
        }""
        alt="${order.product_name}"
      />

      <h2>${order.product_name}</h2>
      <p>Pelanggan: ${order.username}</p>

      <div class="menu-item-action">
        <span>Rp. ${orderPrice}</span>
      </div>
    `;

    // Buat button untuk menambahkan event listener
    const button = document.createElement("button");
    button.innerHTML = order.is_accepted === 1 ? "Diterima" : "Terima";
    button.disabled = order.is_accepted === 1;
    button.classList.add("main-button");
    button.addEventListener("click", async function () {
      const response = await acceptOrder({ productId: order.order_id });

      if (!response.status) {
        alert(response.message);
        return;
      }

      alert(`Anda telah menerima pesanan dari ${order.username}!`);

      button.innerHTML = "Diterima";
      button.disabled = true;
    });

    orderItem.querySelector(".menu-item-action").appendChild(button);
    ordersListElement.appendChild(orderItem);
  }
}
