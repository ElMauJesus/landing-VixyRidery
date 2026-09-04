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

// Configuración de la base de datos MySQL (cPanel)
define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'vixyhgtk_vixy_driver_prereg');
define('DB_USER', getenv('DB_USER') ?: 'vixyhgtk_vixy_dba');
define('DB_PASS', getenv('DB_PASS') ?: 'K2e+U@#U*7HtYC~b');

// Variable global para capturar el último error de conexión
$GLOBALS['db_connection_error'] = null;

/**
 * Retorna la conexión PDO configurada a MySQL
 * Intenta conectar vía 127.0.0.1 (TCP directo) y fallback a localhost (Socket)
 */
function getDbConnection() {
    global $db_connection_error;
    
    // Probar tanto con 127.0.0.1 como con localhost para máxima compatibilidad con cPanel
    $hosts = ['127.0.0.1', 'localhost'];
    if (DB_HOST !== '127.0.0.1' && DB_HOST !== 'localhost') {
        array_unshift($hosts, DB_HOST);
    }

    foreach ($hosts as $host) {
        $dsn = "mysql:host=" . $host . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_TIMEOUT => 3,
            ]);
            return $pdo;
        } catch (PDOException $e) {
            $db_connection_error = $e->getMessage();
            error_log("Error de conexión a DB [$host]: " . $e->getMessage());
        }
    }
    
    return null;
}
?>
