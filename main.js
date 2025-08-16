// Fetch data from Drupal backend
import { fetchMenuItems } from './api/drupal.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("Service Worker registered"));
}

// Cart state
let cart = [];
const cartList = document.getElementById("cart");
const cartTotalEl = document.getElementById("cart-total");

function addToCart(item) {
  cart.push(item);
  updateCart();
}

function updateCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.title} - ₱${item.price}`;
    cartList.appendChild(li);
    total += item.price;
  });

  cartTotalEl.textContent = `Total: ₱${total}`;
}

// Fetch from Drupal and display
// fetchMenuItems().then(items => {
//   const content = document.getElementById('menu-grid');
//   items.forEach(item => {
//     const div = document.createElement(`div`);
//     div.classList.add(`item`, `item--${item.code}`);
//     div.innerHTML = `
//       <h3 class="item__title">${item.title}</h3>
//       <div class="item__body">${item.body}</div>
//       <div class="item__price">₱${item.price}</div>
//     `;
    
//     div.addEventListener("click", () => addToCart(item));
//     content.appendChild(div);
//   });
// });
