import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro de Rider | Vixy Rider",
  description: "Regístrate como rider y sé uno de los primeros en conducir con Vixy Rider. Gana dinero haciendo lo que te gusta.",
};

export default function RegistroRiderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
