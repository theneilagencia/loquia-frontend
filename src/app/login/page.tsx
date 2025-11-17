"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao fazer login");
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md flex flex-col gap-6 border border-[#e9ecef]"
      >
        <h1 className="text-3xl font-bold text-[#22223b] text-center mb-2">Entrar</h1>
        <p className="text-[#4a4e69] text-center mb-4 text-base">Acesse sua conta para criar sua presença digital com IA.</p>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-[#22223b]">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="rounded-lg border border-[#e9ecef] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#3a86ff] bg-[#f9fafb]"
            placeholder="seu@email.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-[#22223b]">
            Senha
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="rounded-lg border border-[#e9ecef] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#3a86ff] bg-[#f9fafb]"
            placeholder="••••••••"
          />
        </div>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        {success && <div className="text-green-600 text-sm text-center">Login realizado com sucesso!</div>}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#3a86ff] to-[#00b4d8] text-white text-lg font-bold shadow-lg border-2 border-[#3a86ff] hover:from-[#265d97] hover:to-[#0096c7] hover:scale-105 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
