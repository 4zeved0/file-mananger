'use client'

import { useRef, useState } from "react";
import { FiFolder, FiUploadCloud } from "react-icons/fi"; // Importando ícones de 'react-icons/fi'
import FolderView from "./FolderView";
import CreateFolderModal from "./CreateFolderModal";
import FileUploadModal from "./FileUploadModal";
import { supabase } from "../lib/supabase";

export default function FileManager() {
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [path, setPath] = useState<string>("");

  const refresh = () => { };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div
        className="w-full flex flex-col justify-between md:w-96 bg-gray-900 p-6 text-white h-screen flex-grow"
      >
        <div>
          <h2 className="text-xl font-semibold mb-6 pb-2 text-center mt-10 md:mt-0">🗂️ Arquivos</h2>

          <FolderView path={path} onDelete={(filePath) => { }} />
        </div>


        <div className="flex justify-between">
          <button
            onClick={() => {
              setShowCreateFolderModal(true);
            }}
            className="flex items-center justify-center p-3 bg-gray-700 rounded cursor-pointer"
          >
            <FiFolder size={20} />
            <span className="ml-2">Criar Pasta</span>
          </button>
          <button
            onClick={() => {
              setShowFileUploadModal(true);
            }}
            className="flex items-center justify-center p-3 bg-gray-700 rounded cursor-pointer"
          >
            <FiUploadCloud size={20} />
            <span className="ml-2">Enviar Arquivo</span>
          </button>
        </div>
      </div>

      {/* Modais */}
      {showCreateFolderModal && (
        <CreateFolderModal
          path={path}
          onClose={() => setShowCreateFolderModal(false)}
          onSuccess={() => {
            refresh();
            console.log("Pasta criada com sucesso!");
          }}
        />
      )}

      {showFileUploadModal && (
        <FileUploadModal
          path={path}
          onClose={() => setShowFileUploadModal(false)}
          onSuccess={() => {
            refresh();
            console.log("Arquivo enviado com sucesso!");
          }}
        />

      )}
    </div>
  );
}
