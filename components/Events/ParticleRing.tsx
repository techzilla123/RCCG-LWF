"use client";
import React, { useEffect, useRef, useState } from "react";

// Generate points in a ring
const createPoints = (count: number, radius: number) => {
  const colors = ["#ff7eb3", "#7afcff", "#e7ff7a", "#ffcb7a", "#d17aff"];
  return Array.from({ length: count }).map((_, idx) => {
    const angle = (idx / count) * Math.PI * 2;
    return {
      idx,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      color: colors[idx % colors.length],
    };
  });
};

const pointsInner = createPoints(40, 100); // pixels
const pointsOuter = createPoints(60, 160);

const ParticleRing = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Animate rotation
  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      setRotation((prev) => ({
        x: prev.x + 0.01 + mouse.y * 0.05,
        y: prev.y + 0.02 + mouse.x * 0.05,
      }));
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [mouse]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[80vh] flex items-center justify-center bg-black overflow-hidden"
      onMouseMove={(e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        setMouse({ x, y });
      }}
    >
      <div
        className="absolute w-full h-full"
        style={{
          transform: `rotateX(${rotation.x}rad) rotateY(${rotation.y}rad)`,
          transformStyle: "preserve-3d",
        }}
      >
        {pointsInner.map((p) => (
          <div
            key={`inner-${p.idx}`}
            className="absolute w-3 h-3 rounded-full"
            style={{
              backgroundColor: p.color,
              transform: `translate3d(${p.x}px, ${p.y}px, 0px)`,
            }}
          />
        ))}
        {pointsOuter.map((p) => (
          <div
            key={`outer-${p.idx}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: p.color,
              transform: `translate3d(${p.x}px, ${p.y}px, 0px)`,
            }}
          />
        ))}
      </div>

      <h1 className="absolute text-white font-bold text-3xl md:text-5xl pointer-events-none text-center">
        Welcome Here!
      </h1>
    </div>
  );
};

export default ParticleRing;
