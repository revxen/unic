// js/cart.js

const CART_KEY = "revx_cart";

function getCart() {
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartCountBadge() {
  const el = document.getElementById("cart-count");
  if (!el) return;
  el.textContent = getCartCount();
}

function addToCartById(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }

  saveCart(cart);
  updateCartCountBadge();
}

// run on every page load
document.addEventListener("DOMContentLoaded", updateCartCountBadge);
