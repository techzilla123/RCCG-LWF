import * as React from "react";
import { CategorySection } from "./CategorySection";
import { ScrollBar } from "./ScrollBar";

type CategoryListProps = {
  selectedCategory: string;
};

export const CategoryList: React.FC<CategoryListProps> = ({ selectedCategory }) => {
  const categories = [
    {
      parent: "Balloons",
      title: "Premium Bouquet",
      items: ["Birthday bouquet", "Theme bouquet", "Numbers bouquet"],
    },
    {
      parent: "Balloons",
      title: "Balloon Decorations",
      items: ["Balloon garlands", "Balloon arches", "Balloon columns"],
    },
    {
      parent: "Birthdays",
      title: "Birthday Balloons",
      items: ["Kid's balloon", "Adult balloons", "Balloons by age"],
    },
    {
      parent: "Balloons",
      title: "Balloon Assessories",
      items: ["Balloon weight", "Balloon pump"],
    },
    {
      parent: "Balloons",
      title: "Balloons by type",
      items: [
        "Latex balloons",
        "Foil balloons",
        "Number balloons",
        "Letter balloons",
        "Giant balloons",
      ],
    },
    {
      parent: "Holidays & Occasions",
      title: "Balloons for Occasions",
      items: ["Graduation", "Easter", "Baby shower", "Mother's day", "Wedding"],
    },
  ];

  const filteredCategories = categories.filter(
    (category) => category.parent === selectedCategory
  );

  return (
    <section className="flex relative flex-wrap flex-1 shrink gap-10 items-start px-4 h-full basis-0 min-w-60 max-md:max-w-full">
      {filteredCategories.map((category, index) => (
        <CategorySection
          key={index}
          title={category.title}
          items={category.items}
        />
      ))}
      <div className="flex z-0 flex-1 shrink basis-0 h-[100px] w-[209px]" />
      <ScrollBar />
    </section>
  );
};
