"use client";

import React, { useState } from "react";

interface Category {
  categoryId: string;
  categoryName: string;
  noOfProducts: number;
}

type SubCategory = {
  subCategoryId: string;
  subCategoryName: string;
  parentCategoryId: string;
  // Add other fields as needed
};

export const CustomerManagementHeader = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // States for subcategory modal and data
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryParentId, setSubCategoryParentId] = useState("");
  const [selectedCategoryIdForSubcategories, setSelectedCategoryIdForSubcategories] = useState("");
const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [editSubCategoryId, setEditSubCategoryId] = useState("");

  // Fetch categories
  const fetchCategories = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("accessToken") || "";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/list-product-category`,
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
    } catch (error) {
      let message = "Something went wrong. Please try again.";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch subcategories for a category
  const fetchSubCategories = async (categoryId: string) => {
    setIsLoading(true);
    setErrorMessage("");
    setSelectedCategoryIdForSubcategories(categoryId);
    try {
      const token = localStorage.getItem("accessToken") || "";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/list-product-sub-category/${categoryId}`,
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
      setSubCategories(data.data || []);
    } catch (error) {
      let message = "Something went wrong. Please try again.";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Create new category
  const handleCreateCategory = async () => {
    if (!categoryName.trim()) {
      setErrorMessage("Category name is required.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("accessToken") || "";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/create-product-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
          body: JSON.stringify({ name: categoryName }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create category.");
      }

      setShowCreateModal(false);
      setCategoryName("");
      setShowSuccessModal(true);
      fetchCategories();
    } catch (error) {
      let message = "Something went wrong. Please try again.";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Update existing category
  const handleUpdateCategory = async () => {
    if (!categoryName.trim()) {
      setErrorMessage("Category name is required.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("accessToken") || "";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/update-product-category/${editCategoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
          body: JSON.stringify({ name: categoryName }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update category.");
      }

      setShowEditModal(false);
      setCategoryName("");
      setEditCategoryId("");
      setShowSuccessModal(true);
      fetchCategories();
    } catch (error) {
      let message = "Something went wrong. Please try again.";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Update subcategory
  const handleUpdateSubCategory = async () => {
    if (!subCategoryName.trim()) {
      setErrorMessage("Subcategory name is required.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("accessToken") || "";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/update-product-sub-category/${editSubCategoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
          body: JSON.stringify({
            name: subCategoryName,
            category_id: subCategoryParentId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update subcategory.");
      }

      setEditSubCategoryId("");
      setSubCategoryName("");
      setShowSuccessModal(true);
      fetchSubCategories(subCategoryParentId);
    } catch (error) {
      let message = "Something went wrong. Please try again.";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete category
  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("accessToken") || "";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/delete-product-category/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete category.");
      }

      fetchCategories();
    } catch (error) {
      let message = "Something went wrong. Please try again.";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteSubCategory = async (subCategory) => {
  if (!window.confirm(`Are you sure you want to delete subcategory "${subCategory.subCategoryName}"?`)) {
    return;
  }

  setIsLoading(true);
  setErrorMessage("");

  try {
    const response = await fetch(
      `admin/products/delete-product-sub-category/${subCategory.subCategoryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: subCategory.subCategoryName,
          category_id: subCategory.categoryId || subCategory.subCategoryParentId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete subcategory");
    }

    // Refresh subcategories list after deletion
    if (selectedCategoryIdForSubcategories) {
      fetchSubCategories(selectedCategoryIdForSubcategories);
    }
    setShowSuccessModal(true);
  } catch (error) {
    setErrorMessage(error.message || "Something went wrong");
  } finally {
    setIsLoading(false);
  }
};


  // Create new subcategory
  const handleCreateSubCategory = async () => {
    if (!subCategoryName.trim()) {
      setErrorMessage("Subcategory name is required.");
      return;
    }
    if (!subCategoryParentId) {
      setErrorMessage("Parent category is not selected.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("accessToken") || "";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/create-product-sub-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
          body: JSON.stringify({
            name: subCategoryName,
            category_id: subCategoryParentId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create subcategory.");
      }

      setShowSubCategoryModal(false);
      setSubCategoryName("");
      setSubCategoryParentId("");
      setShowSuccessModal(true);
      fetchCategories();
    } catch (error) {
      let message = "Something went wrong. Please try again.";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Modal open handlers
  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
    setCategoryName("");
    setErrorMessage("");
  };

  const handleOpenEditModal = () => {
    setShowEditModal(true);
    setCategoryName("");
    setEditCategoryId("");
    setErrorMessage("");
  };

  const handleOpenSubCategoryModal = () => {
    setShowSubCategoryModal(true);
    setSubCategoryName("");
    setSubCategoryParentId("");
    setErrorMessage("");
  };

  // Modal close handlers
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setCategoryName("");
    setErrorMessage("");
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCategoryName("");
    setEditCategoryId("");
    setErrorMessage("");
  };

  const handleCloseSubCategoryModal = () => {
    setShowSubCategoryModal(false);
    setSubCategoryName("");
    setSubCategoryParentId("");
    setEditSubCategoryId("");
    setErrorMessage("");
  };

  // Success modal close
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  // Handle input changes
  const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleSubCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubCategoryName(e.target.value);
  };

  const handleSubCategoryParentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubCategoryParentId(e.target.value);
  };

  // Edit existing category (populate fields and open modal)
  const handleEditCategoryClick = (category: Category) => {
    setEditCategoryId(category.categoryId);
    setCategoryName(category.categoryName);
    setShowEditModal(true);
    setErrorMessage("");
  };

  // Edit existing subcategory (populate fields and open modal)
const handleEditSubCategoryClick = (subCategory: SubCategory) => {
  setEditSubCategoryId(subCategory.subCategoryId);
  setSubCategoryName(subCategory.subCategoryName);
  setSubCategoryParentId(selectedCategoryIdForSubcategories);
  setErrorMessage("");
};


  // Call fetch categories initially (on component mount)
  React.useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {/* Header with buttons */}
      <header className="flex justify-between items-center pb-6 border-b border-solid border-b-gray-200 max-md:flex-col max-md:items-start">
        <h3 className="text-3xl font-bold text-black">Products</h3>
        <div className="flex gap-2 mt-4 max-md:mt-2">
          <button
            className="flex items-center justify-center bg-[#000000] rounded-full w-8 h-8"
            onClick={handleOpenCreateModal}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/85a982390ef9f7e6457da7dc54d4ae38e58f9655?placeholderIfAbsent=true"
              alt="Add"
              className="object-contain w-3 h-3"
            />
          </button>
          <button
            className="flex items-center justify-center bg-[#000000] text-white rounded-full w-8 h-8 text-xs"
            onClick={handleOpenEditModal}
          >
            ✎
          </button>
        </div>
      </header>

      {/* Create Category Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Create Category</h2>
            {errorMessage && (
              <p className="text-red-600 mb-4">{errorMessage}</p>
            )}
            <input
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={handleCategoryNameChange}
              className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={handleCloseCreateModal}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="bg-black text-white px-4 py-2 rounded"
                onClick={handleCreateCategory}
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Edit Categories</h2>
            {errorMessage && (
              <p className="text-red-600 mb-4">{errorMessage}</p>
            )}
            {/* Category list */}
            <ul className="mb-4 max-h-60 overflow-y-auto border border-gray-300 rounded p-2">
              {categories.length === 0 && (
                <li className="text-gray-500">No categories found.</li>
              )}
              {categories.map((category) => (
                <li
                  key={category.categoryId}
                  className="flex justify-between items-center py-1 border-b last:border-b-0"
                >
                  <span>{category.categoryName}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCategoryClick(category)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                 <button
  onClick={() => handleDeleteCategory(category.categoryId)}
  className="text-red-600 hover:text-red-800"
  aria-label="Delete Category"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" 
       viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" 
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4" />
  </svg>
</button>

                    <button
                      onClick={() => fetchSubCategories(category.categoryId)}
                      className="text-green-600 hover:underline"
                    >
                      Subcategories
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* If a category is selected, show its subcategories */}
            {selectedCategoryIdForSubcategories && (
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Subcategories for selected category
                </h3>
                {errorMessage && (
                  <p className="text-red-600 mb-2">{errorMessage}</p>
                )}
                <ul className="mb-4 max-h-40 overflow-y-auto border border-gray-300 rounded p-2">
                  {subCategories.length === 0 && (
                    <li className="text-gray-500">No subcategories found.</li>
                  )}
                 {subCategories.map((subCategory) => (
  <li
    key={subCategory.subCategoryId}
    className="flex justify-between items-center py-1 border-b last:border-b-0"
  >
    <span>{subCategory.subCategoryName}</span>
    <div className="flex gap-2">
      <button
        onClick={() => handleEditSubCategoryClick(subCategory)}
        className="text-blue-600 hover:underline"
      >
        Edit
      </button>
     <button
  onClick={() => handleDeleteSubCategory(subCategory)}
  className="text-red-600 hover:text-red-800"
  aria-label="Delete Subcategory"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" 
       viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" 
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4" />
  </svg>
</button>

    </div>
  </li>
))}

                </ul>
                <button
                  className="bg-black text-white px-3 py-1 rounded"
                  onClick={handleOpenSubCategoryModal}
                >
                  Add Subcategory
                </button>
              </div>
            )}

            {/* Edit category name input if editing a specific category */}
            {editCategoryId && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Edit category name"
                  value={categoryName}
                  onChange={handleCategoryNameChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-200 px-4 py-2 rounded"
                    onClick={() => {
                      setEditCategoryId("");
                      setCategoryName("");
                      setErrorMessage("");
                    }}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-black text-white px-4 py-2 rounded"
                    onClick={handleUpdateCategory}
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>
            )}

            {/* Edit subcategory modal inline */}
            {editSubCategoryId && (
              <div className="mt-6 p-4 border border-gray-300 rounded">
                <h4 className="text-lg font-semibold mb-2">Edit Subcategory</h4>
                <input
                  type="text"
                  placeholder="Subcategory name"
                  value={subCategoryName}
                  onChange={handleSubCategoryNameChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
                />
                <select
                  value={subCategoryParentId}
                  onChange={handleSubCategoryParentChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
                >
                  <option value="">Select Parent Category</option>
                  {categories.map((cat) => (
                    <option key={cat.categoryId} value={cat.categoryId}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-200 px-4 py-2 rounded"
                    onClick={() => {
                      setEditSubCategoryId("");
                      setSubCategoryName("");
                      setSubCategoryParentId("");
                      setErrorMessage("");
                    }}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-black text-white px-4 py-2 rounded"
                    onClick={handleUpdateSubCategory}
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={handleCloseEditModal}
                disabled={isLoading}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Subcategory Modal */}
      {showSubCategoryModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Create Subcategory</h2>
            {errorMessage && (
              <p className="text-red-600 mb-4">{errorMessage}</p>
            )}
            <input
              type="text"
              placeholder="Enter subcategory name"
              value={subCategoryName}
              onChange={handleSubCategoryNameChange}
              className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
            />
            <select
              value={subCategoryParentId}
              onChange={handleSubCategoryParentChange}
              className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
            >
              <option value="">Select Parent Category</option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={handleCloseSubCategoryModal}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="bg-black text-white px-4 py-2 rounded"
                onClick={handleCreateSubCategory}
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
            <h3 className="text-lg font-bold mb-4">Success!</h3>
            <p className="mb-6">Your operation completed successfully.</p>
            <button
              className="bg-black text-white px-4 py-2 rounded"
              onClick={handleCloseSuccessModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
