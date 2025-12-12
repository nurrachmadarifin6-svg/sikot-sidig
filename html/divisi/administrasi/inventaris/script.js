window.onload = () => {
  const adminTable = document.querySelector("#inventarisTable");

  // Jika tabel tidak ada = berarti ini halaman login → jangan jalankan script admin
  if (adminTable) {
    loadInventaris();
  }
};

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbzRsiAdKoAYvr_oKpgoA_sFK-mLSi7IwsCmBPNvekC-21ks-bZI9rArA-Hpd2bMoWUQ/exec"; // gunakan URL Web App milikmu

async function loadInventaris() {
  const tableBody = document.querySelector("#inventarisTable tbody");
  tableBody.innerHTML = "<tr><td colspan='5'>Loading...</td></tr>";

  try {
    const response = await fetch(WEB_APP_URL);
    const data = await response.json();

    tableBody.innerHTML = "";

    if (data.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='5'>Belum ada data</td></tr>";
      return;
    }

    data.forEach((item, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.nama}</td>
        <td>${item.jumlah}</td>`;

      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
    tableBody.innerHTML = "<tr><td colspan='5'>Gagal memuat data</td></tr>";
  }
}

// Load data otomatis saat halaman dibuka
window.onload = loadInventaris;
