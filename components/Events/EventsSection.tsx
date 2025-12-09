"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import { EventsHeader } from "./EventsHeader";
import { EventsGrid } from "./EventsGrid";
import { SeeMoreButton } from "./SeeMoreButton";

// Dynamically import react-snowfall for client-side only
const Snowfall = dynamic(
  () => import("react-snowfall").then((m) => m.default),
  { ssr: false }
);

export const EventsSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [wind, setWind] = React.useState(0); // wind updated by mouse

  // Track mouse inside the section to set wind
  React.useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position inside section
      const centerX = rect.width / 2;
      const delta = (x - centerX) / centerX; // -1 to 1
      setWind(delta * 1.5); // adjust wind strength
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Smooth scroll effect
  const scrollRef = React.useRef(0);
  const animatedYRef = React.useRef(0);
  React.useEffect(() => {
    const handleScroll = () => (scrollRef.current = window.scrollY);
    const animate = () => {
      animatedYRef.current += (scrollRef.current - animatedYRef.current) * 0.1;
      if (sectionRef.current) {
        sectionRef.current.style.marginTop = `${animatedYRef.current * 0.3}px`;
      }
      requestAnimationFrame(animate);
    };
    window.addEventListener("scroll", handleScroll);
    requestAnimationFrame(animate);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="events-section"
      ref={sectionRef}
      className="relative flex flex-col justify-center items-center pt-11 pb-16 bg-stone-300/60 overflow-hidden"
    >
      {/* Colorful mouse-responsive snowfall */}
      <div className="absolute inset-0 pointer-events-none">
        <Snowfall snowflakeCount={25} color="#FF007F" radius={[2, 5]} speed={[0.5, 1.5]} wind={[wind - 0.3, wind + 0.3]} />
        <Snowfall snowflakeCount={25} color="#FF7F00" radius={[2, 5]} speed={[0.5, 1.5]} wind={[wind - 0.3, wind + 0.3]} />
        <Snowfall snowflakeCount={25} color="#FFFF00" radius={[2, 5]} speed={[0.5, 1.5]} wind={[wind - 0.3, wind + 0.3]} />
        <Snowfall snowflakeCount={25} color="#00FF00" radius={[2, 5]} speed={[0.5, 1.5]} wind={[wind - 0.3, wind + 0.3]} />
        <Snowfall snowflakeCount={25} color="#007FFF" radius={[2, 5]} speed={[0.5, 1.5]} wind={[wind - 0.3, wind + 0.3]} />
        <Snowfall snowflakeCount={25} color="#7F00FF" radius={[2, 5]} speed={[0.5, 1.5]} wind={[wind - 0.3, wind + 0.3]} />
      </div>

      {/* Section content */}
      <EventsHeader />
      <EventsGrid />
      <SeeMoreButton />
    </section>
  );
};

export default EventsSection;
