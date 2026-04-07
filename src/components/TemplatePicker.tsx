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
    <div className="space-y-3">
      <div className="grid grid-cols-5 gap-1.5 max-h-52 overflow-y-auto pr-1">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            title={t.name}
            className={`
              h-12 rounded-lg text-xs font-medium transition-all
              ${selected === t.id ? "ring-2 ring-blue-400 scale-105 z-10 relative" : "ring-1 ring-zinc-700 hover:ring-zinc-500"}
              ${animated && selected === t.id ? getAnimClass(t.id) : ""}
            `}
            style={getTemplateStyles(t.id)}
          >
            <span className="drop-shadow text-[10px]">{t.name}</span>
          </button>
        ))}
      </div>
      <label className="flex items-center gap-2 text-sm text-stone-500 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={animated}
          onChange={(e) => onToggleAnimated(e.target.checked)}
          className="rounded border-stone-300 bg-white text-blue-500 focus:ring-blue-500"
        />
        Animated background
      </label>
    </div>
  );
}
