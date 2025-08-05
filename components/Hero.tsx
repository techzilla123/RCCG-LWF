"use client";
import * as React from "react";
import { HeroHeadline } from "./Hero/HeroHeadline";
import { HeroButton } from "./Hero/HeroButton";
import { HeroStats } from "./Hero/HeroStats";
import { Inter } from "next/font/google";
import CheckoutOptions from "@/components/checkoutop";

const inter = Inter({
  weight: "600",
  subsets: ["latin"],
  variable: "--font-inter",
});

// 👇 Define image-video pairs
const mediaPairs = [
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/721d5187d521e16fa4f3a607a55355c5db29fc21?placeholderIfAbsent=true",
    video: "/herovid/12796347_3840_2160_60fps.mp4",
    headline: {
        alignment: "left", 
    textParts: [ 
      { text: "Shop the", color: "#85C8FF" },
      { text: "moments", color: "#FF99AA" }, 
      { text: "that", color: "#85C8FF" }, 
      { text: "keep You & Your", color: "#85C8FF" },
      { text: "kids", color: "#85C8FF" },
      { text: "smiling...", color: "#FF99AA" }, 
    ],
    paragraph: "Your one-stop shop for all colorful party supplies,\nrentals & decorations made for kids and those who love them",
  }, 
  },
  {
    image:
      "https://media.npr.org/assets/img/2022/11/04/gettyimages-1183414292-1-_slide-30784f99ac10f059c242d37e91d05ead475854f4.jpg",
    video: "/herovid/7156929-uhd_3840_2160_25fps.mp4",
    headline: {
      alignment: "left",
        textParts: [ 
      { text: "Celebrate", color: "#FF99AA" }, 
      { text: "Every", color: "#85C8FF" }, 
      { text: "Event", color: "#85C8FF" }, 
      { text: "with", color: "#FF99AA" }, 
      { text: "vibrant", color: "#85C8FF" }, 
      { text: "energy & style", color: "#FF99AA" }, 
    ], 
    paragraph: "Create unforgettable events and parties full of laughter,\nconfetti, and Instagram-worthy vibes!", 
  },
  },
  {
    image:
      "https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/bltce80954b8a793ce1/66707e9a8a3929cbd9124f15/surprise-party-hero.jpg?auto=webp&q=70&width=3840",
    video: "/herovid/7119576-hd_1920_1080_25fps.mp4",
    headline: {
      alignment: "left",
     textParts: [ 
      { text: "Surprise", color: "#85C8FF" }, 
      { text: "moments", color: "#FF99AA" }, 
      { text: "start", color: "#85C8FF" }, 
      { text: "here!", color: "#FF99AA" }, 
    ],
    paragraph: "From birthday balloons to themed props,\nwe’ve got the magic for every celebration.",
  },
  },
  {
    image: "https://i.pinimg.com/originals/e7/b0/d5/e7b0d52f96c69ea5eb920723f772a7ad.jpg",
    video: "/herovid/3122106-hd_1920_1080_25fps.mp4",
    headline: {
      alignment: "left",
      textParts: [
        { text: "Party", color: "#85C8FF" },
        { text: "Rentals", color: "#FF99AA" },
        { text: "for", color: "#85C8FF" },
        { text: "Every", color: "#FF99AA" },
        { text: "Occasion", color: "#85C8FF" },
      ],
      paragraph:
        "From elegant to playful setups,\nwe’ve got what your event needs.",
    },
  },
];

function Hero() {
  const [index, setIndex] = React.useState(0);
  const [showVideo, setShowVideo] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const current = mediaPairs[index];

  // Trigger image for 10s, then video, then next
  React.useEffect(() => {
    setShowVideo(false);
    const timer = setTimeout(() => setShowVideo(true), 10000);

    return () => clearTimeout(timer);
  }, [index]);

  // When video ends, move to next
  const handleVideoEnd = () => {
    setShowVideo(false);
    setIndex((prev) => (prev + 1) % mediaPairs.length);
  };

  return (
    <section className="relative flex flex-col justify-center items-start px-20 pt-10 max-md:px-5 h-[calc(100vh-80px)]">
      {!showVideo ? (
        <img
          src={current.image}
          alt="Hero"
          className="absolute inset-0 object-cover w-full h-full z-0 transition-all duration-700 ease-out transform opacity-100 scale-100"
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 object-cover w-full h-full z-0"
          src={current.video}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
        />
      )}

     {!showVideo && (
  <div className="absolute left-0 top-0 h-full w-[500px] z-0 pointer-events-none">
    <div className="h-full w-full bg-gradient-to-r from-white via-white/70 to-transparent opacity-10 md:opacity-100" />
  </div>
)}


      <div className="absolute w-[160px] -top-2 left-1/2 transform -translate-x-1/2 z-20">
        <CheckoutOptions />
      </div>

      <div
        className={`relative z-10 max-w-[550px] ${
          current.headline.alignment === "right" ? "ml-auto text-right" : "text-left"
        }`}
      >
        <HeroHeadline
          alignment={current.headline.alignment}
          textParts={current.headline.textParts}
        />

        <p
          className={`${inter.variable} font-[var(--font-inter)] font-semibold text-[clamp(14px,4vw,18px)] leading-[clamp(20px,4vw,24px)] text-black mt-6 whitespace-pre-line antialiased`}
        >
          {current.headline.paragraph.split("\n").map((line, index) => (
            <span key={index} className="block">
              {line.split(" ").map((word, i) => {
                const highlightColors = [
                  "rgba(255, 255, 0, 0.4)",
                  "rgba(255, 153, 170, 0.4)",
                  "rgba(133, 200, 255, 0.4)",
                  "rgba(255, 221, 128, 0.4)",
                  "rgba(170, 255, 170, 0.4)",
                ];
                const bgColor = highlightColors[i % highlightColors.length];
                return (
                  <span
                    key={i}
                    style={{
                      backgroundColor: bgColor,
                      padding: "0 3px",
                      borderRadius: "3px",
                      margin: "1px 2px",
                      display: "inline-block",
                      fontWeight: 400,
                      color: "#000000",
                      textShadow: "0 0 0.2px #000",
                    }}
                  >
                    {word}
                  </span>
                );
              })}
              <br />
            </span>
          ))}
        </p>

        <HeroButton />
        <HeroStats />
      </div>

      {/* Optional dot nav (for debugging or manual control) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {mediaPairs.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIndex(idx);
              setShowVideo(false);
            }}
            className={`w-3 h-3 rounded-full ${
              idx === index ? "bg-white" : "bg-gray-400"
            } transition-colors`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
