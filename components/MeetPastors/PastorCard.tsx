import type React from "react"

interface PastorCardProps {
  name: string
  title: string
}

export const PastorCard: React.FC<PastorCardProps> = ({ name, title }) => {
  return (
    <div className="flex relative flex-col gap-6 items-start lg:items-start md:items-center sm:items-center">
      <div className="flex relative flex-col gap-2 items-start w-full">
        <h3 className="relative text-xl font-semibold tracking-normal leading-7 text-white lg:text-xl md:text-lg sm:text-lg">
          {name}
        </h3>
        <div className="relative h-[2px] w-full bg-neutral-500" />
      </div>
      <div className="flex relative flex-col items-start">
        <p className="relative text-lg leading-7 text-white lg:text-lg md:text-base sm:text-base">{title}</p>
      </div>
    </div>
  )
}
