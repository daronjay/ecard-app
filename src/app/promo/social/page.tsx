"use client";

import { useState } from "react";
import { socialPosts } from "@/lib/promo-data";
import Link from "next/link";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-1.5 px-3 rounded transition-colors border border-zinc-700"
    >
      {copied ? "Copied!" : "Copy text"}
    </button>
  );
}

function PlatformBadge({ platform }: { platform: string }) {
  const styles =
    platform === "facebook"
      ? "bg-blue-900/30 text-blue-400 border-blue-800"
      : "bg-pink-900/30 text-pink-400 border-pink-800";

  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded border ${styles}`}
    >
      {platform === "facebook" ? "Facebook" : "Instagram"}
    </span>
  );
}

function FormatBadge({ format }: { format?: string }) {
  if (!format) return null;
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded border bg-zinc-800 text-zinc-400 border-zinc-700">
      {format}
    </span>
  );
}

export default function SocialPage() {
  const facebookPosts = socialPosts.filter((p) => p.platform === "facebook");
  const instagramPosts = socialPosts.filter((p) => p.platform === "instagram");

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link
          href="/promo"
          className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
        >
          &larr; Back to promo
        </Link>
        <h1 className="text-3xl font-bold mt-3 mb-2">Social Media Posts</h1>
        <p className="text-zinc-400">
          Ready-to-use post drafts for Facebook and Instagram. Copy the text,
          pair it with the suggested image, and post.
        </p>
      </div>

      {/* Facebook */}
      <section className="mb-12">
        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500" />
          Facebook Posts
        </h2>
        <div className="space-y-4">
          {facebookPosts.map((post) => (
            <div
              key={post.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <PlatformBadge platform="facebook" />
                <CopyButton text={post.caption} />
              </div>
              <p className="text-zinc-200 text-sm whitespace-pre-line mb-3">
                {post.caption}
              </p>
              <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50">
                <p className="text-xs text-zinc-500 mb-1">
                  Suggested image/visual:
                </p>
                <p className="text-xs text-zinc-400">
                  {post.imageDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram */}
      <section className="mb-12">
        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-pink-500" />
          Instagram Posts
        </h2>
        <div className="space-y-4">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <PlatformBadge platform="instagram" />
                <FormatBadge format={post.format} />
                <CopyButton
                  text={
                    post.caption +
                    (post.hashtags ? "\n\n" + post.hashtags.join(" ") : "")
                  }
                />
              </div>
              <p className="text-zinc-200 text-sm whitespace-pre-line mb-3">
                {post.caption}
              </p>
              {post.hashtags && (
                <p className="text-sm text-blue-400/70 mb-3">
                  {post.hashtags.join(" ")}
                </p>
              )}
              <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50">
                <p className="text-xs text-zinc-500 mb-1">
                  Suggested image/visual:
                </p>
                <p className="text-xs text-zinc-400">
                  {post.imageDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="font-medium mb-3">Posting tips</h2>
        <ul className="text-sm text-zinc-400 space-y-2">
          <li>
            <strong className="text-zinc-300">Facebook:</strong> Include the
            link to your eCard site in the first comment, not the post body.
            Facebook penalises posts with external links in the caption.
          </li>
          <li>
            <strong className="text-zinc-300">Instagram:</strong> Hashtags work
            best in the first comment or at the very end of the caption. Keep
            the main text clean.
          </li>
          <li>
            <strong className="text-zinc-300">Visuals:</strong> Each post has a
            suggested image description. Screen recordings and before/after
            shots perform well for tool-based content.
          </li>
          <li>
            <strong className="text-zinc-300">Timing:</strong> Post when your
            audience is online. For card-making content, evenings and weekends
            tend to work well.
          </li>
        </ul>
      </section>
    </div>
  );
}
