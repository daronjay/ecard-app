"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useDirty } from "@/lib/dirty-context";

export default function Nav() {
  const { data: session } = useSession();
  const { dirty, setDirty } = useDirty();
  const router = useRouter();

  const guardedNav = (href: string) => (e: React.MouseEvent) => {
    if (dirty) {
      e.preventDefault();
      if (confirm("You have unsaved changes. Leave anyway?")) {
        setDirty(false);
        router.push(href);
      }
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-zinc-900 border-b border-zinc-800">
      <Link
        href="/"
        onClick={guardedNav("/")}
        className="flex items-center gap-2 text-lg font-bold text-zinc-100"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="5" width="20" height="14" rx="2.5" fill="#3b82f6"/>
          <rect x="2" y="5" width="20" height="14" rx="2.5" stroke="#1d4ed8" strokeWidth="0.5"/>
          <path d="M7 9.5 Q12 14 17 9.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <circle cx="9" cy="9" r="1.5" fill="#fbbf24"/>
          <circle cx="15" cy="9" r="1.5" fill="#34d399"/>
        </svg>
        eCard
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Link
          href="/create"
          onClick={guardedNav("/create")}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg font-medium transition-colors"
        >
          Create
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
