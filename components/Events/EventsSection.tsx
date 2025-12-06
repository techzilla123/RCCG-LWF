"use client";
import * as React from "react";
import { EventsHeader } from "./EventsHeader";
import { EventsGrid } from "./EventsGrid";
import { SeeMoreButton } from "./SeeMoreButton";

export const EventsSection: React.FC = () => {
  const scrollRef = React.useRef(0);
  const animatedYRef = React.useRef(0);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  // Smooth parallax scroll
  React.useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const animate = () => {
      // Ease animation
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
      className="flex flex-col justify-center items-center pt-11 pb-16 bg-stone-300/60"
    >
      <EventsHeader />
      <EventsGrid />
      <SeeMoreButton />
    </section>
  );
};

export default EventsSection;
