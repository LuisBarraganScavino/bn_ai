import type { Metadata } from "next";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trámites BN | Banco de la Nación",
  description: "Trámites seguros sin fricción del Banco de la Nación",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased font-sans bg-bnGray text-gray-900 min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col">
          {children}
        </div>
        
        {/* Footer Institucional Clone */}
        <footer className="w-full bg-white border-t border-gray-200 py-8 px-6 text-center text-xs md:text-sm text-gray-500 mt-auto">
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            <img src="/BANCO DE LA NACION-Photoroom.png" alt="BN Logo" className="h-10 md:h-12 w-auto grayscale opacity-60 mb-4" />
            <p className="mb-2 font-medium">© 2026 Banco de la Nación. Todos los derechos reservados.</p>
            <p>Atención al cliente: Línea gratuita 0800-10-700 | Central Telefónica: 519-2000</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
