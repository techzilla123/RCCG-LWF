"use client"
import type * as React from "react"

interface ScheduleItemProps {
  title: string
  time: string
  date: string
  description: string
  banner: string
  type: string
  backgroundColor?: string
}

export const ScheduleItem: React.FC<ScheduleItemProps> = ({
  title,
  time,
  date,
  description,
  banner,
  type,
  backgroundColor = "bg-orange-100",
}) => {
  return (
    <article
      className={`flex flex-col md:flex-row gap-6 items-start p-6 w-full ${backgroundColor} rounded-2xl max-sm:p-4 transition-transform hover:scale-105`}
    >
      {/* Image Section - Left Side */}
      <div className="flex-shrink-0 w-full md:w-[140px] h-[140px] rounded-xl overflow-hidden">
        <img src={banner || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content Section - Right Side */}
      <div className="flex flex-col flex-1 gap-3 relative">
        <div className="absolute top-0 right-0 text-sm md:text-base font-semibold text-stone-950">{time}</div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-stone-950 pr-32 md:pr-40">{title}</h3>

        {/* Date */}
        <p className="text-sm md:text-base font-medium text-stone-700">{date}</p>

        <p className="text-xs md:text-sm font-semibold text-stone-600 uppercase tracking-wide">{type}</p>

        {/* Description */}
        <p className="text-sm md:text-base text-neutral-700 leading-relaxed">{description}</p>
      </div>
    </article>
  )
}
