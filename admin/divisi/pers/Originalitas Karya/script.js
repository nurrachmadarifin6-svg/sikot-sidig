const API =
  "https://script.google.com/macros/s/AKfycbwU0QZi-CPuPanNHS0D1jD6C5jUgpQ_6cE1Vc9F0WKlj5hKePqN6ar_xUwj6Oa7sg/exec";
const token = prompt("Token Admin");

fetch(API, {
  method: "POST",
  body: JSON.stringify({ action: "dashboard", token }),
})
  .then((r) => r.json())
  .then((d) => {
    new Chart(chart, {
      type: "bar",
      data: {
        labels: ["Karya", "Like", "Komentar", "User"],
        datasets: [
          {
            data: [d.karya, d.likes, d.comments, d.users],
            backgroundColor: ["#00ffe0", "#ff4d6d", "#00b3ff", "#ffc107"],
          },
        ],
      },
    });
  });
