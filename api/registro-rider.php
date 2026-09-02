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

// Cargar módulo de seguridad
require_once __DIR__ . '/security.php';

// Configuración de la base de datos
$host = 'localhost';
$dbname = 'vhixvfhf_vixy_admin';
$username = 'root';  // Cambia si usas otro usuario
$password = '';      // Cambia si tienes contraseña

// Conexión a la base de datos
try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Error de conexión: " . $e->getMessage()]);
    exit;
}

// Función para guardar archivos
function saveFile($file, $folder) {
    $uploadDir = __DIR__ . "/../uploads/drivers/$folder/";
    
    // Crear carpeta si no existe
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    
    // Generar nombre único
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid() . '_' . time() . '.' . $extension;
    $destination = $uploadDir . $filename;
    
    // Mover archivo
    if (move_uploaded_file($file['tmp_name'], $destination)) {
        return "/uploads/drivers/$folder/$filename";
    }
    
    return null;
}

// Recibir datos del formulario
$nombre = $_POST['nombre'] ?? '';
$apellido = $_POST['apellido'] ?? '';
$cedula = $_POST['cedula'] ?? '';
$email = $_POST['email'] ?? '';
$telefono = $_POST['telefono'] ?? '';
$tipoVehiculo = $_POST['tipo_vehiculo'] ?? 'moto';
$modeloVehiculo = $_POST['modelo_vehiculo'] ?? '';
$marcaVehiculo = $_POST['marca_vehiculo'] ?? '';
$colorVehiculo = $_POST['color_vehiculo'] ?? '';
$placa = $_POST['placa'] ?? '';
$metodoPago = $_POST['metodo_pago'] ?? '';
$referenciaPago = $_POST['referencia_pago'] ?? '';

// Validar campos requeridos
if (empty($nombre) || empty($apellido) || empty($cedula) || empty($email) || empty($telefono)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Faltan campos obligatorios"]);
    exit;
}

// Guardar archivos
$selfieUrl = isset($_FILES['selfie']) ? saveFile($_FILES['selfie'], 'selfies') : null;
$licenciaUrl = isset($_FILES['licencia']) ? saveFile($_FILES['licencia'], 'licencias') : null;
$rcvUrl = isset($_FILES['rcv']) ? saveFile($_FILES['rcv'], 'rcv') : null;
$certMedicoUrl = isset($_FILES['cert_medico']) ? saveFile($_FILES['cert_medico'], 'certificados') : null;
$fotoVehiculoUrl = isset($_FILES['foto_vehiculo']) ? saveFile($_FILES['foto_vehiculo'], 'vehiculos') : null;

// Generar ID único
$id = uniqid('drv_', true);

// Preparar la consulta SQL
$sql = "INSERT INTO drivers (
    id, name, email, phone, category, status,
    doc_cedula_url, doc_cedula_number,
    doc_licencia_url,
    doc_certificado_medico_url,
    doc_rcv_url,
    doc_foto_vehiculo_url,
    doc_plate_number,
    doc_vehicle_model,
    doc_vehicle_color,
    profile_photo_url,
    registered_at
) VALUES (
    :id, :name, :email, :phone, :category, 'pendiente',
    :doc_cedula_url, :doc_cedula_number,
    :doc_licencia_url,
    :doc_certificado_medico_url,
    :doc_rcv_url,
    :doc_foto_vehiculo_url,
    :doc_plate_number,
    :doc_vehicle_model,
    :doc_vehicle_color,
    :profile_photo_url,
    CURDATE()
)";

try {
    $stmt = $pdo->prepare($sql);
    
    $stmt->execute([
        'id' => $id,
        'name' => $nombre . ' ' . $apellido,
        'email' => $email,
        'phone' => $telefono,
        'category' => $tipoVehiculo === 'carro' ? 'taxi' : 'mototaxi',
        'doc_cedula_url' => null,
        'doc_cedula_number' => !empty($cedula) ? $cedula : null,
        'doc_licencia_url' => $licenciaUrl,
        'doc_certificado_medico_url' => $certMedicoUrl,
        'doc_rcv_url' => $rcvUrl,
        'doc_foto_vehiculo_url' => $fotoVehiculoUrl,
        'doc_plate_number' => !empty($placa) ? $placa : null,
        'doc_vehicle_model' => !empty($modeloVehiculo) ? $modeloVehiculo : null,
        'doc_vehicle_color' => !empty($colorVehiculo) ? $colorVehiculo : null,
        'profile_photo_url' => $selfieUrl,
    ]);
    
    http_response_code(201);
    echo json_encode([
        "success" => true,
        "message" => "Registro exitoso",
        "driver_id" => $id
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Error al guardar: " . $e->getMessage()]);
}
?>