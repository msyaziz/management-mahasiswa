# PRD — Sistem Manajemen Database Mahasiswa (CRUD)

**Versi:** 1.0
**Tanggal:** 25 September 2026
**Tech Stack:** HTML5, CSS3, JavaScript (Vanilla), PHP Native, MySQL

---

## 1. Ringkasan Proyek

Landing page dengan fitur **CRUD (Create, Read, Update, Delete)** untuk mengelola database mahasiswa. Gaya visual mengikuti referensi desain **Neobrutalism** (contoh: MelodyTag) — tampilan bold, kontras tinggi, border tebal hitam, drop shadow solid, dan warna-warna cerah yang playful namun tetap fungsional untuk kebutuhan data akademik.

---

## 2. Frontend / Design

### 2.1 Gaya Desain: Neobrutalism
Diadaptasi dari referensi gambar yang dikirimkan:
- Border hitam tebal (`border: 3px solid #000`) pada hampir semua elemen (card, tombol, tabel, form).
- Drop shadow solid tanpa blur (`box-shadow: 6px 6px 0px #000`), bukan shadow blur biasa.
- Elemen dekoratif geometris (lingkaran, kotak miring/rotate) sebagai aksen di sudut halaman.
- Highlight teks menggunakan blok warna miring (rotated background block) di belakang judul.
- Efek hover: elemen bergeser sedikit (translate) sehingga shadow "menghilang", memberi kesan elemen ditekan.

### 2.2 Palet Warna (diambil dari referensi)
| Nama | Hex | Penggunaan |
|---|---|---|
| Cream / Background | `#FDF6E3` | Latar belakang utama |
| Hot Pink | `#FF6FCB` | Tombol primer (Tambah, Simpan), aksen |
| Mint / Teal Green | `#2EE6A6` | Highlight judul, badge jenis kelamin "P" |
| Yellow / Amber | `#F5B301` | Aksen dekoratif, badge nomor/langkah |
| Sky Blue | `#7FE8F5` | Background section sekunder |
| Hitam | `#000000` | Border, teks, shadow |
| Putih | `#FFFFFF` | Card, form background |

### 2.3 Tipografi
- Font: **Sans-serif tebal/bold** (contoh: `Poppins`, `Inter`, atau `Archivo Black` untuk heading; `Inter`/`Poppins` regular untuk body).
- Heading (H1–H2): huruf kapital semua, `font-weight: 800–900`.
- Body text: `font-weight: 400–600`, ukuran 16px, mudah dibaca untuk data tabular.

### 2.4 Komponen UI Utama
1. **Navbar** — logo + judul sistem, menu (Beranda, Data Mahasiswa, Tentang), tombol CTA "Tambah Mahasiswa" (pink, border hitam, shadow solid).
2. **Hero Section** — judul besar dengan highlight block warna (mint/pink), deskripsi singkat sistem, tombol CTA utama ("Kelola Data Mahasiswa") dan CTA sekunder ("Cara Kerja").
3. **Section "Cara Kerja"** — 3 langkah bernomor (kotak angka warna kontras: kuning/pink/mint) mirip referensi (Tambah Data → Kelola Data → Pantau Data).
4. **Dashboard / Tabel Data Mahasiswa** — tabel dengan border tebal, header hitam-putih, baris zebra, tombol aksi (Edit/Hapus) berbentuk kotak kecil dengan shadow solid.
5. **Form Tambah/Edit Mahasiswa** — modal atau halaman terpisah, input dengan border tebal hitam, label bold, tombol simpan pink dan tombol batal putih.
6. **Search & Filter Bar** — input pencarian NPM/nama, dropdown filter program studi/angkatan/jenis kelamin/agama, gaya kotak dengan border tebal.
7. **Notifikasi/Alert** — badge sukses (mint), badge error (pink/merah), gaya sticker dengan border hitam.
8. **Footer** — sederhana, background hitam atau cream dengan border top tebal.

### 2.5 Responsivitas
- Mobile-first, breakpoint utama di 768px dan 1024px.
- Tabel data pada mobile berubah menjadi tampilan card per baris (bukan scroll horizontal) agar tetap mudah dibaca.

---

## 3. Requirements

