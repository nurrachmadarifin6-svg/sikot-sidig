window.onload = () => {
  const adminTable = document.querySelector("#masukTable");

  // Jika tabel tidak ada = berarti ini halaman login → jangan jalankan script admin
  if (adminTable) {
    loadMasuk();
  }
};

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbwE-NVS8-IH9WrPjN2Ht3kY6u9cRk3GabTo-Wi8j7MJNfl7fPqZ0LbQCbDyTJeCW9aE/exec"; // gunakan URL Web App milikmu

async function loadMasuk() {
  const tableBody = document.querySelector("#masukTable tbody");
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
        <td>${item.nomor}</td>
        <td>${item.kegiatan}</td>
        <td>${item.asal}</td>`;

      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
    tableBody.innerHTML = "<tr><td colspan='5'>Gagal memuat data</td></tr>";
  }
}

// Load data otomatis saat halaman dibuka
window.onload = loadMasuk;

window.onload = () => {
  const adminTable = document.querySelector("#keluarTable");

  // Jika tabel tidak ada = berarti ini halaman login → jangan jalankan script admin
  if (adminTable) {
    loadKeluar();
  }
};

const WEB_APP_URL_K =
  "https://script.google.com/macros/s/AKfycbwMRLA3NpWJQDEGINmyfBNRjpyzcmRkUZY19jNgdbmB7JI9vAjvgdFmh1gfnCV5j_U/exec"; // gunakan URL Web App milikmu

async function loadKeluar() {
  const tableBody = document.querySelector("#keluarTable tbody");
  tableBody.innerHTML = "<tr><td colspan='5'>Loading...</td></tr>";

  try {
    const response = await fetch(WEB_APP_URL_K);
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
        <td>${item.nomor}</td>
        <td>${item.kegiatan}</td>
        <td>${item.tujuan}</td>`;

      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
    tableBody.innerHTML = "<tr><td colspan='5'>Gagal memuat data</td></tr>";
  }
}

// Load data otomatis saat halaman dibuka
window.onload = loadKeluar;
