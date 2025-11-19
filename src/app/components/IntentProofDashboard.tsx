"use client";

import Image from "next/image";

export default function IntentProofDashboard() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full mb-8">
            <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700 tracking-wide">
              INTENT PROOF DASHBOARD™
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
            Não adianta prometer,<br />
            é preciso mostrar
          </h2>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            O Intent Proof Dashboard™ entrega transparência total e<br />
            prova real de que sua empresa está sendo usada pelas IAs
          </p>
        </div>

        {/* Description */}
        <div className="text-center mb-12">
          <p className="text-lg text-gray-700 max-w-5xl mx-auto leading-relaxed">
            Acompanhe em tempo real como as IAs veem, consultam e recomendam sua empresa com métricas 
            detalhadas, logs de intenção, provas técnicas, visualização do feed e analytics completos de 
            consultas, ativações e leads
          </p>
        </div>

        {/* AI Logos */}
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
          {/* ChatGPT */}
          <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M22.2819 9.8211C23.1986 9.8211 23.9419 9.07779 23.9419 8.16111C23.9419 7.24443 23.1986 6.50111 22.2819 6.50111C21.3652 6.50111 20.6219 7.24443 20.6219 8.16111C20.6219 9.07779 21.3652 9.8211 22.2819 9.8211Z" fill="currentColor"/>
              <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.7574 15.6287C16.4358 16.3216 15.8039 16.8216 15.0287 16.9859C14.2535 17.1502 13.4574 16.9573 12.8574 16.4644L12 15.7644L11.1426 16.4644C10.5426 16.9573 9.74648 17.1502 8.97133 16.9859C8.19617 16.8216 7.56422 16.3216 7.24258 15.6287C6.92094 14.9359 6.94805 14.1359 7.31719 13.4644L8.17969 12L7.31719 10.5356C6.94805 9.86414 6.92094 9.06414 7.24258 8.37133C7.56422 7.67852 8.19617 7.17852 8.97133 7.01414C9.74648 6.84977 10.5426 7.04266 11.1426 7.53555L12 8.23555L12.8574 7.53555C13.4574 7.04266 14.2535 6.84977 15.0287 7.01414C15.8039 7.17852 16.4358 7.67852 16.7574 8.37133C17.0791 9.06414 17.052 9.86414 16.6828 10.5356L15.8203 12L16.6828 13.4644C17.052 14.1359 17.0791 14.9359 16.7574 15.6287Z" fill="currentColor"/>
            </svg>
            <span className="text-xl font-semibold text-gray-900">ChatGPT</span>
          </div>

          {/* Gemini */}
          <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4285F4"/>
              <path d="M2 17L12 22L22 17L12 12L2 17Z" fill="#34A853"/>
              <path d="M2 7V17L12 12V2L2 7Z" fill="#FBBC04" opacity="0.7"/>
              <path d="M22 7V17L12 12V2L22 7Z" fill="#EA4335" opacity="0.7"/>
            </svg>
            <span className="text-xl font-semibold text-gray-900">Gemini</span>
          </div>

          {/* Claude */}
          <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="#CC9B7A"/>
              <path d="M8 6L12 18M16 6L12 18M6 12H18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-xl font-semibold text-gray-900">Claude</span>
          </div>

          {/* Perplexity */}
          <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#20808D"/>
              <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-xl font-semibold text-gray-900">Perplexity</span>
          </div>
        </div>
      </div>
    </section>
  );
}
