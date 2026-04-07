"use client";

import Link from "next/link";

// mini card previews — pure CSS, no image deps needed
const sampleCards = [
  {
    bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #f093fb 100%)",
    textColor: "#fff",
    to: "Sarah",
    from: "Jake",
    msg: "Happy Birthday!",
    rotate: "-2deg",
  },
  {
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    textColor: "#fff",
    to: "Mum",
    from: "The kids",
    msg: "Thinking of you",
    rotate: "1.5deg",
  },
  {
    bg: "#1a1a2e",
    textColor: "#e0e0ff",
    to: "Alex",
    from: "Team",
    msg: "Congratulations!",
    rotate: "-1deg",
  },
  {
    bg: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    textColor: "#fff",
    to: "Gran",
    from: "All of us",
    msg: "With love ♡",
    rotate: "2deg",
  },
];

export default function PromoContent() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 text-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* decorative blob */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-purple-200/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-pink-200/40 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          {/* logo mark */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-white rounded-2xl px-5 py-3 shadow-md">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="5" width="20" height="14" rx="2.5" fill="#3b82f6"/>
                <path d="M7 9.5 Q12 14 17 9.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <circle cx="9" cy="9" r="1.5" fill="#fbbf24"/>
                <circle cx="15" cy="9" r="1.5" fill="#34d399"/>
              </svg>
              <span className="text-xl font-bold text-stone-800">eCard</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-5 text-stone-900">
            Cards that actually{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              mean something
            </span>
          </h1>
          <p className="text-xl text-stone-500 mb-10 max-w-xl mx-auto leading-relaxed">
            Upload a photo, pick a background, write your message. Done in under a minute. No signup needed.
          </p>

          {/* big CTA */}
          <Link
            href="/create"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white py-4 px-10 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-blue-200 hover:shadow-blue-300"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="2" y="4" width="16" height="12" rx="2" stroke="#fff" strokeWidth="1.5"/>
              <path d="M6 8 Q10 12 14 8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
            Make a Card — it&apos;s free
          </Link>
        </div>

        {/* sample card previews */}
        <div className="relative max-w-3xl mx-auto mt-16 flex justify-center gap-4 flex-wrap">
          {sampleCards.map((card, i) => (
            <div
              key={i}
              className="w-44 h-28 rounded-xl shadow-xl flex-shrink-0 flex flex-col justify-between p-3 overflow-hidden"
              style={{
                background: card.bg,
                color: card.textColor,
                transform: `rotate(${card.rotate})`,
                transition: "transform 0.2s ease",
              }}
            >
              <div className="text-xs font-semibold opacity-90">Dear {card.to}</div>
              <div className="text-sm font-bold text-center drop-shadow">{card.msg}</div>
              <div className="text-xs opacity-70 text-right">From {card.from}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-10 text-center">
          How it works
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: "1", title: "Pick a background", sub: "Gradients, patterns, animated" },
            { n: "2", title: "Drop your photo", sub: "Drag it right onto the card" },
            { n: "3", title: "Write your message", sub: "To, from, date, message" },
            { n: "4", title: "Download or share", sub: "PNG file or shareable link" },
          ].map((s) => (
            <div key={s.n} className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mx-auto shadow-md shadow-blue-100">
                {s.n}
              </div>
              <div className="font-semibold text-stone-800 text-sm">{s.title}</div>
              <div className="text-xs text-stone-400">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-2xl mx-auto px-6 pb-24 text-center">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-10 shadow-xl">
          <h2 className="text-2xl font-bold mb-3 text-white">
            Ready to make one?
          </h2>
          <p className="text-blue-100 mb-6 text-sm">
            No account needed. Create, download, or share — it&apos;s all free.
          </p>
          <Link
            href="/create"
            className="inline-block bg-white hover:bg-blue-50 text-blue-700 font-semibold py-3 px-10 rounded-xl transition-colors shadow-md"
          >
            Start Creating
          </Link>
        </div>
      </section>
    </div>
  );
}
