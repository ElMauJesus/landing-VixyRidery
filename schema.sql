-- Estructura de tabla drivers para la base de datos MySQL

CREATE TABLE IF NOT EXISTS `drivers` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `category` VARCHAR(50) NOT NULL DEFAULT 'mototaxi',
  `status` VARCHAR(50) NOT NULL DEFAULT 'pendiente',
  `metodo_pago` VARCHAR(50) DEFAULT NULL,
  `referencia_pago` VARCHAR(100) DEFAULT NULL,
  `doc_cedula_url` VARCHAR(500) DEFAULT NULL,
  `doc_cedula_number` VARCHAR(50) DEFAULT NULL,
  `doc_licencia_url` VARCHAR(500) DEFAULT NULL,
  `doc_certificado_medico_url` VARCHAR(500) DEFAULT NULL,
  `doc_rcv_url` VARCHAR(500) DEFAULT NULL,
  `doc_foto_vehiculo_url` VARCHAR(500) DEFAULT NULL,
  `doc_plate_number` VARCHAR(50) DEFAULT NULL,
  `doc_vehicle_model` VARCHAR(100) DEFAULT NULL,
  `doc_vehiculo_marca` VARCHAR(100) DEFAULT NULL,
  `doc_vehicle_color` VARCHAR(50) DEFAULT NULL,
  `profile_photo_url` VARCHAR(500) DEFAULT NULL,
  `registered_at` DATE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
