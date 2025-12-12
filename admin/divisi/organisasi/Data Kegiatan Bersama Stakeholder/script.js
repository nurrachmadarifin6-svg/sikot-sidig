const API_URL =
  "https://script.google.com/macros/s/AKfycbw9vUnTotgOHex7dd8UY1hJoR6ZWI-AbcOtvTIib785LocVt4V6y1I2d5xNFJEZozFO/exec";

/* ===========================
      LOAD DATA
=========================== */
async function loadData() {
  try {
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
                   value="${item.nama || ""}"
                   data-id="${item.id}"
                   data-field="nama">
          </td>

          <td>
            <input class="table-edit-input"
                   value="${item.stakeholder || ""}"
                   data-id="${item.id}"
                   data-field="stakeholder">
          </td>

          <td>
            <input class="table-edit-input"
                   value="${item.target || ""}"
                   data-id="${item.id}"
                   data-field="target">
          </td>

          <td>
            <input class="table-edit-input"
                   value="${item.sasaran || ""}"
                   data-id="${item.id}"
                   data-field="sasaran">
          </td>

          <td>
            <input class="table-edit-input"
                   value="${item.tanggal || ""}"
                   data-id="${item.id}"
                   data-field="tanggal"
                   type="date">
          </td>

          <td>
            <button onclick="updateRow('${item.id}')">Update</button>
            <button onclick="deleteRow('${item.id}')">Hapus</button>
          </td>
        </tr>
      `;
    });
  } catch (err) {
    console.error("Gagal memuat data:", err);
  }
}

/* ===========================
      TAMBAH DATA
=========================== */
document
  .querySelector("#addForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("action", "add");

    await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    e.target.reset();
    loadData();
  });

/* ===========================
      UPDATE DATA
=========================== */
async function updateRow(id) {
  const inputs = document.querySelectorAll(`[data-id="${id}"]`);
  const formData = new FormData();

  formData.append("action", "update");
  formData.append("id", id);

  inputs.forEach((input) => {
    formData.append(input.dataset.field, input.value);
  });

  await fetch(API_URL, { method: "POST", body: formData });
  loadData();
}

/* ===========================
      DELETE DATA
=========================== */
async function deleteRow(id) {
  if (!confirm("Hapus data ini?")) return;

  const formData = new FormData();
  formData.append("action", "delete");
  formData.append("id", id);

  await fetch(API_URL, { method: "POST", body: formData });
  loadData();
}

loadData();

