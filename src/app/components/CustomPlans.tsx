"use client";

import { useRouter } from "next/navigation";

export default function CustomPlans() {
  const router = useRouter();

  const handlePlanClick = (plan: string) => {
    // Redireciona para login com redirect para pricing
    router.push(`/login?redirect=/pricing&plan=${plan}&billing=monthly`);
  };

  return (
    <section id="planos" className="relative py-24 px-6 bg-white overflow-hidden">
      {/* Animated background with modern graphics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <div className="absolute top-20 left-20 w-[600px] h-[600px] bg-gradient-to-br from-yellow-200 via-yellow-100 to-transparent rounded-full opacity-30 animate-pulse blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-tl from-gray-200 via-gray-100 to-transparent rounded-full opacity-40 animate-pulse blur-3xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-yellow-100 via-transparent to-gray-100 rounded-full opacity-15 animate-spin" style={{ animationDuration: '40s' }}></div>
        
        {/* Price tag shapes */}
        <div className="absolute top-32 right-1/4 w-20 h-20 border-2 border-yellow-300 rounded-lg rotate-12 opacity-20 animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border-2 border-gray-300 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
        
        {/* Dollar signs pattern */}
        <div className="absolute top-1/4 left-1/4 text-6xl font-bold text-yellow-200 opacity-10 animate-pulse">$</div>
        <div className="absolute bottom-1/4 right-1/4 text-5xl font-bold text-gray-200 opacity-10 animate-pulse" style={{ animationDelay: '1s' }}>$</div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full mb-8">
            <span className="w-2 h-2 bg-black rounded-full"></span>
            <span className="text-sm text-gray-700">Precificação Loquia</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-black mb-4">
            Planos & Preços
          </h2>
          <p className="text-xl text-gray-600">
            Escolha o plano certo e comece a<br />existir na IA hoje
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic */}
          <div className="p-8 bg-white border border-gray-200 rounded-2xl hover:border-gray-900 hover:shadow-xl transition-all duration-200">
            <h3 className="text-2xl font-bold text-black mb-2">Basic</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold text-black">US$ 59</span>
              <span className="text-gray-600">/mês</span>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-gray-700">Cadastro de empresa</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-gray-700">Geração de Intent Graph</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-gray-700">Feeds otimizados</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-gray-700">Download de feeds</span>
              </li>
            </ul>

            <button 
              onClick={() => handlePlanClick('basic')}
              className="w-full px-6 py-3 bg-white text-black font-semibold rounded-lg border-2 border-black hover:bg-black hover:text-white transition-all duration-200"
            >
              Começar com Basic
            </button>
          </div>

          {/* Pro - Highlighted */}
          <div className="relative p-8 bg-white border-2 border-yellow-400 rounded-2xl hover:shadow-2xl transition-all duration-200">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="inline-block px-4 py-1 bg-yellow-400 text-black text-sm font-bold rounded-full">
                Mais Popular
              </span>
            </div>

            <h3 className="text-2xl font-bold text-black mb-2">Pro</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold text-black">US$ 79</span>
              <span className="text-gray-600">/mês</span>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-gray-700">Cadastro de empresa</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-gray-700">Geração de Intent Graph</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-gray-700">Feeds otimizados</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-gray-700">Otimização diária</span>
              </li>
            </ul>

            <button 
              onClick={() => handlePlanClick('pro')}
              className="w-full px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-all duration-200 shadow-lg"
            >
              Começar com Pro
            </button>
          </div>

          {/* Enterprise */}
          <div className="p-8 bg-white border border-gray-200 rounded-2xl hover:border-gray-900 hover:shadow-xl transition-all duration-200">
            <h3 className="text-2xl font-bold text-black mb-2">Enterprise</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold text-black">US$ 280</span>
              <span className="text-gray-600">/mês</span>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-gray-700">Cadastro de empresa</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-gray-700">Geração de Intent Graph</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-gray-700">Feeds otimizados</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-gray-700">Otimização diária</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-gray-700">API de integração</span>
              </li>
            </ul>

            <button 
              onClick={() => handlePlanClick('enterprise')}
              className="w-full px-6 py-3 bg-white text-black font-semibold rounded-lg border-2 border-black hover:bg-black hover:text-white transition-all duration-200"
            >
              Começar com Enterprise
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
