import type { Metadata, Viewport } from "next";
import { I18nProvider } from "@/components/I18nProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "CobroLibre · Pey Cobros",
  description:
    "Cobros CoDi para PyMEs: QR dinámico Pey, link para compartir y confirmación en vivo. Identidad CobroLibre.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B6B4F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body className="antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
