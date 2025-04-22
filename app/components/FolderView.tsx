'use client'

import { useState, useEffect } from "react";
import FileItem from "./FileItem";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { supabase } from "../lib/supabase";

type FolderViewProps = {
  path: string;
  onDelete: (filePath: string) => void;
  level?: number;
};

export default function FolderView({ path, onDelete, level = 0 }: FolderViewProps) {
  const [files, setFiles] = useState<any[]>([]);
  const [openFolders, setOpenFolders] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFiles(folder: string) {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from("aplicationstorage")
        .list(folder, {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });

      if (error) {
        console.error(error);
        return;
      }
      setFiles(data || []);
      setLoading(false);
    }

    fetchFiles(path);
  }, [path]);

  const toggleFolder = (folderName: string) => {
    const fullPath = path ? `${path}/${folderName}` : folderName;
    setOpenFolders((prev) => ({
      ...prev,
      [fullPath]: !prev[fullPath],
    }));
  };

  return (
    <div>
      {files.map((file) => {
        const filePath = path ? `${path}/${file.name}` : file.name;
        const isFolder = file.metadata === null;

        return (
          <div key={filePath} style={{ marginLeft: `${level * 16}px` }}>
            {isFolder ? (
              <>
                <button
                  onClick={() => toggleFolder(file.name)}
                  className="flex items-center text-left text-gray-400 hover:text-gray-300 transition-all duration-200 w-full"
                >
                  <span className="text-lg">
                    {openFolders[filePath] ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
                  </span>
                  <span className="text-sm font-medium">{file.name.replace("/", "")}</span>
                </button>
                {openFolders[filePath] && (
                  <FolderView path={filePath} onDelete={onDelete} level={level + 1} />
                )}
              </>
            ) : (
              <FileItem key={filePath} filePath={filePath} fileName={file.name} onDelete={onDelete} />
            )}
          </div>
        );
      })}
    </div>
  );
}
