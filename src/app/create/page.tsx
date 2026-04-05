"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import { TextConfig, defaultTextConfig } from "@/lib/types";
import { useDirty } from "@/lib/dirty-context";
import CardPreview from "@/components/CardPreview";
import PhotoUpload from "@/components/PhotoUpload";
import TemplatePicker from "@/components/TemplatePicker";
import TextEditor from "@/components/TextEditor";

export default function CreatePage() {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const { setDirty } = useDirty();

  const [template, setTemplate] = useState("gradient-sunset");
  const [animated, setAnimated] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [format, setFormat] = useState<"landscape" | "portrait">("landscape");
  const [textConfig, setTextConfig] = useState<TextConfig>({
    ...defaultTextConfig,
    date: new Date().toISOString().split("T")[0],
  });
  const [saving, setSaving] = useState(false);

  const markDirty = () => setDirty(true);

  // browser close/refresh guard
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
      setDirty(false);
    };
  }, [setDirty]);

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

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        photoUrl,
        template,
        textConfig,
        animated,
        format,
      }),
    });
    const data = await res.json();
    setSaving(false);
    if (data.id) {
      setDirty(false);
      router.push(`/card/${data.id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* controls panel */}
        <div className="space-y-7">
          <section>
            <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-3">
              Photo
            </h2>
            <PhotoUpload
              onUpload={(url) => {
                setPhotoUrl(url);
                markDirty();
              }}
              currentUrl={photoUrl}
            />
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-widest">
                Background
              </h2>
            </div>
            <TemplatePicker
              selected={template}
              onSelect={(t) => {
                setTemplate(t);
                markDirty();
              }}
              animated={animated}
              onToggleAnimated={(v) => {
                setAnimated(v);
                markDirty();
              }}
            />
          </section>

          <section>
            <div className="flex items-center gap-4 mb-3">
              <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-widest">
                Format
              </h2>
              <div className="flex gap-1 bg-stone-200 rounded-lg p-1">
                <button
                  onClick={() => {
                    setFormat("landscape");
                    markDirty();
                  }}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    format === "landscape"
                      ? "bg-white text-stone-800 shadow-sm"
                      : "text-stone-500 hover:text-stone-700"
                  }`}
                >
                  Landscape
                </button>
                <button
                  onClick={() => {
                    setFormat("portrait");
                    markDirty();
                  }}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    format === "portrait"
                      ? "bg-white text-stone-800 shadow-sm"
                      : "text-stone-500 hover:text-stone-700"
                  }`}
                >
                  Portrait
                </button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-3">
              Text
            </h2>
            <TextEditor
              config={textConfig}
              onChange={(c) => {
                setTextConfig(c);
                markDirty();
              }}
            />
          </section>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleDownload}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              Download PNG
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-stone-800 hover:bg-stone-700 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
            >
              {saving ? "saving..." : "Save & Share"}
            </button>
          </div>
        </div>

        {/* live preview — sticky on desktop */}
        <div className="lg:sticky lg:top-8 self-start">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-3">
            Preview
          </h2>
          <CardPreview
            ref={cardRef}
            template={template}
            photoUrl={photoUrl}
            textConfig={textConfig}
            animated={animated}
            format={format}
          />
        </div>
      </div>
    </div>
  );
}
