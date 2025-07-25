import * as React from "react";
import { CategoryCard } from "./CategoryCard";
import { useRouter } from "next/navigation"; // ✅ Correct import for `app/` directory

interface Category {
  id: number;
  title: string;
  image: string;
  href: string;
}

const categories: Category[] = [
  {
    id: 1,
    title: "Balloons",
    image:
      "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/2a080eb861a50c09985df1600959b8274afeb86a?placeholderIfAbsent=true",
    href: "/shop/balloon",
  },
  {
    id: 2,
    title: "Birthdays",
    image:
      "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/b7c7a5abf000dd0497afa40584cf24c6684ad0b2?placeholderIfAbsent=true",
    href: "/shop/birthday",
  },
  {
    id: 3,
    title: "Holidays",
    image:
      "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/26ed0b701260b3350a1b8214ea6183e44fbe0d15?placeholderIfAbsent=true",
    href: "/shop/holiday",
  },
  {
    id: 4,
    title: "Party Supplies",
    image:
      "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/86c2cc12b684c43a34251d1a9d67357a80cc0dfa?placeholderIfAbsent=true",
    href: "/shop/party-supplies",
  },
  {
    id: 5,
    title: "Decorations",
    image:
      "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/2a080eb861a50c09985df1600959b8274afeb86a?placeholderIfAbsent=true",
    href: "/shop/decorations",
  },
  {
    id: 6,
    title: "Occasions",
    image:
      "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/26ed0b701260b3350a1b8214ea6183e44fbe0d15?placeholderIfAbsent=true",
    href: "/shop/holiday",
  },
  {
    id: 7,
    title: "Rentals",
    image:
      "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/86c2cc12b684c43a34251d1a9d67357a80cc0dfa?placeholderIfAbsent=true",
    href: "/rentals",
  },
];

interface CategoryListProps {
  scrollRef: React.RefObject<HTMLDivElement>;
}

export const CategoryList: React.FC<CategoryListProps> = ({ scrollRef }) => {
  const router = useRouter(); // ✅ From `next/navigation`

  const handleClick = (href: string) => {
    router.push(href);
  };

  return (
    <section
      ref={scrollRef}
      className="flex overflow-x-auto gap-4 sm:gap-6 items-center mt-6 w-full text-xl tracking-normal leading-8 text-black no-scrollbar"
    >
      {categories.map((category) => (
        <div
          key={category.id}
          className="min-w-[160px] sm:min-w-[200px] md:min-w-[250px] lg:min-w-[300px] cursor-pointer"
          onClick={() => handleClick(category.href)}
        >
          <CategoryCard image={category.image} title={category.title} />
        </div>
      ))}
    </section>
  );
};
