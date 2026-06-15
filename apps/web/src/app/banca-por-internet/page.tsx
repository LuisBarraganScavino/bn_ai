"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function BancaPorInternetSimulada() {
  const router = useRouter();
  const [step, setStep] = useState<'login' | 'dashboard' | 'transfer-success' | 'loan-success'>('login');
  
  // Login form state
  const [dni, setDni] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState<'dni' | 'card' | 'password'>('dni');
  
  // Account state (Real-looking)
  const [pensionBalance, setPensionBalance] = useState(950.00);
  const [loanAmount, setLoanAmount] = useState(3000);
  const [transferAmount, setTransferAmount] = useState('');
  const [transferAccount, setTransferAccount] = useState('');
  
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
    speak("Bienvenido a la Banca por Internet oficial del Banco de la Nación. Ingrese sus datos de forma segura para gestionar su cuenta.");
    return () => {
      if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  const speak = (text: string) => {
    if (synthRef.current) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-PE';
      utterance.rate = 0.88;
      synthRef.current.speak(utterance);
    }
  };

  const handleKeypadClick = (num: string) => {
    if (focusedField === 'dni') {
      speak(num);
      if (dni.length < 8) setDni(prev => prev + num);
    } else if (focusedField === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16) {
        const raw = cardNumber.replace(/\s/g, '') + num;
        const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
        setCardNumber(formatted);
      }
    } else if (focusedField === 'password') {
      if (password.length < 6) setPassword(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    if (focusedField === 'dni') {
      speak("Borrar");
      setDni(prev => prev.slice(0, -1));
    } else if (focusedField === 'card') {
      const raw = cardNumber.replace(/\s/g, '').slice(0, -1);
      const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
      setCardNumber(formatted);
    } else if (focusedField === 'password') {
      setPassword(prev => prev.slice(0, -1));
    }
  };

  const handleClear = () => {
    if (focusedField === 'dni') {
      speak("Limpiar todo");
      setDni('');
    } else if (focusedField === 'card') {
      setCardNumber('');
    } else if (focusedField === 'password') {
      setPassword('');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dni.length < 8) {
      speak("Por favor, ingrese su número de DNI de ocho dígitos.");
      return;
    }
    if (cardNumber.replace(/\s/g, '').length < 16) {
      speak("Por favor, ingrese el número de tarjeta de dieciséis dígitos.");
      return;
    }
    if (password.length < 6) {
      speak("Por favor, ingrese su clave de internet de seis dígitos.");
      return;
    }

    speak("Ingreso exitoso. Bienvenido a su panel de control del Banco de la Nación. Aquí puede revisar su cuenta, realizar transferencias y gestionar préstamos.");
    setStep('dashboard');
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountVal = parseFloat(transferAmount);
    if (!transferAccount || transferAccount.length < 10) {
      speak("Por favor, ingrese una cuenta de destino válida.");
      return;
    }
    if (isNaN(amountVal) || amountVal <= 0 || amountVal > pensionBalance) {
      speak("Monto de transferencia inválido o saldo insuficiente.");
      return;
    }

    setPensionBalance(prev => prev - amountVal);
    speak(`Transferencia exitosa de ${amountVal} soles realizada con éxito. Su nuevo saldo de cuenta es de ${pensionBalance - amountVal} soles.`);
    setStep('transfer-success');
  };

  const handleLoanSubmit = () => {
    speak(`Solicitud de préstamo de ${loanAmount} soles aprobada. El dinero ha sido depositado con total seguridad en su cuenta de ahorros.`);
    setPensionBalance(prev => prev + loanAmount);
    setStep('loan-success');
  };

  return (
    <main className="flex-grow bg-[#f0f4f8] flex flex-col w-full min-h-screen">
      {/* Top security indicator banner */}
      <div className="w-full bg-emerald-600 text-white text-center py-3.5 px-4 font-extrabold text-base md:text-lg shadow-md z-40 border-b border-emerald-700 flex items-center justify-center gap-2">
        <span>🔒</span>
        <span>CONEXIÓN SEGURA ENCRIPTADA DE EXTREMO A EXTREMO (ENTORNO OFICIAL)</span>
      </div>

      {/* Header bar matching BN colors */}
      <div className="w-full bg-[#1d2b4a] py-4 px-6 md:px-12 flex items-center justify-between shadow-md border-b border-[#152037]">
        <div className="flex items-center gap-3">
          <span className="text-white text-2xl font-black tracking-tight">BANCA POR INTERNET</span>
          <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Oficial</span>
        </div>
        <button 
          onClick={() => router.push('/')} 
          className="text-gray-300 hover:text-white font-extrabold text-sm flex items-center gap-1.5 transition-colors border border-white/10 px-3 py-1.5 rounded-xl bg-white/5"
        >
          ✕ Salir
        </button>
      </div>

      <div className="flex-grow max-w-6xl mx-auto w-full p-4 md:p-8 flex flex-col items-center justify-center">
        {step === 'login' && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
            {/* Login Card */}
            <form onSubmit={handleLoginSubmit} className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-10 shadow-premium border border-gray-150 w-full flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
              
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-[#1d2b4a] tracking-tight">Ingreso para Clientes</h2>
                <p className="text-sm text-gray-500 mt-1 font-semibold">Complete sus credenciales usando el teclado virtual de alta visibilidad</p>
              </div>

              {/* Document input */}
              <div className="flex flex-col gap-2">
                <label className="text-base font-extrabold text-gray-700">1. Tipo y Número de Documento</label>
                <div className="flex gap-2">
                  <select className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 font-bold text-[#1d2b4a] focus:border-red-600 outline-none text-lg">
                    <option>DNI</option>
                  </select>
                  <input 
                    type="text" 
                    readOnly
                    placeholder="Ingrese su DNI"
                    value={dni}
                    onFocus={() => { setFocusedField('dni'); speak("Escriba su número de DNI usando el teclado virtual."); }}
                    className={`flex-grow bg-gray-50 border-2 rounded-2xl p-4.5 text-2xl font-black text-[#1d2b4a] placeholder-gray-400 outline-none text-center ${focusedField === 'dni' ? 'border-red-600 ring-2 ring-red-100' : 'border-gray-200'}`}
                  />
                </div>
              </div>

              {/* Card number input */}
              <div className="flex flex-col gap-2">
                <label className="text-base font-extrabold text-gray-700">2. Número de Tarjeta MultiRed</label>
                <input 
                  type="text" 
                  readOnly
                  placeholder="Ingrese los 16 dígitos de su tarjeta"
                  value={cardNumber}
                  onFocus={() => { setFocusedField('card'); speak("Escriba los dieciséis números de su tarjeta MultiRed."); }}
                  className={`bg-gray-50 border-2 rounded-2xl p-4.5 text-2xl font-black text-[#1d2b4a] placeholder-gray-400 outline-none text-center tracking-widest ${focusedField === 'card' ? 'border-red-600 ring-2 ring-red-100' : 'border-gray-200'}`}
                />
              </div>

              {/* Internet password input */}
              <div className="flex flex-col gap-2">
                <label className="text-base font-extrabold text-gray-700">3. Clave de Internet de 6 dígitos</label>
                <input 
                  type="password" 
                  readOnly
                  placeholder="******"
                  value={password}
                  onFocus={() => { setFocusedField('password'); speak("Escriba su clave de internet de seis dígitos."); }}
                  className={`bg-gray-50 border-2 rounded-2xl p-4.5 text-2xl font-black text-[#1d2b4a] placeholder-gray-400 outline-none text-center tracking-widest ${focusedField === 'password' ? 'border-red-600 ring-2 ring-red-100' : 'border-gray-200'}`}
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-2xl py-6 rounded-2xl shadow-lg transition-transform active:scale-[0.98] border border-red-500/20 mt-4 flex items-center justify-center gap-3"
              >
                <span>🔓</span>
                Ingresar de forma Segura
              </button>
            </form>

            {/* Virtual Keypad Card */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-premium border border-gray-150 w-full flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#1d2b4a]"></div>
              
              <div className="text-center pb-2 border-b border-gray-100">
                <span className="text-xs font-black uppercase text-gray-400 tracking-wider">Teclado Virtual de Seguridad</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                  <button 
                    key={num}
                    type="button"
                    onClick={() => handleKeypadClick(num)}
                    className="aspect-square bg-gray-50 hover:bg-gray-100 border border-gray-200 text-3xl font-black text-[#1d2b4a] rounded-2xl flex items-center justify-center shadow-sm active:scale-95 transition-all"
                  >
                    {num}
                  </button>
                ))}
                <button 
                  type="button"
                  onClick={handleClear}
                  className="bg-amber-100 hover:bg-amber-200 border border-amber-200 text-lg font-black text-amber-800 rounded-2xl flex items-center justify-center shadow-sm active:scale-95 transition-all uppercase"
                >
                  Limpiar
                </button>
                <button 
                  type="button"
                  onClick={() => handleKeypadClick('0')}
                  className="aspect-square bg-gray-50 hover:bg-gray-100 border border-gray-200 text-3xl font-black text-[#1d2b4a] rounded-2xl flex items-center justify-center shadow-sm active:scale-95 transition-all"
                >
                  0
                </button>
                <button 
                  type="button"
                  onClick={handleBackspace}
                  className="bg-red-100 hover:bg-red-200 border border-red-200 text-[#c2000c] rounded-2xl flex items-center justify-center shadow-sm active:scale-95 transition-all"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414A2 2 0 0010.828 19H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                  </svg>
                </button>
              </div>

              <div className="bg-[#f0f4f8] p-4 rounded-2xl border border-gray-100 mt-2 text-center text-xs font-semibold text-gray-500">
                💡 Presione el campo de texto arriba que desee completar y luego digite usando los botones grandes de este teclado de seguridad.
              </div>
            </div>
          </div>
        )}

        {step === 'dashboard' && (
          <div className="w-full flex flex-col gap-8">
            {/* Header info */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-premium border border-gray-150 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-2 bg-[#1d2b4a]"></div>
              <div>
                <span className="text-xs font-black uppercase text-gray-400 tracking-wider">Pensionista ONP Acreditado</span>
                <h2 className="text-3xl font-black text-[#1d2b4a] tracking-tight mt-1">Estimado(a) Cliente, Bienvenido</h2>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 p-4 px-6 rounded-2xl text-center md:text-right shadow-sm flex-shrink-0">
                <span className="text-xs font-black uppercase text-emerald-600 tracking-wider">Saldo Total Disponible</span>
                <h3 className="text-4xl font-black text-emerald-700 tracking-tight mt-1">S/ {pensionBalance.toFixed(2)}</h3>
              </div>
            </div>

            {/* Simulated Trámites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Trámite A: Transferencias (Pensión) */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-premium border border-gray-150 flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-[#1d2b4a] tracking-tight">Realizar Transferencia</h3>
                  <p className="text-sm text-gray-500 mt-1 font-semibold">Envíe fondos a un familiar u otra cuenta MultiRed de forma inmediata</p>
                </div>

                <form onSubmit={handleTransferSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-600">Cuenta de Destino (10 dígitos)</label>
                    <input 
                      type="text" 
                      placeholder="Ej. 0401234567"
                      maxLength={10}
                      value={transferAccount}
                      onChange={(e) => setTransferAccount(e.target.value.replace(/\D/g, ''))}
                      className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-xl font-bold text-[#1d2b4a] outline-none focus:border-red-600"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-600">Monto a Transferir (Soles)</label>
                    <input 
                      type="number" 
                      placeholder="S/ 0.00"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-xl font-bold text-[#1d2b4a] outline-none focus:border-red-600"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xl py-5 rounded-2xl shadow-lg transition-transform active:scale-[0.98] border border-red-500/20"
                  >
                    Confirmar Transferencia
                  </button>
                </form>
              </div>

              {/* Trámite B: Préstamos Simulator */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-premium border border-gray-150 flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-[#1d2b4a] tracking-tight">Solicitar Préstamo Pre-aprobado</h3>
                  <p className="text-sm text-gray-500 mt-1 font-semibold">Seleccione el monto que requiere y solicite el desembolso de inmediato</p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-600">Monto del Préstamo a Solicitar</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[1000, 3000, 5000].map(val => (
                        <button 
                          key={val}
                          onClick={() => { setLoanAmount(val); speak(`Seleccionó préstamo de ${val} soles.`); }}
                          className={`py-4 rounded-xl font-extrabold text-lg border-2 active:scale-95 transition-all ${loanAmount === val ? 'bg-[#1d2b4a] border-[#1d2b4a] text-white shadow-md' : 'bg-gray-50 border-gray-200 text-[#1d2b4a] hover:bg-gray-100'}`}
                        >
                          S/ {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center justify-between text-blue-900 font-extrabold">
                    <span>Cuota mensual estimada:</span>
                    <span className="text-2xl font-black">S/ {(loanAmount * 0.095).toFixed(2)}</span>
                  </div>

                  <button 
                    onClick={handleLoanSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xl py-5 rounded-2xl shadow-lg transition-transform active:scale-[0.98] border border-blue-500/20"
                  >
                    Confirmar Desembolso de S/ {loanAmount}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {(step === 'transfer-success' || step === 'loan-success') && (
          <div className="w-full max-w-xl bg-white rounded-[32px] p-8 md:p-14 text-center shadow-2xl border border-gray-100 relative overflow-hidden animate-fade-in my-auto">
            <div className="absolute top-0 left-0 w-full h-3 bg-emerald-500"></div>
            
            <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/30 transform scale-110 animate-pulse">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-[#1d2b4a] mb-4 tracking-tight">Operación Completada</h2>
            
            <p className="text-lg md:text-xl text-emerald-800 font-semibold mb-10 leading-relaxed max-w-md mx-auto">
              {step === 'transfer-success' 
                ? "La transferencia de fondos se ha procesado con éxito. Su saldo ha sido actualizado."
                : `¡Felicitaciones! Su solicitud de préstamo de S/ ${loanAmount} ha sido aprobada y desembolsada en su saldo disponible.`}
            </p>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => { speak("Volviendo a su cuenta de ahorros."); setStep('dashboard'); }}
                className="w-full bg-[#1d2b4a] hover:bg-[#152037] text-white text-xl font-extrabold py-5 rounded-2xl shadow-md active:scale-[0.98] transition-all"
              >
                Volver a mi Cuenta de Ahorros
              </button>
              <button 
                onClick={() => router.push('/')} 
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-500 text-lg font-bold py-4 rounded-xl transition-all"
              >
                Volver al Menú Principal
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
