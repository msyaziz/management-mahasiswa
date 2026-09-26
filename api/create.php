<?php
/**
 * ========================================================
 * API: Create Data Mahasiswa (POST)
 * ========================================================
 * Menerima data mahasiswa baru, melakukan validasi ketat,
 * dan menyimpan ke dalam database MariaDB / MySQL.
 */

require_once __DIR__ . '/db.php';

// Pastikan method adalah POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse('error', 'Metode request tidak diizinkan. Gunakan POST.', null, 405);
}

// Ambil data dari request body (JSON atau Form Data)
$data = getRequestData();

// Validasi keberadaan field yang wajib diisi
$requiredFields = ['npm', 'nama_mahasiswa', 'jenis_kelamin', 'program_studi', 'angkatan', 'agama'];
foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || trim((string)$data[$field]) === '') {
        sendResponse('error', "Field '{$field}' wajib diisi dan tidak boleh kosong.", null, 422);
    }
}

$npm           = trim((string)$data['npm']);
$namaMahasiswa = trim((string)$data['nama_mahasiswa']);
$jenisKelamin  = strtoupper(trim((string)$data['jenis_kelamin']));
$programStudi  = trim((string)$data['program_studi']);
$angkatan      = trim((string)$data['angkatan']);
$agama         = strtoupper(trim((string)$data['agama']));

// Validasi format jenis kelamin ('L' / 'P')
if (!in_array($jenisKelamin, ['L', 'P'], true)) {
    sendResponse('error', "Jenis kelamin tidak valid. Pilihan hanya 'L' (Laki-laki) atau 'P' (Perempuan).", null, 422);
}

// Validasi format agama ('I', 'P', 'K', 'B', 'H', 'C', 'A')
$validAgama = ['I', 'P', 'K', 'B', 'H', 'C', 'A'];
if (!in_array($agama, $validAgama, true)) {
    sendResponse('error', "Kode agama tidak valid. Pilihan yang tersedia: " . implode(', ', $validAgama), null, 422);
}

// Validasi tahun angkatan (4 digit)
if (!preg_match('/^\d{4}$/', $angkatan) || (int)$angkatan < 1990 || (int)$angkatan > 2100) {
    sendResponse('error', "Tahun angkatan harus berupa 4 digit tahun yang valid (antara 1990 - 2100).", null, 422);
}

try {
    // 1. Cek apakah NPM sudah terdaftar (NPM harus UNIQUE)
    $checkStmt = $pdo->prepare("SELECT id_mahasiswa FROM mahasiswa WHERE npm = :npm LIMIT 1");
    $checkStmt->execute([':npm' => $npm]);
    if ($checkStmt->fetch()) {
        sendResponse('error', "Mahasiswa dengan NPM '{$npm}' sudah terdaftar dalam sistem.", null, 409);
    }

    // 2. Simpan data mahasiswa baru
    $insertSql = "INSERT INTO mahasiswa (npm, nama_mahasiswa, jenis_kelamin, program_studi, angkatan, agama)
                  VALUES (:npm, :nama_mahasiswa, :jenis_kelamin, :program_studi, :angkatan, :agama)";
    
    $stmt = $pdo->prepare($insertSql);
    $stmt->execute([
        ':npm'            => $npm,
        ':nama_mahasiswa' => $namaMahasiswa,
        ':jenis_kelamin'  => $jenisKelamin,
        ':program_studi'  => $programStudi,
        ':angkatan'       => $angkatan,
        ':agama'          => $agama,
    ]);

    $newId = (int)$pdo->lastInsertId();

    sendResponse('success', 'Data mahasiswa berhasil ditambahkan!', [
        'id_mahasiswa'   => $newId,
        'npm'            => $npm,
        'nama_mahasiswa' => $namaMahasiswa
    ], 201);

} catch (PDOException $e) {
    // Tangani kemungkinan error duplicate entry dari database level
    if ($e->getCode() == 23000) {
        sendResponse('error', "NPM '{$npm}' sudah ada di database.", null, 409);
    }
    sendResponse('error', 'Gagal menyimpan data ke database: ' . $e->getMessage(), null, 500);
}
