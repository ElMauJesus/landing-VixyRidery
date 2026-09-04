-- Estructura de tabla drivers para la base de datos MySQL / MariaDB (cPanel)

CREATE TABLE IF NOT EXISTS `drivers` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `rider_code` VARCHAR(50) DEFAULT NULL,
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
  `doc_vehicle_year` VARCHAR(10) DEFAULT NULL,
  `profile_photo_url` VARCHAR(500) DEFAULT NULL,
  `registered_at` DATE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- En caso de que la tabla ya exista pero le falten columnas:
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `rider_code` VARCHAR(50) DEFAULT NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `metodo_pago` VARCHAR(50) DEFAULT NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `referencia_pago` VARCHAR(100) DEFAULT NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `doc_cedula_url` VARCHAR(500) DEFAULT NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `doc_cedula_number` VARCHAR(50) DEFAULT NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `doc_licencia_url` VARCHAR(500) DEFAULT NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `doc_certificado_medico_url` VARCHAR(500) DEFAULT NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `doc_rcv_url` VARCHAR(500) DEFAULT NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `doc_foto_vehiculo_url` VARCHAR(500) DEFAULT NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `doc_plate_number` VARCHAR(50) DEFAULT NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `doc_vehicle_model` VARCHAR(100) DEFAULT NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `doc_vehiculo_marca` VARCHAR(100) DEFAULT NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `doc_vehicle_color` VARCHAR(50) DEFAULT NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `doc_vehicle_year` VARCHAR(10) DEFAULT NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `profile_photo_url` VARCHAR(500) DEFAULT NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP;


