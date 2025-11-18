"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Button from "../components/ui/Button";
import { useToast } from "../contexts/ToastContext";

interface Feed {
  id: string;
  tenant_id: string;
  feed_type: string;
  feed_content: any;
  created_at: string;
}

export default function FeedsPage() {
  const router = useRouter();
  const { showSuccess, showError, showInfo } = useToast();
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<{[key: string]: boolean}>({});
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    checkUser();
    loadFeeds();
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
    }
  }

  async function loadFeeds() {
    try {
      const { data, error } = await supabase
        .from("feeds")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFeeds(data || []);
    } catch (error) {
      console.error("Erro ao carregar feeds:", error);
    } finally {
      setLoading(false);
    }
  }

  async function generateFeed(platform: 'openai' | 'perplexity' | 'claude' | 'sge') {
    setGenerating(prev => ({ ...prev, [platform]: true }));
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const endpoint = platform === 'claude' 
        ? '/api/workflows/generate-feeds-claude'
        : platform === 'sge'
        ? '/api/workflows/generate-feeds-sge'
        : '/api/workflows/generate-feeds';

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ platform }),
      });

      const data = await response.json();

      if (!response.ok) {
        showError(data.error || `Erro ao gerar feed para ${platform}`);
        return;
      }

      showSuccess(`Feed para ${platform.toUpperCase()} gerado com sucesso!`);
      
      // Recarregar feeds após alguns segundos
      setTimeout(() => {
        loadFeeds();
      }, 2000);
      
    } catch (error: any) {
      showError("Erro: " + error.message);
    } finally {
      setGenerating(prev => ({ ...prev, [platform]: false }));
    }
  }

  async function deleteFeed(id: string) {
    if (!confirm("Tem certeza que deseja excluir este feed?")) return;

    try {
      const { error } = await supabase
        .from("feeds")
        .delete()
        .eq("id", id);

      if (error) throw error;
      showSuccess("Feed excluído com sucesso!");
      loadFeeds();
    } catch (error: any) {
      showError("Erro ao excluir: " + error.message);
    }
  }

  async function downloadFeed(feed: Feed) {
    const blob = new Blob([JSON.stringify(feed.feed_content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${feed.feed_type}_feed_${new Date(feed.created_at).toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showSuccess("Feed baixado com sucesso!");
  }

  const filteredFeeds = filterType === "all" 
    ? feeds 
    : feeds.filter(f => f.feed_type === filterType);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Feeds Gerados</h1>
            <p className="text-gray-600">
              Gere feeds otimizados para cada plataforma de IA
            </p>
          </div>
        </div>

        {/* Botões de Geração */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Gerar Novos Feeds</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              onClick={() => generateFeed('openai')}
              disabled={generating.openai}
              className="w-full"
            >
              {generating.openai ? "Gerando..." : "🤖 OpenAI"}
            </Button>
            <Button
              onClick={() => generateFeed('perplexity')}
              disabled={generating.perplexity}
              className="w-full"
            >
              {generating.perplexity ? "Gerando..." : "🔮 Perplexity"}
            </Button>
            <Button
              onClick={() => generateFeed('claude')}
              disabled={generating.claude}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {generating.claude ? "Gerando..." : "🧠 Claude"}
            </Button>
            <Button
              onClick={() => generateFeed('sge')}
              disabled={generating.sge}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {generating.sge ? "Gerando..." : "⚡ SGE"}
            </Button>
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-lg ${
              filterType === "all"
                ? "bg-black text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            Todos ({feeds.length})
          </button>
          <button
            onClick={() => setFilterType("openai")}
            className={`px-4 py-2 rounded-lg ${
              filterType === "openai"
                ? "bg-black text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            OpenAI ({feeds.filter(f => f.feed_type === "openai").length})
          </button>
          <button
            onClick={() => setFilterType("perplexity")}
            className={`px-4 py-2 rounded-lg ${
              filterType === "perplexity"
                ? "bg-black text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            Perplexity ({feeds.filter(f => f.feed_type === "perplexity").length})
          </button>
          <button
            onClick={() => setFilterType("claude")}
            className={`px-4 py-2 rounded-lg ${
              filterType === "claude"
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            Claude ({feeds.filter(f => f.feed_type === "claude").length})
          </button>
          <button
            onClick={() => setFilterType("sge")}
            className={`px-4 py-2 rounded-lg ${
              filterType === "sge"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            SGE ({feeds.filter(f => f.feed_type === "sge").length})
          </button>
        </div>

        {/* Lista de Feeds */}
        {filteredFeeds.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-600 mb-4">Nenhum feed gerado ainda.</p>
            <p className="text-sm text-gray-500">
              Clique em um dos botões acima para gerar feeds otimizados para cada plataforma.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredFeeds.map((feed) => (
              <div key={feed.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      {feed.feed_type} Feed
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(feed.created_at).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSelectedFeed(feed)}
                      variant="ghost"
                      size="sm"
                    >
                      Ver
                    </Button>
                    <Button
                      onClick={() => downloadFeed(feed)}
                      variant="ghost"
                      size="sm"
                    >
                      Baixar
                    </Button>
                    <Button
                      onClick={() => deleteFeed(feed.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
                <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-x-auto max-h-40">
                  {JSON.stringify(feed.feed_content, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}

        {/* Modal de Visualização */}
        {selectedFeed && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 capitalize">
                  {selectedFeed.feed_type} Feed
                </h2>
                <button
                  onClick={() => setSelectedFeed(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <pre className="text-sm">
                  {JSON.stringify(selectedFeed.feed_content, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
