const API_URL =
  "https://script.google.com/macros/s/AKfycbxKeIq_kKcNfr-v7GEh-5toiWYdqYhCjLzaSDQPCsu0wuRxqQbQTkgzjnz2fvssw24/exec";

// ========================
//  LOAD FILE
// ========================
async function loadLpj() {
  const container = document.getElementById("lpjContainer");
  container.innerHTML = "<p>Memuat data...</p>";

  try {
    const res = await fetch(API_URL);
    const files = await res.json();

    container.innerHTML = "";

    files.forEach((file) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${file.thumbnail}" alt="${file.name}">
        <div class="card-title">${file.name}</div>

        <a href="${file.url}" target="_blank" class="download-btn">Download</a>
        <button class="delete-btn" onclick="deleteLpj('${file.id}')">Hapus</button>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = "<p style='color:red'>Gagal memuat data.</p>";
  }
}

loadLpj();

// ========================
//  UPLOAD FILE
// ========================
async function uploadLpj() {
  const fileInput = document.getElementById("lpjInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Pilih file dulu!");
    return;
  }

  const reader = new FileReader();

  reader.onload = async function (e) {
    const base64 = e.target.result.split(",")[1];

    const payload = {
      action: "upload",
      name: file.name,
      file: base64,
      mimeType: file.type,
    };

    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.status === "success") {
      alert("Upload berhasil!");
      loadLpj(); // refresh
    } else {
      alert("Upload gagal!");
    }
  };

  reader.readAsDataURL(file);
}

// ========================
//  DELETE FILE
// ========================
async function deleteLpj(fileId) {
  if (!confirm("Yakin ingin menghapus file ini?")) return;

  const payload = {
    action: "delete",
    fileId: fileId,
  };

  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.status === "deleted") {
    alert("File berhasil dihapus.");
    loadLpj();
  } else {
    alert("Gagal menghapus file.");
  }
}
