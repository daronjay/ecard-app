"use client";

import { TextConfig } from "@/lib/types";

interface Props {
  config: TextConfig;
  onChange: (config: TextConfig) => void;
}

const inputCls =
  "w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400";
const labelCls = "text-xs font-medium text-stone-500 block mb-1";

export default function TextEditor({ config, onChange }: Props) {
  const update = (key: keyof TextConfig, value: string | number) => {
    onChange({ ...config, [key]: value });
  };

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
    </div>
  );
}
