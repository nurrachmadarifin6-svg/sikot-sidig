const API_URL =
  "https://script.google.com/macros/s/AKfycbw-hhhKVXih_PAWKhOzFOA0y-oVVQsz7DmGKjRzTUi-7xailPsfHmHOlVGMdYGduv4/exec";

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
