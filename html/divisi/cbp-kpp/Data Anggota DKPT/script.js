const API_URL =
  "https://script.google.com/macros/s/AKfycbwUumlKpvysU0D-bPWrE6HpW2WSowrbVcLpcJMn9dg0pPYBGI-8ISJFA6VANIMjBFai/exec";

/* ===============================
      LOAD DATA USER
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
          <td>${item.nama || "-"}</td>
          <td>${item.alamat || "-"}</td>
          <td>${item.pengkaderan || "-"}</td>
          <td>
            <a href="https://wa.me/${item.wa}" target="_blank">
              ${item.wa || "-"}
            </a>
          </td>
        </tr>
      `;
    });
  } catch (err) {
    console.error("Gagal memuat data:", err);
  }
}

/* ===============================
      INITIAL LOAD
================================ */
loadData();
