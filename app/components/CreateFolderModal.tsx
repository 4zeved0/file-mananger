'use client'

import { useState } from "react";
import { supabase } from "../lib/supabase";

type CreateFolderModalProps = {
  path: string; // Caminho da pasta onde a nova pasta será criada
  onClose: () => void; // Função para fechar o modal
  onSuccess: () => void; // Função para atualizar a visualização após sucesso
};

export default function CreateFolderModal({
  path,
  onClose,
  onSuccess,
}: CreateFolderModalProps) {
  const [folderName, setFolderName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const createFolder = async () => {
    if (!folderName.trim()) {
      setErrorMessage("O nome da pasta não pode ser vazio.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const folderPath = `${path}/${folderName}/.keep`;

    const { error } = await supabase.storage
      .from("aplicationstorage")
      .upload(folderPath, new Blob([""]), {
        contentType: "text/plain",
        upsert: false,
      });

    if (error) {
      setErrorMessage("Erro ao criar a pasta.");
      setSuccessMessage(null);
    } else {
      setFolderName("");
      setSuccessMessage("Pasta criada com sucesso!");
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      onClick={onClose} // Fechar modal ao clicar fora
    >
      <div
        className="bg-gray-800 p-6 rounded-md w-96"
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro
      >
        <h3 className="text-xl text-white mb-4">Criar Nova Pasta</h3>

        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        {successMessage && <div className="text-green-500">{successMessage}</div>}

        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Nome da pasta"
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded-md"
        />

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={createFolder}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            {loading ? "Criando..." : "Criar Pasta"}
          </button>
        </div>
      </div>
    </div>
  );
}
