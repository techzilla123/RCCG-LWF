import * as React from "react";

function BackgroundShape() {
  return (
    <div className="flex absolute left-2/4 z-0 flex-col self-start px-20 pb-20 rounded-none -translate-x-2/4 h-[196px] top-[74px] translate-y-[0%] w-[1440px] max-md:pl-5 max-md:max-w-full">
      <img
        src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/96ff859fe0f1e28ee43f12537ab697327c5f3583?placeholderIfAbsent=true"
        alt=""
        className="object-contain aspect-[0.57] w-[69px]"
      />
    </div>
  );
}

export default BackgroundShape;
