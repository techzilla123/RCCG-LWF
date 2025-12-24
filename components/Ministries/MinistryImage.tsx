"use client"

import React from "react"

interface MinistryImageProps {
  className?: string
  image: string
  title: string
}

export function MinistryImage({
  className = "",
  image,
  title,
}: MinistryImageProps) {
  return (
    <div className={`flex-1 flex justify-center ${className}`}>
      <div className="relative max-w-[420px] rounded-xl overflow-hidden shadow-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
