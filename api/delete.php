<?php
/**
 * ========================================================
 * API: Delete Data Mahasiswa (POST)
 * ========================================================
 * Menghapus record mahasiswa berdasarkan id_mahasiswa.
 */

require_once __DIR__ . '/db.php';

// Pastikan method adalah POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse('error', 'Metode request tidak diizinkan. Gunakan POST.', null, 405);
}

// Ambil payload request
$data = getRequestData();

if (!isset($data['id_mahasiswa']) || empty($data['id_mahasiswa'])) {
    sendResponse('error', 'ID Mahasiswa wajib disertakan untuk melakukan penghapusan.', null, 400);
}

$idMahasiswa = filter_var($data['id_mahasiswa'], FILTER_VALIDATE_INT);
if ($idMahasiswa === false) {
    sendResponse('error', 'ID Mahasiswa tidak valid.', null, 400);
}

try {
    // 1. Cek apakah record ada sebelum dihapus
    $stmtCheck = $pdo->prepare("SELECT id_mahasiswa, nama_mahasiswa, npm FROM mahasiswa WHERE id_mahasiswa = :id LIMIT 1");
    $stmtCheck->execute([':id' => $idMahasiswa]);
    $mahasiswa = $stmtCheck->fetch();

    if (!$mahasiswa) {
        sendResponse('error', 'Data mahasiswa tidak ditemukan atau sudah dihapus sebelumnya.', null, 404);
    }

    // 2. Eksekusi penghapusan data
    $stmtDelete = $pdo->prepare("DELETE FROM mahasiswa WHERE id_mahasiswa = :id");
    $stmtDelete->execute([':id' => $idMahasiswa]);

    sendResponse('success', "Data mahasiswa {$mahasiswa['nama_mahasiswa']} ({$mahasiswa['npm']}) berhasil dihapus!", [
        'id_mahasiswa' => $idMahasiswa
    ]);

} catch (PDOException $e) {
    sendResponse('error', 'Gagal menghapus data dari database: ' . $e->getMessage(), null, 500);
}
