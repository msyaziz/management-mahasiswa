Berikut adalah rencana eksekusi tingkat tinggi (High-Level Plan) 

### Tahap 1: Perbaikan Navigasi & Tata Letak (HTML & CSS)

Fokus pada bagian atas halaman dan perilaku *scroll* saat menu diklik.

1. **Revisi Urutan Navbar:**
* Buka file `index.html`.
* Cari bagian kode `<nav>` atau daftar menu navbar.
* Ubah urutan teks dan *link*-nya yang saat ini "Beranda - Data Mahasiswa - Cara Kerja" menjadi **"Beranda - Cara Kerja - Data Mahasiswa"**.




2. **Revisi Posisi Scroll "Beranda":**
* Saat ini halaman terlihat terlalu menempel ke atas.


* Buka file `assets/css/style.css`.
* Tambahkan properti `scroll-margin-top` atau `padding-top` pada elemen *container* `#beranda` (misalnya sebesar `80px` atau `100px`). Ini akan memberi jarak bernapas (ruang kosong) di bagian atas saat menu "Beranda" diklik.


3. **Revisi Efek Scroll "Cara Kerja":**
* Pastikan elemen HTML pembungkus bagian "Cara Kerja" memiliki atribut `id="cara-kerja"`.


* Pada navbar, pastikan *link* (tag `<a>`) untuk menu Cara Kerja memiliki atribut `href="#cara-kerja"`. Dengan begitu, saat diklik, halaman akan otomatis meluncur (*scroll*) mulus tepat ke bagian tiga langkah kotak tersebut.





### Tahap 2: Implementasi Pagination Tabel (JavaScript)

Fokus pada pembatasan jumlah data yang tampil agar tidak memanjang ke bawah.

1. **Batasi Data 15 Baris:**
* Buka file `assets/js/app.js`.
* Pada fungsi yang bertugas menampilkan data ke tabel (setelah *fetch* dari API), jangan langsung me-*looping* seluruh data.
* Buat variabel penanda halaman (misal: `currentPage = 1`) dan batas data (misal: `itemsPerPage = 15`).
* Gunakan fungsi bawaan JavaScript `Array.slice()` untuk memotong dan hanya menampilkan 15 data pertama di tabel utama.




2. **Buat Tombol Tab/Halaman:**
* Hitung total halaman dengan membagi jumlah seluruh data dengan 15.
* Buat elemen HTML tombol angka (1, 2, 3, dst.) secara dinamis di bawah tabel.


* Tambahkan *event listener* (aksi klik) pada tombol tersebut untuk mengubah nilai `currentPage` dan me-*render* ulang isi tabel sesuai halaman yang dipilih.



### Tahap 3: Perbaikan Tampilan Mobile / Responsif (HTML & CSS)

Fokus memperbaiki tabel di layar HP agar datanya terbaca, tidak hanya sekadar menampilkan nama kolom kosong.

1. **Ubah Struktur Tabel Mobile Menjadi Card:**
* Pada tampilan saat ini di HP, tabel terlihat terpotong atau hanya menampilkan *header* (NO, NPM, NAMA MAHASISWA) yang bertumpuk tanpa nilai di sebelahnya.


* Di dalam `style.css`, gunakan *Media Query* (`@media (max-width: 768px)`).
* Ubah elemen `<td>` (sel tabel) agar bersifat `display: block` atau `flex`.


2. **Munculkan Data Bersandingan dengan Label:**
* Tambahkan atribut khusus seperti `data-label="NPM"` pada setiap `<td>` di file HTML/JS.
* Gunakan trik CSS pseudo-element `td::before { content: attr(data-label); }` di tampilan *mobile*. Ini akan membuat tulisan "NPM" muncul di sebelah kiri, dan nilai aslinya (misal: 25081010121) muncul di sebelah kanan pada baris yang sama.