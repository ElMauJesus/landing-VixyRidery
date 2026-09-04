/**
 * Utilidades de seguridad y sanitización para el frontend de Vixy Rider
 * Previene inyección HTML/XSS y valida archivos antes del envío al backend.
 */

// Extensiones permitidas para carga de documentos e imágenes
export const ALLOWED_FILE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "pdf"];
export const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB

/**
 * Sanitiza una cadena de texto para eliminar posibles etiquetas HTML / scripts maliciosos.
 */
export function sanitizeString(str: string): string {
  if (typeof str !== "string") return "";
  return str
    .trim()
    .replace(/<[^>]*>?/gm, "") // Elimina cualquier etiqueta HTML (<script>, <iframe>, etc.)
    .replace(/[<>'"]/g, (char) => {
      // Codifica caracteres peligrosos
      switch (char) {
        case "<": return "&lt;";
        case ">": return "&gt;";
        case "'": return "&#39;";
        case '"': return "&quot;";
        default: return char;
      }
    });
}

/**
 * Valida un archivo seleccionado por el usuario antes de ser enviado.
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  if (!file) return { valid: false, error: "No se seleccionó ningún archivo." };

  // Validar tamaño máximo
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `El archivo "${file.name}" supera el tamaño máximo permitido (15 MB).`,
    };
  }

  // Validar extensión
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  if (!ALLOWED_FILE_EXTENSIONS.includes(extension)) {
    return {
      valid: false,
      error: `Formato no permitido en "${file.name}". Solo se aceptan: JPG, PNG, WEBP y PDF.`,
    };
  }

  return { valid: true };
}
