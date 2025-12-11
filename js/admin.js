// js/admin.js

document.addEventListener("DOMContentLoaded", () => {
  // work on a copy so you don't mutate original until you export
  let data = [...products];

  const tbody = document.querySelector("#admin-table tbody");
  const form = document.getElementById("product-form");
  const idInput = document.getElementById("prod-id");
  const nameInput = document.getElementById("prod-name");
  const catInput = document.getElementById("prod-category");
  const priceInput = document.getElementById("prod-price");
  const imgInput = document.getElementById("prod-image");
  const tagInput = document.getElementById("prod-tag");
  const resetBtn = document.getElementById("btn-reset");
  const exportBtn = document.getElementById("btn-export");
  const exportOutput = document.getElementById("export-output");

  function renderTable() {
    tbody.innerHTML = "";
    data.forEach(p => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>₹${p.price}</td>
        <td>${p.tag || ""}</td>
        <td>${p.image || ""}</td>
        <td>
          <button data-id="${p.id}" data-action="edit">Edit</button>
          <button data-id="${p.id}" data-action="delete">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function resetForm() {
    idInput.value = "";
    nameInput.value = "";
    catInput.value = "";
    priceInput.value = "";
    imgInput.value = "";
    tagInput.value = "";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const idVal = idInput.value ? parseInt(idInput.value, 10) : null;
    const name = nameInput.value.trim();
    const category = catInput.value;
    const price = parseInt(priceInput.value, 10) || 0;
    const image = imgInput.value.trim();
    const tag = tagInput.value.trim();

    if (!name || !category) return;

    if (idVal) {
      // update existing
      const idx = data.findIndex(p => p.id === idVal);
      if (idx !== -1) {
        data[idx] = { ...data[idx], name, category, price, image, tag };
      }
    } else {
      const newId = data.length ? Math.max(...data.map(p => p.id)) + 1 : 1;
      data.push({ id: newId, name, category, price, image, tag });
    }

    renderTable();
    resetForm();
  });

  resetBtn.addEventListener("click", () => {
    resetForm();
  });

  tbody.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const id = parseInt(btn.dataset.id, 10);
    const action = btn.dataset.action;

    if (action === "edit") {
      const p = data.find(x => x.id === id);
      if (!p) return;
      idInput.value = p.id;
      nameInput.value = p.name;
      catInput.value = p.category;
      priceInput.value = p.price;
      imgInput.value = p.image || "";
      tagInput.value = p.tag || "";
    } else if (action === "delete") {
      data = data.filter(p => p.id !== id);
      renderTable();
    }
  });

  exportBtn.addEventListener("click", () => {
    exportOutput.value = JSON.stringify(data, null, 2);
  });

  renderTable();
});
