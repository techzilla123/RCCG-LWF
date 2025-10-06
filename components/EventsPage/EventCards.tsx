import * as React from "react";
import EventCard from "./EventCard";

const events = [
  {
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/5063c9262824276930c85e90d989fbf058df222e?placeholderIfAbsent=true",
        category: "Skilled Speakers",
    title: "Storytelling Festival",
    },
  {
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/5c224d2325d5c6b8ef1ba7f76064b38e4614e59f?placeholderIfAbsent=true",
    category: "Skilled Speakers",
    title: "Storytelling Festival",
  },
  {
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/b50583d146360f3186cc64b5aa60f3c426b1460a?placeholderIfAbsent=true",
    category: "Community Build",
    title: "Build Networking",
  },
];

function EventCards() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  // Detect screen size (mobile vs desktop)
  React.useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth <= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Rotate every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`flex w-full h-[400px] z-0 items-start justify-center mt-16 transition-all duration-700 overflow-hidden 
        ${isMobile ? "gap-0 px-0" : "gap-8 px-8"}
      `}
    >
      {events.map((item, index) => {
        // On mobile → only show the active one
        if (isMobile && index !== activeIndex) return null;

        const isActive = index === activeIndex;
        return (
          <EventCard
            key={index}
            imageSrc={item.imageSrc}
            category={item.category}
            title={item.title}
            isActive={isActive}
          />
        );
      })}
    </section>
  );
}

export default EventCards;
