import * as React from "react"

interface CategorySectionProps {
  title: string
  items: string[]
  onItemClick?: (item: string) => void
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  items,
  onItemClick,
}) => {
  return (
    <article className="z-0 flex-1 shrink text-sm tracking-normal leading-6 basis-0 min-w-[180px] text-neutral-500">
      <h2 className="text-base font-semibold tracking-normal leading-5 text-black">
        {title}
      </h2>
      <nav>
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => onItemClick?.(item)}
            className="block overflow-hidden text-left text-black gap-2 self-stretch pr-4 pl-2 mt-1 w-full rounded-lg shadow-sm bg-black bg-opacity-0 min-h-10 hover:bg-gray-100"
          >
            {item}
          </button>
        ))}
      </nav>
    </article>
  )
}
