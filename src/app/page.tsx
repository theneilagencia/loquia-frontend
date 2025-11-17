export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4 bg-[#f9fafb]">
      {/* HERO */}
      <section className="w-full max-w-4xl flex flex-col items-center text-center gap-8 mb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-[#22223b] tracking-tight drop-shadow-sm">
          Crie sua presença digital com IA
        </h1>
        <p className="text-xl md:text-2xl text-[#4a4e69] font-light max-w-2xl">
          Acelere seu negócio com uma landing page inteligente, elegante e pronta para converter. Inspirado no Mailchimp, feito para você.
        </p>
        <button className="mt-4 px-10 py-4 rounded-full bg-gradient-to-r from-[#3a86ff] to-[#00b4d8] text-white text-lg font-bold shadow-lg border-2 border-[#3a86ff] hover:from-[#265d97] hover:to-[#0096c7] hover:scale-105 transition-all duration-200">
          Criar minha Presença IA agora
        </button>
      </section>

      {/* SEÇÕES */}
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center gap-4 border border-[#e9ecef]">
          <span className="text-4xl">🚀</span>
          <h2 className="text-xl font-semibold text-[#22223b]">Lance em minutos</h2>
          <p className="text-[#4a4e69] text-base text-center">Crie e publique sua landing page com poucos cliques, sem complicação.</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center gap-4 border border-[#e9ecef]">
          <span className="text-4xl">🤖</span>
          <h2 className="text-xl font-semibold text-[#22223b]">IA que converte</h2>
          <p className="text-[#4a4e69] text-base text-center">Textos, imagens e estrutura otimizados automaticamente para engajar seu público.</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center gap-4 border border-[#e9ecef]">
          <span className="text-4xl">🎨</span>
          <h2 className="text-xl font-semibold text-[#22223b]">Design profissional</h2>
          <p className="text-[#4a4e69] text-base text-center">Visual moderno, espaçamento amplo e tipografia suave, inspirado nas melhores marcas.</p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="w-full max-w-2xl flex flex-col items-center text-center gap-6 bg-white rounded-2xl shadow-lg p-10 border border-[#e9ecef]">
        <h2 className="text-3xl md:text-4xl font-bold text-[#22223b]">Pronto para transformar sua presença online?</h2>
        <p className="text-lg text-[#4a4e69] font-light max-w-xl">
          Comece agora mesmo e veja como a inteligência artificial pode impulsionar seu negócio.
        </p>
        <button className="mt-2 px-10 py-4 rounded-full bg-gradient-to-r from-[#3a86ff] to-[#00b4d8] text-white text-lg font-bold shadow-lg border-2 border-[#3a86ff] hover:from-[#265d97] hover:to-[#0096c7] hover:scale-105 transition-all duration-200">
          Criar minha Presença IA agora
        </button>
      </section>
    </div>
  );
}
      </main>
    </div>
  );
}
