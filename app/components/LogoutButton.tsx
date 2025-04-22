'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="p-3 text-red-500 hover:underline rounded cursor-pointer"
    >
      Sair
    </button>
  );
}
