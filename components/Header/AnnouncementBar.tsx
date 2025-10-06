import type * as React from "react"

export const AnnouncementBar: React.FC = () => {
  return (
    <section className="flex absolute top-0 left-0 z-10 gap-1 justify-center items-center px-2 py-2 w-full bg-slate-700 h-[33px]">
      <div className="relative h-6 w-full flex items-center justify-center">
        <h1 className="text-base md:text-xl font-semibold tracking-wide leading-6 text-center text-white px-2 text-balance">
          Welcome To RCCG Living Word Forney!
        </h1>
      </div>
    </section>
  )
}