### 3.1 Functional Requirements
- FR-1: Sistem dapat menambahkan data mahasiswa baru (Create).
- FR-2: Sistem dapat menampilkan seluruh data mahasiswa dalam bentuk tabel (Read).
- FR-3: Sistem dapat mencari/memfilter data mahasiswa berdasarkan NPM, nama, program studi, angkatan, jenis kelamin, atau agama.
- FR-4: Sistem dapat mengubah/mengedit data mahasiswa yang sudah ada (Update).
- FR-5: Sistem dapat menghapus data mahasiswa (Delete), disertai konfirmasi sebelum hapus.
- FR-6: Sistem melakukan validasi input (NPM unik, jenis kelamin hanya 'L'/'P', kode agama sesuai daftar valid, field wajib tidak boleh kosong).
- FR-7: Sistem menampilkan notifikasi/alert setelah aksi Create/Update/Delete berhasil atau gagal.
- FR-8: Sistem menampilkan jumlah total data mahasiswa pada dashboard.

### 3.2 Data Mahasiswa (Struktur Tabel `mahasiswa`)
| Field | Tipe Data | Keterangan |
|---|---|---|
| id_mahasiswa | INT (PK, AUTO_INCREMENT) | ID unik sistem (contoh: 0–50) |
| npm | VARCHAR(20), UNIQUE | Nomor Pokok Mahasiswa (contoh: `25081010121`) |
| nama_mahasiswa | VARCHAR(100) | Nama lengkap (contoh: Raihan Firmansyah) |
| jenis_kelamin | ENUM('L','P') | L = Laki-laki, P = Perempuan |
| program_studi | VARCHAR(100) | Nama program studi |
| angkatan | YEAR / VARCHAR(4) | Tahun masuk |
| agama | ENUM('I','P','K','B','H','C','A') | Kode agama — lihat keterangan kode di bawah |

**Keterangan kode `agama`** (asumsi mengikuti standar kode agama KTP Indonesia — mohon konfirmasi/sesuaikan bila berbeda):
| Kode | Agama |
|---|---|
| I | Islam |
| P | Protestan/Kristen |
| K | Katolik |
| B | Buddha |
| H | Hindu |
| C | Konghucu |
| A | Lainnya |

**Contoh script SQL:**
```sql
CREATE TABLE mahasiswa (
    id_mahasiswa INT AUTO_INCREMENT PRIMARY KEY,
    npm VARCHAR(20) NOT NULL UNIQUE,
    nama_mahasiswa VARCHAR(100) NOT NULL,
    jenis_kelamin ENUM('L','P') NOT NULL,
    program_studi VARCHAR(100) NOT NULL,
    angkatan YEAR NOT NULL,
    agama ENUM('I','P','K','B','H','C','A') NOT NULL
);
```

### 3.3 Technical Requirements
- **Frontend:** HTML5 (semantic tag), CSS3 (custom, tanpa framework besar — cukup CSS murni agar gaya neobrutalism presisi), JavaScript vanilla untuk interaksi (fetch AJAX, validasi form, konfirmasi hapus).
- **Backend:** PHP native (tanpa framework), menggunakan arsitektur sederhana (folder `api/` untuk endpoint CRUD: `create.php`, `read.php`, `update.php`, `delete.php`).
- **Database:** MySQL, koneksi menggunakan `mysqli` atau `PDO` dengan prepared statement (mencegah SQL Injection).
- **Komunikasi Data:** AJAX (Fetch API) antara JS dan PHP menggunakan format JSON, agar tabel bisa update tanpa reload halaman.
- **Keamanan:** Validasi input di sisi client (JS) dan server (PHP), sanitasi input, prepared statement untuk semua query.
- **Kompatibilitas:** Browser modern (Chrome, Firefox, Edge terbaru), desain responsif untuk desktop dan mobile.

### 3.4 Non-Functional Requirements
- Waktu respon operasi CRUD < 2 detik dalam kondisi jaringan normal.
- Antarmuka konsisten mengikuti design system Neobrutalism pada seluruh halaman.
- Kode terstruktur rapi dan mudah dikembangkan (separation of concern: frontend, backend/api, database).

---

## 4. Core Features

