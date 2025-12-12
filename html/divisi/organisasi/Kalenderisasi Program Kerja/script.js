const API_URL =
  "https://script.google.com/macros/s/AKfycbygQP-J97GLmATj9pVGgRhzpuX18aBZIzE6QWwNFoO0DWmwCx8zbGem5Yzlh3uWLcM/exec";

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

          <td>${item.departemen || ""}</td>

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

