const API_URL =
  "https://script.google.com/macros/s/AKfycbxb1DYYepLMSiDcfWc2_ahIjcIWX8nVMTFsdogR9pzlV8EAp0MM1b645vHx_VA3e4s/exec";

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

          <td>${item.nama || ""}</td>

          <td>${item.alamat || ""}</td>

          <td>${item.pengkaderan || ""}</td>

          <td>${item.wa || ""}</td>

        </tr>
      `;
    });
  } catch (err) {
    console.error("Gagal memuat data:", err);
  }
}

loadData();
