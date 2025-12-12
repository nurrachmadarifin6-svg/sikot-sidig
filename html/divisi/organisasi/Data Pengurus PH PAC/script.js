const API_URL =
  "https://script.google.com/macros/s/AKfycbxeRG5hf_m4o2vnYYBn78OqlbnnHz_X-vN6YttmDPOtRgmr8Dsj7LSGUcl-WTdW-UOg/exec";
  
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
        <td>${item.nama || "-"}</td>
        <td>${item.alamat || "-"}</td>
        <td>${item.jabatan || "-"}</td>
      </tr>
    `;
  });
}

loadUserData();
