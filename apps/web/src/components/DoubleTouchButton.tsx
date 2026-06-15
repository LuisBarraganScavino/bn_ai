"use client";

import React, { useState, useRef, useEffect } from 'react';

interface DoubleTouchButtonProps {
  label: string;
  actionDescription: string;
  onClick: () => void;
  className?: string;
}

export function DoubleTouchButton({ label, actionDescription, onClick, className = '' }: DoubleTouchButtonProps) {
  const [isPrimed, setIsPrimed] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
    // Limpieza al desmontar para evitar Memory Leaks
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  const handleClick = () => {
    if (!isPrimed) {
      // Primer clic: Lee la acción
      setIsPrimed(true);
      if (synthRef.current) {
        synthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(actionDescription);
        utterance.lang = 'es-PE';
        synthRef.current.speak(utterance);
      }
      
      // Reinicia el estado después de 5 segundos
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsPrimed(false), 5000);
    } else {
      // Segundo clic: Ejecuta
      setIsPrimed(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden py-6 px-10 w-full max-w-md rounded-2xl shadow-premium text-2xl md:text-3xl font-bold transition-all duration-300 ease-out transform ${
        isPrimed 
          ? 'bg-green-600 text-white border-4 border-green-700 scale-[1.02] shadow-premium-hover' 
          : 'bg-bnRed text-white hover:bg-bnRedHover hover:-translate-y-1'
      } ${className}`}
    >
      <div className="flex items-center justify-center gap-3">
        {isPrimed ? (
          <>
            <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Confirma tu trámite</span>
          </>
        ) : (
          <span>{label}</span>
        )}
      </div>
    </button>
  );
}
