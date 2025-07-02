import React from 'react';

interface ItemCardProps {
  image: string;
  title: string;
  quantity: number;
}

export const ItemCard: React.FC<ItemCardProps> = ({ image, title, quantity }) => {
  return (
    <article className="flex items-center px-0 py-5 w-full border-b border-solid border-b-gray-200">
      <img
        src={image}
        alt={title}
        className="w-20 h-20 rounded-lg"
      />
      <div className="flex flex-col ml-5 gap-2">
        <h3 className="text-xl font-bold text-black max-md:text-lg max-sm:text-base">
          {title}
        </h3>
        <p className="text-base text-neutral-500 max-md:text-sm max-sm:text-xs">
          Quantity: {quantity}
        </p>
      </div>
    </article>
  );
};