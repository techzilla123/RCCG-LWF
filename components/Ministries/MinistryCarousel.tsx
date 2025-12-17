"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MinistryHeading } from "./MinistryHeading"
import { Montserrat } from "next/font/google"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Luckiest_Guy } from "next/font/google"

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
})

const montserrat = Montserrat({
  weight: "300",
  subsets: ["latin"],
})

interface MinistryData {
  title: string
  slogan: string
  gradientClass: string
  description: string
  image: string
}

const ministries: MinistryData[] = [
  {
    title: "Children’s Ministry – God’s Heritage (Ages 1 - 12)",
    slogan: "God’s Heritage",
    gradientClass: "bg-gradient-to-r from-amber-500 to-orange-500",
    description:
      "A joyful, dynamic, and nurturing place where children ages 1–12 discover God’s love and grow in faith. We build strong spiritual foundations through Bible lessons, memory verses, quizzes, music, and fun activities—all in a safe, welcoming environment.",
    image: "/Aaa.jpg",
  },
  {
    title: "Youth Ministry – Christ Ambassadors (Ages 13 - 17)",
    slogan: "Christ Ambassadors",
    gradientClass: "bg-gradient-to-r from-blue-600 to-indigo-600",
    description:
      "Dedicated to raising Christ Ambassadors by guiding teenagers into deeper relationship with Christ. Through interactive teachings, mentorship, worship, and life-building sessions, we help youths discover identity, purpose, and God-given potential.",
    image: "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/0870bebf0c60f63881dcaf35caf4c202fe0721da?placeholderIfAbsent=true",
  },
  {
    title: "Young Adult & Singles Ministry",
    slogan: "YASM",
    gradientClass:
      "bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-violet-700",
    description:
      "A vibrant community that empowers young adults to grow spiritually, build meaningful relationships, and walk confidently in God’s purpose. Through fellowship, mentorship, Bible studies, and skill-building sessions, we equip young people to lead boldly in faith and influence their world for Christ.",
    image: "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/0870bebf0c60f63881dcaf35caf4c202fe0721da?placeholderIfAbsent=true",
  },
  {
    title: "Women’s Ministry – Women of Zion",
    slogan: "Women of Zion",
    gradientClass: "bg-gradient-to-r from-pink-600 to-rose-600",
    description:
      "A community dedicated to nurturing, empowering, and uplifting women in all life stages. Through prayer, teaching, fellowship, and outreach, we help women grow spiritually, embrace their God-given purpose, and positively impact their families and communities.",
    image: "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/0870bebf0c60f63881dcaf35caf4c202fe0721da?placeholderIfAbsent=true",
  },
  {
    title: "Men’s Ministry – Men of Valor",
    slogan: "Men of Valor",
    gradientClass: "bg-gradient-to-r from-cyan-900 to-blue-900",
    description:
      "Focused on raising strong, spiritually grounded men who lead with integrity and courage. Through prayer, mentorship, fellowship, and practical empowerment, we equip men to grow in faith, character, and purpose while serving their homes, church, and community.",
    image: "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/0870bebf0c60f63881dcaf35caf4c202fe0721da?placeholderIfAbsent=true",
  },
  {
    title: "The Wise Ones Ministry",
    slogan: "Seniors & Elders",
    gradientClass: "bg-gradient-to-r from-teal-700 to-cyan-700",
    description:
      "A vibrant community of mature believers committed to growing in faith, sharing wisdom, and strengthening the church. Through fellowship, discipleship, prayer, and service, the Wise Ones inspire younger generations and continue making meaningful Kingdom impact.",
    image: "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/0870bebf0c60f63881dcaf35caf4c202fe0721da?placeholderIfAbsent=true",
  },
]


