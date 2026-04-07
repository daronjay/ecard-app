export interface Template {
  id: string;
  name: string;
  // css background value - could be gradient, solid, pattern via svg data uri, whatever
  background: string;
  // text color that works on this bg
  textColor: string;
  // css class for animation - only applied when animated mode is on
  animClass?: string;
  // optional extra inline styles (bg-size, bg-position etc)
  extraStyles?: React.CSSProperties;
}

export const templates: Template[] = [
  // --- originals ---
  {
    id: "gradient-sunset",
    name: "Sunset",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #f093fb 100%)",
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
    background: `radial-gradient(circle, #ff6b6b 1px, transparent 1px),
      radial-gradient(circle, #4ecdc4 1px, transparent 1px),
      radial-gradient(circle, #ffe66d 1px, transparent 1px),
      linear-gradient(135deg, #2d1b69 0%, #11998e 100%)`,
    textColor: "#fff",
    animClass: "anim-confetti",
    extraStyles: {
      backgroundSize: "30px 30px, 40px 40px, 25px 25px, 100% 100%",
      backgroundPosition: "0 0, 15px 15px, 7px 7px, 0 0",
    },
  },

  // --- new ---
  {
    id: "gradient-rose-gold",
    name: "Rose Gold",
    background: "linear-gradient(135deg, #f8b4c8 0%, #e8a87c 50%, #f4d03f 100%)",
    textColor: "#5d2c1a",
    animClass: "anim-shift",
  },
  {
    id: "gradient-aurora",
    name: "Aurora",
    background: "linear-gradient(135deg, #0f3460 0%, #16213e 30%, #0f3460 60%, #533483 100%)",
    textColor: "#a3f7bf",
    animClass: "anim-shift",
  },
  {
    id: "gradient-forest",
    name: "Forest",
    background: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
    textColor: "#e8f5e9",
    animClass: "anim-pulse",
  },
  {
    id: "gradient-peach",
    name: "Peach",
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    textColor: "#7c3d2a",
  },
  {
    id: "gradient-sky",
    name: "Sky",
    background: "linear-gradient(180deg, #87ceeb 0%, #e0f4ff 50%, #fff9c4 100%)",
    textColor: "#1a4a6e",
  },
  {
    id: "gradient-candy",
    name: "Candy",
    background: "linear-gradient(135deg, #f953c6 0%, #b91d73 100%)",
    textColor: "#fff",
    animClass: "anim-shift",
  },
  {
    id: "gradient-tropical",
    name: "Tropical",
    background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    textColor: "#003d2e",
    animClass: "anim-pulse",
  },
  {
    id: "gradient-space",
    name: "Space",
    background: "radial-gradient(ellipse at 20% 50%, #16213e 0%, #0f3460 40%, #1a1a2e 100%)",
    textColor: "#c8d6e5",
    animClass: "anim-glow",
  },
  {
    id: "gradient-gold",
    name: "Gold",
    background: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
    textColor: "#3d2000",
  },
  {
    id: "gradient-lavender",
    name: "Lavender",
    background: "linear-gradient(135deg, #c3cfe2 0%, #d4a5d5 100%)",
    textColor: "#3b1f4a",
  },
  {
    id: "gradient-ember",
    name: "Ember",
    background: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)",
    textColor: "#fff",
    animClass: "anim-shift",
  },
  {
    id: "solid-cream",
    name: "Cream",
    background: "#fdf8f0",
    textColor: "#3d2e1a",
  },
  {
    id: "solid-slate",
    name: "Slate",
    background: "#334155",
    textColor: "#e2e8f0",
  },
  // stripes pattern
  {
    id: "pattern-stripes",
    name: "Stripes",
    background: `repeating-linear-gradient(
      45deg,
      #667eea,
      #667eea 10px,
      #764ba2 10px,
      #764ba2 20px
    )`,
    textColor: "#fff",
    animClass: "anim-stripe",
  },
  // checkerboard-ish
  {
    id: "pattern-grid",
    name: "Grid",
    background: `
      linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px),
      linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)
    `,
    textColor: "#e0e8ff",
    extraStyles: {
      backgroundSize: "20px 20px, 20px 20px, 100% 100%",
    },
  },
];

export function getTemplateStyles(templateId: string): React.CSSProperties {
  const template = templates.find((t) => t.id === templateId);
  if (!template) return {};
  return {
    background: template.background,
    color: template.textColor,
    ...(template.extraStyles || {}),
  };
}

export function getTemplate(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}

export function getAnimClass(templateId: string): string {
  const t = templates.find((t) => t.id === templateId);
  return t?.animClass || "";
}
