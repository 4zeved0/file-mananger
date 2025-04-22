'use client'

import { useState, useEffect } from "react";
import FileManager from "../components/FileManager";
import { FiMenu, FiX } from "react-icons/fi";

export default function DashboardPage() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 md:hidden bg-gray-800 text-white p-2 rounded-full z-10"
      >
        {sidebarVisible ? <FiX size={18} /> : <FiMenu size={18} />}
      </button>

      <div className="flex flex-col md:flex-row">
        <div
          className={`${sidebarVisible ? "block" : "hidden"} md:block w-full md:w-96 text-white rounded-l-xl h-screen bg-gray-900 transition-all duration-300 ease-in-out`}
        >
          <FileManager />
        </div>

        {!sidebarVisible && (
          <div className="flex-1 bg-gray-100 p-6">
            <h1 className="text-2xl font-semibold">Conteúdo Principal</h1>
            <p className="mt-4">Aqui vai o conteúdo que será exibido ao lado da sidebar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
