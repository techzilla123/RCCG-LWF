import type * as React from "react"
import { Racing_Sans_One } from "next/font/google"

const racingSansOne = Racing_Sans_One({
  weight: "400",
  subsets: ["latin"],
})

export const LiveSection: React.FC = () => {
  return (
    <section className="absolute right-12 md:right-8 top-[38px] z-[15] flex items-center h-[30px] md:h-[38px] w-auto gap-1.5 md:gap-2">
      <img src="/LWF 2 Logo 1.png" alt="Live streaming indicator" className="w-8 h-[30px] md:w-10 md:h-[38px]" />
      <p className={`${racingSansOne.className} text-slate-700 text-sm md:text-lg`}>Live</p>
    </section>
  )
}
