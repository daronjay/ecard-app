"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import { TextConfig, defaultTextConfig } from "@/lib/types";
import CardPreview from "@/components/CardPreview";
import PhotoUpload from "@/components/PhotoUpload";
import TemplatePicker from "@/components/TemplatePicker";
import TextEditor from "@/components/TextEditor";

export default function CreatePage() {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  const [template, setTemplate] = useState("gradient-sunset");
  const [animated, setAnimated] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [textConfig, setTextConfig] = useState<TextConfig>({
    ...defaultTextConfig,
    date: new Date().toISOString().split("T")[0],
  });
  const [saving, setSaving] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, {
      useCORS: true,
      scale: 2, // retina quality
      backgroundColor: null,
    });
    const link = document.createElement("a");
    link.download = "ecard.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photoUrl, template, textConfig, animated }),
    });
    const data = await res.json();
    setSaving(false);
    if (data.id) {
      router.push(`/card/${data.id}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* controls */}
        <div className="space-y-6">
          <section>
            <h2 className="text-sm font-medium text-zinc-400 mb-2">Photo</h2>
            <PhotoUpload onUpload={setPhotoUrl} currentUrl={photoUrl} />
          </section>

          <section>
            <h2 className="text-sm font-medium text-zinc-400 mb-2">
              Background
            </h2>
            <TemplatePicker
              selected={template}
              onSelect={setTemplate}
              animated={animated}
              onToggleAnimated={setAnimated}
            />
          </section>

          <section>
            <h2 className="text-sm font-medium text-zinc-400 mb-2">Text</h2>
            <TextEditor config={textConfig} onChange={setTextConfig} />
          </section>

          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              Download PNG
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {saving ? "saving..." : "Save & Share"}
            </button>
          </div>
        </div>

        {/* live preview */}
        <div className="md:sticky md:top-6 self-start">
          <h2 className="text-sm font-medium text-zinc-400 mb-2">Preview</h2>
          <CardPreview
            ref={cardRef}
            template={template}
            photoUrl={photoUrl}
            textConfig={textConfig}
            animated={animated}
          />
        </div>
      </div>
    </div>
  );
}
