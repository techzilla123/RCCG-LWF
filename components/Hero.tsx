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

const bgImages = [
  "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/721d5187d521e16fa4f3a607a55355c5db29fc21?placeholderIfAbsent=true",
  "https://media.npr.org/assets/img/2022/11/04/gettyimages-1183414292-1-_slide-30784f99ac10f059c242d37e91d05ead475854f4.jpg",
  "https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/bltce80954b8a793ce1/66707e9a8a3929cbd9124f15/surprise-party-hero.jpg?auto=webp&q=70&width=3840",
];

interface HeadlineVariant {
  alignment: "left" | "right"; // Explicit type for alignment
  textParts: { text: string; color: string }[]; 
  paragraph: string;
}

const headlineVariants: HeadlineVariant[] = [
  {
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
  { 
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
  { 
    alignment: "left", 
    textParts: [ 
      { text: "Surprise", color: "#85C8FF" }, 
      { text: "moments", color: "#FF99AA" }, 
      { text: "start", color: "#85C8FF" }, 
      { text: "here!", color: "#FF99AA" }, 
    ],
    paragraph: "From birthday balloons to themed props,\nwe’ve got the magic for every celebration.",
  },
];

function Hero() {
  const [currentImage, setCurrentImage] = React.useState(0); 
  const content = headlineVariants[currentImage];

  // Function to automatically change the image and headline every 3 minutes
  React.useEffect(() => { 
    const interval = setInterval(() => { 
      setCurrentImage((prevIndex) => (prevIndex + 1) % bgImages.length); 
    }, 180000); 

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentImage(index); 
  };

  return (
    <section className="relative flex flex-col justify-center items-start px-20 pt-10 max-md:px-5 h-[calc(100vh-80px)]">
      <img
        src={bgImages[currentImage]}
        alt={`Hero background ${currentImage + 1}`}
        className="absolute inset-0 object-cover w-full h-full z-0 transition-opacity duration-500"
      />
 <div className="absolute w-[160px] -top-2 left-1/2 transform -translate-x-1/2 z-20">
    <CheckoutOptions />
  </div>
      <div
        className={`relative z-10 max-w-[550px] ${
          content.alignment === "right" ? "ml-auto text-right" : "text-left"
        }`}
      >
        <HeroHeadline alignment={content.alignment} textParts={content.textParts} />
        
        {/* Paragraph with highlighted text */}
        <p
  className={`${inter.variable} font-[var(--font-inter)] font-semibold text-[clamp(14px,4vw,18px)] leading-[clamp(20px,4vw,24px)] text-black mt-6 whitespace-pre-line antialiased`}
>
  {content.paragraph.split("\n").map((line, index) => (
    <span key={index} className="block">
      {line.split(" ").map((word, i) => {
        const highlightColors = [
          "rgba(255, 255, 0, 0.4)",   // Light yellow
          "rgba(255, 153, 170, 0.4)", // Light pink
          "rgba(133, 200, 255, 0.4)", // Light blue
          "rgba(255, 221, 128, 0.4)", // Soft orange
          "rgba(170, 255, 170, 0.4)", // Light green
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
              textShadow: "0 0 0.2px #000", // subtle sharpening effect
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

      {/* Dot Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {bgImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentImage ? "bg-white" : "bg-gray-400"
            } transition-colors`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
