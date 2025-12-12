// Load data otomatis saat halaman dibuka
window.onload = () => {
  const adminTable = document.querySelector("#alumniAdminTable");

  // Jika tabel tidak ada = berarti ini halaman login → jangan jalankan script admin
  if (adminTable) {
    loadAlumni();
  }
};

const WEB_APP_URL_P =
  "https://script.google.com/macros/s/AKfycbwQW-d_tv51keug_ogP8THAQP1DTjn5iSkS4CUVM_Gn89pIENeD5pRmN7q2NxszH24/exec"; // gunakan URL Web App milikmu

async function loadAlumni() {
  const tableBody = document.querySelector("#alumniAdminTable tbody");
  tableBody.innerHTML = "<tr><td colspan='5'>Loading...</td></tr>";

  try {
    const response = await fetch(WEB_APP_URL_P);
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
        <td>${item.alamat}</td>
        <td><a href="https://wa.me/${item.wa}" target="_blank">${item.wa}`;

      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
    tableBody.innerHTML = "<tr><td colspan='5'>Gagal memuat data</td></tr>";
  }
}

loadAlumni();
