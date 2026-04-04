"use client";

import { templates, getTemplateStyles } from "@/lib/templates";

interface Props {
  selected: string;
  onSelect: (id: string) => void;
}

export default function TemplatePicker({ selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`
            h-16 rounded-lg text-xs font-medium transition-all
            ${selected === t.id ? "ring-2 ring-blue-400 scale-105" : "ring-1 ring-zinc-700 hover:ring-zinc-500"}
          `}
          style={getTemplateStyles(t.id)}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}
