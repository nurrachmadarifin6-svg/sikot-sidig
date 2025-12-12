async function loadMasuk() {
  const tableBody = document.querySelector("#masukTable tbody");
  if (!tableBody) return;

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbwE-NVS8-IH9WrPjN2Ht3kY6u9cRk3GabTo-Wi8j7MJNfl7fPqZ0LbQCbDyTJeCW9aE/exec"
  );

  const data = await response.json();

  tableBody.innerHTML = "";

  data.forEach((item, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.nomor}</td>
        <td>${item.kegiatan}</td>
        <td>${item.asal}</td>
    `;
  });
}

async function loadKeluar() {
  const tableBody = document.querySelector("#keluarTable tbody");
  if (!tableBody) return;

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbwMRLA3NpWJQDEGINmyfBNRjpyzcmRkUZY19jNgdbmB7JI9vAjvgdFmh1gfnCV5j_U/exec"
  );

  const data = await response.json();

  tableBody.innerHTML = "";

  data.forEach((item, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.nomor}</td>
        <td>${item.kegiatan}</td>
        <td>${item.tujuan}</td>
    `;
  });
}
