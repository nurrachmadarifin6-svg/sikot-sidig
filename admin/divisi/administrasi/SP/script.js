const API_URL =
  "https://script.google.com/macros/s/AKfycbwtzV2WrTCtcSn8geD-SkLC2eF5JCPU8dRU95bQkgePKqYIkTry8-xNLUFlaS61NwDE/exec";

// ========================
//  LOAD FILE
// ========================
async function loadPengesahan() {
  const container = document.getElementById("pengesahanContainer");
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
        <button <a href="${file.url}" target="_blank" class="download-btn">Download</a></button>
        <button class="delete-btn" onclick="deletePengesahan('${file.id}')">Hapus</button>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = "<p style='color:red'>Gagal memuat data.</p>";
  }
}

loadPengesahan();

// ========================
//  UPLOAD FILE
// ========================
async function uploadPengesahan() {
  const fileInput = document.getElementById("pengesahanInput");
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
      loadPengesahan(); // refresh
    } else {
      alert("Upload gagal!");
    }
  };

  reader.readAsDataURL(file);
}

// ========================
//  DELETE FILE
// ========================
async function deletePengesahan(fileId) {
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
    loadPengesahan();
  } else {
    alert("Gagal menghapus file.");
  }
}
