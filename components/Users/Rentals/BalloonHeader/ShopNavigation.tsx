"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface ProductCategory {
  categoryId: string;
  categoryName: string;
}

const GCT_ID = "c7d6c7e5-aafe-439d-a714-63dd3910d3f9";

export const ShopNavigation: React.FC = () => {
  const [categories, setCategories] = React.useState<ProductCategory[]>([]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategoryId = searchParams.get("PCT");

  const getApiHeaders = () => {
    const token = localStorage.getItem("accessToken") || "";
    return {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
      ...(token && { Authorization: token }),
    };
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product-category/${GCT_ID}`,
        {
          method: "GET",
          headers: getApiHeaders(),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch rental categories");

      const data = await response.json();
      const list: ProductCategory[] = data.data || [];
      setCategories(list.reverse());

      const matchedIndex = list.findIndex(
        (cat) => cat.categoryId === selectedCategoryId
      );
      if (matchedIndex >= 0) setActiveIndex(matchedIndex);
    } catch (error) {
      console.error("Error fetching rental categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    const categoryId = categories[index].categoryId;
    router.push(`?PCT=${categoryId}`);
  };

  const handlePrevious = () => {
    const newIndex = (activeIndex - 1 + categories.length) % categories.length;
    handleClick(newIndex);
  };

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % categories.length;
    handleClick(newIndex);
  };

  if (isLoading) {
    return (
      <div className="text-stone-400 text-sm px-4 py-2">
        Loading rental categories...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-stone-400 text-sm px-4 py-2">
        No rental categories found.
      </div>
    );
  }

  return (
    <nav
      className="flex flex-col md:flex-row md:justify-center items-center gap-6 mt-6 -mb-10 z-10 w-full overflow-x-auto whitespace-nowrap"
      role="tablist"
      aria-label="Rental categories"
    >
      {/* Desktop View */}
      <div className="hidden md:flex gap-6">
        {categories.map((cat, index) => (
          <button
            key={cat.categoryId}
            onClick={() => handleClick(index)}
            role="tab"
            className={`pb-1 text-sm md:text-base font-normal whitespace-nowrap transition-colors border-b-2 ${
              index === activeIndex
                ? "text-black border-black"
                : "text-[rgba(113,113,113,0.3)] border-transparent"
            }`}
          >
            {cat.categoryName}
          </button>
        ))}
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden items-center justify-center gap-4 mt-2">
        <button
          onClick={handlePrevious}
          className="text-lg font-semibold"
          aria-label="Previous"
        >
          ←
        </button>

        <button
          className={`text-sm font-normal pb-1 transition-colors border-b-2 mb-1 ${
            activeIndex !== null
              ? "text-black border-black"
              : "text-[rgb(60,60,60)] border-[rgba(113,113,113,0)]"
          }`}
        >
          {categories[activeIndex]?.categoryName}
        </button>

        <button
          onClick={handleNext}
          className="text-lg font-semibold"
          aria-label="Next"
        >
          →
        </button>
      </div>
    </nav>
  );
};
