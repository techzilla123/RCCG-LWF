import type React from "react"

interface ProductCardProps {
  imageSrc: string
  title: string
}

export const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, title }) => {
  return (
    <div className="flex flex-col overflow-hidden text-xl tracking-normal leading-8 text-black rounded-2xl basis-0 min-h-60 flex-1 min-w-[200px] max-w-[300px]">
      <img
        src={imageSrc || "/placeholder.svg"}
        alt={title}
        className="object-cover flex-1 w-full rounded-2xl aspect-[1.21]"
      />
      <div className="p-4">{title}</div>
    </div>
  )
}
