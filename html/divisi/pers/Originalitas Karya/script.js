const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzOvUIcaJ1yT8nFlyPY4z9qoUexmFBz60141tYkigVarKgryr_WFQ60vJnEtnKfUQM/exec"; // Ganti dengan Web App URL-mu

let allKarya = [];
let likesData = {};
let commentsData = {};

// ==================== INIT ====================
document.getElementById("uploadBtn").addEventListener("click", upload);
document
  .getElementById("filterCategory")
  .addEventListener("input", listGallery);

// ==================== UPLOAD ====================
async function upload() {
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const fileInput = document.getElementById("image");
  const uploadMsg = document.getElementById("uploadMsg");

  if (!fileInput.files.length) {
    uploadMsg.textContent = "Pilih gambar dulu!";
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = async function (e) {
    const base64 = e.target.result.split(",")[1];
    const data = {
      action: "upload",
      title,
      category,
      name: file.name,
      type: file.type,
      image: base64,
    };

    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.success) {
      uploadMsg.textContent = "Upload berhasil!";
      await fetchLikesComments();
      listGallery();
    } else {
      uploadMsg.textContent = "Error: " + json.error;
    }
  };

  reader.readAsDataURL(file);
}

// ==================== LIST GALERI ====================
async function listGallery() {
  const filter = document.getElementById("filterCategory").value.toLowerCase();
  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ action: "list" }),
  });
  const data = await res.json();
  allKarya = data;

  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  allKarya
    .filter((k) => !filter || k.category.toLowerCase().includes(filter))
    .forEach((karya) => {
      const card = document.createElement("div");
      card.className = "card";

      const likeCount = likesData[karya.id] || 0;
      const comments = commentsData[karya.id] || [];

      card.innerHTML = `
        <img src="${karya.url}" alt="${karya.title}" />
        <h4>${karya.title}</h4>
        <p>${karya.category}</p>
        <div class="likes">❤️ ${likeCount} Likes</div>
        <button onclick="like('${karya.id}')">Like ❤️</button>

        <div class="comments">
          <strong>Komentar:</strong>
          <div id="comments-${karya.id}">
            ${comments.map((c) => `<div>${c.text}</div>`).join("")}
          </div>
          <div class="comment-input">
            <input type="text" id="input-${karya.id}" placeholder="Tulis komentar..." />
            <button onclick="addComment('${karya.id}')">Kirim</button>
          </div>
        </div>
      `;
      gallery.appendChild(card);
    });
}

// ==================== LIKE ====================
async function like(karyaId) {
  await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ action: "like", karyaId }),
  });
  await fetchLikesComments();
  listGallery();
}

// ==================== COMMENT ====================
async function addComment(karyaId) {
  const input = document.getElementById(`input-${karyaId}`);
  const text = input.value;
  if (!text) return;

  await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ action: "comment", karyaId, text }),
  });
  input.value = "";
  await fetchLikesComments();
  listGallery();
}

// ==================== FETCH LIKES & COMMENTS ====================
async function fetchLikesComments() {
  // Placeholder sementara
  likesData = {};
  commentsData = {};
  // Buat endpoint Apps Script untuk mengirim likes & comments per karya
}

// ==================== LOAD INITIAL ====================
listGallery();
