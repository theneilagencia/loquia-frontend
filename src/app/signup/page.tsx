"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { H2, Body } from "../components/ui/Typography";
import Button from "../components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignup(e: any) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Conta criada! Verifique seu e-mail para confirmar.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9fafb] px-4">
      {/* Logo */}
      <Link href="/" className="mb-8">
        <Image
          src="/images/logo-black.png"
          alt="Loquia"
          width={150}
          height={40}
          className="hover:opacity-80 transition-opacity"
          priority
        />
      </Link>

      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md border border-[#e0e0e0]">
        <h1 className="text-3xl font-bold text-[#22223b] text-center mb-2">Criar conta</h1>
        <p className="text-center text-gray-600 mb-6">Preencha os campos abaixo</p>

        <form onSubmit={handleSignup} className="space-y-6">

        <input
          type="email"
          placeholder="Seu e-mail"
          className="w-full border p-3 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full border p-3 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ffe066] hover:bg-[#ffd43b] text-black font-semibold p-3 rounded-lg transition"
          >
            {loading ? "Criando..." : "Criar conta"}
          </button>

          {message && (
            <p className="text-center text-sm text-gray-700 mt-4">{message}</p>
          )}

          <p className="text-center text-sm text-gray-600 mt-4">
            Já tem conta?{" "}
            <a href="/login" className="text-blue-600 underline">
              Fazer login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
