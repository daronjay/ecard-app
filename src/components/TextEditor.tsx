"use client";

import { useEffect } from "react";
import { TextConfig } from "@/lib/types";

interface Props {
  config: TextConfig;
  onChange: (config: TextConfig) => void;
}

const inputCls =
  "w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400";
const labelCls = "text-xs font-medium text-stone-500 block mb-1";

// web-safe + google fonts. google ones get dynamically loaded.
const FONTS: { name: string; value: string; google?: boolean }[] = [
  { name: "Georgia", value: "Georgia" },
  { name: "Times New Roman", value: "Times New Roman" },
  { name: "Arial", value: "Arial" },
  { name: "Verdana", value: "Verdana" },
  { name: "Courier New", value: "Courier New" },
  { name: "Playfair Display", value: "Playfair Display", google: true },
  { name: "Dancing Script", value: "Dancing Script", google: true },
  { name: "Lobster", value: "Lobster", google: true },
  { name: "Pacifico", value: "Pacifico", google: true },
  { name: "Montserrat", value: "Montserrat", google: true },
  { name: "Raleway", value: "Raleway", google: true },
  { name: "Oswald", value: "Oswald", google: true },
  { name: "Bitter", value: "Bitter", google: true },
  { name: "Lora", value: "Lora", google: true },
  { name: "Righteous", value: "Righteous", google: true },
];

const GOOGLE_FONTS_LOADED = new Set<string>();

function loadGoogleFont(family: string) {
  if (GOOGLE_FONTS_LOADED.has(family)) return;
  GOOGLE_FONTS_LOADED.add(family);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@400;700&display=swap`;
  document.head.appendChild(link);
}

export default function TextEditor({ config, onChange }: Props) {
  const update = (key: keyof TextConfig, value: string | number) => {
    onChange({ ...config, [key]: value });
  };

  // load font when it changes
  useEffect(() => {
    const font = FONTS.find((f) => f.value === config.fontFamily);
    if (font?.google) loadGoogleFont(font.value);
  }, [config.fontFamily]);

  return (
    <div className="space-y-3">
      <div>
        <label className={labelCls}>To</label>
        <input
          type="text"
          value={config.recipientName}
          onChange={(e) => update("recipientName", e.target.value)}
          placeholder="Recipient name"
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>From</label>
        <input
          type="text"
          value={config.senderName}
          onChange={(e) => update("senderName", e.target.value)}
          placeholder="Your name"
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>Date</label>
        <input
          type="date"
          value={config.date}
          onChange={(e) => update("date", e.target.value)}
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>Message</label>
        <textarea
          value={config.message}
          onChange={(e) => update("message", e.target.value)}
          rows={3}
          placeholder="Your message..."
          className={`${inputCls} resize-none`}
          style={{ fontFamily: config.fontFamily }}
        />
      </div>
      <div>
        <label className={labelCls}>Message position: {config.messageY}%</label>
        <input
          type="range"
          min={20}
          max={90}
          value={config.messageY}
          onChange={(e) => update("messageY", Number(e.target.value))}
          className="w-full accent-blue-500"
        />
      </div>

      {/* font controls */}
      <div className="pt-1 border-t border-stone-100 space-y-2">
        <div>
          <label className={labelCls}>Font</label>
          <select
            value={config.fontFamily}
            onChange={(e) => update("fontFamily", e.target.value)}
            className={inputCls}
            style={{ fontFamily: config.fontFamily }}
          >
            {FONTS.map((f) => (
              <option key={f.value} value={f.value} style={{ fontFamily: f.value }}>
                {f.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>
            Text size: {Math.round(config.fontSize * 100)}%
          </label>
          <input
            type="range"
            min={0.5}
            max={2.0}
            step={0.05}
            value={config.fontSize}
            onChange={(e) => update("fontSize", parseFloat(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
