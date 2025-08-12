import type React from "react"

interface ProductCardProps {
  imageSrc: string
  title: string
  link?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, title, link }) => {
  const content = (
    <div
      className="flex flex-col overflow-hidden text-xl tracking-normal leading-8 text-black rounded-2xl basis-0 flex-1
                 min-h-48 min-w-[160px] max-w-[200px] md:min-h-60 md:min-w-[200px] md:max-w-[300px]"
    >
      <img
        src={imageSrc || "/placeholder.svg"}
        alt={title}
        width={200}
        height={200}
        className="object-cover flex-1 w-full rounded-2xl aspect-[1.21]"
      />
      <div className="p-4">{title}</div>
    </div>
  )

  // If a link exists render an anchor, otherwise render a non-clickable block
  if (link) {
    return (
      <a href={link} className="block min-w-[200px]">
        {content}
      </a>
    )
  }

  return <div className="block min-w-[200px]">{content}</div>
}
