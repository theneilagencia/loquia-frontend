export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f9fafb] py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-[#22223b] mb-10">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center border border-[#e9ecef]">
          <span className="text-5xl mb-2">💡</span>
          <h2 className="text-xl font-semibold text-[#22223b] mb-2">Intenções geradas</h2>
          <div className="text-3xl font-bold text-[#3a86ff]">0</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center border border-[#e9ecef]">
          <span className="text-5xl mb-2">📈</span>
          <h2 className="text-xl font-semibold text-[#22223b] mb-2">Leads do mês</h2>
          <div className="text-3xl font-bold text-[#3a86ff]">0</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center border border-[#e9ecef]">
          <span className="text-5xl mb-2">🤖</span>
          <h2 className="text-xl font-semibold text-[#22223b] mb-2">Ativações IA</h2>
          <div className="text-3xl font-bold text-[#3a86ff]">0</div>
        </div>
      </div>
    </div>
  );
}
