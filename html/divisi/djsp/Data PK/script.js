const API_URL =
  "https://script.google.com/macros/s/AKfycbyzW58Cr7FqfT9-zs8oyDF26tXlGLpU3bsoT5JPj5vMPIYtYB-eNBplddtxxeqHRX3f/exec";

async function loadUserData() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const tbody = document.querySelector("#userTable tbody");
  tbody.innerHTML = "";

  data.forEach((item, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.timestamp || "-"}</td>
        <td>${item.ranting || "-"}</td>
        <td>${item.ip || "-"}</td>
        <td>${item.nomor || "-"}</td>
        <td>${item.masa || "-"}</td>
        <td>${item.ketua || "-"}</td>
        <td>${item.sekretaris || "-"}</td>
      </tr>
    `;
  });
}

loadUserData();
