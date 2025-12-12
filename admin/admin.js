const ADMIN_PASSWORD = "sikotadmin123";

// LOGIN
function loginAdmin() {
  let pass = document.getElementById("adminPass").value;

  if (pass === ADMIN_PASSWORD) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminDocForm").style.display = "block";
    document.getElementById("adminPedomanForm").style.display = "block";
    document.getElementById("saranBox").style.display = "block";

    // Jika alumniForm tidak ada, cegah error
    if (document.getElementById("alumniForm")) {
      document.getElementById("alumniForm").style.display = "block";
    }

    document.getElementById("dashboard").style.display = "block";

    // LOAD DATA jika fungsi tersedia
    if (typeof loadDoc === "function") loadDoc();
    if (typeof loadPedoman === "function") loadPedoman();
    if (typeof loadSaran === "function") loadSaran();
    if (typeof loadAlumni === "function") loadAlumni();
    if (typeof loadDashboard === "function") loadDashboard();

    // Simpan status login
    localStorage.setItem("adminLogin", "true");
  } else {
    alert("Password salah!");
  }
}

// TOGGLE PASSWORD
function togglePassword() {
  let pass = document.getElementById("adminPass");
  pass.type = pass.type === "password" ? "text" : "password";
}

// LOGOUT
// LOGOUT
function logoutAdmin() {
  document.getElementById("adminDocForm").style.display = "none";
  document.getElementById("adminPedomanForm").style.display = "none";
  document.getElementById("saranBox").style.display = "none";

  if (document.getElementById("alumniForm")) {
    document.getElementById("alumniForm").style.display = "none";
  }

  document.getElementById("dashboard").style.display = "none";
  document.getElementById("loginBox").style.display = "block";

  // hapus status login
  localStorage.removeItem("adminLogin");
}
// API DOCUMENT
const API_URL =
  "https://script.google.com/macros/s/AKfycbxtk3pNGaYocPU3Rs2t3OUL8jI_moBMgtDXKDWuBHL_Y_yNL4w1AwSPnPur0XjLm8Y/exec";

// ========================
//  LOAD DOCUMENT
// ========================
async function loadDoc() {
  const container = document.getElementById("docContainer");
  if (!container) return;

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
        <button class="delete-btn" onclick="deleteDoc('${file.id}')">Hapus</button>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = "<p style='color:red'>Gagal memuat data.</p>";
  }
}

// ========================
//  UPLOAD DOCUMENT
// ========================
async function uploadDoc() {
  const file = document.getElementById("docInput").files[0];
  if (!file) return alert("Pilih file dulu!");

  const reader = new FileReader();

  reader.onload = async (e) => {
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
      loadDoc();
    } else {
      alert("Upload gagal!");
    }
  };

  reader.readAsDataURL(file);
}

// ========================
//  DELETE DOCUMENT
// ========================
async function deleteDoc(id) {
  if (!confirm("Yakin ingin menghapus file ini?")) return;

  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ action: "delete", fileId: id }),
  });

  const result = await res.json();

  if (result.status === "deleted") {
    alert("File berhasil dihapus.");
    loadDoc();
  } else {
    alert("Gagal menghapus file.");
  }
}

// ========================
//  PEDOMAN
// ========================
const API_URL_K =
  "https://script.google.com/macros/s/AKfycbyoEY-61lL5zaO6Wu_bwLdPN4bKuF34oIBQSlC7E4nRiESvT_h_Cy_TCI6cvbpnGlNf/exec";

async function loadPedoman() {
  const container = document.getElementById("pedomanContainer");
  if (!container) return;

  container.innerHTML = "<p>Memuat data...</p>";

  try {
    const res = await fetch(API_URL_K);
    const files = await res.json();

    container.innerHTML = "";

    if (files.length === 0) {
      container.innerHTML = "<p>Belum ada pedoman</p>";
      return;
    }

    files.forEach((file) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${file.thumbnail}" alt="${file.name}">
        <div class="card-title">${file.name}</div>
        <a href="${file.url}" target="_blank" class="download-btn">Download</a>
        <button class="delete-btn" onclick="deletePedoman('${file.id}')">Hapus</button>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p style='color:red'>Gagal memuat pedoman.</p>";
  }
}

async function uploadPedoman() {
  const file = document.getElementById("pedomanInput").files[0];
  if (!file) return alert("Pilih file dulu!");

  const reader = new FileReader();

  reader.onload = async (e) => {
    const base64 = e.target.result.split(",")[1];

    const payload = {
      action: "upload",
      name: file.name,
      file: base64,
      mimeType: file.type,
    };

    const res = await fetch(API_URL_K, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.status === "success") {
      alert("Upload berhasil!");
      loadPedoman();
    } else {
      alert("Upload gagal!");
    }
  };

  reader.readAsDataURL(file);
}

async function deletePedoman(id) {
  if (!confirm("Yakin ingin menghapus file ini?")) return;

  const res = await fetch(API_URL_K, {
    method: "POST",
    body: JSON.stringify({ action: "delete", fileId: id }),
  });

  const result = await res.json();

  if (result.status === "deleted") {
    alert("File berhasil dihapus.");
    loadPedoman();
  } else {
    alert("Gagal menghapus file.");
  }
}

// ========================
//  LOGOUT BUTTON FIX
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutAdmin);
  }
});

// ========================
//  FIX DASHBOARD FUNCTION
// ========================
function loadDashboard() {
  console.log("Dashboard Loaded");
}

// ========================
//  AUTO LOAD SAAT HALAMAN DIBUKA
// ========================
window.onload = () => {
  loadDoc();
  loadPedoman();
  loadDashboard();
};
