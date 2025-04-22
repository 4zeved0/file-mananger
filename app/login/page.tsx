'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) router.push("/");
    else alert("Erro ao fazer login");
  };

  return (
    <main className="min-h-screen flex items-center justify-center sm:bg-transparent bg-white">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-xl px-8 py-10 w-full max-w-md flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Entrar na conta</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />

        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded transition"
        >
          Entrar
        </button>

        <p className="text-sm text-center text-gray-500">
          Não tem conta? <a href="/register" className="text-emerald-600 hover:underline">Registrar</a>
        </p>
      </form>
    </main>
  );
}
