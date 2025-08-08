"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface ProductCategory {
  categoryId: string;
  categoryName: string;
  generalCategoryName: string;
  noOfProducts: number;
}

const MAX_VISIBLE_TABS = 5;
const GCT_ID = "1fc158a6-5dbc-43e9-b385-4cadb8434a76";

export const ShopNavigation: React.FC = () => {
  const [categories, setCategories] = React.useState<ProductCategory[]>([]);
  const [activeTab, setActiveTab] = React.useState(0);
  const [visibleStartIndex, setVisibleStartIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();

  const getApiHeaders = () => {
    const token = localStorage.getItem("accessToken") || "";
    return {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
      ...(token && { Authorization: token }),
    };
  };

  const fetchTabs = async () => {
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
      const categoryList: ProductCategory[] = data.data || [];
      const reversedList = categoryList.reverse();
      setCategories(reversedList);
      return reversedList;
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const fetchAndInit = async () => {
      const loaded = await fetchTabs();
      const PCT = searchParams.get("PCT");

      if (PCT && loaded.length > 0) {
        const foundIndex = loaded.findIndex((cat) => cat.categoryId === PCT);
        if (foundIndex !== -1) {
          setActiveTab(foundIndex);
          const newStart = Math.max(0, foundIndex - Math.floor(MAX_VISIBLE_TABS / 2));
          setVisibleStartIndex(newStart);
        }
      }
    };

    fetchAndInit();
  }, [searchParams]);

 const handleTabClick = (index: number) => {
  setActiveTab(index);
  const selected = categories[index];

  if (!selected) return;

  if (selected.categoryName === "Balloon Arts Gallery") {
    router.push("/balloon-gallery");
  } else if (selected.categoryId) {
    router.push(`?PCT=${selected.categoryId}`);
  }
};


  const handleNextTabWindow = () => {
    if (visibleStartIndex + MAX_VISIBLE_TABS < categories.length) {
      setVisibleStartIndex((prev) => prev + 1);
    }
  };

  const handlePreviousTabWindow = () => {
    if (visibleStartIndex > 0) {
      setVisibleStartIndex((prev) => prev - 1);
    }
  };

  const handleNextMobile = () => {
  const newIndex = (activeTab + 1) % categories.length;
  setActiveTab(newIndex);
  const selected = categories[newIndex];

  if (selected?.categoryName === "Balloon Arts Gallery") {
    router.push("/balloon-gallery");
  } else {
    router.push(`?PCT=${selected.categoryId}`);
  }
};

const handlePreviousMobile = () => {
  const newIndex = (activeTab - 1 + categories.length) % categories.length;
  setActiveTab(newIndex);
  const selected = categories[newIndex];

  if (selected?.categoryName === "Balloon Arts Gallery") {
    router.push("/balloon-gallery");
  } else {
    router.push(`?PCT=${selected.categoryId}`);
  }
};


  if (isLoading) {
    return (
      <div className="w-full text-center py-4 text-gray-500">
        Loading categories...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="w-full text-center py-4 text-red-500">
        No categories found.
      </div>
    );
  }

  const visibleTabs = categories.slice(
    visibleStartIndex,
    visibleStartIndex + MAX_VISIBLE_TABS
  );

  return (
    <nav
      className="w-full mt-6 -mb-10 z-10"
      role="tablist"
      aria-label="Decorations categories"
    >
      {/* Desktop View */}
      <div className="hidden md:flex justify-center items-center gap-2 px-4">
        {visibleStartIndex > 0 && (
          <button
            onClick={handlePreviousTabWindow}
            className="text-lg font-semibold"
            aria-label="Scroll left"
          >
            ←
          </button>
        )}

        <div className="flex gap-6 overflow-hidden">
          {visibleTabs.map((category, index) => {
            const actualIndex = visibleStartIndex + index;
            return (
              <button
                key={`${category.categoryId}-${actualIndex}`}
                onClick={() => handleTabClick(actualIndex)}
                role="tab"
                className={`pb-1 text-sm md:text-base font-normal transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === actualIndex
                    ? "text-black border-black"
                    : "text-[rgb(60,60,60)] border-transparent"
                }`}
              >
                {category.categoryName}
              </button>
            );
          })}
        </div>

        {visibleStartIndex + MAX_VISIBLE_TABS < categories.length && (
          <button
            onClick={handleNextTabWindow}
            className="text-lg font-semibold"
            aria-label="Scroll right"
          >
            →
          </button>
        )}
      </div>

      {/* Mobile View */}
      <div className="flex flex-col items-center md:hidden relative z-50 w-full px-4">
        <div className="flex items-center justify-between w-full max-w-xs">
          <button
            onClick={handlePreviousMobile}
            className="text-lg font-semibold"
            aria-label="Previous tab"
          >
            ←
          </button>

          <button
            className="pb-1 text-sm font-normal transition-colors border-b-2 text-black border-black"
            aria-label="Current tab"
          >
            {categories[activeTab]?.categoryName}
          </button>

          <button
            onClick={handleNextMobile}
            className="text-lg font-semibold"
            aria-label="Next tab"
          >
            →
          </button>
        </div>
      </div>
    </nav>
  );
};
