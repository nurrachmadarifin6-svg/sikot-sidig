const API_URL = "https://script.google.com/macros/s/AKfycbzbylkYcxR7RfGes-Uj-4Gj-TLZPr7gPMD4g5wgh6qXuGOFgCnd79IkWWM2Im3EXak/exec";

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
      </tr>https://script.google.com/macros/s/AKfycbzbylkYcxR7RfGes-Uj-4Gj-TLZPr7gPMD4g5wgh6qXuGOFgCnd79IkWWM2Im3EXak/exec
    `;
  });
}

loadUserData();
