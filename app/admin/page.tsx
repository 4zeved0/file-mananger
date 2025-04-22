"use client";

import { useSession } from "next-auth/react";

export default function AdminPanel() {
  const { data: session, status } = useSession();

  if (status === "loading") { return <div>Carregando...</div> }

  const handleInvalidateSessions = async () => {
    const res = await fetch("/api/admin/invalidate-sessions", {
      method: "POST",
    });
    if (res.ok) {
      alert("✅ Sessões derrubadas com sucesso!");
    } else {
      alert("❌ Erro ao derrubar sessões.");
    }
  };

  if (session?.user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-6 bg-white rounded-xl shadow-md text-center">
          <p className="text-lg font-semibold text-red-500">Acesso negado</p>
          <p className="text-sm text-gray-500">Você não tem permissão para acessar essa página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Painel Admin</h1>
        <p className="text-gray-600 mb-8">Use o botão abaixo para derrubar todas as sessões ativas.</p>
        <button
          onClick={handleInvalidateSessions}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 w-full"
        >
          Derrubar Sessões
        </button>
      </div>
    </div>
  );
}
