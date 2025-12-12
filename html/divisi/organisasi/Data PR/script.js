const API_URL = "https://script.google.com/macros/s/AKfycbzp0W-AaOMb8J9IJ-n6cnx_xBWQIIgC3FXb2zcw1bJGc6bMFEdcNTClmnUg_e0FqbQ/exec";

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
