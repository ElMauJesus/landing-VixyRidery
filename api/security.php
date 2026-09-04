<?php
/**
 * Módulo de Seguridad y Sanitización para la API de Vixy Rider
 * Previene inyección SQL (mediante PDO sanitizado), Inyección HTML/XSS y cargas de archivos maliciosos.
 */

// Evitar acceso directo al archivo de seguridad
if (basename($_SERVER['PHP_SELF']) == 'security.php') {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Acceso no permitido"]);
    exit;
}

/**
 * Sanitiza una entrada de texto limpia contra HTML/XSS
 */
function sanitize_input($data) {
    if (is_array($data)) {
        return array_map('sanitize_input', $data);
    }
    if ($data === null) return '';
    $data = trim($data);
    $data = strip_tags($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Valida si un email tiene un formato correcto
 */
function validate_email($email) {
    $cleanEmail = filter_var(trim($email), FILTER_SANITIZE_EMAIL);
    return filter_var($cleanEmail, FILTER_VALIDATE_EMAIL) ? $cleanEmail : false;
}

/**
 * Valida un archivo subido para prevenir subida de scripts maliciosos (.php, .sh, .exe, etc.)
 */
function validate_file_upload($file, $maxSizeMB = 15) {
    if (!isset($file['error']) || is_array($file['error'])) {
        return ["valid" => false, "message" => "Parámetros de archivo no válidos"];
    }

    if ($file['error'] !== UPLOAD_ERR_OK) {
        return ["valid" => false, "message" => "Error en la subida del archivo"];
    }

    // Validar tamaño máximo (en bytes)
    if ($file['size'] > $maxSizeMB * 1024 * 1024) {
        return ["valid" => false, "message" => "El archivo supera el tamaño máximo permitido de {$maxSizeMB}MB"];
    }

    // Extensiones estrictamente permitidas
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'pdf'];
    $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

    if (!in_array($extension, $allowedExtensions)) {
        return ["valid" => false, "message" => "Formato de archivo no permitido. Extensión recibida: .$extension"];
    }

    // Validar MIME type real con finfo si está disponible
    $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (function_exists('finfo_open')) {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);

        if (!in_array($mimeType, $allowedMimeTypes)) {
            return ["valid" => false, "message" => "Tipo MIME de archivo no válido: $mimeType"];
        }
    }

    return ["valid" => true];
}
?>
