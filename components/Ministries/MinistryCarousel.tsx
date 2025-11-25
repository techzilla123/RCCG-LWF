"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MinistryHeading } from "./MinistryHeading"
import { Montserrat } from "next/font/google"
import { ChevronLeft, ChevronRight } from "lucide-react"

const montserrat = Montserrat({
  weight: "300",
  subsets: ["latin"],
})

interface MinistryData {
  title: string
  description: string
  image: string
}

const ministries: MinistryData[] = [
  {
    title: "Children's Ministry",
    description:
      "Our kids ministry exists to help kids come to know Jesus as their Lord and Savior. We believe that if the church and family work together, a child has the best chance of growing to know, love and follow Jesus. This is a place where kids birth – grade 5 can explore God's Word and experience His love each week.",
    image:
      "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/0870bebf0c60f63881dcaf35caf4c202fe0721da?placeholderIfAbsent=true",
  },
  {
    title: "Youth Ministry",
    description:
      "Our youth ministry is dedicated to empowering young people to grow in their faith, develop strong character, and become leaders in their communities. Through engaging activities, meaningful mentorship, and spiritual growth opportunities, we help teenagers discover their purpose in Christ and build lasting relationships with peers who share their values.",
    image:
      "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/0870bebf0c60f63881dcaf35caf4c202fe0721da?placeholderIfAbsent=true",
  },
  {
    title: "Men's Ministry",
    description:
      "The men's ministry provides a supportive environment for men to deepen their faith, build meaningful friendships, and grow as spiritual leaders in their families and communities. We focus on practical Bible study, accountability partnerships, and service opportunities that help men live out their faith with purpose and integrity.",
    image:
      "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/0870bebf0c60f63881dcaf35caf4c202fe0721da?placeholderIfAbsent=true",
  },
  {
    title: "Women's Ministry",
    description:
      "Our women's ministry creates a welcoming community where women of all ages can connect, grow spiritually, and encourage one another. Through Bible studies, prayer groups, and fellowship events, we celebrate God's love and support each other as we navigate life's seasons with faith, hope, and sisterhood.",
    image:
      "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/0870bebf0c60f63881dcaf35caf4c202fe0721da?placeholderIfAbsent=true",
  },
  {
    title: "Wisdom Ministry",
    description:
      "The wisdom ministry honors and celebrates mature believers who possess years of spiritual experience and biblical knowledge. We provide platforms for mentorship, intergenerational learning, and opportunities for seasoned saints to share their wisdom and guide younger believers in their journey of faith and discipleship.",
    image:
      "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/0870bebf0c60f63881dcaf35caf4c202fe0721da?placeholderIfAbsent=true",
  },
]

export default function MinistryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()

  const currentMinistry = ministries[currentIndex]
  const isEvenIndex = currentIndex % 2 === 0

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? ministries.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === ministries.length - 1 ? 0 : prevIndex + 1))
  }

  const handleReadMore = () => {
    router.push("/ministries")
  }

  const MinistryContent = () => (
    <article className="flex flex-col flex-1 shrink pt-5 basis-0 min-h-px min-w-60 max-md:max-w-full">
      <div className="flex flex-col items-center self-center max-w-full w-[250px]">
        <img
          src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/c6527fa8417a5c62aaf08fb374dd2e0bf7b0a7fc?placeholderIfAbsent=true"
          alt="Ministry logo"
          className="object-contain w-full aspect-[1.97]"
        />
      </div>

      <div className={`flex flex-col items-center mx-auto text-center text-zinc-800 ${montserrat.className} max-w-2xl`}>
        <h2 className="text-2xl font-bold mb-4 text-zinc-800">{currentMinistry.title}</h2>
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
            ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = "#444299"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = "#333064"
          }}
          onClick={handleReadMore}
        >
          Read More
        </button>
      </div>
    </article>
  )

  const MinistryImage = () => (
    <div className="flex-1 shrink basis-0 min-h-px min-w-60 max-md:max-w-full">
      <div className="w-full max-md:max-w-full">
        <img
          src={currentMinistry.image || "/placeholder.svg"}
          alt={currentMinistry.title}
          className="object-contain max-w-full aspect-[0.95] w-[524px]"
        />
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

          {/* Content and Image - Alternating Layout */}
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

        <div className="flex justify-center gap-2 mt-8">
          {ministries.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-zinc-800" : "bg-gray-300"
              }`}
              aria-label={`Go to ministry ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
