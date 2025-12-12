function loadNotulensi() {
  const container = document.getElementById("notulensiList");
  container.innerHTML = "";

  const pedoman = JSON.parse(localStorage.getItem("notulensi")) || [];

  pedoman.forEach((doc) => {
    const div = document.createElement("div");
    div.classList.add("notulensi-card");

    div.innerHTML = `
      <h3>${doc.title}</h3>
      <img src="${doc.image}" alt="${doc.title}">
      <a href="${doc.file}" download><button>Download</button></a>
    `;

    container.appendChild(div);
  });
}
