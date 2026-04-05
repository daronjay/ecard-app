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
        className="text-lg font-bold text-zinc-100"
      >
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
