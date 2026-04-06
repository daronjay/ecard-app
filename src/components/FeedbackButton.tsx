"use client";

import { useState } from "react";

type Category = "bug" | "enhancement" | "feedback";

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<Category>("feedback");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [issueUrl, setIssueUrl] = useState<string | null>(null);

  const submit = async () => {
    if (!description.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, description }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setIssueUrl(data.url);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setOpen(false);
    setCategory("feedback");
    setDescription("");
    setStatus("idle");
    setIssueUrl(null);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-xs px-3 py-2 rounded-full shadow-lg transition-colors"
        title="Send feedback"
      >
        feedback
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={reset}
          />
          <div className="relative bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl w-full max-w-sm p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-100">Send feedback</h2>
              <button onClick={reset} className="text-zinc-500 hover:text-zinc-300 text-xs">
                close
              </button>
            </div>

            {status === "done" ? (
              <div className="text-sm text-zinc-300 flex flex-col gap-3">
                <p>Got it, thanks.</p>
                {issueUrl && (
                  <a
                    href={issueUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline text-xs"
                  >
                    View issue on GitHub
                  </a>
                )}
                <button
                  onClick={reset}
                  className="self-start text-xs text-zinc-400 hover:text-zinc-200 mt-1"
                >
                  send another
                </button>
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  {(["bug", "enhancement", "feedback"] as Category[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                        category === c
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "border-zinc-600 text-zinc-400 hover:border-zinc-400"
                      }`}
                    >
                      {c === "enhancement" ? "suggestion" : c}
                    </button>
                  ))}
                </div>

                <textarea
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-100 p-3 h-28 resize-none focus:outline-none focus:border-zinc-500 placeholder-zinc-600"
                  placeholder="What happened? What would you like to see?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                {status === "error" && (
                  <p className="text-xs text-red-400">Something went wrong. Try again.</p>
                )}

                <button
                  onClick={submit}
                  disabled={!description.trim() || status === "sending"}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-sm px-4 py-2 rounded-lg transition-colors self-end"
                >
                  {status === "sending" ? "sending..." : "send"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
