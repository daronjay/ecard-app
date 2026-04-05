"use client";

import { forwardRef, useCallback, useRef, MutableRefObject } from "react";
import { TextConfig, PhotoTransform, defaultPhotoTransform } from "@/lib/types";
import { getTemplateStyles, getAnimClass } from "@/lib/templates";

interface Props {
  template: string;
  photoUrl: string | null;
  textConfig: TextConfig;
  animated?: boolean;
  format?: "landscape" | "portrait";
  photoTransform?: PhotoTransform;
  onPhotoTransformChange?: (t: PhotoTransform) => void;
}

// forwardRef so parent can grab the DOM node for html2canvas
const CardPreview = forwardRef<HTMLDivElement, Props>(
  (
    {
      template,
      photoUrl,
      textConfig,
      animated,
      format = "landscape",
      photoTransform = defaultPhotoTransform,
      onPhotoTransformChange,
    },
    ref,
  ) => {
    const styles = getTemplateStyles(template);
    const animCls = animated ? getAnimClass(template) : "";
    const aspectClass = format === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]";

    // track pointer state for drag
    const dragState = useRef<{
      pointerId: number;
      startX: number;
      startY: number;
      startTx: number;
      startTy: number;
    } | null>(null);

    // mutable so we can assign in the merged ref callback
    const containerRef = useRef<HTMLDivElement | null>(null) as MutableRefObject<HTMLDivElement | null>;

    const onPointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (!onPhotoTransformChange) return;
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        dragState.current = {
          pointerId: e.pointerId,
          startX: e.clientX,
          startY: e.clientY,
          startTx: photoTransform.x,
          startTy: photoTransform.y,
        };
      },
      [onPhotoTransformChange, photoTransform.x, photoTransform.y],
    );

    const onPointerMove = useCallback(
      (e: React.PointerEvent) => {
        if (!dragState.current || !onPhotoTransformChange || !containerRef.current) return;
        if (e.pointerId !== dragState.current.pointerId) return;

        const rect = containerRef.current.getBoundingClientRect();
        const dx = ((e.clientX - dragState.current.startX) / rect.width) * 100;
        const dy = ((e.clientY - dragState.current.startY) / rect.height) * 100;

        onPhotoTransformChange({
          ...photoTransform,
          x: dragState.current.startTx + dx,
          y: dragState.current.startTy + dy,
        });
      },
      [onPhotoTransformChange, photoTransform],
    );

    const onPointerUp = useCallback(() => {
      dragState.current = null;
    }, []);

    const onWheel = useCallback(
      (e: React.WheelEvent) => {
        if (!onPhotoTransformChange) return;
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.08 : 0.08;
        const next = Math.max(0.2, Math.min(5, photoTransform.scale + delta));
        onPhotoTransformChange({ ...photoTransform, scale: next });
      },
      [onPhotoTransformChange, photoTransform],
    );

    const transform = `translate(${photoTransform.x}%, ${photoTransform.y}%) scale(${photoTransform.scale})`;

    return (
      <div
        ref={(node) => {
          // merge refs — containerRef for drag math, external ref for html2canvas
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={`relative w-full ${aspectClass} rounded-xl overflow-hidden select-none ${animCls}`}
        style={styles}
      >
        {/* photo layer — draggable */}
        {photoUrl && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ cursor: onPhotoTransformChange ? "grab" : "default" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onWheel={onWheel}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl}
              alt=""
              draggable={false}
              crossOrigin="anonymous"
              style={{
                transform,
                transformOrigin: "center center",
                maxWidth: "60%",
                maxHeight: "60%",
                objectFit: "contain",
                borderRadius: "0.5rem",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
          </div>
        )}

        {/* recipient name - top */}
        {textConfig.recipientName && (
          <div className="absolute top-6 left-0 right-0 text-center pointer-events-none">
            <span className="text-2xl font-bold drop-shadow-lg">
              Dear {textConfig.recipientName}
            </span>
          </div>
        )}

        {/* message - position controlled by slider */}
        {textConfig.message && (
          <div
            className="absolute left-0 right-0 text-center px-8 pointer-events-none"
            style={{ top: `${textConfig.messageY}%` }}
          >
            <p className="text-lg italic drop-shadow-lg">
              {textConfig.message}
            </p>
          </div>
        )}

        {/* sender + date - bottom */}
        <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
          {textConfig.senderName && (
            <span className="text-sm drop-shadow-lg">
              From {textConfig.senderName}
            </span>
          )}
          {textConfig.date && (
            <span className="text-sm drop-shadow-lg ml-3 opacity-70">
              {textConfig.date}
            </span>
          )}
        </div>
      </div>
    );
  },
);

CardPreview.displayName = "CardPreview";
export default CardPreview;
