import * as React from "react";

export function MinistryImage() {
  return (
    <div className="flex-1 shrink basis-0 min-h-px min-w-60 max-md:max-w-full">
      <div className="w-full max-md:max-w-full">
        <img
          src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/0870bebf0c60f63881dcaf35caf4c202fe0721da?placeholderIfAbsent=true"
          alt="Ministry activities"
          className="object-contain max-w-full aspect-[0.95] w-[524px]"
        />
      </div>
    </div>
  );
}
