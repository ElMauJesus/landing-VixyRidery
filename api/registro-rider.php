<?php
// Permitir CORS para que el frontend pueda comunicarse
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Si es una solicitud OPTIONS (preflight), terminar aquí
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Verificar que sea POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
    exit;
}

// Cargar módulos de configuración y seguridad
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/security.php';

// Obtener conexión a la base de datos
$pdo = getDbConnection();

if (!$pdo) {
    http_response_code(500);
    echo json_encode([
        "success" => false, 
        "message" => "Error de conexión a la base de datos. Por favor verifica las credenciales o el estado del servidor remoto."
    ]);
    exit;
}

// Función para generar código único del rider
function generateRiderCode() {
    $fecha = date('Ymd');
    $random = strtoupper(substr(bin2hex(random_bytes(4)), 0, 8));
    return "VX-$fecha-$random";
}

// Función para guardar archivos con prefijo único
function saveFileWithCode($file, $folder, $prefijo) {
    $uploadDir = __DIR__ . "/../uploads/drivers/$folder/";
    
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    
    $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $filename = $prefijo . '.' . $extension;
    $destination = $uploadDir . $filename;
    
    if (move_uploaded_file($file['tmp_name'], $destination)) {
        return "/uploads/drivers/$folder/$filename";
    }
    
    return null;
}

// Recibir y sanitizar datos del formulario
$nombre = sanitize_input($_POST['nombre'] ?? '');
$apellido = sanitize_input($_POST['apellido'] ?? '');
$cedula = sanitize_input($_POST['cedula'] ?? '');
$email = validate_email($_POST['email'] ?? '');
$telefono = sanitize_input($_POST['telefono'] ?? '');
$tipoVehiculo = sanitize_input($_POST['tipo_vehiculo'] ?? 'moto');
$modeloVehiculo = sanitize_input($_POST['modelo_vehiculo'] ?? '');
$marcaVehiculo = sanitize_input($_POST['marca_vehiculo'] ?? '');
$yearVehiculo = sanitize_input($_POST['year_vehicle'] ?? '');
$colorVehiculo = sanitize_input($_POST['color_vehiculo'] ?? '');
$placa = sanitize_input($_POST['placa'] ?? '');
$metodoPago = sanitize_input($_POST['metodo_pago'] ?? '');
$referenciaPago = sanitize_input($_POST['referencia_pago'] ?? '');

// Validar campos requeridos
if (empty($nombre) || empty($apellido) || empty($cedula) || empty($email) || empty($telefono)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Faltan campos obligatorios"]);
    exit;
}

// Validar archivos subidos
$requiredFiles = ['selfie', 'licencia', 'rcv', 'cert_medico', 'foto_vehiculo'];
foreach ($requiredFiles as $field) {
    if (!isset($_FILES[$field]) || $_FILES[$field]['error'] === UPLOAD_ERR_NO_FILE) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Falta el archivo: $field"]);
        exit;
    }
    
    $check = validate_file_upload($_FILES[$field]);
    if (!$check['valid']) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => $check['message']]);
        exit;
    }
}

// Generar código único del rider
$riderCode = generateRiderCode();

// Guardar archivos con código único
$selfieUrl = saveFileWithCode($_FILES['selfie'], 'selfies', $riderCode . '-selfie');
$licenciaUrl = saveFileWithCode($_FILES['licencia'], 'licencias', $riderCode . '-licencia');
$rcvUrl = saveFileWithCode($_FILES['rcv'], 'rcv', $riderCode . '-rcv');
$certMedicoUrl = saveFileWithCode($_FILES['cert_medico'], 'certificados', $riderCode . '-certificado');
$fotoVehiculoUrl = saveFileWithCode($_FILES['foto_vehiculo'], 'vehiculos', $riderCode . '-vehiculo');

// Generar ID único
$id = uniqid('drv_', true);

// Preparar la consulta SQL
$sql = "INSERT INTO drivers (
    id, rider_code, name, email, phone, category, status,
    metodo_pago, referencia_pago,
    doc_cedula_url, doc_cedula_number,
    doc_licencia_url,
    doc_certificado_medico_url,
    doc_rcv_url,
    doc_foto_vehiculo_url,
    doc_plate_number,
    doc_vehicle_model,
    doc_vehiculo_marca,
    doc_vehicle_color,
    doc_vehicle_year,
    profile_photo_url,
    registered_at
) VALUES (
    :id, :rider_code, :name, :email, :phone, :category, 'pendiente',
    :metodo_pago, :referencia_pago,
    :doc_cedula_url, :doc_cedula_number,
    :doc_licencia_url,
    :doc_certificado_medico_url,
    :doc_rcv_url,
    :doc_foto_vehiculo_url,
    :doc_plate_number,
    :doc_vehicle_model,
    :doc_vehiculo_marca,
    :doc_vehicle_color,
    :doc_vehicle_year,
    :profile_photo_url,
    CURDATE()
)";

try {
    $stmt = $pdo->prepare($sql);
    
    $stmt->execute([
        'id' => $id,
        'rider_code' => $riderCode,
        'name' => $nombre . ' ' . $apellido,
        'email' => $email,
        'phone' => $telefono,
        'category' => $tipoVehiculo === 'carro' ? 'taxi' : 'mototaxi',
        'metodo_pago' => !empty($metodoPago) ? $metodoPago : null,
        'referencia_pago' => !empty($referenciaPago) ? $referenciaPago : null,
        'doc_cedula_url' => null,
        'doc_cedula_number' => !empty($cedula) ? $cedula : null,
        'doc_licencia_url' => $licenciaUrl,
        'doc_certificado_medico_url' => $certMedicoUrl,
        'doc_rcv_url' => $rcvUrl,
        'doc_foto_vehiculo_url' => $fotoVehiculoUrl,
        'doc_plate_number' => !empty($placa) ? $placa : null,
        'doc_vehicle_model' => !empty($modeloVehiculo) ? $modeloVehiculo : null,
        'doc_vehiculo_marca' => !empty($marcaVehiculo) ? $marcaVehiculo : null,
        'doc_vehicle_color' => !empty($colorVehiculo) ? $colorVehiculo : null,
        'doc_vehicle_year' => !empty($yearVehiculo) ? $yearVehiculo : null,
        'profile_photo_url' => $selfieUrl,
    ]);
    
    http_response_code(201);
    echo json_encode([
        "success" => true,
        "message" => "Registro exitoso",
        "driver_id" => $id,
        "rider_code" => $riderCode
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Error al guardar"]);
}
?>