"use client";
import React, { useEffect, useRef } from "react";

const SNOW_COUNT = 120;

const createSnow = () => {
  return Array.from({ length: SNOW_COUNT }).map((_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: Math.random() * -window.innerHeight,
    size: Math.random() * 4 + 2,
    speed: Math.random() * 0.7 + 0.3,
    drift: Math.random() * 1 - 0.5,
    opacity: Math.random() * 0.6 + 0.4,
  }));
};

const ParticleRing = () => {
  const snowRef = useRef<HTMLDivElement>(null);
  const snowflakes = useRef(createSnow());

  useEffect(() => {
    const animate = () => {
      const container = snowRef.current;
      if (!container) return;

      const children = container.children;

      snowflakes.current.forEach((flake, i) => {
        flake.y += flake.speed;
        flake.x += flake.drift;

        if (flake.y > window.innerHeight) {
          flake.y = -10;
          flake.x = Math.random() * window.innerWidth;
        }

        const el = children[i] as HTMLElement;
        el.style.transform = `translate3d(${flake.x}px, ${flake.y}px, 0)`;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="relative w-full h-[80vh] bg-black overflow-hidden flex items-center justify-center">
      
      {/* Snowfall container */}
      <div
        ref={snowRef}
        className="absolute inset-0 pointer-events-none"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {snowflakes.current.map((flake) => (
          <div
            key={flake.id}
            className="absolute rounded-full bg-white"
            style={{
              width: flake.size,
              height: flake.size,
              opacity: flake.opacity,
              filter: "blur(1px)",
              transform: `translate3d(${flake.x}px, ${flake.y}px, 0)`,
            }}
          />
        ))}
      </div>

      <h1 className="absolute text-white font-bold text-3xl md:text-5xl text-center pointer-events-none drop-shadow-xl">
        Welcome Here!
      </h1>
    </div>
  );
};

export default ParticleRing;
