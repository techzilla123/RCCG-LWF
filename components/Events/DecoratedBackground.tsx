"use client";
import React, { useEffect, useState } from "react";

interface Props {
  density?: number; // number of dot layers
}

export default function DecoratedBackground({ density = 10 }: Props) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rotate = (e.clientX / window.innerWidth) * 30 - 15;
      setRotation(rotate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const colors = ["#ff7eb3", "#7afcff", "#e7ff7a", "#ffcb7a", "#d17aff"];

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0.3s ease-out",
      }}
    >
      {Array.from({ length: density }).map((_, i) => (
        <div
          key={i}
          className="absolute w-[120px] h-[120px] opacity-30 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            backgroundImage: `radial-gradient(circle, ${
              colors[i % colors.length]
            } 20%, transparent 21%)`,
            backgroundSize: "15px 15px",
          }}
        />
      ))}
    </div>
  );
}
