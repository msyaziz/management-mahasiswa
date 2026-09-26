-- ========================================================
-- Database Script: Sistem Manajemen Database Mahasiswa
-- Target DBMS: MariaDB / MySQL (Compatible with phpMyAdmin)
-- Database Name: mahasiswa
-- ========================================================

-- Gunakan database mahasiswa jika sudah ada
-- USE `mahasiswa`;

-- --------------------------------------------------------
-- Struktur Tabel `mahasiswa`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `mahasiswa` (
    `id_mahasiswa` INT AUTO_INCREMENT PRIMARY KEY,
    `npm` VARCHAR(20) NOT NULL UNIQUE,
    `nama_mahasiswa` VARCHAR(100) NOT NULL,
    `jenis_kelamin` ENUM('L', 'P') NOT NULL,
    `program_studi` VARCHAR(100) NOT NULL,
    `angkatan` YEAR NOT NULL,
    `agama` ENUM('I', 'P', 'K', 'B', 'H', 'C', 'A') NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Data Dummy (Seeding Awal untuk Pengujian)
-- Keterangan Kode Agama:
-- I = Islam, P = Kristen/Protestan, K = Katolik,
-- B = Buddha, H = Hindu, C = Konghucu, A = Lainnya
-- --------------------------------------------------------
INSERT INTO `mahasiswa` (`npm`, `nama_mahasiswa`, `jenis_kelamin`, `program_studi`, `angkatan`, `agama`) 
VALUES
('25081010121', 'Raihan Firmansyah', 'L', 'Informatika', 2025, 'I'),
('25081010122', 'Siti Aminah', 'P', 'Sistem Informasi', 2025, 'I'),
('24081010045', 'Budi Santoso', 'L', 'Informatika', 2024, 'K'),
('24081010088', 'Maria Christina', 'P', 'Data Science', 2024, 'P'),
('26081010003', 'I Wayan Arya', 'L', 'Sistem Informasi', 2026, 'H'),
('25081010050', 'Agnes Monica Tan', 'P', 'Data Science', 2025, 'B')
ON DUPLICATE KEY UPDATE `nama_mahasiswa` = VALUES(`nama_mahasiswa`);
