import * as React from "react";

interface ProductCardProps {
  imageSrc: string;
  title: string;
  isLarge?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  title,
  isLarge = false,
}) => {
  return (
    <article
      className={`flex flex-col overflow-hidden text-xl tracking-normal leading-8 text-black rounded-2xl basis-0 ${
        isLarge
          ? "h-full flex-1 max-w-[400px] min-w-[280px]"
          : "min-h-60 flex-1 min-w-[200px]"
      } xxl:max-w-[300px]`}
    >
      <img
        src={imageSrc}
        alt={title}
        className={`object-contain flex-1 w-full rounded-2xl ${
          isLarge ? "aspect-[0.68]" : "aspect-[1.21]"
        }`}
      />
      <div className="flex flex-col justify-center py-2 w-full">
        <h3 className="w-full">{title}</h3>
      </div>
    </article>
  );
};
