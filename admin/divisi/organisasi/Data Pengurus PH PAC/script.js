const API_URL =
  "https://script.google.com/macros/s/AKfycbxeRG5hf_m4o2vnYYBn78OqlbnnHz_X-vN6YttmDPOtRgmr8Dsj7LSGUcl-WTdW-UOg/exec";

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
        <td>${item.timestamp || "-"}</td>

        <td>
          <input class="table-edit-input" 
                 value="${item.nama}" 
                 placeholder="Edit Nama"
                 data-id="${item.id}" 
                 data-field="nama">
        </td>

        <td>
          <input class="table-edit-input" 
                 value="${item.alamat}" 
                 placeholder="Edit Alamat"
                 data-id="${item.id}" 
                 data-field="alamat">
        </td>

        <td>
          <input class="table-edit-input" 
                 value="${item.jabatan}" 
                 placeholder="Edit Jabatan"
                 data-id="${item.id}" 
                 data-field="jabatan">
        </td>

        <td>
          <button class="table-btn edit-btn" onclick="updateRow(${
            item.id
          })">Update</button>
          <button class="table-btn delete-btn" onclick="deleteRow(${
            item.id
          })">Hapus</button>
        </td>
      </tr>
    `;
  });
}

/* ===============================
      TAMBAH DATA
================================ */
document
  .querySelector("#addForm")
  .addEventListener("submit", async function (e) {
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

  inputs.forEach((i) => {
    formData.append(i.dataset.field, i.value);
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
      MULAI LOAD
================================ */
loadData();