1. **Landing/Hero Page** — memperkenalkan sistem, tombol akses ke dashboard data mahasiswa.
2. **Dashboard Data Mahasiswa (Read)** — menampilkan seluruh data dalam tabel, lengkap dengan search bar dan filter program studi/angkatan.
3. **Tambah Data Mahasiswa (Create)** — form input data baru (NPM, nama, jenis kelamin, program studi, angkatan, agama) dengan validasi.
4. **Edit Data Mahasiswa (Update)** — form pre-filled untuk mengubah data yang sudah ada.
5. **Hapus Data Mahasiswa (Delete)** — aksi hapus dengan modal konfirmasi untuk mencegah kesalahan.
6. **Pencarian & Filter** — pencarian real-time berdasarkan NPM/nama dan filter berdasarkan program studi/angkatan/jenis kelamin/agama.
7. **Notifikasi Sistem** — pesan sukses/gagal untuk setiap aksi CRUD, tampil sebagai alert bergaya sticker (sesuai tema).
8. **Statistik Ringkas** — jumlah total mahasiswa, jumlah per program studi dan per angkatan ditampilkan sebagai kartu ringkasan di dashboard.

---

## 5. User Flow

### 5.1 Flow Umum
```
[Landing Page]
      |
      v
[Klik "Kelola Data Mahasiswa"]
      |
      v
[Dashboard Tabel Data Mahasiswa] <---------------------
      |                                                |
      |-- Klik "Tambah Mahasiswa" --> [Form Tambah] --> [Simpan] --> (Validasi)
      |                                                              |
      |                                                       Gagal--+--Berhasil
      |                                                       |             |
      |                                                 [Alert Error]  [Alert Sukses] --> kembali ke Dashboard
      |
      |-- Klik "Edit" pada baris data --> [Form Edit (data ter-isi)] --> [Update] --> (Validasi) --> Alert --> kembali ke Dashboard
      |
      |-- Klik "Hapus" pada baris data --> [Modal Konfirmasi Hapus]
      |                                          |
      |                                    Batal-+-Hapus
      |                                    |            |
      |                              [Tutup Modal]  [Data Terhapus] --> Alert Sukses --> kembali ke Dashboard
      |
      |-- Input pada Search/Filter --> [Tabel ter-update otomatis (AJAX, tanpa reload)]
```

### 5.2 Flow Detail per Fitur

**Create (Tambah Data):**
1. User klik tombol "Tambah Mahasiswa".
2. Sistem menampilkan form (modal/halaman).
3. User mengisi NPM, nama mahasiswa, jenis kelamin, program studi, angkatan, agama.
4. User klik "Simpan".
5. JS memvalidasi field wajib & format di sisi client.
6. Data dikirim via AJAX (fetch) ke `create.php`.
7. PHP memvalidasi ulang & cek NPM unik, lalu insert ke MySQL.
8. Sistem mengembalikan response JSON (sukses/gagal).
9. Tabel di-refresh otomatis + notifikasi ditampilkan.

**Read (Lihat Data):**
1. Saat dashboard dimuat, JS memanggil `read.php` via AJAX.
2. PHP mengambil seluruh data dari tabel `mahasiswa`.
3. Data dikembalikan dalam format JSON dan dirender ke tabel HTML oleh JS.

**Update (Edit Data):**
1. User klik tombol "Edit" pada baris data tertentu.
2. Sistem menampilkan form yang sudah terisi data lama.
3. User mengubah data yang diperlukan, klik "Update".
4. Data dikirim via AJAX ke `update.php` beserta `id_mahasiswa`.
5. PHP memvalidasi & meng-update data di MySQL.
6. Tabel di-refresh + notifikasi sukses/gagal.

**Delete (Hapus Data):**
1. User klik tombol "Hapus" pada baris data.
2. Sistem menampilkan modal konfirmasi ("Yakin ingin menghapus data ini?").
3. Jika user klik "Ya, Hapus": request AJAX dikirim ke `delete.php` beserta `id_mahasiswa`.
4. PHP menghapus data dari MySQL.
5. Tabel di-refresh + notifikasi sukses.
6. Jika user klik "Batal": modal ditutup, tidak ada perubahan data.

---

## 6. Struktur Folder (Referensi Implementasi)

```
project-root/
│
├── index.html          # Landing page + dashboard
├── assets/
│   ├── css/style.css   # Styling neobrutalism
│   └── js/app.js       # Logic CRUD (fetch AJAX)
│
├── api/
│   ├── db.php          # Koneksi database (PDO/mysqli)
│   ├── create.php
│   ├── read.php
│   ├── update.php
│   └── delete.php
│
└── database/
    └── mahasiswa.sql   # Script pembuatan tabel
```
