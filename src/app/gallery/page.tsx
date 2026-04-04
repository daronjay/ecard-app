"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CardPreview from "@/components/CardPreview";
import { CardData, defaultTextConfig } from "@/lib/types";

export default function GalleryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated") {
      fetch("/api/cards")
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data)) setCards(data);
          setLoading(false);
        });
    }
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-400">loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your cards</h1>
        <Link
          href="/create"
          className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
        >
          Create new
        </Link>
      </div>

      {cards.length === 0 ? (
        <p className="text-zinc-400">no cards yet. go make one.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Link key={card.id} href={`/card/${card.id}`} className="block">
              <div className="hover:scale-[1.02] transition-transform">
                <CardPreview
                  template={card.template}
                  photoUrl={card.photoUrl}
                  textConfig={card.textConfig || defaultTextConfig}
                />
                <p className="text-xs text-zinc-500 mt-1">{card.createdAt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
