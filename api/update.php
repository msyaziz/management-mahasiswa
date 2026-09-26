<?php
/**
 * ========================================================
 * API: Update Data Mahasiswa (POST)
 * ========================================================
 * Memperbarui data mahasiswa yang sudah ada berdasarkan id_mahasiswa.
 */

require_once __DIR__ . '/db.php';

// Pastikan method adalah POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse('error', 'Metode request tidak diizinkan. Gunakan POST.', null, 405);
}

// Ambil data request body
$data = getRequestData();

// Validasi id_mahasiswa
if (!isset($data['id_mahasiswa']) || empty($data['id_mahasiswa'])) {
    sendResponse('error', 'ID Mahasiswa wajib disertakan untuk melakukan update.', null, 400);
}

$idMahasiswa   = filter_var($data['id_mahasiswa'], FILTER_VALIDATE_INT);
if ($idMahasiswa === false) {
    sendResponse('error', 'ID Mahasiswa tidak valid.', null, 400);
}

// Validasi field wajib lainnya
$requiredFields = ['npm', 'nama_mahasiswa', 'jenis_kelamin', 'program_studi', 'angkatan', 'agama'];
foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || trim((string)$data[$field]) === '') {
        sendResponse('error', "Field '{$field}' tidak boleh kosong.", null, 422);
    }
}

$npm           = trim((string)$data['npm']);
$namaMahasiswa = trim((string)$data['nama_mahasiswa']);
$jenisKelamin  = strtoupper(trim((string)$data['jenis_kelamin']));
$programStudi  = trim((string)$data['program_studi']);
$angkatan      = trim((string)$data['angkatan']);
$agama         = strtoupper(trim((string)$data['agama']));

// Validasi enum jenis kelamin & agama
if (!in_array($jenisKelamin, ['L', 'P'], true)) {
    sendResponse('error', "Jenis kelamin tidak valid ('L' atau 'P').", null, 422);
}

$validAgama = ['I', 'P', 'K', 'B', 'H', 'C', 'A'];
if (!in_array($agama, $validAgama, true)) {
    sendResponse('error', "Kode agama tidak valid. Pilihan: " . implode(', ', $validAgama), null, 422);
}

// Validasi tahun angkatan
if (!preg_match('/^\d{4}$/', $angkatan) || (int)$angkatan < 1990 || (int)$angkatan > 2100) {
    sendResponse('error', "Tahun angkatan harus 4 digit tahun valid.", null, 422);
}

try {
    // 1. Cek apakah record dengan ID ini ada
    $checkExist = $pdo->prepare("SELECT id_mahasiswa FROM mahasiswa WHERE id_mahasiswa = :id LIMIT 1");
    $checkExist->execute([':id' => $idMahasiswa]);
    if (!$checkExist->fetch()) {
        sendResponse('error', 'Data mahasiswa dengan ID tersebut tidak ditemukan.', null, 404);
    }

    // 2. Cek apakah NPM digunakan oleh record mahasiswa lain
    $checkNpm = $pdo->prepare("SELECT id_mahasiswa FROM mahasiswa WHERE npm = :npm AND id_mahasiswa != :id LIMIT 1");
    $checkNpm->execute([':npm' => $npm, ':id' => $idMahasiswa]);
    if ($checkNpm->fetch()) {
        sendResponse('error', "NPM '{$npm}' sudah digunakan oleh mahasiswa lain.", null, 409);
    }

    // 3. Lakukan Update data
    $updateSql = "UPDATE mahasiswa 
                  SET npm = :npm, 
                      nama_mahasiswa = :nama_mahasiswa, 
                      jenis_kelamin = :jenis_kelamin, 
                      program_studi = :program_studi, 
                      angkatan = :angkatan, 
                      agama = :agama 
                  WHERE id_mahasiswa = :id";
    
    $stmt = $pdo->prepare($updateSql);
    $stmt->execute([
        ':npm'            => $npm,
        ':nama_mahasiswa' => $namaMahasiswa,
        ':jenis_kelamin'  => $jenisKelamin,
        ':program_studi'  => $programStudi,
        ':angkatan'       => $angkatan,
        ':agama'          => $agama,
        ':id'             => $idMahasiswa,
    ]);

    sendResponse('success', 'Data mahasiswa berhasil diperbarui!', [
        'id_mahasiswa'   => $idMahasiswa,
        'npm'            => $npm,
        'nama_mahasiswa' => $namaMahasiswa
    ]);

} catch (PDOException $e) {
    if ($e->getCode() == 23000) {
        sendResponse('error', "NPM '{$npm}' sudah ada di database.", null, 409);
    }
    sendResponse('error', 'Gagal memperbarui data: ' . $e->getMessage(), null, 500);
}
