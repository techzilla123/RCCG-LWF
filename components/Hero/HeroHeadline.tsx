"use client";
import { Coiny } from 'next/font/google';

const coiny = Coiny({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-coiny',
});

export const HeroHeadline = ({
  alignment = "left",
  textParts = [],
}: {
  alignment?: "left" | "right";
  textParts: { text: string; color: string }[];
}) => {
  return (
    <h1
      className={`${coiny.variable} font-[var(--font-coiny)] text-[40px] md:text-[64px] leading-[1.1] text-${alignment}`}
    >
      {textParts.map((part, i) => (
        <span
          key={i}
          className="custom-shadow drop-shadow-[3px_3px_0px_#000]"
          style={{ color: part.color }}
        >
          {part.text}{" "}
        </span>
      ))}
    </h1>
  );
};
