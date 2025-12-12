const API_URL = "https://script.google.com/macros/s/AKfycbzp0W-AaOMb8J9IJ-n6cnx_xBWQIIgC3FXb2zcw1bJGc6bMFEdcNTClmnUg_e0FqbQ/exec";

/* ===============================
      LOAD DATA
================================ */
async function loadData() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";

  data.forEach((item, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>

        <td>
          <input class="table-edit-input" 
                 value="${item.ranting}" 
                 data-id="${item.id}" 
                 data-field="ranting">
        </td>

        <td>
          <input class="table-edit-input" 
                 value="${item.ip}" 
                 data-id="${item.id}" 
                 data-field="ip">
        </td>

        <td>
          <input class="table-edit-input" 
                 value="${item.nomor}" 
                 data-id="${item.id}" 
                 data-field="nomor">
        </td>

        <td>
          <input type="date" 
                 class="table-edit-input"
                 value="${item.masa}" 
                 data-id="${item.id}" 
                 data-field="masa">
        </td>

        <td>
          <input class="table-edit-input" 
                 value="${item.ketua}" 
                 data-id="${item.id}" 
                 data-field="ketua">
        </td>

        <td>
          <input class="table-edit-input" 
                 value="${item.sekretaris}" 
                 data-id="${item.id}" 
                 data-field="sekretaris">
        </td>

        <td>
          <button onclick="updateRow(${item.id})">Update</button>
          <button onclick="deleteRow(${item.id})">Hapus</button>
        </td>
      </tr>
    `;
  });
}


/* ===============================
      TAMBAH DATA
================================ */
document.querySelector("#addForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  formData.append("action", "add");

  await fetch(API_URL, { method: "POST", body: formData });

  loadData();
  e.target.reset();
});


/* ===============================
      UPDATE DATA
================================ */
async function updateRow(id) {
  const inputs = document.querySelectorAll(`[data-id="${id}"]`);

  const formData = new FormData();
  formData.append("action", "update");
  formData.append("id", id);

  inputs.forEach(input => {
    formData.append(input.dataset.field, input.value);
  });

  await fetch(API_URL, { method: "POST", body: formData });
  loadData();
}


/* ===============================
      DELETE DATA
================================ */
async function deleteRow(id) {
  const formData = new FormData();
  formData.append("action", "delete");
  formData.append("id", id);

  await fetch(API_URL, { method: "POST", body: formData });
  loadData();
}

/* ===============================
      START LOAD
================================ */
loadData();
