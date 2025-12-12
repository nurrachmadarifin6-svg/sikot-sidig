const API_URL =
  "https://script.google.com/macros/s/AKfycbznnvaB0sg_8_1WdKd7z2FaILute1NYDsidIhIRzbpxeF26bsfY9NrnolmiEaQv-uJ-/exec";

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

          <td>${item.nama || ""}</td>

          <td>${item.keterangan || ""}</td>

          <td>${item.target || ""}"</td>

          <td>${item.sasaran || ""}</td>

          <td>${item.tanggal || ""}</td>

        </tr>
      `;
    });
  } catch (err) {
    console.error("Gagal memuat data:", err);
  }
}

loadData();
