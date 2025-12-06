"use client"
import * as React from "react"

interface MovementCardProps {
  imageSrc: string
  title: string
  subtitle?: string
  className?: string
  index?: number
}

export const MovementCard: React.FC<MovementCardProps> = ({ imageSrc, title, subtitle, className = "", index = 0 }) => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = React.useState(false)
  const cardRef = React.useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    setMousePos({ x: x * 15, y: y * 15 })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
    setIsHovering(false)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovering(true)}
      className={`group relative flex flex-col flex-1 shrink 
        -mt-[80px] sm:-mt-[60px] md:-mt-[100px] 
        px-2 sm:px-4 md:px-5 
        pt-20 sm:pt-28 md:pt-44 
        pb-4 sm:pb-6 md:pb-8 
        basis-0 min-h-[200px] sm:min-h-[260px] md:min-h-[300px] 
        min-w-[150px] sm:min-w-[200px] md:min-w-60 
        overflow-hidden rounded-lg sm:rounded-xl shadow-md sm:shadow-lg 
        transition-all duration-500 hover:scale-105 hover:shadow-2xl 
        cursor-pointer perspective ${className}`}
      style={{
        transform: isHovering
          ? `perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg) scale(1.05)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        transitionDuration: isHovering ? "0ms" : "500ms",
      }}
    >
      <img
        src={imageSrc || "/placeholder.svg"}
        className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-125"
        alt=""
        style={{
          transform: isHovering ? `scale(1.25) translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` : "scale(1)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12" />

      <div className="relative z-10 pb-1 sm:pb-2 md:pb-3 w-full text-center flex flex-col items-center justify-end flex-1">
        <h3
          className="text-lg sm:text-xl md:text-3xl font-semibold leading-5 sm:leading-6 md:leading-8 text-white uppercase tracking-wide transition-all duration-500"
          style={{
            transform: isHovering ? "translateY(-8px)" : "translateY(0px)",
            textShadow: isHovering ? "0 10px 30px rgba(0,0,0,0.8)" : "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          {title}
          {subtitle && (
            <>
              <br />
              <span className="font-bold">{subtitle}</span>
            </>
          )}
        </h3>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}
