const API_URL =
  "https://script.google.com/macros/s/AKfycbwphYu6TCJkRbCrZiT9plZcwxNCuWBd-_QQwc7ubUG1DH0w7iCx2L-5nFkAMERm1cI/exec";

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

          <td>${item.banom || ""}</td>

          <td>${item.target || ""}</td>

          <td>${item.sasaran || ""}</td>

          <td>${item.tanggal || ""}</td>

      `;
    });
  } catch (err) {
    console.error("Gagal memuat data:", err);
  }
}

loadData();
