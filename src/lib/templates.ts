export interface Template {
  id: string;
  name: string;
  // css background value - could be gradient, solid, pattern via svg data uri, whatever
  background: string;
  // text color that works on this bg
  textColor: string;
  // css class for animation - only applied when animated mode is on
  animClass?: string;
}

export const templates: Template[] = [
  {
    id: "gradient-sunset",
    name: "Sunset",
    background:
      "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #f093fb 100%)",
    textColor: "#fff",
    animClass: "anim-shift",
  },
  {
    id: "gradient-ocean",
    name: "Ocean",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    textColor: "#fff",
    animClass: "anim-pulse",
  },
  {
    id: "solid-dark",
    name: "Midnight",
    background: "#1a1a2e",
    textColor: "#e0e0ff",
    animClass: "anim-glow",
  },
  {
    id: "pattern-dots",
    name: "Confetti",
    // radial dot pattern via css - looks festive enough
    background: `
      radial-gradient(circle, #ff6b6b 1px, transparent 1px),
      radial-gradient(circle, #4ecdc4 1px, transparent 1px),
      radial-gradient(circle, #ffe66d 1px, transparent 1px),
      linear-gradient(135deg, #2d1b69 0%, #11998e 100%)
    `.trim(),
    textColor: "#fff",
    animClass: "anim-confetti",
  },
];

// extra css for the confetti dots pattern
export function getTemplateStyles(templateId: string): React.CSSProperties {
  const template = templates.find((t) => t.id === templateId);
  if (!template) return {};

  const base: React.CSSProperties = {
    background: template.background,
    color: template.textColor,
  };

  if (templateId === "pattern-dots") {
    return {
      ...base,
      backgroundSize: "30px 30px, 40px 40px, 25px 25px, 100% 100%",
      backgroundPosition: "0 0, 15px 15px, 7px 7px, 0 0",
    };
  }

  return base;
}

export function getTemplate(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}

export function getAnimClass(templateId: string): string {
  const t = templates.find((t) => t.id === templateId);
  return t?.animClass || "";
}
