document.addEventListener("DOMContentLoaded", () => {
  // Ambil parameter dari URL
  const urlParams = new URLSearchParams(window.location.search);
  const guestId = urlParams.get("id");

  // Ambil data tamu dari file JSON
  fetch("./guest.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Cek apakah ada ID tamu di URL
      if (guestId && data.guests[guestId]) {
        const guestName = data.guests[guestId];
        // Tampilkan nama tamu dan lokasi
        document.getElementById("guest-name").innerHTML = `Kepada,<br>${guestName}<br>`;
        document.getElementById("location").textContent = "Di Tempat";
      } else {
        // Sembunyikan elemen jika tidak ada ID valid
        document.getElementById("guest-name").style.display = "none";
        document.getElementById("location").style.display = "none";
      }
    })
    .catch((error) => console.error("Error fetching or processing guest data:", error));
});

