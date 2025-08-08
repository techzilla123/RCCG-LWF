"use client";
import React, { useState, useEffect } from "react";
import { SortIcon, StatusIcon, CartIcon, CaretDownIcon } from "./Icons";
import OrderDetails from "../ProductsAddOne/ProductDetailForm"; // Import modal component (adjust path if needed)

interface Category {
  generalCategoryId: string;
  name: string;
}

interface ProductCategory {
  categoryId: string;
  categoryName: string;
  generalCategoryName: string;
  noOfProducts: number;
}

interface SubCategory {
  subCategoryId: string;
  subCategoryName: string;
}

interface FilterBarProps {
  onFilterByCategory: (categoryId: string | null) => void;
  onSearch: (search: string) => void;
  onSortFilter: (type: 'GCT' | 'PCT' | 'SCT' | null, id: string | null, name: string) => void;
}

export const FilterBar = ({ onFilterByCategory, onSearch, onSortFilter }: FilterBarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Existing Category Filter states
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const [selectedCat, setSelectedCat] = useState("All");
  const [categories, setCategories] = useState<Category[]>([]); // General categories for the main filter
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [errorMessageCategories, setErrorMessageCategories] = useState("");

  // Status Filter states
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");

  // New Sort/Category Filter states
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedSortDisplay, setSelectedSortDisplay] = useState("None");
  const [sortDropdownLevel, setSortDropdownLevel] = useState<'general' | 'product' | 'sub'>('general');
  const [generalCategoriesForSort, setGeneralCategoriesForSort] = useState<Category[]>([]);
  const [productCategoriesForSort, setProductCategoriesForSort] = useState<ProductCategory[]>([]);
  const [subCategoriesForSort, setSubCategoriesForSort] = useState<SubCategory[]>([]);
  const [currentGeneralCategoryForSort, setCurrentGeneralCategoryForSort] = useState<Category | null>(null);
  const [currentProductCategoryForSort, setCurrentProductCategoryForSort] = useState<ProductCategory | null>(null);
  const [isLoadingSortData, setIsLoadingSortData] = useState(false);
  const [errorMessageSortData, setErrorMessageSortData] = useState("");

  // Fetch General Categories for the main Category filter
  const fetchCategories = async () => {
    setIsLoadingCategories(true);
    setErrorMessageCategories("");
    try {
      const token = localStorage.getItem("accessToken") || "";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/list-product-general-category`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch categories.");
      }
      const data = await response.json();
      setCategories(data.data || []);
      setGeneralCategoriesForSort(data.data || []); // Also populate for sort dropdown
    } catch (error) {
      let message = "Something went wrong. Please try again.";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      setErrorMessageCategories(message);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  // Fetch Product Categories for Sort dropdown
  const fetchProductCategoriesForSort = async (generalCategoryId: string) => {
    setIsLoadingSortData(true);
    setErrorMessageSortData("");
    try {
      const token = localStorage.getItem("accessToken") || "";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product-category/${generalCategoryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch product categories.");
      }
      const data = await response.json();
      setProductCategoriesForSort(data.data || []);
    } catch (error) {
      let message = "Something went wrong. Please try again.";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      setErrorMessageSortData(message);
    } finally {
      setIsLoadingSortData(false);
    }
  };

  // Fetch Subcategories for Sort dropdown
  const fetchSubCategoriesForSort = async (categoryId: string) => {
    setIsLoadingSortData(true);
    setErrorMessageSortData("");
    try {
      const token = localStorage.getItem("accessToken") || "";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product-sub-category/${categoryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch subcategories.");
      }
      const data = await response.json();
      setSubCategoriesForSort(data.data || []);
    } catch (error) {
      let message = "Something went wrong. Please try again.";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      setErrorMessageSortData(message);
    } finally {
      setIsLoadingSortData(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle main Category filter selection
  const handleCategorySelect = (cat: Category | null) => {
    setSelectedCat(cat ? cat.name : "All");
    setShowCatDropdown(false);
    onFilterByCategory(cat ? cat.generalCategoryId : null);
  };

  // Handle Sort/Category filter selection
  const handleSortFilterSelect = (type: 'GCT' | 'PCT' | 'SCT' | null, id: string | null, name: string) => {
    setSelectedSortDisplay(name);
    onSortFilter(type, id, name);
    setShowSortDropdown(false);
    setSortDropdownLevel('general'); // Reset level on selection
    setCurrentGeneralCategoryForSort(null);
    setCurrentProductCategoryForSort(null);
    setProductCategoriesForSort([]);
    setSubCategoriesForSort([]);
  };

  // Handle click on a General Category in Sort dropdown
  const handleGeneralCategoryClickForSort = (cat: Category) => {
    setCurrentGeneralCategoryForSort(cat);
    fetchProductCategoriesForSort(cat.generalCategoryId);
    setSortDropdownLevel('product');
  };

  // Handle click on a Product Category in Sort dropdown
  const handleProductCategoryClickForSort = (cat: ProductCategory) => {
    setCurrentProductCategoryForSort(cat);
    fetchSubCategoriesForSort(cat.categoryId);
    setSortDropdownLevel('sub');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <section className="flex justify-between items-center mt-6 mb-4 max-md:flex-col max-md:items-start w-full">
      {/* Left side: Filters */}
      <div className="flex gap-2 items-center flex-wrap">
        <div className="flex items-center px-4 py-0 w-60 h-10 bg-white border border-solid border-neutral-300 rounded-[50px]">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              const val = e.target.value;
              setInputValue(val);
              onSearch(val); // Pass up to parent
            }}
            placeholder="Search"
            className="ml-2 outline-none bg-transparent text-sm text-neutral-700 w-full placeholder:text-neutral-500"
          />
        </div>

        {/* Sort by Dropdown */}
        <div className="relative inline-block">
          <button
            className="flex items-center px-2 h-10 rounded-lg border border-solid border-neutral-300 bg-white"
            onClick={() => {
              setShowSortDropdown(!showSortDropdown);
              if (!showSortDropdown) {
                setSortDropdownLevel('general'); // Always start at general level when opening
                setProductCategoriesForSort([]); // Clear previous product categories
                setSubCategoriesForSort([]); // Clear previous subcategories
                setCurrentGeneralCategoryForSort(null);
                setCurrentProductCategoryForSort(null);
              }
            }}
          >
            <SortIcon />
            <span className="mx-2 text-neutral-700">Sort by: {selectedSortDisplay}</span>
            <CaretDownIcon />
          </button>
          {showSortDropdown && (
            <div className="absolute left-0 mt-2 w-60 rounded-md shadow-lg bg-white border border-gray-200 z-10">
              {isLoadingSortData && (
                <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
              )}
              {errorMessageSortData && (
                <div className="px-4 py-2 text-sm text-red-500">{errorMessageSortData}</div>
              )}
              {!isLoadingSortData && !errorMessageSortData && (
                <ul>
                  {sortDropdownLevel === 'general' && (
                    <>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => handleSortFilterSelect(null, null, "None")}
                      >
                        None
                      </li>
                      <li className="px-4 py-2 text-sm font-semibold text-gray-700">General Categories</li>
                      {generalCategoriesForSort.map((cat) => (
                        <li
                          key={cat.generalCategoryId}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => handleGeneralCategoryClickForSort(cat)}
                        >
                          {cat.name}
                        </li>
                      ))}
                    </>
                  )}
                  {sortDropdownLevel === 'product' && (
                    <>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-semibold"
                        onClick={() => {
                          setSortDropdownLevel('general');
                          setProductCategoriesForSort([]);
                          setCurrentGeneralCategoryForSort(null);
                        }}
                      >
                        &larr; Back to General Categories
                      </li>
                      {currentGeneralCategoryForSort && (
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-semibold text-blue-600"
                          onClick={() => handleSortFilterSelect('GCT', currentGeneralCategoryForSort.generalCategoryId, currentGeneralCategoryForSort.name)}
                        >
                          Filter by: {currentGeneralCategoryForSort.name}
                        </li>
                      )}
                      <li className="px-4 py-2 text-sm font-semibold text-gray-700">Product Categories</li>
                      {productCategoriesForSort.map((cat) => (
                        <li
                          key={cat.categoryId}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => handleProductCategoryClickForSort(cat)}
                        >
                          {cat.categoryName}
                        </li>
                      ))}
                    </>
                  )}
                  {sortDropdownLevel === 'sub' && (
                    <>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-semibold"
                        onClick={() => {
                          setSortDropdownLevel('product');
                          setSubCategoriesForSort([]);
                          setCurrentProductCategoryForSort(null);
                        }}
                      >
                        &larr; Back to Product Categories
                      </li>
                      {currentProductCategoryForSort && (
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-semibold text-blue-600"
                          onClick={() => handleSortFilterSelect('PCT', currentProductCategoryForSort.categoryId, currentProductCategoryForSort.categoryName)}
                        >
                          Filter by: {currentProductCategoryForSort.categoryName}
                        </li>
                      )}
                      <li className="px-4 py-2 text-sm font-semibold text-gray-700">Subcategories</li>
                      {subCategoriesForSort.map((subCat) => (
                        <li
                          key={subCat.subCategoryId}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => handleSortFilterSelect('SCT', subCat.subCategoryId, subCat.subCategoryName)}
                        >
                          {subCat.subCategoryName}
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Existing Category Filter Dropdown */}
        <div className="relative inline-block">
          <button
            className="flex items-center px-2 h-10 rounded-lg border border-solid border-neutral-300 bg-white"
            onClick={() => setShowCatDropdown(!showCatDropdown)}
          >
            <CartIcon />
            <span className="mx-2 text-neutral-700">Category: {selectedCat}</span>
            <CaretDownIcon />
          </button>
          {showCatDropdown && (
            <div className="absolute left-0 mt-2 w-40 rounded-md shadow-lg bg-white border border-gray-200 z-10">
              {isLoadingCategories && (
                <div className="px-4 py-2 text-sm text-gray-500">Loading categories...</div>
              )}
              {errorMessageCategories && (
                <div className="px-4 py-2 text-sm text-red-500">{errorMessageCategories}</div>
              )}
              {!isLoadingCategories && !errorMessageCategories && (
                <ul>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleCategorySelect(null)}
                  >
                    All
                  </li>
                  {categories.map((cat, index) => (
                    <li
                      key={`${cat.generalCategoryId}-${index}`}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => handleCategorySelect(cat)}
                    >
                      {cat.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Status Filter Dropdown */}
        <div className="relative inline-block">
          <button
            className="flex items-center px-2 h-10 rounded-lg border border-solid border-neutral-300 bg-white"
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
          >
            <StatusIcon />
            <span className="mx-2 text-neutral-700">Status: {selectedStatus}</span>
            <CaretDownIcon />
          </button>
          {showStatusDropdown && (
            <div className="absolute left-0 mt-2 w-32 rounded-md shadow-lg bg-white border border-gray-200 z-10">
              <ul>
                {["All", "Active", "Declined"].map((status) => (
                  <li
                    key={status}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      setSelectedStatus(status);
                      setShowStatusDropdown(false);
                    }}
                  >
                    {status}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right side: New Product Button */}
      <button
        className="flex gap-2 items-center bg-[#007AFF] rounded-[50px] px-4 py-2 h-10"
        onClick={handleOpenModal}
      >
        <span className="flex w-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/85a982390ef9f7e6457da7dc54d4ae38e58f9655?placeholderIfAbsent=true"
            alt="Add new product"
            className="object-contain w-4 aspect-square"
          />
        </span>
        <span className="text-base font-medium text-white leading-6">New product</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <OrderDetails onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </section>
  );
};
