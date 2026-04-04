"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Nav() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-zinc-900 border-b border-zinc-800">
      <Link href="/" className="text-lg font-bold text-zinc-100">
        eCard
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Link href="/create" className="text-zinc-300 hover:text-white">
          Create
        </Link>
        <Link href="/promo" className="text-zinc-300 hover:text-white">
          Promo
        </Link>
        {session ? (
          <>
            <Link href="/gallery" className="text-zinc-300 hover:text-white">
              Gallery
            </Link>
            <button
              onClick={() => signOut()}
              className="text-zinc-400 hover:text-white"
            >
              Sign out
            </button>
          </>
        ) : (
          <Link href="/login" className="text-zinc-300 hover:text-white">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
