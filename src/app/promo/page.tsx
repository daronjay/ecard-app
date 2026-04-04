import Link from "next/link";
import { promoFeatures } from "@/lib/promo-data";

export default function PromoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-pink-600/20" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Cards that mean something
          </h1>
          <p className="text-xl text-zinc-300 mb-8 max-w-xl mx-auto">
            Design a beautiful, personal eCard in under a minute. Upload your
            photo, pick a style, write your message, and share it with a link.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/create"
              className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg font-medium transition-colors"
            >
              Make a Card
            </Link>
            <Link
              href="/promo/social"
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 py-3 px-8 rounded-lg font-medium transition-colors border border-zinc-700"
            >
              Social Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-8 text-center">
          What you can do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promoFeatures.map((feature) => (
            <div
              key={feature.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
            >
              {/* accent bar */}
              <div
                className={`h-1 w-12 rounded-full bg-gradient-to-r ${feature.accent} mb-4`}
              />
              <h3 className="text-lg font-semibold mb-2">{feature.headline}</h3>
              <p className="text-zinc-400 text-sm mb-3">
                {feature.description}
              </p>
              <p className="text-zinc-500 text-xs italic">
                {feature.benefitStatement}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10">
          <h2 className="text-2xl font-bold mb-3">Ready to make one?</h2>
          <p className="text-zinc-400 mb-6">
            No sign-up required. Just start creating and download or share when
            you&apos;re done.
          </p>
          <Link
            href="/create"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white py-3 px-10 rounded-lg font-medium transition-colors"
          >
            Start Creating
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-8 text-center">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Pick a background",
              desc: "Choose from Sunset, Ocean, Midnight, or Confetti -- with optional animation",
            },
            {
              step: "2",
              title: "Add your photo",
              desc: "Drag and drop or click to upload",
            },
            {
              step: "3",
              title: "Write your message",
              desc: "Names, date, and a heartfelt note",
            },
            {
              step: "4",
              title: "Share or download",
              desc: "Get a link or a crisp PNG file",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-bold mx-auto mb-3">
                {item.step}
              </div>
              <h3 className="font-medium mb-1">{item.title}</h3>
              <p className="text-zinc-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
