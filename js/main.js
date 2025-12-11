// js/main.js
document.addEventListener("DOMContentLoaded", () => {
  const featuredContainer = document.getElementById("featured-products");
  if (featuredContainer) {
    const featured = products.filter(p => p.tag === "featured");

    featured.forEach(product => {
      const card = document.createElement("article");
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

      featuredContainer.appendChild(card);
    });
  }

  // delegate add to cart clicks
  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-add-cart");
    if (!btn) return;
    const id = parseInt(btn.dataset.id, 10);
    addToCartById(id);
  });
});
