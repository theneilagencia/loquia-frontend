"use client";
import { useEffect, useState } from "react";

type Intent = {
  primary: string;
  variations: string[];
};

export default function IntentPage() {
  const [intent, setIntent] = useState<Intent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchIntent() {
      setLoading(true);
      setError("");
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const res = await fetch(`${apiUrl}/intent`);
        if (!res.ok) {
          throw new Error("Erro ao buscar intenções");
        }
        const data = await res.json();
        setIntent(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchIntent();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f9fafb] py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-[#22223b] mb-10">Intenção Primária</h1>
      {loading && <div className="text-[#4a4e69]">Carregando...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {intent && (
        <div className="bg-white rounded-2xl shadow p-8 w-full max-w-xl border border-[#e9ecef]">
          <div className="mb-6">
            <span className="block text-lg font-semibold text-[#22223b] mb-2">Primária:</span>
            <div className="text-2xl font-bold text-[#3a86ff]">{intent.primary}</div>
          </div>
          <div>
            <span className="block text-lg font-semibold text-[#22223b] mb-2">Variações:</span>
            <ul className="list-disc pl-6 space-y-2">
              {intent.variations.map((variation, idx) => (
                <li key={idx} className="text-[#4a4e69] text-base">{variation}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
