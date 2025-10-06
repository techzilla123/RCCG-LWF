"use client";
import * as React from "react";
import { MediaItem } from "./MediaItem";

export function MediaGrid() {
  return (
    <nav className="flex relative flex-wrap gap-10 items-start py-7 pl-24 max-w-full w-full max-md:pl-7">
      {/* Column 1 */}
      <div className="flex-1 shrink basis-0 min-h-px min-w-60">
        <MediaItem
          icon="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/9b6d17b49071467040dec783ad99a40a08baded3?placeholderIfAbsent=true"
          title="SERMONS"
        />
        <div className="mt-7">
          <MediaItem
            icon="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/3299f6399a620441c586956d2a59131aaa30bb32?placeholderIfAbsent=true"
            title="VIDEOS"
          />
        </div>
      </div>

      {/* Column 2 */}
      <div className="flex-1 shrink text-white whitespace-nowrap basis-0 min-h-px min-w-60">
        <MediaItem icon="/Container.png" title="PODCAST" />
        <div className="mt-7">
          <MediaItem icon="/Component 10 (1).png" title="MUSIC" />
        </div>
      </div>

      {/* Column 3 */}
      <div className="flex-1 shrink text-white basis-0 min-h-px min-w-60">
        <MediaItem icon="/Component 10.png" title="READING PLAN" />
        <div className="mt-7">
          <MediaItem icon="/Component 11.png" title="RESOURCES" />
        </div>
      </div>
    </nav>
  );
}
