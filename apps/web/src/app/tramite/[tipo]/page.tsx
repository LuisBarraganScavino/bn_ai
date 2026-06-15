"use client";

import { useState, useEffect, useRef } from 'react';
import { DoubleTouchButton } from '@/components/DoubleTouchButton';
import { useParams, useRouter } from 'next/navigation';

const GUIDES: Record<string, { title: string; icon: string; steps: string[] }> = {
  prestamo: {
    title: 'Guía de Préstamos MultiRed',
    icon: '💳',
    steps: [
      "Paso 1: Reúne tus documentos. Necesitas tener a la mano tu DNI físico y original.",
      "Paso 2: Busca tu última boleta de pago de pensión. El banco la necesitará para calcular cuánto dinero pueden prestarte.",
      "Paso 3: Dirígete a la ventanilla de cualquier agencia del Banco de la Nación en horario de atención.",
      "Paso 4: ¡Eso es todo! Si aprueban tu préstamo, el dinero será depositado en tu cuenta de forma segura."
    ]
  },
  onp: {
    title: 'Información de Retiro de Pensión',
    icon: '👴',
    steps: [
      "Paso 1: Ten a la mano tu tarjeta MultiRed. Mantenla guardada en un lugar seguro hasta que llegues al banco.",
      "Paso 2: Para retirar tu dinero, puedes usar los cajeros automáticos o ir directamente a la ventanilla dentro de la agencia.",
      "Paso 3: Muy importante: Por tu seguridad, nunca le des tu tarjeta ni le digas tu clave secreta a personas extrañas en la calle.",
      "Paso 4: Si necesitas ayuda con el cajero automático, pídesela únicamente a los orientadores del banco que usan chaleco oficial."
    ]
  }
};

export default function TramitePage() {
  const params = useParams();
  const router = useRouter();
  const tipoTramite = (params?.tipo as string) || 'onp';
  const guideData = GUIDES[tipoTramite] || GUIDES['onp'];

  const [isStarted, setIsStarted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
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
      utterance.rate = 0.9;
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
      readAloud("Has terminado la guía. Ya estás listo para ir al banco de forma segura. Puedes cerrar esta página o volver al inicio.");
    }
  };

  const handleRepeatAudio = () => {
    readAloud(guideData.steps[currentStepIndex]);
  };

  if (!isStarted) {
    return (
      <main className="flex-grow flex flex-col items-center justify-start md:justify-center p-4 pt-10 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-48 md:h-64 bg-bnBlue rounded-b-[40px] md:rounded-b-[100px] z-0 opacity-10"></div>
        
        <div className="z-10 w-full max-w-2xl bg-white rounded-3xl shadow-premium p-6 md:p-12 text-center border border-gray-100 mt-2 md:mt-0 animate-fade-in">
          <div className="text-6xl mb-6">{guideData.icon}</div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-bnBlue mb-4 tracking-tight">
            {guideData.title}
          </h1>
          
          <p className="text-lg md:text-xl mb-10 text-gray-500 font-medium max-w-lg mx-auto">
            Te explicaremos paso a paso lo que necesitas saber. Toca el botón rojo una vez para escuchar de qué trata. <strong className="text-gray-800">Toca dos veces</strong> para empezar la guía.
          </p>
          
          <div className="flex justify-center">
            <DoubleTouchButton 
              label="Iniciar Guía por Voz"
              actionDescription={`Botón para iniciar la ${guideData.title}. Toca de nuevo para empezar a escuchar los pasos.`}
              onClick={handleStart}
            />
          </div>
          <button onClick={() => router.push('/')} className="mt-8 text-bnBlue font-bold underline text-lg p-2">Volver al inicio</button>
        </div>
      </main>
    );
  }

  if (isFinished) {
    return (
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center bg-gray-50">
        <div className="w-full max-w-xl bg-green-50 rounded-3xl shadow-premium p-10 border border-green-100 animate-fade-in">
          <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-green-800 mb-4">¡Estás Listo!</h2>
          <p className="text-xl text-green-700 font-medium mb-8">
            Ya tienes toda la información para hacer tu trámite con seguridad. ¡Te esperamos en el Banco de la Nación!
          </p>
          <button 
            onClick={() => router.push('/')} 
            className="w-full bg-bnBlue text-white text-2xl font-bold py-6 rounded-2xl shadow-lg hover:bg-blue-900 transition-all"
          >
            Finalizar y Volver
          </button>
        </div>
      </main>
    );
  }

  const progressPercentage = ((currentStepIndex + 1) / guideData.steps.length) * 100;

  return (
    <main className="flex-grow flex flex-col items-center justify-start p-4 pt-8 md:p-12 relative bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-premium overflow-hidden border border-gray-200 flex flex-col min-h-[60vh] animate-fade-in">
        <div className="w-full bg-gray-200 h-3">
          <div className="bg-bnRed h-3 transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <div className="p-8 md:p-12 flex-grow flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
             <span className="bg-blue-100 text-bnBlue font-black text-xl px-4 py-2 rounded-xl">
               Paso {currentStepIndex + 1} de {guideData.steps.length}
             </span>
             <button 
                onClick={handleRepeatAudio}
                className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full text-gray-700 transition flex items-center gap-2 font-bold shadow-sm"
             >
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                Repetir Audio
             </button>
          </div>
          <p className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug mb-10">
            {guideData.steps[currentStepIndex]}
          </p>
        </div>
        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <button 
            onClick={handleNextStep}
            className="w-full bg-bnBlue text-white text-3xl font-extrabold py-8 rounded-2xl shadow-premium-hover active:scale-[0.98] transition-transform flex items-center justify-center gap-4"
          >
            Siguiente Paso
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </main>
  );
}