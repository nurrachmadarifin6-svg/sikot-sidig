const API_URL =
  "https://script.google.com/macros/s/AKfycbzd4nNA1cgqu6GprXh-N48eNUOVlnBlG9JNHdSkySciXCzJGIAT_dTIZMJu7KLrQIA/exec";

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
                   value="${item.tanggal || ""}"
                   data-id="${item.id}"
                   data-field="tanggal"
                   type="date">
          </td>

          <td>
            <input class="table-edit-input"
                   value="${item.nama || ""}"
                   data-id="${item.id}"
                   data-field="nama">
          </td>

          <td>
            <input class="table-edit-input"
                   value="${item.jumlah || ""}"
                   data-id="${item.id}"
                   data-field="jumlah">
          </td>

          <td>
            <input class="table-edit-input"
                   value="${item.sasaran || ""}"
                   data-id="${item.id}"
                   data-field="sasaran">
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
