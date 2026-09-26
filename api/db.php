<?php
/**
 * ========================================================
 * Database Connection: MariaDB / MySQL (PDO)
 * ========================================================
 * File ini menangani koneksi database dan helper respon JSON.
 */

// Header response agar selalu berupa JSON & mendukung CORS
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Tangani preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// --------------------------------------------------------
// Konfigurasi Database (Sesuaikan dengan server Anda)
// --------------------------------------------------------
$db_host = getenv('DB_HOST') ?: 'localhost';
$db_port = getenv('DB_PORT') ?: '3306';
$db_name = getenv('DB_NAME') ?: 'mahasiswa';
$db_user = getenv('DB_USER') ?: 'admin_db';
$db_pass = getenv('DB_PASS') !== false ? getenv('DB_PASS') : ''; // Masukkan password database jika ada

// --------------------------------------------------------
// Inisialisasi Koneksi PDO
// --------------------------------------------------------
try {
    $dsn = "mysql:host={$db_host};port={$db_port};dbname={$db_name};charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
} catch (PDOException $e) {
    sendResponse('error', 'Koneksi database gagal: ' . $e->getMessage(), null, 500);
    exit;
}

/**
 * Helper function untuk mengirim respon JSON standar
 * 
 * @param string $status 'success' atau 'error'
 * @param string $message Pesan keterangan
 * @param mixed $data Data payload tambahan
 * @param int $code HTTP response code
 */
function sendResponse($status, $message, $data = null, $code = 200) {
    http_response_code($code);
    $response = [
        'status'  => $status,
        'message' => $message,
    ];
    if ($data !== null) {
        $response['data'] = $data;
    }
    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

/**
 * Helper function untuk mengambil payload input (JSON atau Form Data)
 * 
 * @return array
 */
function getRequestData() {
    $contentType = isset($_SERVER['CONTENT_TYPE']) ? trim($_SERVER['CONTENT_TYPE']) : '';
    
    if (stripos($contentType, 'application/json') !== false) {
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true);
        return is_array($data) ? $data : [];
    }
    
    // Jika dikirim lewat FormData / x-www-form-urlencoded
    return $_POST;
}
