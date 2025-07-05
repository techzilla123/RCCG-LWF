"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface ProductCategory {
  categoryId: string;
  categoryName: string;
}

const GCT_ID = "1fc158a6-5dbc-43e9-b385-4cadb8434a76";

export function Breadcrumbs() {
  const [categories, setCategories] = React.useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeIndex, setActiveIndex] = React.useState(0);

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

      if (!response.ok) throw new Error("Failed to fetch categories");

      const data = await response.json();
      const list: ProductCategory[] = data.data || [];
      const reversed = list.reverse();
      setCategories(reversed);

      // Set activeIndex from PCT in URL
      const initialIndex = reversed.findIndex(
        (cat) => cat.categoryId === selectedCategoryId
      );
      if (initialIndex >= 0) setActiveIndex(initialIndex);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const handleClick = (index: number) => {
    const selected = categories[index];
    if (selected) {
      setActiveIndex(index);
      router.push(`?PCT=${selected.categoryId}`);
    }
  };

  const handlePrevious = () => {
    const prevIndex = (activeIndex - 1 + categories.length) % categories.length;
    handleClick(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % categories.length;
    handleClick(nextIndex);
  };

  if (isLoading) {
    return (
      <div className="text-stone-400 text-sm px-4 py-2">Loading breadcrumbs...</div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-stone-400 text-sm px-4 py-2">No categories found.</div>
    );
  }

  return (
    <nav aria-label="Breadcrumb" className="w-full">
      {/* Desktop View */}
      <div className="hidden md:flex overflow-hidden gap-1 items-center text-base leading-6 text-stone-300">
        {categories.map((cat, index) => (
          <React.Fragment key={cat.categoryId}>
            <span
              onClick={() => handleClick(index)}
              className={`overflow-hidden gap-2 self-stretch px-1 my-auto h-5 tracking-normal text-center rounded-lg ${
                index === activeIndex ? "text-neutral-500" : "text-stone-300"
              } cursor-pointer select-none`}
            >
              {cat.categoryName}
            </span>
            {index < categories.length - 1 && (
              <span
                className="overflow-hidden self-stretch text-sm leading-loose rounded-lg"
                aria-hidden="true"
              >
                /
              </span>
            )}
          </React.Fragment>
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
}
