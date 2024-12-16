// Fungsi untuk render daftar ucapan
function renderUcapan() {
  fetch('https://punyaku.onrender.com/ucapan') // Pastikan menggunakan '/ucapan'
    .then((res) => res.json())
    .then((data) => {
      const daftarUcapan = document.getElementById('daftarUcapan');
      daftarUcapan.innerHTML = ''; // Kosongkan daftar ucapan sebelumnya

      data.forEach((ucapan) => {
        // Membuat elemen div baru untuk setiap ucapan
        const div = document.createElement('div');
        div.classList.add('col-lg-6', 'col-md-6', 'g-5');

        // Menambahkan elemen card untuk menampilkan nama dan isi ucapan
        div.innerHTML = `
          <div class="card bg-white card-left">
            <div class="card-body">
              <h1 class="card-title">${ucapan.nama}</h1>
              <h4 class="card-text">${ucapan.isi}</h4>
            </div>
          </div>
        `;

        // Menambahkan elemen div ke dalam daftar ucapan
        daftarUcapan.appendChild(div);
      });
    })
    .catch((err) => console.error('Gagal memuat data:', err));
}

// Event listener untuk form submit
document.getElementById('ucapanForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Mencegah pengiriman form secara default

  // Mengambil nilai nama dan isi ucapan
  const nama = document.getElementById('nama').value.trim();
  const isi = document.getElementById('ucapan').value.trim();

  // Mengecek jika nama dan isi sudah diisi
  if (nama && isi) {
    // Mengirim data ucapan ke backend
    fetch('https://punyaku.onrender.com/ucapan', { // Pastikan menggunakan '/ucapan'
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama, isi }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message); // Menampilkan pesan dari backend
        renderUcapan(); // Menampilkan ulang daftar ucapan setelah data dikirim
        e.target.reset(); // Mengatur ulang form

        // Memanggil window.location.reload() untuk reload halaman
        window.location.reload(); // Refresh halaman
      })
      .catch((err) => console.error('Gagal mengirim data:', err));
  }
});

// Render ucapan saat halaman dimuat
document.addEventListener('DOMContentLoaded', renderUcapan);
