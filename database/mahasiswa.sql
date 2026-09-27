-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 14 Sep 2026 pada 05.20
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perkuliahan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id_mahasiswa` int(11) NOT NULL AUTO_INCREMENT,
  `npm` varchar(20) NOT NULL,
  `nama_mahasiswa` varchar(100) NOT NULL,
  `jenis_kelamin` char(1) DEFAULT NULL,
  `program_studi` varchar(100) DEFAULT NULL,
  `angkatan` int(11) DEFAULT NULL,
  `agama` char(1),
  PRIMARY KEY (`id_mahasiswa`),
  UNIQUE KEY `npm` (`npm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `mahasiswa`
--

INSERT INTO `mahasiswa` (`id_mahasiswa`, `npm`, `nama_mahasiswa`, `jenis_kelamin`, `program_studi`, `angkatan`) VALUES
(51, '25081010121', 'Raihan Firmansyah', NULL, 'Informatika', 2025),
(1, '25081010101', 'Muhammad Rizky Ramadhan', 'P', 'Informatika', 2025),
(2, '25081010102', 'Nabila Putri Anggraeni', 'L', 'Informatika', 2025),
(3, '25081010103', 'Arya Sute Parawangsa', 'P', 'bisnis digital', 2025),
(4, '25081010104', 'Ferdinand Leandro Widjaja', 'P', 'Informatika', 2025),
(5, '25081010105', 'Salsabila Ayu Ningtyas', 'L', 'Informatika', 2025),
(6, '25081010106', 'Dimas Prasetyo Nugraha', 'P', 'Informatika', 2025),
(7, '25081010107', 'Zahra Aulia Rahman', 'L', 'Informatika', 2025),
(8, '25081010108', 'Bagas Wahyu Firmansyah', 'P', 'Informatika', 2025),
(9, '25081010109', 'Clarissa Putri Maharani', 'L', 'Informatika', 2025),
(10, '25081010110', 'Aditiya Pratama', 'P', 'Informatika', 2025),
(11, '25081010111', 'Farah Ayunda Safitri', 'L', 'Informatika', 2025),
(12, '25081010112', 'Gazha Patra Atmaja', 'P', 'Informatika', 2025),
(13, '25081010113', 'Reza Fahlevi Ramadhan', 'P', 'Informatika', 2025),
(14, '25081010114', 'Intan Permata Sari', 'L', 'Informatika', 2025),
(15, '25081010115', 'Fikri Ardiansyah', 'P', 'Informatika', 2025),
(16, '25081010116', 'Devi Anjani Putri', 'L', 'Informatika', 2025),
(17, '25081010117', 'Rangga Saputra Wijaya', 'P', 'Informatika', 2025),
(18, '25081010118', 'Amelia Rahmawati', 'L', 'Informatika', 2025),
(19, '25081010159', 'Taufiiqul Hakim', 'P', 'Informatika', 2025),
(20, '25081010120', 'Wahyu Setiaji Nugroho', 'P', 'Informatika', 2025),
(21, '25081010119', 'Fauzan Ramadhan', 'P', 'Informatika', 2025),
(22, '25081010122', 'Siti Aisyah Putri', 'L', 'Informatika', 2025),
(23, '25081010123', 'Rizky Maulana', 'P', 'Informatika', 2025),
(24, '25081010124', 'Dinda Maharani', 'L', 'Informatika', 2025),
(25, '25081010125', 'Fajar Nugroho', 'P', 'Informatika', 2025),
(26, '25081010126', 'Anisa Rahmawati', 'L', 'Informatika', 2025),
(27, '25081010127', 'Bagus Setiawan', 'P', 'Informatika', 2025),
(28, '25081010128', 'Nadia Permatasari', 'L', 'Informatika', 2025),
(29, '25081010129', 'Rafi Akbar', 'P', 'Informatika', 2025),
(30, '25081010130', 'Citra Lestari', 'L', 'Informatika', 2025),
(31, '25081010131', 'Yoga Pratama', 'P', 'Informatika', 2025),
(32, '25081010132', 'Aulia Safitri', 'L', 'Informatika', 2025),
(33, '25081010133', 'Dimas Arya Putra', 'P', 'Informatika', 2025),
(34, '25081010134', 'Nanda Putri Amelia', 'L', 'Informatika', 2025),
(35, '25081010135', 'Ilham Fauzi', 'P', 'Informatika', 2025),
(36, '25081010136', 'Maya Sari Dewi', 'L', 'Informatika', 2025),
(37, '25081010137', 'Rendra Saputra', 'P', 'Informatika', 2025),
(38, '25081010138', 'Vina Oktaviani', 'L', 'Informatika', 2025),
(39, '25081010139', 'Arif Setiawan', 'P', 'Informatika', 2025),
(40, '25081010140', 'Putri Ayu Lestari', 'L', 'Informatika', 2025),
(41, '25081010141', 'Andika Wijaya', 'P', 'bisnis digital', 2025),
(42, '25081010142', 'Nisa Amalia', 'L', 'bisnis digital', 2025),
(43, '25081010143', 'Raka Aditya', 'P', 'bisnis digital', 2025),
(44, '25081010144', 'Bella Novitasari', 'L', 'bisnis digital', 2025),
(45, '25081010145', 'Rizal Fadillah', 'P', 'bisnis digital', 2025),
(46, '25081010146', 'Salsa Nuraini', 'L', 'bisnis digital', 2025),
(47, '25081010147', 'Kevin Ramadhan', 'P', 'bisnis digital', 2025),
(48, '25081010148', 'Intan Permata', 'L', 'bisnis digital', 2025),
(49, '25081010149', 'Farhan Hidayat', 'P', 'bisnis digital', 2025),
(50, '25081010150', 'Rina Kartika Sari', 'L', 'bisnis digital', 2025);


UPDATE mahasiswa
SET agama = ELT(
    FLOOR(1 + RAND() * 7),
    'I',
    'P',
    'K',
    'B',
    'H',
    'C',
    'A'
);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`id_mahasiswa`),
  ADD UNIQUE KEY `npm` (`npm`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;





