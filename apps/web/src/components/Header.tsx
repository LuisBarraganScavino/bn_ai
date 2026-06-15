import React from 'react';
import Image from 'next/image';

export function Header() {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="flex items-center">
          <Image 
            src="/BANCO DE LA NACION-Photoroom.png" 
            alt="Banco de la Nación Logo" 
            width={280} 
            height={80}
            className="h-16 md:h-20 w-auto object-contain"
            priority
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm font-bold text-bnBlue">Trámite Seguro</span>
          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="h-3 w-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          </div>
        </div>
        {/* Mobile Menu Icon */}
        <button className="text-bnBlue p-2 md:hidden">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
    </header>
  );
}