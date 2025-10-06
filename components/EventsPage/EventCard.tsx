import * as React from "react";

interface EventCardProps {
  imageSrc: string;
  category?: string;
  title?: string;
  isActive: boolean;
}

function EventCard({ imageSrc, category, title, isActive }: EventCardProps) {
  return (
    <article
      className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-700 ease-in-out 
        ${isActive ? "flex-[0.5]" : "flex-[0.25]"} 
        h-[400px] max-md:flex-[1]
      `}
    >
      <img
        src={imageSrc}
        alt={title || "Event image"}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Only show text overlay if it has content */}
      {category && title && (
        <div className="relative px-5 pt-72 pb-5 bg-gradient-to-t from-black/70 via-transparent h-full w-full">
          <header>
            <p className="text-xs font-semibold uppercase text-zinc-100">
              {category}
            </p>
            <h3 className="mt-1 text-2xl tracking-tight leading-tight text-white">
              {title}
            </h3>
          </header>
        </div>
      )}
    </article>
  );
}

export default EventCard;
