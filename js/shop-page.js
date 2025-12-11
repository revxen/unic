// js/shop-page.js

document.addEventListener("DOMContentLoaded", () => {
  const listContainer = document.getElementById("shop-products");
  const filterButtons = document.querySelectorAll(".filter-btn");

  function renderList(category = "all") {
    listContainer.innerHTML = "";

    let filtered = products;
    if (category !== "all") {
      filtered = products.filter(p => p.category === category);
    }

    if (!filtered.length) {
      listContainer.innerHTML = "<p>No products in this category.</p>";
      return;
    }

    filtered.forEach(product => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML = `
  <a href="product.html?id=${product.id}">
    <img src="${product.image}" alt="${product.name}">
  </a>
  <h3>
    <a href="product.html?id=${product.id}">${product.name}</a>
  </h3>
  <p class="price">₹${product.price}</p>
  <button data-id="${product.id}" class="btn-add-cart">Add to Cart</button>
`;

      listContainer.appendChild(card);
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.cat;
      renderList(cat);
    });
  });

  // click to add cart (reuse global handler from main.js pattern not needed here)
  listContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-add-cart");
    if (!btn) return;
    const id = parseInt(btn.dataset.id, 10);
    addToCartById(id);
  });

  renderList("all");
});
