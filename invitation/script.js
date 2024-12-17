function startCountdown(targetDate) {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = Math.max(0, targetDate - now);

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  const interval = setInterval(updateCountdown, 1000);
  updateCountdown();
}

// Masukkan target date di sini (format: YYYY-MM-DDTHH:mm:ss)
const targetDate = new Date("2025-01-04T10:00:00").getTime();
startCountdown(targetDate);

// 
function showThankYouAlert() {
  Swal.fire({
    title: "Terima Kasih!",
    html: '<div class="smiley">😉</div>',
    customClass: {
      popup: "swal2-popup", // Menambahkan kelas kustom untuk memperbesar kotak alert
    },
    showConfirmButton: false, // Menyembunyikan tombol "OK"
    willOpen: () => {
      // Animasi dinamis sebelum alert ditampilkan
      const smiley = document.querySelector(".smiley");
      smiley.style.transform = "scale(1.2)";
    },
    didOpen: () => {
      // Animasi dinamis saat alert terbuka
      const smiley = document.querySelector(".smiley");
      smiley.style.transition = "transform 1s ease";
      smiley.style.transform = "scale(1)";

      // Menunggu durasi animasi selesai, kemudian menutup alert
      setTimeout(() => {
        Swal.close(); // Menutup alert setelah animasi selesai
      }, 1000); // Durasi animasi 1 detik
    },
  });
}

function copyAccountNumber(button) {
  // Cari elemen nomor rekening yang ada di kartu yang sesuai
  const accountNumber =
    button.previousElementSibling.querySelector(
      ".account-number"
    ).innerText;

  // Gunakan Clipboard API untuk menyalin teks
  navigator.clipboard
    .writeText(accountNumber)
    .then(() => {
      showAlert();
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

// Fungsi untuk menampilkan alert
function showAlert() {
  const alertBox = document.getElementById("alert-box");

  // Tambahkan kelas "show" untuk memunculkan alert
  alertBox.classList.add("show");

  // Hilangkan alert setelah 3 detik
  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 3000);
}