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
          url="https://example.com/sermons"
        />
        <div className="mt-7">
          <MediaItem
            icon="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/3299f6399a620441c586956d2a59131aaa30bb32?placeholderIfAbsent=true"
            title="VIDEOS"
            url="https://example.com/videos"
          />
        </div>
      </div>

      {/* Column 2 */}
      <div className="flex-1 shrink text-white whitespace-nowrap basis-0 min-h-px min-w-60">
        <MediaItem icon="/Container.png" title="PODCAST" url="https://myrccgradio.mixlr.com/" />
        <div className="mt-7">
          <MediaItem icon="/Component 10 (1).png" title="MUSIC" url="https://example.com/music" />
        </div>
      </div>

      {/* Column 3 */}
      <div className="flex-1 shrink text-white basis-0 min-h-px min-w-60">
        <MediaItem icon="/Component 10.png" title="READING PLAN" url="https://example.com/reading-plan" />
        <div className="mt-7">
          <MediaItem icon="/Component 11.png" title="RESOURCES" url="https://www.rccgna.org/" />
        </div>
      </div>
    </nav>
  );
}
