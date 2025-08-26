// Fetch data from Drupal backend
import { fetchMenuItems } from './api/drupal.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("Service Worker registered"));
}

const items = document.querySelectorAll(".item");
const modal = document.getElementById("product-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const quantityInput = document.getElementById("quantity");
const closeModal = document.getElementById("close-modal");
const addToCartBtn = document.getElementById("add-to-cart");
const cartList = document.getElementById("cart-items");
const cartTitle = document.querySelector("#cart h3");
const cartBox = document.getElementById("cart");
const eggControl = document.querySelector(".egg-control");
const riceControl = document.querySelector(".rice-control");

let selectedProduct = {};
let cart = [];

// Open modal when item is clicked
items.forEach(item => {
  item.addEventListener("click", () => {
    selectedProduct = {
      name: item.dataset.product,
      img: item.dataset.img,
      price: item.dataset.price
    };
    modalImg.src = selectedProduct.img;
    modalTitle.textContent = selectedProduct.name;
    quantityInput.value = 1;

    if (item.dataset.egg === 'true') {
      eggControl.classList.remove("hidden");
    } else {
      eggControl.classList.add("hidden");
    }

    if (item.dataset.rice === 'true') {
      riceControl.classList.remove("hidden");
    } else {
      eggControl.classList.add("hidden");
    }
  
    modal.classList.remove("hidden");
  });
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Quantity controls
document.getElementById("increase").addEventListener("click", () => {
  quantityInput.value = parseInt(quantityInput.value) + 1;
});
document.getElementById("decrease").addEventListener("click", () => {
  if (quantityInput.value > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
});

// Add to Cart
addToCartBtn.addEventListener("click", () => {
  cart.push({
    ...selectedProduct,
    quantity: parseInt(quantityInput.value),
    amount: parseInt(quantityInput.value) * selectedProduct.price
  });

  // Update cart display
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} x ${item.quantity} = ₱${item.amount}`;
    total += parseInt(item.amount);
    cartList.appendChild(li);
  });

  const deliveryFee = 10;
  total += deliveryFee;

  const liDeliveryFee = document.createElement("li");
  const liTotal = document.createElement("li");
  liDeliveryFee.textContent = `Delivery Fee ₱${deliveryFee}`;
  liTotal.textContent = `Total ₱${total}`;

  cartList.appendChild(liDeliveryFee);
  cartList.appendChild(liTotal);

  console.log(cart);

  modal.classList.add("hidden");
});

cartTitle.addEventListener("click", () => {
  if (cartBox.style.height === 'auto') {
    cartBox.style.removeProperty('height');
  } else {
    cartBox.style.height = 'auto';
  }
});

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
