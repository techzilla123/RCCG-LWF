"use client";
import * as React from "react";
import { HeroSection } from "./HeroSection";
import { MovementCard } from "./MovementCard";
import { WelcomeSection } from "./WelcomeSection";

export const MovementSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollRef = React.useRef(0);
  const animatedYRef = React.useRef(0);
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const placeholderRef = React.useRef<HTMLDivElement>(null);

  const movementCards = [
    {
      imageSrc:
        "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/fe38e62631452c89cffcda70260ca3aa0d074dd7?placeholderIfAbsent=true",
      title: "ENCOUNTER",
      subtitle: "GOD",
    },
    {
      imageSrc:
        "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/4809d0c5d68a8d39753e8997f200d6d5308e1d08?placeholderIfAbsent=true",
      title: "EXPERIENCE",
      subtitle: "FREEDOM",
    },
    {
      imageSrc:
        "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/d8f38c6221f819ced14bc67928c8a189301bba41?placeholderIfAbsent=true",
      title: "DISCOVER",
      subtitle: "PURPOSE",
    },
    {
      imageSrc:
        "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/8025c0cb9141834e65be17e1753cd2e502121c6c?placeholderIfAbsent=true",
      title: "MAKE A",
      subtitle: "DIFFERENCE",
    },
  ];

  // Smooth, GPU-accelerated scroll animation
  React.useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const animate = () => {
      // Smooth easing
      animatedYRef.current += (scrollRef.current - animatedYRef.current) * 0.08;

      if (sectionRef.current) {
        sectionRef.current.style.transform = `translate3d(0, ${animatedYRef.current * 0.2}px, 0)`;
        sectionRef.current.style.willChange = "transform";
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Auto-rotate carousel on mobile
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 2) % movementCards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [movementCards.length]);

  return (
    <main className="rounded-none bg-white relative">
      <HeroSection />

      <div ref={placeholderRef}></div> {/* Keeps layout space */}

      <section className="relative flex flex-col items-center px-5 md:px-10 lg:px-20 pb-5 w-full bg-white max-w-[1600px] mx-auto">
        <div ref={sectionRef} className="will-change-transform w-full max-w-[1080px]">
          {/* Desktop cards */}
          <div className="hidden md:flex flex-wrap gap-6 lg:gap-8 items-start -mt-12 pb-7 text-3xl font-semibold leading-8 text-white uppercase">
            {movementCards.map((card, index) => (
              <MovementCard
                key={index}
                imageSrc={card.imageSrc}
                title={card.title}
                subtitle={card.subtitle}
                index={index}
              />
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden -mt-12 pb-7">
            <div className="flex gap-4 transition-all duration-500 ease-in-out">
              {[currentIndex, (currentIndex + 1) % movementCards.length].map((index) => (
                <MovementCard
                  key={index}
                  imageSrc={movementCards[index].imageSrc}
                  title={movementCards[index].title}
                  subtitle={movementCards[index].subtitle}
                  index={index}
                />
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {[0, 2].map((startIndex) => (
                <button
                  key={startIndex}
                  onClick={() => setCurrentIndex(startIndex)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === startIndex ? "bg-slate-700 w-6" : "bg-slate-300"
                  }`}
                  aria-label={`Go to slide ${startIndex / 2 + 1}`}
                />
              ))}
            </div>
          </div>

          <WelcomeSection />
        </div>
      </section>
    </main>
  );
};

export default MovementSection;
