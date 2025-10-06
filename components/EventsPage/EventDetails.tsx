import * as React from "react";

interface EventDetailsProps {
  date: string;
  title: string;
  description: string;
}

export function EventDetails({ date, title, description }: EventDetailsProps) {
  return (
    <section className="w-full">
      <header>
        <p className="text-sm sm:text-base md:text-lg font-semibold text-violet-300">
          {date}
        </p>
        <h1 className="mt-2 font-bold tracking-tight text-white leading-snug text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
      </header>
      <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-prose">
        {description}
      </p>
    </section>
  );
}
