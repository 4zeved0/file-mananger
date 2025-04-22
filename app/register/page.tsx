"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data.error) {
      setError(data.error);
    } else {
      setError(null);
      router.push("/");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center sm:bg-transparent bg-white">
      <div className="bg-white rounded-xl px-10 py-12 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Criar Conta</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
          <input
            type="text"
            name="username"
            placeholder="Nome de Usuário"
            value={formData.username}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
          <input
            type="text"
            name="fullname"
            placeholder="Nome Completo"
            value={formData.fullname}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded transition disabled:bg-emerald-300"
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Já tem uma conta?{" "}
          <a href="/login" className="text-emerald-600 hover:underline">
            Faça login aqui
          </a>
        </p>
      </div>
    </main>
  );
}
