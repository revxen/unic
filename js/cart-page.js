// js/cart-page.js

document.addEventListener("DOMContentLoaded", () => {
  const emptyState = document.getElementById("cart-empty");
  const filledState = document.getElementById("cart-filled");
  const itemsContainer = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("cart-subtotal");
  const taxEl = document.getElementById("cart-tax");
  const totalEl = document.getElementById("cart-total");

  function renderCart() {
    const cart = getCart();

    if (!cart.length) {
      emptyState.style.display = "block";
      filledState.style.display = "none";
      return;
    }

    emptyState.style.display = "none";
    filledState.style.display = "grid";

    itemsContainer.innerHTML = "";

    let subtotal = 0;

    cart.forEach(item => {
      const lineTotal = item.price * item.qty;
      subtotal += lineTotal;

      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <div class="meta">₹${item.price} · ${item.qty} item(s)</div>
          <div class="qty-row">
            <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
            <button class="remove-btn" data-action="remove" data-id="${item.id}">Remove</button>
          </div>
        </div>
        <div class="line-price">₹${lineTotal}</div>
      `;
      itemsContainer.appendChild(row);
    });

    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    subtotalEl.textContent = `₹${subtotal}`;
    taxEl.textContent = `₹${tax}`;
    totalEl.textContent = `₹${total}`;
  }

  itemsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const id = parseInt(btn.dataset.id, 10);
    const action = btn.dataset.action;
    let cart = getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;

    if (action === "inc") {
      item.qty += 1;
    } else if (action === "dec") {
      item.qty -= 1;
      if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
      }
    } else if (action === "remove") {
      cart = cart.filter(i => i.id !== id);
    }

    saveCart(cart);
    updateCartCountBadge();
    renderCart();
  });

  renderCart();
});
