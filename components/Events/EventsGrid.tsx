import * as React from "react";
import { EventImage } from "./EventImage";

export const EventsGrid: React.FC = () => {
  return (
    <div className="px-2.5 mt-12 max-w-[1280px] mx-auto">
      <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-2">
        <EventImage
          src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/eb011ca80ac4ba4faffac74a94afa2c4eecd225f?placeholderIfAbsent=true"
          alt="Church event 1"
        />
        <EventImage
          src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/abd73fef39e7832918e9cf4f81ff81c9d244156d?placeholderIfAbsent=true"
          alt="Church event 2"
        />
        <EventImage
          src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/7614d1805b1e2c7f00ecd21da62f64b33c7b7a61?placeholderIfAbsent=true"
          alt="Church event 3"
        />
        <EventImage
          src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/039c868bd326b64bca49cddd6c6903a2e3c2c496?placeholderIfAbsent=true"
          alt="Church event 4"
        />
        <EventImage
          src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/22cc835758bf3a97c3d85fa4237cbda3d9ef713c?placeholderIfAbsent=true"
          alt="Church event 5"
          isRounded={true}
        />
        <EventImage
          src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/72a3e431492ed0acfed33bf7d112eb0fd70aeecd?placeholderIfAbsent=true"
          alt="Church event 6"
        />
      </div>
    </div>
  );
};
