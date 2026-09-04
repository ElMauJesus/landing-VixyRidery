<?php
/**
 * Diagnóstico de conexión a MySQL
 * Acceder desde el navegador: https://vixy.cc/api/test_db.php
 */
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/config.php';

$pdo = getDbConnection();

if ($pdo) {
    // Probar si la tabla drivers existe
    $tables = [];
    try {
        $stmt = $pdo->query("SHOW TABLES");
        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    } catch (Exception $e) {}

    echo json_encode([
        "success" => true,
        "message" => "Conexión a la base de datos EXITOSA",
        "database" => DB_NAME,
        "user" => DB_USER,
        "tablas_encontradas" => $tables
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Fallo de conexión a la base de datos",
        "error_tecnico" => $GLOBALS['db_connection_error'],
        "datos_usados" => [
            "database" => DB_NAME,
            "user" => DB_USER,
            "host_probados" => ["127.0.0.1", "localhost"],
            "port" => DB_PORT
        ],
        "ayuda" => "Si dice 'Access denied for user', debes ir a cPanel > Bases de datos MySQL y verificar que el usuario y la contraseña existan y estén asignados a la base de datos con TODOS LOS PRIVILEGIOS."
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}
?>
