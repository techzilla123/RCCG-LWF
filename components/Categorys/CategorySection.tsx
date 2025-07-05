import * as React from "react"

interface CategorySectionProps {
  title: string
  items: { name: string; id: string; isSub: boolean }[]
  onItemClick?: (item: { name: string; id: string; isSub: boolean }) => void
   categoryId: string 
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  items,
  onItemClick,
  categoryId, 
}) => {
  const formatTitle = (text: string) => {
    if (text.includes(" & ")) {
      const [first, second] = text.split(" & ")
      return (
        <>
          {first}
          <br />& {second}
        </>
      )
    }

    if (text.length > 25) {
      const index = text.lastIndexOf(" ", 25)
      if (index !== -1) {
        return (
          <>
            {text.slice(0, index)}
            <br />
            {text.slice(index + 1)}
          </>
        )
      }
    }

    return text
  }

  return (
    <article className="z-0 flex-1 shrink text-sm tracking-normal leading-6 basis-0 min-w-[180px] text-neutral-500">
     <h2 
  onClick={() =>
    onItemClick?.({
      name: title,
      id: categoryId,
      isSub: false,
    })
  }
  className="text-base font-semibold tracking-normal leading-5 text-black cursor-pointer hover:underline"
>
  {formatTitle(title)}
</h2>

      <nav className="mt-2 flex flex-col gap-2">
       {items.map((item, index) => (
  <button
    key={index}
    onClick={() => onItemClick?.(item)}
    className="text-left text-black px-2 py-1 rounded-lg hover:bg-gray-100 min-h-10"
  >
    {item.name}
  </button>
))}

      </nav>
    </article>
  )
}
