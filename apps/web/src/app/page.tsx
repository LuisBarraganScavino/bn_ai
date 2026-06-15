"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex-grow bg-[#f8fafc] flex flex-col w-full overflow-x-hidden">
      {/* Top Government Official Ribbon */}
      <div className="w-full bg-[#111827] text-gray-400 py-2 px-6 text-xs font-semibold flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
          <span className="tracking-wide uppercase text-gray-300">Plataforma Ciudadana Oficial</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-gray-500">|</span>
          <span className="text-gray-300">Banco de la Nación — Gobierno del Perú</span>
        </div>
      </div>

      {/* Immersive Modern Hero Section (Vercel/Linear Style tailored for Gob.pe) */}
      <section className="w-full bg-gradient-to-b from-[#1d2b4a] via-[#152037] to-[#111827] text-white pt-12 pb-24 px-4 md:px-12 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-red-600/10 to-transparent rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-600/20 to-transparent rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="bg-red-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wider mb-6 inline-flex items-center gap-1.5 shadow-[0_4px_12px_rgba(227,6,19,0.3)] border border-red-500/20">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              PLATAFORMA ACCESIBLE MULTIMODAL
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-300">
              El Banco de todos,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 font-black">ahora más cerca de ti</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
              Diseñado pensando en nuestros adultos mayores. Aprende cómo cobrar tu pensión, simula préstamos y consulta cronogramas guiado paso a paso por nuestro asistente de voz interactivo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a 
                href="https://t.me/CrediNacion_bot" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white text-[#1d2b4a] font-extrabold text-lg py-4.5 px-8 rounded-2xl shadow-[0_20px_40px_rgba(255,255,255,0.06)] flex items-center justify-center gap-3 w-full sm:w-fit hover:bg-gray-100 active:scale-[0.98] transition-all border border-white/20"
              >
                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
                Iniciar Bot de Telegram
              </a>

              <Link 
                href="/tramite/onp"
                className="bg-white/10 hover:bg-white/15 text-white font-bold text-lg py-4.5 px-8 rounded-2xl flex items-center justify-center gap-3 w-full sm:w-fit active:scale-[0.98] transition-all border border-white/10 backdrop-blur-md"
              >
                Probar Guía por Voz
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:flex justify-center relative">
            {/* Visual Glassmorphic Mockup */}
            <div className="w-[320px] h-[520px] rounded-[40px] bg-gradient-to-b from-white/10 to-white/5 border border-white/20 p-5 shadow-2xl relative backdrop-blur-xl flex flex-col justify-between">
              {/* Top Speaker & Camera details */}
              <div className="w-full flex justify-center mb-4">
                <div className="w-24 h-5 bg-[#111827] rounded-full flex items-center justify-center gap-1.5 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span className="w-8 h-1 bg-gray-600 rounded-full"></span>
                </div>
              </div>

              {/* Chat Bubble Simulation */}
              <div className="flex-grow flex flex-col justify-start gap-4 py-4 overflow-hidden">
                <div className="bg-white/10 border border-white/10 rounded-2xl p-4 text-xs max-w-[85%] self-start backdrop-blur-md text-gray-200">
                  ¡Hola! 👋 Soy Credi, tu asistente virtual. ¿En qué te ayudo hoy? 😊
                </div>
                
                <div className="bg-red-600/80 border border-red-500/20 rounded-2xl p-4 text-xs max-w-[85%] self-end text-white shadow-lg">
                  Quiero saber cuándo me toca cobrar mi pensión ONP 📅
                </div>

                <div className="bg-white/10 border border-white/10 rounded-2xl p-4 text-xs max-w-[90%] self-start backdrop-blur-md text-gray-200">
                  ¡Perfecto! Te he preparado una guía interactiva y segura que te hablará por voz:
                  <div className="mt-3 bg-white/20 p-2.5 rounded-xl border border-white/15 flex items-center justify-between gap-2">
                    <span className="font-bold underline text-blue-300">Abrir Cronograma</span>
                    <span>🔊</span>
                  </div>
                </div>
              </div>

              {/* Mic Icon indicator */}
              <div className="w-full flex flex-col items-center gap-2 pt-4 border-t border-white/10">
                <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_20px_rgba(227,6,19,0.5)] animate-pulse">
                  <span className="text-xl">🎙️</span>
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Modo Escucha Activo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Curved Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg className="relative block w-full h-[40px] md:h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,115.1,188.75,99.43c52.6-14.23,103.3-36.5,155-47.5" fill="#f8fafc"></path>
          </svg>
        </div>
      </section>

      {/* Main Operations Dashboard Section */}
      <section className="px-4 py-12 -mt-12 z-20 relative max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8 px-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1d2b4a] tracking-tight">
              Directorio de Trámites y Asistencia
            </h2>
            <p className="text-sm text-gray-500 mt-1 font-semibold">Toca cualquier tarjeta para iniciar tu trámite con asistencia por voz</p>
          </div>
          <span className="hidden md:inline-flex bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
            Canal Encriptado Seguro
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 - ONP */}
          <Link href="/tramite/onp" className="group bg-white rounded-3xl p-6 shadow-premium border border-gray-100 flex flex-col justify-between hover:border-red-600/30 hover:shadow-premium-hover transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-red-50 p-4 rounded-2xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-[11px] font-extrabold bg-red-100 text-red-800 px-2.5 py-1 rounded-full uppercase tracking-wider">Jubilados</span>
            </div>
            <div>
              <h3 className="font-extrabold text-[#1d2b4a] text-xl leading-tight group-hover:text-red-600 transition-colors">
                Guía de Pensión
              </h3>
              <p className="text-sm text-gray-500 mt-2 font-medium">Asistencia de cobro y trámites ONP paso a paso por voz.</p>
            </div>
          </Link>

          {/* Card 2 - Prestamos */}
          <Link href="/tramite/prestamo" className="group bg-white rounded-3xl p-6 shadow-premium border border-gray-100 flex flex-col justify-between hover:border-blue-600/30 hover:shadow-premium-hover transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-[11px] font-extrabold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full uppercase tracking-wider">Finanzas</span>
            </div>
            <div>
              <h3 className="font-extrabold text-[#1d2b4a] text-xl leading-tight group-hover:text-blue-600 transition-colors">
                Info Préstamos
              </h3>
              <p className="text-sm text-gray-500 mt-2 font-medium">Requisitos oficiales para acceder a préstamos MultiRed de forma segura.</p>
            </div>
          </Link>

          {/* Card 3 - Cronogramas */}
          <Link href="/tramite/cronograma" className="group bg-white rounded-3xl p-6 shadow-premium border border-gray-100 flex flex-col justify-between hover:border-green-600/30 hover:shadow-premium-hover transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-green-50 p-4 rounded-2xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-[11px] font-extrabold bg-green-100 text-green-800 px-2.5 py-1 rounded-full uppercase tracking-wider">Calendario</span>
            </div>
            <div>
              <h3 className="font-extrabold text-[#1d2b4a] text-xl leading-tight group-hover:text-green-600 transition-colors">
                Cronograma de Pagos
              </h3>
              <p className="text-sm text-gray-500 mt-2 font-medium">Consulta el calendario exacto de cobros mensual según tu número de DNI.</p>
            </div>
          </Link>
          
          {/* Card 4 - Bonos */}
          <Link href="/tramite/bonos" className="group bg-white rounded-3xl p-6 shadow-premium border border-gray-100 flex flex-col justify-between hover:border-amber-600/30 hover:shadow-premium-hover transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-amber-50 p-4 rounded-2xl text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-[11px] font-extrabold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full uppercase tracking-wider">Bonos</span>
            </div>
            <div>
              <h3 className="font-extrabold text-[#1d2b4a] text-xl leading-tight group-hover:text-amber-600 transition-colors">
                Ayudas y Bonos
              </h3>
              <p className="text-sm text-gray-500 mt-2 font-medium">Información y validación segura de beneficios sociales activos del Estado.</p>
            </div>
          </Link>
        </div>
      </section>
      
      {/* Zero Friction Safety Banner (Premium production level) */}
      <section className="px-4 py-8 mb-12 max-w-6xl mx-auto w-full">
        <div className="bg-gradient-to-r from-[#1d2b4a] to-[#121b2e] rounded-[32px] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="z-10 text-center md:text-left max-w-2xl">
            <span className="text-xs bg-red-600 text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">100% SEGURO</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">Evitemos colas y estafas</h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Toda la información proporcionada en CrediNación es completamente oficial y validada directamente por el Banco de la Nación. Nunca compartas tus claves secretas ni tu tarjeta de débito con extraños.
            </p>
          </div>
          <div className="z-10 bg-white/5 p-6 md:p-8 rounded-full border border-white/10 flex-shrink-0 flex items-center justify-center">
             <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
             </svg>
          </div>
        </div>
      </section>
    </main>
  );
}
