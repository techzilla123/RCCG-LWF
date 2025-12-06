"use client";
import React, { useEffect, useState } from "react";

interface Dot {
  top: string;
  left: string;
  color: string;
}

export const DecoratedBackground: React.FC<{ density?: number }> = ({ density = 20 }) => {
  const [dots, setDots] = useState<Dot[] | null>(null);

  useEffect(() => {
    const generatedDots: Dot[] = Array.from({ length: density }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      color: ["#ff7eb3", "#7afcff", "#e7ff7a", "#ffcb7a", "#d17aff"][Math.floor(Math.random() * 5)],
    }));
    setDots(generatedDots);
  }, [density]);

  // Render nothing on server / before dots are generated
  if (!dots) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute w-[120px] h-[120px] opacity-30 rounded-full"
          style={{
            top: dot.top,
            left: dot.left,
            backgroundImage: `radial-gradient(circle, ${dot.color} 20%, transparent 21%)`,
            backgroundSize: "15px 15px",
          }}
        />
      ))}
    </div>
  );
};
