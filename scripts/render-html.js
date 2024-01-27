import { createOrderUser, getOrdersUser } from "./lib/user.js";

export function renderUserOrders(orders, ordersListElement) {
  ordersListElement.innerHTML = "";

  for (const order of orders) {
    ordersListElement.innerHTML += `
      <li class="order-item">
        <img
          class="order-item-image"
          src="https://source.unsplash.com/300x300"
        />

        <div class="order-item-detail">
          <h3 class="order-item-name">${order.product_name}</h3>
          <span class="order-item-price">${order.product_quantity}x - Rp. ${order.price}</span>
        </div>
      </li>
    `;
  }
}

export function renderUserTotalPrice(orders, totalPriceElement) {
  // Hitung dan tampilkan ulang harga pesanan
  let totalPrice = 0;
  for (const order of orders) {
    totalPrice += order.price * order.product_quantity;
  }

  totalPriceElement.innerHTML = `Total: Rp. ${totalPrice}`;
}

export function renderMenu(
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
      renderUserOrders(newUserOrders.data, ordersListElement);
      renderUserTotalPrice(newUserOrders.data, totalPriceElement);

      alert(`Anda memesan ${coffee.name}`);
    });

    menuItem.querySelector(".menu-item-action").appendChild(button);
    menuListElement.appendChild(menuItem);
  }
}
