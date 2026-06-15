"use client";

import { useState, useEffect, useRef } from 'react';
import { DoubleTouchButton } from '@/components/DoubleTouchButton';
import { useParams, useRouter } from 'next/navigation';

const GUIDES: Record<string, { title: string; icon: string; steps: string[] }> = {
  prestamo: {
    title: 'Trámite de Préstamos MultiRed',
    icon: '💳',
    steps: [
      "Paso 1: ¡Evita colas! Ahora puedes solicitar tu Préstamo de forma digital y segura desde tu hogar.",
      "Paso 2: Ingresa a la Banca por Internet oficial buscando la dirección bancaporinternet.bn.com.pe en tu navegador de confianza.",
      "Paso 3: Recuerda que para ingresar a la Banca por Internet necesitarás tu tarjeta MultiRed y tu clave secreta de internet.",
      "Paso 4: Una vez dentro, busca la sección de Préstamos y simula tu monto. El dinero aprobado será depositado de inmediato y con total seguridad en tu cuenta."
    ]
  },
  onp: {
    title: 'Trámite de Retiro de Pensión',
    icon: '👴',
    steps: [
      "Paso 1: Cobrar tu pensión es más seguro desde casa. No es necesario que te expongas yendo físicamente al banco.",
      "Paso 2: Usa la Banca por Internet oficial ingresando a bancaporinternet.bn.com.pe desde tu computadora o celular.",
      "Paso 3: Podrás consultar tu saldo gratis y realizar transferencias o pagos de servicios sin gastar en transporte ni hacer largas colas.",
      "Paso 4: Recuerda: El Banco de la Nación nunca te pedirá tus claves por teléfono ni por correo electrónico. Mantén tus claves siempre en privado."
    ]
  },
  cronograma: {
    title: 'Información del Cronograma de Pagos',
    icon: '📅',
    steps: [
      "Paso 1: Conocer tu fecha de pago es muy sencillo y puedes hacerlo por internet sin salir a la calle.",
      "Paso 2: Toda la información oficial de fechas de pago está publicada en el portal oficial del banco en www.bn.com.pe.",
      "Paso 3: Para tu comodidad, si tu DNI termina en cero o uno, cobras el Lunes siete. Si termina en dos o tres, cobras el Martes ocho.",
      "Paso 4: Si tu DNI termina en cuatro o cinco, cobras el Miércoles nueve. Y si termina en seis, siete, ocho o nueve, cobras el Jueves diez de este mes.",
      "Paso 5: Recuerda que puedes ver este calendario completo ingresando a www.bn.com.pe en la sección de campañas y pagos."
    ]
  },
  bonos: {
    title: 'Información de Ayudas y Bonos',
    icon: '🤝',
    steps: [
      "Paso 1: No vayas al banco a preguntar por bonos. Evitemos las aglomeraciones buscando la información oficial por internet.",
      "Paso 2: Para informarte de forma segura sobre los bonos activos como Fonavi o ayuda social, ingresa al portal del banco en www.bn.com.pe.",
      "Paso 3: Allí encontrarás los enlaces directos y seguros a las páginas de consulta del Estado donde solo con tu DNI podrás saber si eres beneficiario.",
      "Paso 4: Consejo de seguridad: El banco nunca envía enlaces de bonos por mensajes de texto sospechosos. Infórmate siempre desde www.bn.com.pe."
    ]
  }
};

