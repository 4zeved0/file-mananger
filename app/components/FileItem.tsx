// components/FileItem.tsx
import { FiTrash } from "react-icons/fi";
import { supabase } from "../lib/supabase";
import { GoDownload } from "react-icons/go";


type FileItemProps = {
  filePath: string;
  fileName: string;
  onDelete: (filePath: string) => void;
};

export default function FileItem({ filePath, fileName, onDelete }: FileItemProps) {
  const downloadFile = async () => {
    const { data, error } = await supabase.storage.from("aplicationstorage").download(filePath);
    if (error) {
      console.error("Erro ao baixar o arquivo:", error);
      return;
    }

    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex justify-between items-center transition-all duration-200">
      <span className="text-sm text-gray-300">📄{fileName}</span>
      <div className="flex gap-2">
        <button
          onClick={downloadFile}
          className="text-green-500 hover:text-green-300 text-xs transition-all duration-200 cursor-pointer"
        >
          <GoDownload size={16} />
        </button>
        <button
          onClick={() => onDelete(filePath)}
          className="text-red-500 hover:text-red-300 text-xs transition-all duration-200 cursor-pointer"
        >
          <FiTrash size={16} />
        </button>
      </div>
    </div>
  );
}
