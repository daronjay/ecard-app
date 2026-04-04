"use client";

import { TextConfig } from "@/lib/types";

interface Props {
  config: TextConfig;
  onChange: (config: TextConfig) => void;
}

export default function TextEditor({ config, onChange }: Props) {
  const update = (key: keyof TextConfig, value: string | number) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs text-zinc-400 block mb-1">To</label>
        <input
          type="text"
          value={config.recipientName}
          onChange={(e) => update("recipientName", e.target.value)}
          placeholder="Recipient name"
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-400 focus:outline-none"
        />
      </div>
      <div>
        <label className="text-xs text-zinc-400 block mb-1">From</label>
        <input
          type="text"
          value={config.senderName}
          onChange={(e) => update("senderName", e.target.value)}
          placeholder="Your name"
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-400 focus:outline-none"
        />
      </div>
      <div>
        <label className="text-xs text-zinc-400 block mb-1">Date</label>
        <input
          type="date"
          value={config.date}
          onChange={(e) => update("date", e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-400 focus:outline-none"
        />
      </div>
      <div>
        <label className="text-xs text-zinc-400 block mb-1">Message</label>
        <textarea
          value={config.message}
          onChange={(e) => update("message", e.target.value)}
          rows={3}
          placeholder="Your message..."
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-100 focus:border-blue-400 focus:outline-none resize-none"
        />
      </div>
      <div>
        <label className="text-xs text-zinc-400 block mb-1">
          Message position: {config.messageY}%
        </label>
        <input
          type="range"
          min={20}
          max={90}
          value={config.messageY}
          onChange={(e) => update("messageY", Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}
