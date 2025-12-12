// ===========================
// NAVBAR & SEARCH TOGGLE
// ===========================
const navbarNav = document.querySelector(".navbar-nav");
const hamburgerMenu = document.querySelector("#hamburger-menu");

// Toggle menu
hamburgerMenu.onclick = () => {
  navbarNav.classList.toggle("active");
};

// Klik di luar untuk menutup menu
document.addEventListener("click", function (e) {
  if (!hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// ===========================
// TAMPILKAN LIST DOKUMEN
// ===========================
const API_URL =
  "https://script.google.com/macros/s/AKfycbxtk3pNGaYocPU3Rs2t3OUL8jI_moBMgtDXKDWuBHL_Y_yNL4w1AwSPnPur0XjLm8Y/exec";

async function loadDoc() {
  const container = document.getElementById("docContainer");
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
      `;

      container.appendChild(card);
    });
  } catch (e) {
    container.innerHTML = "<p style='color:red'>Gagal memuat data.</p>";
  }
}



const API_URL_K =
  "https://script.google.com/macros/s/AKfycbyoEY-61lL5zaO6Wu_bwLdPN4bKuF34oIBQSlC7E4nRiESvT_h_Cy_TCI6cvbpnGlNf/exec";

async function loadPedoman() {
  const container = document.getElementById("pedomanContainer");
  container.innerHTML = "<p>Memuat data...</p>";

  try {
    const res = await fetch(API_URL_K);
    const files = await res.json();

    container.innerHTML = "";

    files.forEach((file) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${file.thumbnail}" alt="${file.name}">
        <div class="card-title">${file.name}</div>
        <a href="${file.url}" target="_blank" class="download-btn">Download</a>
      `;

      container.appendChild(card);
    });
  } catch (e) {
    container.innerHTML = "<p style='color:red'>Gagal memuat data.</p>";
  }
}

// ===========================
// FORM ALUMNI → GOOGLE SHEETS
// ===========================
async function loadAlumni() {
  const tableBody = document.querySelector("#alumniTable tbody");
  if (!tableBody) return;

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbxJpjpWA_3iX6PUULjb59XsvtZyQoUquNLcn_YelQKbj1IhnSABXlrIt8tUn6Tme8ef/exec"
  );

  const data = await response.json();

  tableBody.innerHTML = "";

  data.forEach((item, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.nama}</td>
        <td>${item.alamat}</td>
        <td><a href="https://wa.me/${item.wa}" target="_blank">${
      item.wa
    }</a></td>
      </tr>
    `;
  });
}

// ===========================
// LOAD SEMUA DATA
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  loadDoc();
  loadPedoman();
  loadAlumni();

});

