import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vixy Rider - Viaja Rápido, Viaja Seguro",
  description:
    "La plataforma de movilidad que conecta pasajeros y riders para que llegues siempre a tu destino de forma rápida, económica y segura.",
  keywords: [
    "Vixy Rider",
    "movilidad",
    "moto taxi",
    "viajes en moto",
    "pasajeros",
    "riders",
    "transporte rápido",
    "ganar dinero rider",
  ],
  authors: [{ name: "Vixy Team" }],
  openGraph: {
    title: "Vixy Rider - Viaja Rápido, Viaja Seguro",
    description:
      "La plataforma de movilidad que conecta pasajeros y riders para que llegues siempre a tu destino.",
    url: "https://vixyrider.com",
    siteName: "Vixy Rider",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
