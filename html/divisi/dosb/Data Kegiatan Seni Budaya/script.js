const API_URL =
  "https://script.google.com/macros/s/AKfycbw8UCADaZepa8OtaK1YjgxFR3cT79N2lktgz09qR4c7ojwQDnZHCGOHFU9tv7fZFDg/exec";

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

          <td>${item.target || ""}</td>

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
