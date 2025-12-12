async function loadInventaris() {
  const tableBody = document.querySelector("#inventarisTable tbody");
  if (!tableBody) return;

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbzRsiAdKoAYvr_oKpgoA_sFK-mLSi7IwsCmBPNvekC-21ks-bZI9rArA-Hpd2bMoWUQ/exec"
  );

  const data = await response.json();

  tableBody.innerHTML = "";

  data.forEach((item, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.nama}</td>
        <td>${item.jumlah}</td>
    `;
  });
}