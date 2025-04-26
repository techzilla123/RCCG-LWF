import * as React from "react";
import { CategorySection } from "./CategorySection";
import { ScrollBar } from "./ScrollBar";

export const CategoryList: React.FC = () => {
  const categories = [
    {
      title: "Premium Bouquet",
      items: ["Birthday bouquet", "Theme bouquet", "Numbers bouquet"],
    },
    {
      title: "Balloon Decorations",
      items: ["Balloon garlands", "Balloon arches", "Balloon columns"],
    },
    {
      title: "Birthday Balloons",
      items: ["Kid's balloon", "Adult balloons", "Balloons by age"],
    },
    {
      title: "Balloon Assessories",
      items: ["Balloon weight", "Balloon pump"],
    },
    {
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
      title: "Balloons for Occasions",
      items: ["Graduation", "Easter", "Baby shower", "Mother's day", "Wedding"],
    },
  ];

  return (
    <section className="flex relative flex-wrap flex-1 shrink gap-10 items-start px-4 h-full basis-0 min-w-60 max-md:max-w-full">
      {categories.map((category, index) => (
        <CategorySection
          key={index}
          title={category.title}
          items={category.items}
        />
      ))}
      <div className="flex z-0 flex-1 shrink basis-0 h-[100px] w-[209px]" />
      <div className="flex z-0 flex-1 shrink basis-0 h-[100px] w-[209px]" />
      <ScrollBar />
    </section>
  );
};
