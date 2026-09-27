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


```
---

## 🚀 Panduan Instalasi Lokal (Menggunakan XAMPP)

Berikut adalah langkah-langkah lengkap untuk menjalankan proyek ini di komputer lokal Anda menggunakan XAMPP:

1. **Instalasi PHP & MariaDB:**
* Pastikan Anda sudah mengunduh dan menginstal **XAMPP** (yang di dalamnya sudah mencakup PHP versi 8.4 dan MariaDB).
* Nyalakan modul **Apache** dan **MySQL** melalui XAMPP Control Panel.


2. **Buat Database:**
* Buka browser dan akses **phpMyAdmin** (`http://localhost/phpmyadmin`).
* Buat database baru (misalnya `db_mahasiswa`). Ingat nama database, *username* (`root`), *password* (biasanya kosong secara *default*), *host* (`localhost`), dan *port* (`3306`).
* Pilih database tersebut, klik menu **Import**, unggah file `database/mahasiswa.sql` dari folder proyek Anda, lalu klik **Go**.


3. **Konfigurasi `db.php`:**
* Buka file `api/db.php` menggunakan teks editor.
* Sesuaikan konfigurasi koneksi database dengan pengaturan lokal Anda:
```php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "db_mahasiswa";

```

4. **Pindahkan Folder Proyek:**
* Salin seluruh folder proyek `management-mahasiswa` ke dalam direktori *Document Root* XAMPP (biasanya di `C:\xampp\htdocs\`).


5. **Jalankan Aplikasi:**
* Buka browser Anda dan akses melalui URL: `http://localhost/management-mahasiswa`

---
```
```