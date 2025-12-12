window.onload = () => {
  const adminTable = document.querySelector("#alumniAdminTable");
  if (adminTable) {
    loadAlumni();
  }
};

// Ganti dengan URL Web App milikmu
const WEB_APP_URL_P =
  "https://script.google.com/macros/s/AKfycbwQW-d_tv51keug_ogP8THAQP1DTjn5iSkS4CUVM_Gn89pIENeD5pRmN7q2NxszH24/exec";

const form = document.getElementById("alumniForm");
const cancelBtn = document.getElementById("cancelEdit");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const indexEdit = document.getElementById("indexEdit").value;
  const nama = document.getElementById("nama").value;
  const alamat = document.getElementById("alamat").value;
  const wa = document.getElementById("wa").value;

  let payload = { nama, alamat, wa };

  // Jika ada indexEdit → update data
  if (indexEdit) {
    payload.index = parseInt(indexEdit);
    payload.action = "edit";
  } else {
    payload.action = "add";
  }

  try {
    await fetch(WEB_APP_URL_P, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    form.reset();
    document.getElementById("indexEdit").value = "";
    document.getElementById("formTitle").innerText = "Tambah Alumni";
    cancelBtn.style.display = "none";
    loadAlumni();
  } catch (err) {
    console.error(err);
    alert("Gagal menyimpan data");
  }
});

cancelBtn.addEventListener("click", () => {
  form.reset();
  document.getElementById("indexEdit").value = "";
  document.getElementById("formTitle").innerText = "Tambah Alumni";
  cancelBtn.style.display = "none";
});

// Load data
async function loadAlumni() {
  const tableBody = document.querySelector("#alumniAdminTable tbody");
  tableBody.innerHTML = "<tr><td colspan='5'>Loading...</td></tr>";

  try {
    const response = await fetch(WEB_APP_URL_P);
    const data = await response.json();

    tableBody.innerHTML = "";
    if (data.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='5'>Belum ada data</td></tr>";
      return;
    }

    data.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.nama}</td>
        <td>${item.alamat}</td>
        <td><a href="https://wa.me/${item.wa}" target="_blank">${item.wa}</a></td>
        <td>
          <button onclick="editAlumni(${index})">Edit</button>
          <button onclick="deleteAlumni(${index})">Hapus</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
    tableBody.innerHTML = "<tr><td colspan='5'>Gagal memuat data</td></tr>";
  }
}

// Edit
async function editAlumni(index) {
  const response = await fetch(WEB_APP_URL_P);
  const data = await response.json();
  const item = data[index];

  document.getElementById("indexEdit").value = index;
  document.getElementById("nama").value = item.nama;
  document.getElementById("alamat").value = item.alamat;
  document.getElementById("wa").value = item.wa;
  document.getElementById("formTitle").innerText = "Edit Alumni";
  cancelBtn.style.display = "inline-block";
}

// Hapus
async function deleteAlumni(index) {
  if (!confirm("Yakin ingin menghapus data ini?")) return;

  try {
    await fetch(WEB_APP_URL_P, {
      method: "POST",
      body: JSON.stringify({ action: "delete", index }),
    });
    loadAlumni();
  } catch (err) {
    console.error(err);
    alert("Gagal menghapus data");
  }
}