export default function TramitePage() {
  const params = useParams();
  const router = useRouter();
  const tipoTramite = (params?.tipo as string) || 'onp';
  const guideData = GUIDES[tipoTramite] || GUIDES['onp'];

  const isTramite = tipoTramite === 'prestamo' || tipoTramite === 'onp';
  const actionLink = isTramite ? 'https://bancaporinternet.bn.com.pe/' : 'https://www.bn.com.pe/';
  const linkLabel = isTramite ? 'Ir a la Banca por Internet' : 'Ir al Portal www.bn.com.pe';

  const [isStarted, setIsStarted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  const readAloud = (text: string) => {
    if (synthRef.current) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-PE';
      utterance.rate = 0.85; // Paused rate for adult mayor comprehension
      
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      synthRef.current.speak(utterance);
    }
  };

  const handleStart = () => {
    setIsStarted(true);
    readAloud(guideData.steps[0]);
  };

  const handleNextStep = () => {
    if (currentStepIndex < guideData.steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      readAloud(guideData.steps[nextIndex]);
    } else {
      setIsFinished(true);
      const finishMessage = isTramite 
        ? "Has terminado la guía. Ya estás listo para ingresar a la Banca por Internet de forma segura presionando el botón rojo de abajo."
        : "Has terminado la guía. Ya estás listo para ingresar al portal oficial del banco para informarte presionando el botón azul de abajo.";
      readAloud(finishMessage);
    }
  };

  const handleRepeatAudio = () => {
    readAloud(guideData.steps[currentStepIndex]);
  };

  if (!isStarted) {
    return (
      <main className="flex-grow flex flex-col items-center justify-start md:justify-center p-4 pt-12 md:p-12 relative overflow-hidden bg-[#f8fafc]">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-gradient-to-b from-[#1d2b4a]/10 to-transparent rounded-full blur-[100px] pointer-events-none"></div>

        <div className="z-10 w-full max-w-2xl bg-white rounded-[32px] shadow-premium p-8 md:p-14 text-center border border-gray-100/80 animate-fade-in relative overflow-hidden">
          {/* Accent border bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-[#1d2b4a] to-blue-600"></div>

          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-50 rounded-[24px] border border-gray-100 shadow-sm text-5xl mb-6 transform hover:rotate-12 transition-transform duration-300">
            {guideData.icon}
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-[#1d2b4a] mb-6 tracking-tight leading-tight">
            {guideData.title}
          </h1>
          
          <p className="text-lg md:text-xl mb-10 text-gray-500 font-semibold max-w-md mx-auto leading-relaxed">
            Te guiaremos paso a paso para realizarlo por internet sin salir de casa. Toca el botón una vez para escuchar de qué trata, y <span className="text-[#1d2b4a] font-bold underline decoration-red-500 decoration-2">tócalo dos veces</span> para empezar.
          </p>
          
          <div className="flex justify-center mb-6">
            <DoubleTouchButton 
              label="Iniciar Guía por Voz"
              actionDescription={`Botón para iniciar la ${guideData.title}. Toca una vez más para empezar a escuchar los pasos de forma segura.`}
              onClick={handleStart}
            />
          </div>

          <button 
            onClick={() => router.push('/')} 
            className="text-gray-400 hover:text-[#1d2b4a] font-extrabold text-lg flex items-center justify-center gap-2 mx-auto pt-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a Operaciones
          </button>
        </div>
      </main>
    );
  }

  if (isFinished) {
    return (
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center bg-[#f8fafc] relative overflow-hidden">
        <div className="w-full max-w-xl bg-gradient-to-b from-emerald-50/50 to-white rounded-[32px] shadow-2xl p-10 md:p-14 border border-emerald-100 animate-fade-in relative">
          <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/30 transform scale-110">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black text-emerald-950 mb-4 tracking-tight">¡Estás Listo!</h2>
          
          <p className="text-lg md:text-xl text-emerald-800 font-semibold mb-10 leading-relaxed max-w-md mx-auto">
            {isTramite 
              ? "Ya sabes cómo usar la Banca por Internet con total seguridad. Presiona el botón de abajo para ir al portal seguro de trámites."
              : "Ya sabes cómo informarte de forma segura por internet. Presiona el botón de abajo para ir al portal oficial de información."}
          </p>

          <div className="flex flex-col gap-4 w-full">
            <a 
              href={actionLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => readAloud(`Redirigiendo de forma segura a ${isTramite ? 'la banca por internet' : 'el portal de información'} del Banco de la Nación.`)}
              className={`w-full text-white text-2xl font-black py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform active:scale-[0.98] border border-white/10 flex items-center justify-center gap-2 ${
                isTramite ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {linkLabel}
            </a>

            <button 
              onClick={() => router.push('/')} 
              className="w-full bg-gray-100 hover:bg-gray-200 text-[#1d2b4a] text-xl font-bold py-5 rounded-2xl transition-all"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </main>
    );
  }

  const progressPercentage = ((currentStepIndex + 1) / guideData.steps.length) * 100;

  return (
    <main className="flex-grow flex flex-col items-center justify-start p-4 pt-12 md:p-12 relative bg-[#f8fafc]">
      <div className="w-full max-w-2xl bg-white rounded-[32px] shadow-premium overflow-hidden border border-gray-100/90 flex flex-col min-h-[65vh] animate-fade-in relative">
        
        {/* Sleek Glowing Progress Bar */}
        <div className="w-full bg-gray-100 h-3 relative">
          <div 
            className="bg-gradient-to-r from-red-600 to-red-500 h-3 transition-all duration-500 shadow-[0_2px_10px_rgba(227,6,19,0.3)]" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="p-8 md:p-12 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 mb-10">
              <span className="bg-red-50 text-red-600 font-extrabold text-base md:text-lg px-4 py-2 rounded-xl border border-red-100">
                Paso {currentStepIndex + 1} de {guideData.steps.length}
              </span>
              
              <button 
                onClick={handleRepeatAudio}
                className="bg-[#1d2b4a] hover:bg-[#152037] text-white p-3.5 px-6 rounded-2xl transition-all flex items-center gap-3 font-extrabold shadow-md hover:shadow-lg active:scale-[0.97]"
              >
                <svg className="w-6 h-6 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
                Repetir por Voz
              </button>
            </div>

            {/* Audio wave effect when speaking */}
            <div className="h-10 flex items-center gap-1.5 mb-8">
              {isPlayingAudio ? (
                <>
                  <span className="text-xs text-red-600 font-bold uppercase tracking-wider mr-2">Hablando:</span>
                  <div className="w-1.5 h-6 bg-red-600 rounded-full animate-[pulse_0.8s_infinite]"></div>
                  <div className="w-1.5 h-10 bg-red-600 rounded-full animate-[pulse_0.6s_infinite_0.1s]"></div>
                  <div className="w-1.5 h-8 bg-red-600 rounded-full animate-[pulse_0.7s_infinite_0.2s]"></div>
                  <div className="w-1.5 h-12 bg-red-600 rounded-full animate-[pulse_0.5s_infinite_0.3s]"></div>
                  <div className="w-1.5 h-6 bg-red-600 rounded-full animate-[pulse_0.8s_infinite_0.4s]"></div>
                </>
              ) : (
                <>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mr-2">Audio listo</span>
                  <div className="w-1.5 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-1.5 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-1.5 h-2 bg-gray-300 rounded-full"></div>
                </>
              )}
            </div>

            {/* Main Step Text - Highly readable, elegant design */}
            <p className="text-3xl md:text-4xl font-extrabold text-[#1d2b4a] leading-snug tracking-tight mb-10">
              {guideData.steps[currentStepIndex]}
            </p>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col gap-4">
            <button 
              onClick={handleNextStep}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-3xl font-black py-7 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-red-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-4 border border-red-500/20"
            >
              Siguiente Paso
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button 
              onClick={() => router.push('/')} 
              className="text-gray-400 hover:text-gray-600 font-bold text-base flex items-center justify-center gap-1.5 py-2 transition-colors"
            >
              Salir de la guía
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
