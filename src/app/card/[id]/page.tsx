"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import html2canvas from "html2canvas";
import CardPreview from "@/components/CardPreview";
import { CardData, defaultTextConfig } from "@/lib/types";

export default function CardPage() {
  const { id } = useParams();
  const cardRef = useRef<HTMLDivElement>(null);
  const [card, setCard] = useState<CardData | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/cards/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setCard(data);
      });
  }, [id]);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, {
      useCORS: true,
      scale: 2,
      backgroundColor: null,
    });
    const link = document.createElement("a");
    link.download = "ecard.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-400">{error}</p>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-400">loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <CardPreview
        ref={cardRef}
        template={card.template}
        photoUrl={card.photoUrl}
        textConfig={card.textConfig || defaultTextConfig}
        animated={card.animated}
      />
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleDownload}
          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
        >
          Download
        </button>
        <button
          onClick={handleCopyLink}
          className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
        >
          {copied ? "copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
