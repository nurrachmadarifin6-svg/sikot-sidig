async function loadAgenda() {
  const tableBody = document.querySelector("#agendaTable tbody");
  if (!tableBody) return;

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbyKugJPvGxp2KfTkmfHyNIS2ZKrtPi8VMwR2_h5mO3fQtxDE0jhfFC8NGKC0dfJVqk/exec"
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
