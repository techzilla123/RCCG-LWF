"use client"

import type React from "react"
import { Button } from "./Button"

export interface ServiceCardProps {
  title: string
  imageSrc: string
  description: string
  fullDescription?: string
  onLearnMore?: (service: {
    title: string
    imageSrc: string
    description: string
    fullDescription?: string
  }) => void
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  imageSrc,
  description,
  fullDescription,
  onLearnMore
}) => {
  const handleLearnMore = () => {
    onLearnMore?.({
      title,
      imageSrc,
      description,
      fullDescription
    })
  }

  return (
    <article className="flex flex-col items-start bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300">
       <div className="relative w-full aspect-[1.6/1] rounded-t-2xl overflow-hidden">
        <img
          src={imageSrc}
          alt={title || "Ministry image"}
          className="w-full h-full object-cover"
        />

      

        {/* Text on image (EXACT STYLE) */}
        <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl md:text-2xl">
          {title}
        </h3>
      </div>
      

      <div className="flex flex-col gap-4 p-6">
        <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>

        <p className="text-gray-700 leading-relaxed text-base">
          {description}
        </p>

        <Button
          variant="outline"
          className="mt-4 self-start bg-transparent"
          onClick={handleLearnMore}
        >
          <span>Learn More</span>
          <img
            src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/29b16f3f8673f94062503389880d981c0f08f381?placeholderIfAbsent=true"
            alt=""
            className="w-4 h-4"
          />
        </Button>
      </div>
    </article>
  )
}
