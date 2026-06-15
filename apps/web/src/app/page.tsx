"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex-grow bg-bnGray flex flex-col w-full overflow-x-hidden">
      {/* Mobile-First Hero Section */}
      <section className="w-full bg-bnBlue text-white pt-8 pb-16 px-4 md:px-12 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-xl">
            <span className="bg-bnRed text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide mb-4 inline-block">Plataforma CrediNación</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
              El Banco de todos,<br />ahora más cerca de ti
            </h1>
            <p className="text-lg text-blue-100 mb-8 max-w-md">
              Aprende cómo gestionar tu pensión, conoce los requisitos para préstamos y revisa cronogramas sin salir de casa, guiado paso a paso por voz.
            </p>
            <a 
              href="https://t.me/CrediNacion_bot" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white text-bnBlue font-bold text-lg py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-3 w-full md:w-fit active:scale-95 transition-transform"
            >
              <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              Usar Asistente de Telegram
            </a>
          </div>
        </div>
        
        {/* Decoración Curva */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[30px] md:h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,115.1,188.75,99.43c52.6-14.23,103.3-36.5,155-47.5" fill="#f4f5f7"></path>
          </svg>
        </div>
      </section>

      {/* Tarjetas de Acceso Rápido (Mobile First Grid) */}
      <section className="px-4 py-6 -mt-10 z-20 relative max-w-6xl mx-auto w-full">
        <h2 className="text-xl md:text-2xl font-bold text-bnBlue mb-4 px-2">Operaciones Frecuentes</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1 */}
          <Link href="/tramite/onp" className="bg-white rounded-2xl p-5 shadow-premium border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <div className="bg-red-50 p-3 rounded-xl text-bnRed flex-shrink-0">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-[17px] leading-tight">Guía de Pensión</h3>
              <p className="text-sm text-gray-500 mt-1">Trámites ONP</p>
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/tramite/prestamo" className="bg-white rounded-2xl p-5 shadow-premium border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <div className="bg-blue-50 p-3 rounded-xl text-bnBlue flex-shrink-0">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-[17px] leading-tight">Info Préstamos</h3>
              <p className="text-sm text-gray-500 mt-1">Conoce los requisitos</p>
            </div>
          </Link>

          {/* Card 3 (Informativa) */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 opacity-90">
            <div className="bg-gray-100 p-3 rounded-xl text-gray-600 flex-shrink-0">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-[17px] leading-tight">Cronograma</h3>
              <p className="text-sm text-gray-500 mt-1">Fechas de pago</p>
            </div>
          </div>
          
          {/* Card 4 (Informativa) */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 opacity-90">
            <div className="bg-gray-100 p-3 rounded-xl text-gray-600 flex-shrink-0">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-[17px] leading-tight">Bonos del Estado</h3>
              <p className="text-sm text-gray-500 mt-1">Consultas sociales</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Banner Informativo (Mobile First) */}
      <section className="px-4 py-8 mb-4 max-w-6xl mx-auto w-full">
        <div className="bg-bnBlue rounded-[32px] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-premium">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Evita largas colas</h2>
            <p className="text-blue-100 text-lg">
              Nuestra nueva interfaz te guía por voz. Envía audios a nuestro Bot y te llevaremos a páginas de un solo botón pensadas para ti.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-full flex-shrink-0">
             <svg className="w-16 h-16 text-bnRed" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V8z"/></svg>
          </div>
        </div>
      </section>
    </main>
  );
}
