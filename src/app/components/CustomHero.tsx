"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function CustomHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-32 bg-white overflow-hidden">
      {/* Animated background with modern graphics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-yellow-200 via-yellow-100 to-transparent rounded-full opacity-40 animate-pulse blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-gray-200 via-gray-100 to-transparent rounded-full opacity-30 animate-pulse blur-3xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-yellow-100 via-transparent to-gray-100 rounded-full opacity-20 animate-spin" style={{ animationDuration: '30s' }}></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-32 right-1/4 w-20 h-20 border-2 border-yellow-300 rounded-lg rotate-12 animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border-2 border-gray-300 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-yellow-200 opacity-30 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="w-2 h-2 bg-black rounded-full"></span>
          <span className="text-sm text-gray-700">Loquia Intent Engine™</span>
        </div>

        {/* Headline */}
        <h1
          className={`text-6xl md:text-8xl font-bold text-black mb-6 leading-tight tracking-tight transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          A voz da sua marca na era da IA
        </h1>

        {/* Subheadline */}
        <p
          className={`text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Milhões de pessoas já não buscam no Google ou nas redes sociais,<br />
          elas perguntam direto para a IA.
        </p>

        {/* Description */}
        <p
          className={`text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Criamos presença IA contínua por meio de nossos planos de assinatura recorrente
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md">
            Criar minha presença IA agora
          </button>
          <button className="px-8 py-4 bg-white text-black font-semibold rounded-lg border-2 border-gray-300 hover:border-black transition-all duration-200">
            Ver como funciona
          </button>
        </div>

        {/* Stats Grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-all duration-200">
            <div className="text-4xl font-bold text-black mb-2">0</div>
            <div className="text-sm text-gray-600">Anúncios necessários</div>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-all duration-200">
            <div className="text-4xl font-bold text-black mb-2">0</div>
            <div className="text-sm text-gray-600">Investimento em SEO</div>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-all duration-200">
            <div className="text-4xl font-bold text-black mb-2">100%</div>
            <div className="text-sm text-gray-600">Recomendação orgânica</div>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-all duration-200">
            <div className="text-4xl font-bold text-black mb-2">∞</div>
            <div className="text-sm text-gray-600">Alcance potencial</div>
          </div>
        </div>
      </div>
    </section>
  );
}
