async function loadAnggotaPrestasi() {
  const API_URL =
    "https://script.google.com/macros/s/AKfycbwFYgX0y_H87TBW4JH6wA4JfVMnB66CaY75XM-CAfO7Zbeh7GzzwZHmwskpXbYLmbEo/exec";

  const tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    data.forEach((item, index) => {
      tbody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.nama || "-"}</td>
          <td>${item.alamat || "-"}</td>
          <td>${item.prestasi || "-"}</td>
          <td>
            <a href="https://wa.me/${item.wa}" target="_blank">
              ${item.wa || "-"}
            </a>
          </td>
        </tr>
      `;
    });

  } catch (err) {
    console.error("Gagal memuat data:", err);
  }
}

// jalankan otomatis saat halaman dibuka
loadAnggotaPrestasi();
