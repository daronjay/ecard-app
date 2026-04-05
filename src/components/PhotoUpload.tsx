"use client";

import { useCallback, useState } from "react";

interface Props {
  onUpload: (url: string) => void;
  currentUrl: string | null;
}

export default function PhotoUpload({ onUpload, currentUrl }: Props) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) return;
      setUploading(true);
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      setUploading(false);
      if (data.url) onUpload(data.url);
    },
    [onUpload],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) handleFile(file);
        };
        input.click();
      }}
      className={`
        cursor-pointer border-2 border-dashed rounded-xl text-center transition-colors
        ${dragging ? "border-blue-400 bg-blue-50" : "border-stone-300 hover:border-stone-400 bg-stone-50"}
        ${currentUrl ? "p-3" : "p-12"}
      `}
    >
      {uploading ? (
        <p className="text-stone-400">uploading...</p>
      ) : currentUrl ? (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentUrl}
            alt="uploaded"
            className="w-16 h-16 object-cover rounded-lg"
          />
          <span className="text-stone-500 text-sm">
            click or drop to replace
          </span>
        </div>
      ) : (
        <p className="text-stone-400">drop a photo here or click to upload</p>
      )}
    </div>
  );
}
