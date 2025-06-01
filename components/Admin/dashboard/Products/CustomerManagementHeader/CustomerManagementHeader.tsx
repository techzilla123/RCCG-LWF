"use client";

import React, { useState } from "react";

interface Category {
  categoryId: string;
  categoryName: string;
  noOfProducts: number;
}

export const CustomerManagementHeader = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  // Update category
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

      fetchCategories(); // Refresh list
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

  // Handlers
  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
    setCategoryName("");
    setErrorMessage("");
  };

  const handleOpenEditModal = () => {
    fetchCategories();
    setShowEditModal(true);
    setErrorMessage("");
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setCategoryName("");
    setErrorMessage("");
    setEditCategoryId("");
  };

  return (
    <header className="flex justify-between items-center pb-6 border-b border-solid border-b-gray-200 max-md:flex-col max-md:items-start">
      <h3 className="text-3xl font-bold text-black">Products</h3>
      <div className="flex gap-2 mt-4 max-md:mt-2">
        {/* Create Button */}
        <button
          className="flex items-center justify-center bg-[#000000] rounded-full w-8 h-8"
          onClick={handleOpenCreateModal}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/85a982390ef9f7e6457da7dc54d4ae38e58f9655?placeholderIfAbsent=true"
            alt=""
            className="object-contain w-3 h-3"
          />
        </button>
        {/* Edit Button */}
        <button
          className="flex items-center justify-center bg-[#000000] text-white rounded-full w-8 h-8 text-xs"
          onClick={handleOpenEditModal}
        >
          ✎
        </button>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Edit Categories</h2>
            {isLoading && <div>Loading categories...</div>}
            {errorMessage && (
              <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
            )}
            <ul>
              {categories.map((cat) => (
                <li key={cat.categoryId} className="flex justify-between items-center mb-2">
                  <span>{cat.categoryName}</span>
                  <div className="flex gap-2">
                    <button
                      className="text-blue-500 text-xs"
                      onClick={() => {
                        setCategoryName(cat.categoryName);
                        setEditCategoryId(cat.categoryId);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 text-xs"
                      onClick={() => handleDeleteCategory(cat.categoryId)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {editCategoryId && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="New Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full mb-2"
                />
                <div className="flex justify-end gap-1">
                  <button
                    className="px-2 py-1 bg-gray-300 text-sm rounded"
                    onClick={() => setEditCategoryId("")}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-2 py-1 bg-blue-500 text-white text-sm rounded"
                    onClick={handleUpdateCategory}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-lg font-bold mb-4">Create New Category</h2>
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mb-4"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
            )}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#007AFF] text-white rounded"
                onClick={handleCreateCategory}
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
          <div className="bg-white p-6 rounded shadow-md w-80 text-center">
            <h2 className="text-lg font-bold mb-4">Success!</h2>
            <p className="mb-4">Operation completed successfully.</p>
            <button
              className="px-4 py-2 bg-[#007AFF] text-white rounded"
              onClick={() => setShowSuccessModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
