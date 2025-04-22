// FileUploadModal.tsx
'use client'

import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi"; // Importando o ícone de upload
import { supabase } from "../lib/supabase";

type FileUploadModalProps = {
  path: string;
  onClose: () => void;
  onSuccess: () => void;
};

export default function FileUploadModal({
  path,
  onClose,
  onSuccess,
}: FileUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const uploadFile = async () => {
    if (!file) {
      setErrorMessage("Selecione um arquivo para enviar.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const { error } = await supabase.storage
      .from("aplicationstorage")
      .upload(`${path}/${file.name}`, file);

    if (error) {
      setErrorMessage("Erro ao enviar o arquivo.");
      console.error(error);
      setSuccessMessage(null);
    } else {
      setFile(null); // Limpar arquivo após sucesso
      setSuccessMessage("Arquivo enviado com sucesso!");
      onSuccess(); // Atualizar a visualização
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/90 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-md w-96">
        <h3 className="text-xl text-white mb-4">Enviar Arquivo</h3>

        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        {successMessage && <div className="text-green-500">{successMessage}</div>}

        <label className="w-full mb-4 flex flex-col items-center text-white cursor-pointer">
          <div className="flex items-center p-3 rounded-md transition-all duration-200 hover:underline">
            <span>Clique para selecionar um arquivo</span>
          </div>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="hidden"
          />
        </label>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={uploadFile}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            {loading ? "Enviando..." : "Enviar Arquivo"}
          </button>
        </div>
      </div>
    </div>
  );
}
