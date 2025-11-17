"use client";
import { useState } from "react";

const initialState = {
  title: "",
  description: "",
  category: "",
  photo: "",
  price: "",
  address: "",
  whatsapp: "",
  site: "",
};

export default function CatalogPage() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiUrl}/catalog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao salvar catálogo");
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f9fafb] py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-[#22223b] mb-10">Editar Catálogo</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-2xl flex flex-col gap-6 border border-[#e9ecef]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium text-[#22223b]">Título</label>
            <input id="title" name="title" type="text" required value={form.title} onChange={handleChange} className="rounded-lg border border-[#e9ecef] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#3a86ff] bg-[#f9fafb]" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-sm font-medium text-[#22223b]">Categoria</label>
            <input id="category" name="category" type="text" required value={form.category} onChange={handleChange} className="rounded-lg border border-[#e9ecef] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#3a86ff] bg-[#f9fafb]" />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="description" className="text-sm font-medium text-[#22223b]">Descrição</label>
            <textarea id="description" name="description" required value={form.description} onChange={handleChange} className="rounded-lg border border-[#e9ecef] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#3a86ff] bg-[#f9fafb] min-h-[80px]" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="text-sm font-medium text-[#22223b]">Preço</label>
            <input id="price" name="price" type="text" value={form.price} onChange={handleChange} className="rounded-lg border border-[#e9ecef] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#3a86ff] bg-[#f9fafb]" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="photo" className="text-sm font-medium text-[#22223b]">Foto (URL)</label>
            <input id="photo" name="photo" type="text" value={form.photo} onChange={handleChange} className="rounded-lg border border-[#e9ecef] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#3a86ff] bg-[#f9fafb]" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="text-sm font-medium text-[#22223b]">Endereço</label>
            <input id="address" name="address" type="text" value={form.address} onChange={handleChange} className="rounded-lg border border-[#e9ecef] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#3a86ff] bg-[#f9fafb]" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="whatsapp" className="text-sm font-medium text-[#22223b]">WhatsApp</label>
            <input id="whatsapp" name="whatsapp" type="text" value={form.whatsapp} onChange={handleChange} className="rounded-lg border border-[#e9ecef] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#3a86ff] bg-[#f9fafb]" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="site" className="text-sm font-medium text-[#22223b]">Site</label>
            <input id="site" name="site" type="text" value={form.site} onChange={handleChange} className="rounded-lg border border-[#e9ecef] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#3a86ff] bg-[#f9fafb]" />
          </div>
        </div>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        {success && <div className="text-green-600 text-sm text-center">Catálogo salvo com sucesso!</div>}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#3a86ff] to-[#00b4d8] text-white text-lg font-bold shadow-lg border-2 border-[#3a86ff] hover:from-[#265d97] hover:to-[#0096c7] hover:scale-105 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
