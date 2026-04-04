"use client";

import { templates, getTemplateStyles, getAnimClass } from "@/lib/templates";

interface Props {
  selected: string;
  onSelect: (id: string) => void;
  animated: boolean;
  onToggleAnimated: (v: boolean) => void;
}

export default function TemplatePicker({
  selected,
  onSelect,
  animated,
  onToggleAnimated,
}: Props) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-4 gap-2">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`
              h-16 rounded-lg text-xs font-medium transition-all
              ${selected === t.id ? "ring-2 ring-blue-400 scale-105" : "ring-1 ring-zinc-700 hover:ring-zinc-500"}
              ${animated && selected === t.id ? getAnimClass(t.id) : ""}
            `}
            style={getTemplateStyles(t.id)}
          >
            {t.name}
          </button>
        ))}
      </div>
      <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={animated}
          onChange={(e) => onToggleAnimated(e.target.checked)}
          className="rounded border-zinc-600 bg-zinc-800 text-blue-500 focus:ring-blue-500"
        />
        Animated background
      </label>
    </div>
  );
}
