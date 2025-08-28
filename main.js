// Fetch data from Drupal backend.
import { fetchMenuItems } from './api/drupal.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("Service Worker registered"));
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning :)";
  } else if (hour < 18) {
    return "Good afternoon :)";
  } else {
    return "Good evening :)";
  }
}

function removeCartItem(element, item) {
  // Remove the cart item from the DOM.
  element.remove();
  const itemToRemove = item.id;
  const index = cart.findIndex(i => i.id === itemToRemove);

  // Remove the item from the cart.
  if (index !== -1) {
    cart.splice(index, 1);
  }

  subtotal = subtotal - item.amount;
  document.querySelector('.subtotal').textContent = `Subtotal ₱${subtotal}`;
}

const items = document.querySelectorAll(".item");
const modal = document.getElementById("product-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const quantityInput = document.getElementById("quantity");
const closeModal = document.getElementById("close-modal");
const closeCartModal = document.getElementById("close-cart-modal");
const addToCartBtn = document.getElementById("add-to-cart");
const cartList = document.getElementById("cart-items");
const cartTitle = document.querySelector("#cart h3");
const cartModal = document.getElementById("cart");
const basketIcon = document.getElementById("basket-icon");
const eggControl = document.querySelector(".egg-control");
const riceControl = document.querySelector(".rice-control");

let selectedProduct = {};
export let cart = [];
let subtotal = 0;

// Open modal when item is clicked.
items.forEach(item => {
  item.addEventListener("click", () => {
    selectedProduct = {
      name: item.dataset.product,
      img: item.dataset.img,
      price: item.dataset.price,
      rice: item.dataset.rice === 'true' ? true : false,
      egg: item.dataset.egg === 'true' ? true : false
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
      riceControl.classList.add("hidden");
    }
  
    modal.classList.remove("hidden");
  });
});

// Close modal.
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Close cart modal.
closeCartModal.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

// Quantity controls.
document.getElementById("increase").addEventListener("click", () => {
  quantityInput.value = parseInt(quantityInput.value) + 1;
});

document.getElementById("decrease").addEventListener("click", () => {
  if (quantityInput.value > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
});

basketIcon.addEventListener("click", () => {
  cartModal.classList.remove("hidden");
});

// Add to Cart.
addToCartBtn.addEventListener("click", () => {
  const id = `item-${Math.floor(Math.random() * 900) + 100}`;
  const riceType = document.getElementById('rice-type');
  const eggType = document.getElementById('egg-type');
  let amount = parseInt(selectedProduct.price);

  if (selectedProduct.rice) {
    amount += parseInt(riceType.value);
  }

  if (selectedProduct.egg) {
    amount += parseInt(eggType.value);
  }

  cart.push({
    ...selectedProduct,
    quantity: parseInt(quantityInput.value),
    amount: parseInt(quantityInput.value) * amount,
    riceType: riceType.options[riceType.selectedIndex].text,
    eggType: eggType.options[eggType.selectedIndex].text,
    id
  });

  // Update cart display.
  cartList.innerHTML = "";
  let subt = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    let name = item.name.replace('Regular Rice', item.riceType);
    name = name.replace('Egg', `${item.eggType} Egg`);
    li.setAttribute('id', item.id);
    li.textContent = `${name} x ${item.quantity} = ₱${item.amount}`;
    subt += parseInt(item.amount);
    const removeItem = document.createElement("button");
    removeItem.classList.add('remove-cart-item');
    removeItem.textContent = 'x';
    removeItem.addEventListener("click", () => { removeCartItem(li, item); });
  
    li.appendChild(removeItem);
    cartList.appendChild(li);
  });

  const liSubTotal = document.createElement("li");

  liSubTotal.textContent = `Subtotal ₱${subt}`;
  liSubTotal.classList.add('subtotal');
  cartList.appendChild(liSubTotal);
  modal.classList.add("hidden");

  subtotal = subt;
});

// Set greeting text.
const splash = document.getElementById("splash");
splash.textContent = getGreeting();

// Hide splash after 2 seconds.
setTimeout(() => {
  splash.classList.add("hidden");
  document.getElementById("content").classList.remove("hidden");
}, 5000);

// Enable this for debugging the cart.
// window.cart = cart;
