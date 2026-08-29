import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "5rem 1rem" }}>
      <h2>Página no encontrada</h2>
      <p style={{ marginTop: "1rem" }}>La página que buscas no existe.</p>
      <Link href="/" style={{ color: "#5E17EB", marginTop: "1.5rem", display: "inline-block", fontWeight: "bold" }}>
        Volver al inicio
      </Link>
    </div>
  );
}
