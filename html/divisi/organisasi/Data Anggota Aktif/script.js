const API_URL = "https://script.google.com/macros/s/AKfycbxo_JR4CIfk554tte8LRpdS0gAdZ8zVGjCOLRK5Tnj82tBRokw2fgpbglRS8jRTZeM/exec";

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
