/**
 * postbuild.js
 * Renombra _next → next-static en la carpeta out/
 * y actualiza todas las referencias en HTML, JS y CSS.
 * Necesario para Namecheap/cPanel que bloquea carpetas con guión bajo.
 */

const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(__dirname, "..", "out");
const OLD_DIR = path.join(OUT_DIR, "_next");
const NEW_DIR = path.join(OUT_DIR, "next-static");
const OLD_PREFIX = "/_next/";
const NEW_PREFIX = "/next-static/";

// Extensiones de archivos donde reemplazaremos el texto
const TEXT_EXTENSIONS = [".html", ".js", ".css", ".json", ".txt", ".map"];

function walkDir(dir, callback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  }
}

function replaceInFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!TEXT_EXTENSIONS.includes(ext)) return;

  const content = fs.readFileSync(filePath, "utf8");
  if (!content.includes(OLD_PREFIX)) return;

  const updated = content.split(OLD_PREFIX).join(NEW_PREFIX);
  fs.writeFileSync(filePath, updated, "utf8");
  console.log(`  ✔ Actualizado: ${path.relative(OUT_DIR, filePath)}`);
}

// 1. Renombrar _next → next-static
if (fs.existsSync(NEW_DIR)) {
  fs.rmSync(NEW_DIR, { recursive: true });
}
if (fs.existsSync(OLD_DIR)) {
  fs.renameSync(OLD_DIR, NEW_DIR);
  console.log("✔ Carpeta renombrada: _next → next-static");
} else {
  console.error("✗ Error: no se encontró la carpeta _next en out/");
  process.exit(1);
}

// 2. Reemplazar todas las referencias /_next/ → /next-static/ en los archivos
console.log("Actualizando referencias en archivos…");
walkDir(OUT_DIR, replaceInFile);

console.log("\n✅ postbuild.js completado. La carpeta out/ está lista para cPanel.");
