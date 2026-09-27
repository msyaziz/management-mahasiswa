# 🎓 SIMAWA - Sistem Manajemen Database Mahasiswa

Sistem web responsif bergaya **Neobrutalism** untuk mengelola data mahasiswa secara efisien. Proyek ini dibangun dengan pendekatan *native* menggunakan **PHP, Vanilla JavaScript, dan CSS murni**, 

## ✨ Fitur Utama

- **Operasi CRUD Lengkap:** Tambah, Lihat, Edit, dan Hapus data mahasiswa secara *real-time*.
- **Tanpa Reload (Fetch API):** Semua interaksi data menggunakan AJAX (Vanilla JS Fetch), memberikan pengalaman pengguna yang cepat dan mulus.

## 🛠️ Teknologi yang Digunakan

- **Frontend:** HTML5, CSS3, Vanilla JavaScript.
- **Backend:** PHP Native (versi 8.4).
- **Database:** MariaDB.
- **Environment (Opsional):** Docker & Docker Compose.

---

## 📂 Struktur Folder Proyek

```text
management-mahasiswa/
├── api/                  # Endpoint Backend PHP (create.php, read.php, dll)
│   └── db.php            # Konfigurasi koneksi database
├── assets/               # File Statis Frontend
│   ├── css/style.css     # visual Neobrutalism
│   └── js/app.js         # Logika interaksi & Fetch API
├── database/             # Skema tabel (untuk proses import)
│   └── mahasiswa.sql
├── docker-compose.yml    # (Opsional) Script untuk menjalankan server lokal
└── index.html            # Halaman utama aplikasi (UI)