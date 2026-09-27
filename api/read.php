<?php
/**
 * ========================================================
 * API: Read Data Mahasiswa (GET)
 * ========================================================
 * Mendukung pencarian, filter, fetch detail berdasarkan ID,
 * dan kalkulasi statistik dashboard.
 */

require_once __DIR__ . '/db.php';

// Pastikan method adalah GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendResponse('error', 'Metode request tidak diizinkan. Gunakan GET.', null, 405);
}

// 1. Jika request mengambil detail 1 mahasiswa berdasarkan ID (untuk prefill form edit)
if (isset($_GET['id']) && !empty($_GET['id'])) {
    $id = filter_var($_GET['id'], FILTER_VALIDATE_INT);
    if ($id === false) {
        sendResponse('error', 'ID mahasiswa tidak valid.', null, 400);
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM mahasiswa WHERE id_mahasiswa = :id LIMIT 1");
        $stmt->execute([':id' => $id]);
        $mahasiswa = $stmt->fetch();

        if (!$mahasiswa) {
            sendResponse('error', 'Data mahasiswa tidak ditemukan.', null, 404);
        }

        sendResponse('success', 'Data mahasiswa berhasil ditemukan.', $mahasiswa);
    } catch (PDOException $e) {
        sendResponse('error', 'Gagal mengambil data: ' . $e->getMessage(), null, 500);
    }
}

// 2. Mengambil daftar mahasiswa dengan filter dan pencarian
$search = isset($_GET['q']) ? trim($_GET['q']) : '';
$prodi  = isset($_GET['prodi']) ? trim($_GET['prodi']) : '';
$angkatan = isset($_GET['angkatan']) ? trim($_GET['angkatan']) : '';

$sql = "SELECT * FROM mahasiswa WHERE 1=1";
$params = [];

if ($search !== '') {
    $sql .= " AND (npm LIKE :search_npm OR nama_mahasiswa LIKE :search_nama)";
    $params[':search_npm'] = "%{$search}%";
    $params[':search_nama'] = "%{$search}%";
}

if ($prodi !== '') {
    $sql .= " AND program_studi = :prodi";
    $params[':prodi'] = $prodi;
}

if ($angkatan !== '') {
    $sql .= " AND angkatan = :angkatan";
    $params[':angkatan'] = $angkatan;
}

$sql .= " ORDER BY id_mahasiswa DESC";

try {
    // Eksekusi query data mahasiswa
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $students = $stmt->fetchAll();

    // Ambil statistik ringkas untuk dashboard
    $totalMahasiswa = (int) $pdo->query("SELECT COUNT(*) FROM mahasiswa")->fetchColumn();
    $totalProdi     = (int) $pdo->query("SELECT COUNT(DISTINCT program_studi) FROM mahasiswa")->fetchColumn();

    // Ambil daftar prodi dan angkatan unik untuk pilihan filter
    $prodiList = $pdo->query("SELECT DISTINCT program_studi FROM mahasiswa ORDER BY program_studi ASC")->fetchAll(PDO::FETCH_COLUMN);
    $angkatanList = $pdo->query("SELECT DISTINCT angkatan FROM mahasiswa ORDER BY angkatan DESC")->fetchAll(PDO::FETCH_COLUMN);

    $responseData = [
        'students' => $students,
        'stats'    => [
            'total_mahasiswa' => $totalMahasiswa,
            'total_prodi'     => $totalProdi,
            'prodi_list'      => $prodiList,
            'angkatan_list'   => $angkatanList
        ]
    ];

    sendResponse('success', 'Data mahasiswa berhasil dimuat.', $responseData);
} catch (PDOException $e) {
    sendResponse('error', 'Gagal memuat data: ' . $e->getMessage(), null, 500);
}
