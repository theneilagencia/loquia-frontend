import Image from "next/image";

export default function CustomPaidAds() {
  return (
    <section className="relative py-0 bg-white overflow-hidden">
      <div className="grid md:grid-cols-2">
        {/* Left side - Black background with text */}
        <div className="relative p-12 md:p-16 bg-black text-white flex items-center overflow-hidden">
          {/* Animated background with modern graphics */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Dark gradient orbs */}
            <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-gray-700 via-gray-800 to-transparent rounded-full opacity-30 animate-pulse blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gradient-to-tl from-yellow-600 via-yellow-700 to-transparent rounded-full opacity-20 animate-pulse blur-3xl" style={{ animationDelay: '1.5s' }}></div>
            
            {/* Glowing rings */}
            <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-yellow-500 rounded-full opacity-20 animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border-2 border-gray-600 rounded-full opacity-30 animate-spin" style={{ animationDuration: '10s' }}></div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-full mb-8">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span className="text-sm text-gray-300">Mídia programática</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-yellow-400">Os anúncios pagos<br />perderam força</span>
            </h2>

            <p className="text-lg text-gray-300 mb-6">
              O novo modelo de buscas conversacionais está<br />
              substituindo campanhas caras por recomendações<br />
              orgânicas e contextuais.
            </p>

            <p className="text-base text-gray-400 max-w-md">
              A IA entende intenção, contexto e relevância comercial. Se sua empresa não está preparada, ela deixa de aparecer. É hora de abandonar a corrida por cliques e começar a ser recomendada por quem realmente importa: a IA que seus clientes usam.
            </p>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="relative h-[500px] md:h-auto">
          <Image
            src="/images/loquia.png"
            alt="Executivo usando smartphone"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
