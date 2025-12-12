async function loadInovasi() {
  const tableBody = document.querySelector("#inovasiTable tbody");
  if (!tableBody) return;

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbw0K6hSc0jR5cl0s8JNriXXlDmgUPkCbZ6lcdzu80Sv8vMB8zHOX4kK0wZOY4uz3zQF/exec"
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
