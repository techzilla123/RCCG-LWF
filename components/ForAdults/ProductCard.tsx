import type React from "react"

interface ProductCardProps {
  imageSrc: string
  title: string
}

export const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, title }) => {
  return (
    <div
      className="flex flex-col overflow-hidden text-xl tracking-normal leading-8 text-black rounded-2xl basis-0 flex-1
                min-h-48 min-w-[160px] max-w-[200px] md:min-h-60 md:min-w-[200px] md:max-w-[300px]"
    >
      <img
        src={imageSrc || "/placeholder.svg"}
        alt={title}
        width={200} // Provide default width/height for Image component
        height={200}
        className="object-cover flex-1 w-full rounded-2xl aspect-[1.21]"
      />
      <div className="p-4">{title}</div>
    </div>
  )
}
