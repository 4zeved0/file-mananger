import Link from "next/link";
import { auth } from "../lib/auth";
import ProfileButton from "./ProfileButton";

export default async function Navbar() {
  const session = await auth();
  console.log(session);
  const isAdmin = session?.user?.role === 'admin';

  return (
    <>
      <header className="bg-gray-800 text-white fixed top-0 left-0 w-full z-50 shadow-md">
        <nav
          aria-label="Main navigation"
          className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center"
        >
          <Link href="/" className="text-xl font-bold">
            No<span className="text-emerald-500">ted.</span>
          </Link>

          {session ? (
            <div className="flex items-center gap-4">
              {isAdmin && (
                <span className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-sm rounded transition duration-200">
                  ADM
                </span>
              )}
              <ProfileButton />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-sm rounded transition duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm text-white underline hover:text-gray-200 transition duration-200"
              >
                Registrar
              </Link>
            </div>
          )}
        </nav>
      </header>
      <div className="text-">oi</div>
    </>
  );
}