export default function MinistryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()

  // ✅ Auto change ministry every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === ministries.length - 1 ? 0 : prevIndex + 1
      )
    }, 20000)

    return () => clearInterval(timer)
  }, [])

  const currentMinistry = ministries[currentIndex]
  const isEvenIndex = currentIndex % 2 === 0

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? ministries.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === ministries.length - 1 ? 0 : prevIndex + 1
    )
  }

  const handleReadMore = () => {
    router.push("/ministries")
  }

  const MinistryContent = () => (
    <article className="flex flex-col flex-1 shrink pt-5 basis-0 min-h-px min-w-60 max-md:max-w-full">
      <div className="flex flex-col items-center self-center max-w-full w-[250px]">
       <div className="flex flex-col items-center self-center mb-4">
  <div className="flex flex-col items-center self-center mb-6">
  <span
    className={`
      ${luckiestGuy.className}
      text-4xl sm:text-5xl md:text-6xl
      uppercase tracking-wide
      text-transparent bg-clip-text
      ${currentMinistry.gradientClass}
      ministry-text-logo
    `}
  >
    {currentMinistry.slogan}
  </span>
</div>

</div>

      </div>

      <div
        className={`flex flex-col items-center mx-auto text-center text-zinc-800 ${montserrat.className} max-w-2xl`}
      >
        <h2 className="text-2xl font-bold mb-4 text-zinc-800">
          {currentMinistry.title}
        </h2>
        <p
          className="max-md:max-w-full"
          style={{
            fontSize: "15px",
            lineHeight: "27px",
            fontWeight: 300,
          }}
        >
          {currentMinistry.description}
        </p>
      </div>

      <div className="flex flex-col items-center mt-10 w-full text-base font-medium leading-7 text-center text-white uppercase max-md:max-w-full">
        <button
          className="flex justify-center items-center px-6 py-3.5 rounded max-md:px-5 text-center text-white uppercase transition-colors duration-300"
          style={{
            backgroundColor: "#333064",
            fontSize: "15px",
            lineHeight: "22.2px",
            fontWeight: 400,
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#444299"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#333064"
          }}
          onClick={handleReadMore}
        >
          Read More
        </button>
      </div>
    </article>
  )

  const MinistryImage = () => (
  <div className="flex-1 flex justify-center items-center w-full max-md:order-1">
<div className="relative w-full max-w-[420px] sm:max-w-[460px] mt-8 md:mt-10 lg:mt-12">
      
      {/* OUTER DECORATIVE FRAME */}
      <div
        className="
          relative
          rounded-[22px]
          p-[6px]
          bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600
          shadow-[0_18px_45px_rgba(0,0,0,0.2)]
        "
      >
        {/* IMAGE CONTAINER */}
        <div
          className="
            relative
            w-full
            aspect-[4/3]              /* ✅ RESPONSIVE HEIGHT */
            rounded-[18px]
            overflow-hidden
            bg-white
            transition-transform duration-300
            hover:scale-[1.01]
          "
        >
          <img
            src={currentMinistry.image || "/placeholder.svg"}
            alt={currentMinistry.title}
            className="w-full h-full object-cover"
          />

          {/* SOFT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

          {/* SUBTLE CORNER ACCENTS */}
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-white/60 rounded-tr-md" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-white/60 rounded-bl-md" />
        </div>
      </div>
    </div>
  </div>
)


  return (
    <section className="flex flex-col items-center w-full bg-white rounded-none max-md:py-24">
      <div
        className="
          flex relative flex-col overflow-hidden 
          pt-16 pb-14 mt-0 min-h-[804px] w-full 
          px-8 sm:px-12 md:px-24 lg:px-48 xl:px-64 
          max-w-[3000px] 2xl:max-w-[3000px]
          mx-auto
        "
      >
        <img
          src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/f10cab0e5abf36e41741d3fdea3d4c62fcfe9615?placeholderIfAbsent=true"
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full"
        />

        <MinistryHeading />

        <div className="flex relative flex-wrap gap-8 items-start pt-1 pb-4 w-full max-w-[1080px] mx-auto">
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 z-10 p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Previous ministry"
          >
            <ChevronLeft size={32} className="text-zinc-800" />
          </button>

          {/* Alternating layout */}
          {isEvenIndex ? (
            <>
              <MinistryContent />
              <MinistryImage />
            </>
          ) : (
            <>
              <MinistryImage />
              <MinistryContent />
            </>
          )}

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 z-10 p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Next ministry"
          >
            <ChevronRight size={32} className="text-zinc-800" />
          </button>
        </div>

        {/* Slide Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {ministries.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-zinc-800"
                  : "bg-gray-300"
              }`}
              aria-label={`Go to ministry ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
