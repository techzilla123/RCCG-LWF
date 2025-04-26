import * as React from "react";
import { CategoryCard } from "./CategoryCard";

const categories = [
  { id: 1, title: "Balloons", image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/2a080eb861a50c09985df1600959b8274afeb86a?placeholderIfAbsent=true" },
  { id: 2, title: "Birthdays", image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/b7c7a5abf000dd0497afa40584cf24c6684ad0b2?placeholderIfAbsent=true" },
  { id: 3, title: "Holidays", image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/26ed0b701260b3350a1b8214ea6183e44fbe0d15?placeholderIfAbsent=true" },
  { id: 4, title: "Party Supplies", image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/86c2cc12b684c43a34251d1a9d67357a80cc0dfa?placeholderIfAbsent=true" },
  { id: 5, title: "Decorations", image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/2a080eb861a50c09985df1600959b8274afeb86a?placeholderIfAbsent=true" },
  { id: 6, title: "Occasions", image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/26ed0b701260b3350a1b8214ea6183e44fbe0d15?placeholderIfAbsent=true" },
  { id: 7, title: "Party Supplies", image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/86c2cc12b684c43a34251d1a9d67357a80cc0dfa?placeholderIfAbsent=true" },
  
];

export const CategoryList: React.FC<CategoryListProps> = ({ scrollRef }) => {
  return (
    <section
      ref={scrollRef}
      className="flex overflow-x-auto gap-6 items-center mt-6 w-full text-xl tracking-normal leading-8 text-black no-scrollbar max-md:max-w-full"
    >
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          image={category.image}
          title={category.title}
        />
      ))}
    </section>
  );
};
