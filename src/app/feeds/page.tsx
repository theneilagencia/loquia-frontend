"use client";
import { useEffect, useState } from "react";

type FeedItem = {
  title: string;
  description?: string;
  link?: string;
  date?: string;
};

type Feed = {
  items: FeedItem[];
  title?: string;
};

async function fetchFeed(url: string): Promise<Feed | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}


export default function FeedsPage() {
  const [openai, setOpenai] = useState<Feed | null>(null);
  const [perplexity, setPerplexity] = useState<Feed | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeeds() {
      setLoading(true);
      const [openaiFeed, perplexityFeed] = await Promise.all([
        fetchFeed("/feed/openai.json"),
        fetchFeed("/feed/perplexity.json"),
      ]);
      setOpenai(openaiFeed);
      setPerplexity(perplexityFeed);
      setLoading(false);
    }
    loadFeeds();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-white py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#22223b] mb-12 tracking-tight">📰 Novidades do Mundo IA</h1>
      {loading && <div className="text-[#4a4e69] text-lg">Carregando...</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
        <FeedSection title="OpenAI" icon="🤖" feed={openai} />
        <FeedSection title="Perplexity" icon="💡" feed={perplexity} />
      </div>
    </div>
  );
}

function FeedSection({ title, icon, feed }: { title: string; icon: string; feed: Feed | null }) {
  return (
    <section className="bg-white rounded-3xl shadow-lg p-10 border border-[#e9ecef] min-h-[340px] flex flex-col gap-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl md:text-4xl select-none opacity-80">{icon}</span>
        <h2 className="text-2xl font-bold text-[#22223b] tracking-tight">{title}</h2>
      </div>
      {!feed && <div className="text-[#4a4e69]">Nenhum dado encontrado.</div>}
      {feed && (
        <ul className="space-y-6">
          {feed.items?.map((item, idx) => (
            <li key={idx} className="rounded-xl bg-[#f9fafb] px-6 py-5 shadow-sm border border-[#e9ecef] flex flex-col gap-2">
              <div className="text-lg font-semibold text-[#3a86ff] leading-tight">{item.title}</div>
              {item.description && <div className="text-[#4a4e69] text-base mt-1 leading-relaxed">{item.description}</div>}
              <div className="flex items-center gap-4 mt-1">
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[#00b4d8] text-sm underline font-medium hover:text-[#3a86ff] transition-colors">Ver mais</a>
                )}
                {item.date && <div className="text-xs text-[#adb5bd]">{item.date}</div>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
