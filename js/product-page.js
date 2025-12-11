// js/product-page.js

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("product-wrapper");

  const params = new URLSearchParams(window.location.search);
  const idParam = params.get("id");
  const productId = idParam ? parseInt(idParam, 10) : null;

  if (!productId) {
    wrapper.innerHTML = "<p>Product not found.</p>";
    return;
  }

  const product = products.find(p => p.id === productId);

  if (!product) {
    wrapper.innerHTML = "<p>Product not found.</p>";
    return;
  }

  wrapper.innerHTML = `
    <div class="product-gallery">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-info">
      <h1>${product.name}</h1>
      <div class="product-price-main">₹${product.price}</div>
      <div class="product-meta">
        Category: ${product.category.toUpperCase()}
      </div>
      <p class="description">
        Premium quality accessory designed for daily use. Perfect fit,
        scratch resistant and lightweight.
      </p>
      <div class="actions">
        <input type="number" id="detail-qty" class="qty-input" min="1" value="1">
        <button id="detail-add" class="btn-primary">Add to Cart</button>
      </div>
    </div>
  `;

  const addBtn = document.getElementById("detail-add");
  const qtyInput = document.getElementById("detail-qty");

  addBtn.addEventListener("click", () => {
    const qty = Math.max(1, parseInt(qtyInput.value || "1", 10));
    for (let i = 0; i < qty; i++) {
      addToCartById(product.id);
    }
  });
});
