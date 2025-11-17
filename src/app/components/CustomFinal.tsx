"use client";

export default function CustomFinal() {
  return (
    <section className="relative py-24 px-6 bg-white overflow-hidden">
      {/* Animated background with modern graphics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial gradient orbs */}
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-br from-yellow-200 via-yellow-100 to-transparent rounded-full opacity-35 animate-pulse blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-gradient-to-tl from-gray-200 via-gray-100 to-transparent rounded-full opacity-30 animate-pulse blur-3xl" style={{ animationDelay: '1s' }}></div>
        
        {/* Rotating gradient ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-yellow-100 via-transparent to-gray-100 rounded-full opacity-10 animate-spin" style={{ animationDuration: '50s' }}></div>
        
        {/* Sparkle effects */}
        <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-yellow-400 rounded-full opacity-40 animate-ping" style={{ animationDuration: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-gray-400 rounded-full opacity-30 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
        
        {/* Floating shapes */}
        <div className="absolute top-32 right-1/3 w-16 h-16 border-2 border-yellow-300 rounded-full opacity-15 animate-bounce" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 border border-gray-300 rounded-lg rotate-45 opacity-15 animate-spin" style={{ animationDuration: '25s' }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full mb-8">
          <span className="w-2 h-2 bg-black rounded-full"></span>
          <span className="text-sm text-gray-700">AI Presence Engine</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-black mb-6 leading-tight">
          O Google organizou a informação,<br />
          a IA organiza a intenção
        </h2>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl text-gray-700 mb-8">
          A sua marca está preparada para ser encontrada na nova internet?
        </p>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Em poucos minutos você ativa sua Presença IA<br />
          e começa a ser recomendado pelas IAs mais influentes do mundo
        </p>

        {/* CTA */}
        <button className="px-10 py-5 bg-yellow-400 text-black text-lg font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-200 shadow-lg hover:shadow-xl">
          Criar minha Presença IA agora
        </button>
      </div>
    </section>
  );
}
