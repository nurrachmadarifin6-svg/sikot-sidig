const API_URL =
  "https://script.google.com/macros/s/AKfycbzCQTJtxl11CogT2xIm38r0RIzvS8jaDTI7AEvwm_Df8lmecDecm_sg7jsYxh0pf1cH/exec";

/* ===============================
      LOAD DATA
================================ */
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
                   data-field="nama"
                   placeholder="Edit Nama">
          </td>

          <td>
            <input class="table-edit-input"
                   value="${item.alamat || ""}"
                   data-id="${item.id}"
                   data-field="alamat"
                   placeholder="Edit Alamat">
          </td>

          <td>
            <input class="table-edit-input"
                   value="${item.pengkaderan || ""}"
                   data-id="${item.id}"
                   data-field="pengkaderan"
                   placeholder="Edit Pengkaderan"
                   type="date">
          </td>

          <td>
            <input class="table-edit-input"
                   value="${item.wa || ""}"
                   data-id="${item.id}"
                   data-field="wa"
                   placeholder="Edit WA">
          </td>

          <td>
            <button class="table-btn edit-btn" onclick="updateRow('${
              item.id
            }')">Update</button>
            <button class="table-btn delete-btn" onclick="deleteRow('${
              item.id
            }')">Hapus</button>
          </td>
        </tr>
      `;
    });
  } catch (err) {
    console.error("Gagal memuat data:", err);
  }
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

    await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    e.target.reset();
    loadData();
  });

/* ===============================
      UPDATE DATA
================================ */
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

/* ===============================
      DELETE DATA
================================ */
async function deleteRow(id) {
  if (!confirm("Hapus data ini?")) return;

  const formData = new FormData();
  formData.append("action", "delete");
  formData.append("id", id);

  await fetch(API_URL, { method: "POST", body: formData });
  loadData();
}

/* ===============================
      INITIAL LOAD
================================ */
loadData();
