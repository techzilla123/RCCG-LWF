import * as React from "react";

interface CategorySectionProps {
  title: string;
  items: string[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  items,
}) => {
  return (
    <article className="z-0 flex-1 shrink text-sm tracking-normal leading-6 basis-0 min-w-[180px] text-neutral-500">
      <h2 className="text-base font-semibold tracking-normal leading-5 text-black">
        {title}
      </h2>
      <nav>
        {items.map((item, index) => (
          <a
            key={index}
            href="#"
            className="block overflow-hidden gap-2 self-stretch pr-4 pl-2 mt-1 w-full rounded-lg shadow-sm bg-black bg-opacity-0 min-h-10 hover:bg-gray-100"
          >
            {item}
          </a>
        ))}
      </nav>
    </article>
  );
};
