<?php
/**
 * Configuración de Base de Datos y Seguridad
 * Vixy Rider Backend API
 */

// Evitar acceso directo a este archivo
if (basename($_SERVER['PHP_SELF']) === 'config.php') {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Acceso denegado"]);
    exit;
}

// Configuración de la base de datos MySQL (los datos de PHP enviados por el administrador)
define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'vhixvfhf_vixy_admin');
define('DB_USER', getenv('DB_USER') ?: 'vhixvfhf_vixy_dba');
define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : '@#,DUNIt6MZugJ(H');
define('VIXY_INTERCONNECTION_KEY', getenv('VIXY_INTERCONNECTION_KEY') ?: '93565e81dc5f02c2cd52bfc8022fb72eb4ac34cf8bff5e1466e3f46e6fe7c90d');

/**
 * Retorna la conexión PDO configurada a MySQL
 */
function getDbConnection() {
    $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    
    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        return $pdo;
    } catch (PDOException $e) {
        error_log("Error de conexión a la Base de Datos: " . $e->getMessage());
        return null;
    }
}
?>
