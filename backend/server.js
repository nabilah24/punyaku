const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Path untuk file data
const filePath = './data/ucapanList.json';

// Endpoint untuk mendapatkan daftar ucapan
app.get('/ucapan', (req, res) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal membaca file' });
    }
    res.json(JSON.parse(data || '[]'));
  });
});

// Endpoint untuk menambahkan ucapan
app.post('/ucapan', (req, res) => {
  const { nama, isi } = req.body;
  if (!nama || !isi) {
    return res.status(400).json({ message: 'Nama dan ucapan diperlukan' });
  }

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Gagal membaca file' });

    const ucapanList = JSON.parse(data || '[]');
    ucapanList.push({ nama, isi });

    fs.writeFile(filePath, JSON.stringify(ucapanList, null, 2), (err) => {
      if (err) return res.status(500).json({ message: 'Gagal menyimpan data' });

      res.status(201).json({ message: 'Ucapan berhasil ditambahkan' });
    });
  });
});

// Endpoint untuk menghapus ucapan
app.delete('/ucapan/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Gagal membaca file' });

    let ucapanList = JSON.parse(data || '[]');
    // Menemukan ucapan yang akan dihapus
    ucapanList = ucapanList.filter((ucapan, index) => index !== parseInt(id));

    fs.writeFile(filePath, JSON.stringify(ucapanList, null, 2), (err) => {
      if (err) return res.status(500).json({ message: 'Gagal menghapus data' });

      res.status(200).json({ message: 'Ucapan berhasil dihapus' });
    });
  });
});


// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
