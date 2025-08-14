"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ActionButton from "./ActionButton"

interface OfferImagesProps {
  firstImageUrl: string
  secondImageUrl: string
}

const OfferImages: React.FC<OfferImagesProps> = ({
  firstImageUrl,
  secondImageUrl,
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [tokenExists, setTokenExists] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)


  React.useEffect(() => {
    const token = localStorage.getItem("accessToken")
    setTokenExists(!!token)
  }, [])

  const slides = [
    {
      id: 1,
      type: "two-images",
      title: "Party With Us",
      subtitle: "Unforgettable Celebrations Await",
    },
    {
      id: 2,
      type: "image-bg",
      title: "Balloon Decorations",
      subtitle: "Colorful Balloons for Every Occasion",
      imageUrl:
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop&crop=center",
      link: "/shop",
    },
    {
      id: 3,
      type: "image-bg",
      title: "Event Rentals",
      subtitle: "Everything You Need for Perfect Events",
      imageUrl:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1600&h=900&fit=crop&crop=center",
      link: "/rentals",
    },
    {
      id: 4,
      type: "image-bg",
      title: "Birthday Parties",
      subtitle: "Make Every Birthday Special",
      imageUrl:
        "https://th.bing.com/th/id/R.cf88ce9110ece5d9ca83217b2d6eff3d?rik=qrQwL0iiXpYJFg&pid=ImgRaw&r=0",
      link: "/shop/birthday",
    },
    {
      id: 5,
      type: "image-bg",
      title: "Wedding Celebrations",
      subtitle: "Dream Weddings Come True",
      imageUrl:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop&crop=center",
      link: "/shop/party-supplies?SCT=1f9cc4df-ff7a-483a-ba0c-80e7aae7873e",
    },
  ]

  // Filter out first slide if token exists
  const filteredSlides = tokenExists
    ? slides.filter((slide) => slide.id !== 1)
    : slides

React.useEffect(() => {
  let timer: NodeJS.Timeout;

  if (!modalOpen) {
    timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredSlides.length);
    }, 4000);
  }

  return () => clearInterval(timer);
}, [filteredSlides.length, modalOpen]);

  const goToPrevious = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + filteredSlides.length) % filteredSlides.length
    )
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative w-full h-full">
      {/* Slides wrapper */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {filteredSlides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full h-full flex justify-center items-center cursor-pointer"
            onClick={() => {
              if (slide.type !== "two-images" && slide.link) {
                window.location.href = slide.link
              }
            }}
          >
            {slide.type === "two-images" ? (
             <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-8 w-full px-4 py-2">
  {/* First image */}
  <img
    src={firstImageUrl}
    alt="Offer first image"
    className="object-contain w-full max-w-[130px] md:max-w-[312px] h-auto"
  />

  {/* Second image with background */}
  <div className="relative flex items-center justify-center w-full max-w-[160px] md:max-w-[293px] h-auto">
    <img
      src="/Subtract.svg"
      alt="Background decoration"
      className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] object-contain opacity-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    />
    <img
      src={secondImageUrl}
      alt="Offer second image"
      className="relative z-10 object-contain w-full h-auto"
    />
  </div>

  {/* Button wrapped in div for responsive sizing */}
  <div className="w-[140px] md:w-auto">
  <ActionButton 
  onClick={() => setModalOpen(true)} 
  onCloseModal={() => setModalOpen(false)} >
  Sign up now
</ActionButton>
  </div>
</div>

            ) : (
              <div className="relative w-full h-full group">
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center items-start p-8 text-white">
                  <h3 className="text-2xl md:text-4xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                    {slide.title}
                  </h3>
                  <p className="text-lg md:text-xl">{slide.subtitle}</p>
                  <div className="mt-4 px-6 py-2 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors duration-300">
                    Shop Now →
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {filteredSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default OfferImages
