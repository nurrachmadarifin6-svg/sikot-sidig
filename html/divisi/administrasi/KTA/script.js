const API_URL =
  "https://script.google.com/macros/s/AKfycbxtJBypEgBLc1trqWxCixQrlvP2fg2fF2Z9fdon4DxWapgXc-TCsluYig7Sb6mp94Q/exec";

async function loadKta() {
  const container = document.getElementById("ktaContainer");
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

loadKta();
