"use client";

import { forwardRef } from "react";
import { TextConfig } from "@/lib/types";
import { getTemplateStyles, getAnimClass } from "@/lib/templates";

interface Props {
  template: string;
  photoUrl: string | null;
  textConfig: TextConfig;
  animated?: boolean;
}

// forwardRef so parent can grab the DOM node for html2canvas
const CardPreview = forwardRef<HTMLDivElement, Props>(
  ({ template, photoUrl, textConfig, animated }, ref) => {
    const styles = getTemplateStyles(template);
    const animCls = animated ? getAnimClass(template) : "";

    return (
      <div
        ref={ref}
        className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden select-none ${animCls}`}
        style={styles}
      >
        {/* photo layer */}
        {photoUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl}
              alt=""
              className="max-w-[60%] max-h-[50%] object-contain rounded-lg shadow-2xl"
              // crossOrigin needed for html2canvas to work with local images
              crossOrigin="anonymous"
            />
          </div>
        )}

        {/* recipient name - top */}
        {textConfig.recipientName && (
          <div className="absolute top-6 left-0 right-0 text-center">
            <span className="text-2xl font-bold drop-shadow-lg">
              Dear {textConfig.recipientName}
            </span>
          </div>
        )}

        {/* message - position controlled by slider */}
        {textConfig.message && (
          <div
            className="absolute left-0 right-0 text-center px-8"
            style={{ top: `${textConfig.messageY}%` }}
          >
            <p className="text-lg italic drop-shadow-lg">
              {textConfig.message}
            </p>
          </div>
        )}

        {/* sender + date - bottom */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
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
