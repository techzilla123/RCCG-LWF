import * as React from "react";

interface CategoryCardProps {
  image: string;
  title: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ image, title }) => {
  return (
    <article className="overflow-hidden self-stretch my-auto w-60 whitespace-nowrap bg-white rounded-2xl">
      <img
        src={image}
        alt={`${title} category`}
        className="object-contain w-full rounded-2xl aspect-square"
      />
      <div className="flex flex-col justify-center py-4 w-full">
        <h3 className="w-full text-xl tracking-normal leading-8">{title}</h3>
      </div>
    </article>
  );
};
