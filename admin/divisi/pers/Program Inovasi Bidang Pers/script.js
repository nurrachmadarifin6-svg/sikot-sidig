async function loadInovasi() {
  const tableBody = document.querySelector("#inovasiTable tbody");
  if (!tableBody) return;

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbxOtxlmBxgPQ1qyKxSTYGB7otj_F2bz-ADqTos73NavvdeWn7Zjjdg1uMt_m5_WrDg/exec"
  );

  const data = await response.json();

  tableBody.innerHTML = "";

  data.forEach((item, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.nama}</td>
        <td>${item.sasaran}</td>
        <td>${item.target}</td>
        <td>${item.keterangan}</td>
    `;
  });
}