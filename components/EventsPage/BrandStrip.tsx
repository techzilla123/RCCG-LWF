"use client";
import React from "react";

const values = [
  "R – Respect",
  "E – Excellence",
  "S – Stewardship",
  "P – Purity",
  "E – Example",
  "C – Compassion",
  "T – Trust",
  "G – God",
];

export function BrandStrip() {
  return (
    <footer className="w-full bg-slate-800/70 py-6 md:py-8 overflow-hidden relative">
      <div className="flex whitespace-nowrap">
        
        {/* Track 1 */}
        <div className="animate-marquee flex gap-12 text-white text-lg font-semibold pr-20">
          {values.map((item, idx) => (
            <span key={idx}>{item}</span>
          ))}
        </div>

        {/* Track 2 (with spacing before it) */}
        <div className="animate-marquee flex gap-12 text-white text-lg font-semibold pl-20">
          {values.map((item, idx) => (
            <span key={idx}>{item}</span>
          ))}
        </div>

      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 18s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </footer>
  );
}
