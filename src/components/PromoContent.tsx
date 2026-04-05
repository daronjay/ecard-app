import Link from "next/link";
import { promoFeatures } from "@/lib/promo-data";

export default function PromoContent() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight mb-5 text-stone-900">
            Cards that mean something
          </h1>
          <p className="text-xl text-stone-500 mb-10 max-w-xl mx-auto">
            Design a beautiful, personal eCard in under a minute. Upload your
            photo, pick a style, write your message, and share it with a link.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/create"
              className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg font-medium transition-colors shadow-sm"
            >
              Make a Card
            </Link>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-8 text-center">
          What you can do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {promoFeatures.map((feature) => (
            <div
              key={feature.id}
              className="bg-white border border-stone-200 rounded-xl p-6 hover:border-stone-300 transition-colors shadow-sm"
            >
              <div
                className={`h-1 w-12 rounded-full bg-gradient-to-r ${feature.accent} mb-4`}
              />
              <h3 className="text-lg font-semibold mb-2 text-stone-800">
                {feature.headline}
              </h3>
              <p className="text-stone-500 text-sm mb-3">
                {feature.description}
              </p>
              <p className="text-stone-400 text-xs italic">
                {feature.benefitStatement}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="bg-white border border-stone-200 rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-bold mb-3 text-stone-900">
            Ready to make one?
          </h2>
          <p className="text-stone-500 mb-6">
            No sign-up required. Just start creating and download or share when
            you&apos;re done.
          </p>
          <Link
            href="/create"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white py-3 px-10 rounded-lg font-medium transition-colors shadow-sm"
          >
            Start Creating
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-8 text-center">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Pick a background",
              desc: "Choose from Sunset, Ocean, Midnight, or Confetti — with optional animation",
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
              <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-sm font-bold mx-auto mb-3 text-stone-700">
                {item.step}
              </div>
              <h3 className="font-medium mb-1 text-stone-800">{item.title}</h3>
              <p className="text-stone-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
