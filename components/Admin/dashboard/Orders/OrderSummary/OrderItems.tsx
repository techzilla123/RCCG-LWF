import React from 'react';
import { ItemCard } from './ItemCard';

const items = [
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/f67ac980db8f827f1f5dd1dabd3ab3e9f0c06e77?placeholderIfAbsent=true",
    title: "Transparent bubble balloon w...",
    quantity: 1
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/aa6627b0ab6cd9185c898e6327a6b655cc53aba3?placeholderIfAbsent=true",
    title: "Sweet Treats Birthday Table Display...",
    quantity: 3
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/20de1d94123a69e06ceef6040ccc53fb7c579a2e?placeholderIfAbsent=true",
    title: "Latex multiple colour balloons",
    quantity: 5
  }
];

export const OrderItems: React.FC = () => {
  return (
    <section className="flex flex-col w-full">
      <h2 className="pb-3 w-full text-xl font-bold text-black border-b border-solid border-b-neutral-300 max-md:text-lg max-sm:text-base">
        Items
      </h2>
      {items.map((item, index) => (
        <ItemCard
          key={index}
          image={item.image}
          title={item.title}
          quantity={item.quantity}
        />
      ))}
    </section>
  );
};