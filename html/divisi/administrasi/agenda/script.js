window.onload = () => {
  const adminTable = document.querySelector("#agendaTable");

  // Jika tabel tidak ada = berarti ini halaman login → jangan jalankan script admin
  if (adminTable) {
    loadAgenda();
  }
};

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyKugJPvGxp2KfTkmfHyNIS2ZKrtPi8VMwR2_h5mO3fQtxDE0jhfFC8NGKC0dfJVqk/exec"; // gunakan URL Web App milikmu

async function loadAgenda() {
  const tableBody = document.querySelector("#agendaTable tbody");
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
        <td>${item.sasaran}</td>
        <td>${item.target}</td>
        <td>${item.keterangan}</td>`;

      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
    tableBody.innerHTML = "<tr><td colspan='5'>Gagal memuat data</td></tr>";
  }
}

// Load data otomatis saat halaman dibuka
window.onload = loadAgenda;
