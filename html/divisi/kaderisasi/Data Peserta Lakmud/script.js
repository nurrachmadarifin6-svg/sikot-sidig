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
