'use client'

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { signOut } from "next-auth/react"
import { GoChevronDown, GoChevronRight } from "react-icons/go"
import { FaUser, FaCog, FaCrown, FaSignOutAlt } from "react-icons/fa"

function ProfileButton() {
  const [profileOpen, setProfileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navigation = [
    { label: 'Perfil', href: '/', icon: <FaUser /> },
    { label: 'Configurações', href: '/', icon: <FaCog /> },
    { label: 'Plano', href: '/', icon: <FaCrown /> },
  ]

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setProfileOpen(prevState => !prevState)}
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-sm text-white rounded flex items-center gap-2 transition duration-200"
      >
        Perfil
        {profileOpen ? <GoChevronDown /> : <GoChevronRight />}
      </button>

      {profileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg z-50 animate-fade-in-down">
          {navigation.map((item) => (
            <Link
              key={item.label} // Use a chave única mais significativa (como label)
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-gray-700 transition rounded"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-gray-700 transition w-full text-left rounded"
          >
            <FaSignOutAlt />
            Sair
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfileButton
