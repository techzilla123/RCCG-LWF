"use client";
import * as React from "react";
import { CategoryHeader } from "./Category/CategoryHeader";
import { CategoryList } from "./Category/CategoryList";

const Category: React.FC = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="flex overflow-hidden flex-col justify-center self-stretch px-20 py-10 bg-white max-md:px-5">
      <CategoryHeader
        title="Categories"
        onScrollLeft={() => scroll("left")}
        onScrollRight={() => scroll("right")}
      />
      <CategoryList scrollRef={scrollRef} />
    </section>
  );
};

export default Category;
