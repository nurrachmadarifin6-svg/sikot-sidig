const API_URL =
  "https://script.google.com/macros/s/AKfycby6-10K7iLOmEJSDocFjfGLxbvTztWDkNU1tHz7R8itBuu9AIyG7L2QQ-MzwlW8-4Y/exec";

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

          <td>${item.tanggal || ""}</td>

          <td>${item.nama || ""}</td>

          <td>${item.jumlah || ""}</td>

          <td>${item.sasaran || ""}</td>

        </tr>
      `;
    });
  } catch (err) {
    console.error("Gagal memuat data:", err);
  }
}

loadData();
