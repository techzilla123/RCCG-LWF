"use client";
import * as React from "react";
import MinistryCarousel from "./MinistryCarousel";

export default function MinistrySection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const isVisibleRef = React.useRef(false);

  // Smooth visibility tracking
  React.useEffect(() => {
    const checkVisibility = () => {
      const events = document.getElementById("events-section");
      if (!events) return;

      const rect = events.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Show Ministry when EventsSection is near viewport
      const visible = rect.bottom < windowHeight * 0.85;
      isVisibleRef.current = visible;
    };

    const animate = () => {
      // Only update React state if visibility changed
      if (isVisible !== isVisibleRef.current) {
        setIsVisible(isVisibleRef.current);
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // initial check
    requestAnimationFrame(animate);

    return () => window.removeEventListener("scroll", checkVisibility);
  }, [isVisible]);

  return (
    <section
      id="ministry-section"
      className={`
        flex flex-col items-center w-full bg-white max-md:py-24
        transition-all duration-[1200ms] ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{
        marginTop: "-30px", // keeps alignment with EventsSection
      }}
    >
      <MinistryCarousel />
    </section>
  );
}
