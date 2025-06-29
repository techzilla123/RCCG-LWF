"use client"

import React, { useState } from "react"

// Updated interfaces to match the API structure
interface GeneralCategory {
  name: string
  generalCategoryId: string
}

interface Category {
  categoryId: string
  categoryName: string
  noOfProducts: number
  generalCategoryId?: string
  generalCategoryName?: string
}

type SubCategory = {
  subCategoryId: string
  categoryId: string
  subCategoryName: string
  parentCategoryId: string
  subCategoryParentId: string
}

export const CustomerManagementHeader = () => {
  // General Categories State
  const [generalCategories, setGeneralCategories] = useState<GeneralCategory[]>([])
  const [selectedGeneralCategoryId, setSelectedGeneralCategoryId] = useState("")
  const [newGeneralCategoryName, setNewGeneralCategoryName] = useState("")
  const [showCreateGeneralModal, setShowCreateGeneralModal] = useState(false)
  const [isCreatingGeneralCategory, setIsCreatingGeneralCategory] = useState(false)

  // Existing states
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const [editCategoryId, setEditCategoryId] = useState("")
  const [allCategories, setAllCategories] = useState<Category[]>([]) // For showing all categories in edit modal
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // States for subcategory modal and data
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false)
  const [subCategoryName, setSubCategoryName] = useState("")
  const [subCategoryParentId, setSubCategoryParentId] = useState("")
  const [allSubCategories, setAllSubCategories] = useState<{ [categoryId: string]: SubCategory[] }>({})
  const [editSubCategoryId, setEditSubCategoryId] = useState("")

  // API helper function
  const getApiHeaders = () => {
    const token = localStorage.getItem("accessToken") || ""
    return {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
      ...(token && { Authorization: token }),
    }
  }

  // General Categories API Functions
  const fetchGeneralCategories = async () => {
    setIsLoading(true)
    setErrorMessage("")

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/list-product-general-category`,
        {
          method: "GET",
          headers: getApiHeaders(),
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch general categories.")
      }

      const data = await response.json()
      setGeneralCategories(data.data || [])
    } catch (error) {
      let message = "Something went wrong. Please try again."
      if (error instanceof Error) {
        message = error.message
      } else if (typeof error === "string") {
        message = error
      }
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateGeneralCategory = async () => {
    if (!newGeneralCategoryName.trim()) {
      setErrorMessage("General category name is required.")
      return
    }

    setIsCreatingGeneralCategory(true)
    setErrorMessage("")

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/create-product-general-category`,
        {
          method: "POST",
          headers: getApiHeaders(),
          body: JSON.stringify({ name: newGeneralCategoryName }),
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create general category.")
      }

      setShowCreateGeneralModal(false)
      setNewGeneralCategoryName("")
      setShowSuccessModal(true)
      fetchGeneralCategories()
    } catch (error) {
      let message = "Something went wrong. Please try again."
      if (error instanceof Error) {
        message = error.message
      } else if (typeof error === "string") {
        message = error
      }
      setErrorMessage(message)
    } finally {
      setIsCreatingGeneralCategory(false)
    }
  }

  // Fetch all categories for comprehensive view
  const fetchAllCategories = async () => {
    setIsLoading(true)
    setErrorMessage("")

    try {
      // Fetch all categories from all general categories
      const allCats: Category[] = []
      for (const genCat of generalCategories) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/list-product-category/${genCat.generalCategoryId}`,
          {
            method: "GET",
            headers: getApiHeaders(),
          },
        )

        if (response.ok) {
          const data = await response.json()
          const categoriesWithGenName = (data.data || []).map((cat: Category) => ({
            ...cat,
            generalCategoryName: genCat.name,
            generalCategoryId: genCat.generalCategoryId,
          }))
          allCats.push(...categoriesWithGenName)
        }
      }
      setAllCategories(allCats)

      // Fetch subcategories for each category
      const subCatMap: { [categoryId: string]: SubCategory[] } = {}
      for (const cat of allCats) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/list-product-sub-category/${cat.categoryId}`,
            {
              method: "GET",
              headers: getApiHeaders(),
            },
          )

          if (response.ok) {
            const data = await response.json()
            subCatMap[cat.categoryId] = data.data || []
          }
        } catch {
          // Continue if subcategory fetch fails
          subCatMap[cat.categoryId] = []
        }
      }
      setAllSubCategories(subCatMap)
    } catch (error) {
      let message = "Something went wrong. Please try again."
      if (error instanceof Error) {
        message = error.message
      } else if (typeof error === "string") {
        message = error
      }
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  // Updated create category to include general_category_id
  const handleCreateCategory = async () => {
    if (!categoryName.trim()) {
      setErrorMessage("Category name is required.")
      return
    }

    if (!selectedGeneralCategoryId) {
      setErrorMessage("Please select a general category first.")
      return
    }

    setIsCreatingCategory(true)
    setErrorMessage("")

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/create-product-category`, {
        method: "POST",
        headers: getApiHeaders(),
        body: JSON.stringify({
          name: categoryName,
          general_category_id: selectedGeneralCategoryId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create category.")
      }

      setShowCreateModal(false)
      setCategoryName("")
      setSelectedGeneralCategoryId("")
      setShowSuccessModal(true)
      fetchAllCategories()
    } catch (error) {
      let message = "Something went wrong. Please try again."
      if (error instanceof Error) {
        message = error.message
      } else if (typeof error === "string") {
        message = error
      }
      setErrorMessage(message)
    } finally {
      setIsCreatingCategory(false)
    }
  }

  // Updated update category to include general_category_id
  const handleUpdateCategory = async () => {
    if (!categoryName.trim()) {
      setErrorMessage("Category name is required.")
      return
    }

    if (!selectedGeneralCategoryId) {
      setErrorMessage("Please select a general category.")
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/update-product-category/${editCategoryId}`,
        {
          method: "PUT",
          headers: getApiHeaders(),
          body: JSON.stringify({
            name: categoryName,
            general_category_id: selectedGeneralCategoryId,
          }),
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update category.")
      }

      setEditCategoryId("")
      setCategoryName("")
      setSelectedGeneralCategoryId("")
      setShowSuccessModal(true)
      fetchAllCategories() // Refresh the comprehensive view
    } catch (error) {
      let message = "Something went wrong. Please try again."
      if (error instanceof Error) {
        message = error.message
      } else if (typeof error === "string") {
        message = error
      }
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  // Update subcategory
  const handleUpdateSubCategory = async () => {
    if (!subCategoryName.trim()) {
      setErrorMessage("Subcategory name is required.")
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/update-product-sub-category/${editSubCategoryId}`,
        {
          method: "PUT",
          headers: getApiHeaders(),
          body: JSON.stringify({
            name: subCategoryName,
            category_id: subCategoryParentId,
          }),
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update subcategory.")
      }

      setEditSubCategoryId("")
      setSubCategoryName("")
      setSubCategoryParentId("")
      setShowSuccessModal(true)
      fetchAllCategories() // Refresh the comprehensive view
    } catch (error) {
      let message = "Something went wrong. Please try again."
      if (error instanceof Error) {
        message = error.message
      } else if (typeof error === "string") {
        message = error
      }
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  // Delete category
  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    setIsLoading(true)
    setErrorMessage("")

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/delete-product-category/${categoryId}`,
        {
          method: "DELETE",
          headers: getApiHeaders(),
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to delete category.")
      }

      setShowSuccessModal(true)
      fetchAllCategories() // Refresh the comprehensive view
    } catch (error) {
      let message = "Something went wrong. Please try again."
      if (error instanceof Error) {
        message = error.message
      } else if (typeof error === "string") {
        message = error
      }
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteSubCategory = async (subCategory: SubCategory) => {
    if (!window.confirm(`Are you sure you want to delete subcategory "${subCategory.subCategoryName}"?`)) {
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/delete-product-sub-category/${subCategory.subCategoryId}`,
        {
          method: "DELETE",
          headers: getApiHeaders(),
        },
      )

      if (!response.ok) {
        throw new Error("Failed to delete subcategory")
      }

      setShowSuccessModal(true)
      fetchAllCategories() // Refresh the comprehensive view
    } catch (error) {
      let message = "Something went wrong. Please try again."
      if (error instanceof Error) {
        message = error.message
      } else if (typeof error === "string") {
        message = error
      }
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  // Create new subcategory
  const handleCreateSubCategory = async () => {
    if (!subCategoryName.trim()) {
      setErrorMessage("Subcategory name is required.")
      return
    }
    if (!subCategoryParentId) {
      setErrorMessage("Parent category is not selected.")
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/create-product-sub-category`,
        {
          method: "POST",
          headers: getApiHeaders(),
          body: JSON.stringify({
            name: subCategoryName,
            category_id: subCategoryParentId,
          }),
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create subcategory.")
      }

      setShowSubCategoryModal(false)
      setSubCategoryName("")
      setSubCategoryParentId("")
      setShowSuccessModal(true)
      fetchAllCategories() // Refresh the comprehensive view
    } catch (error) {
      let message = "Something went wrong. Please try again."
      if (error instanceof Error) {
        message = error.message
      } else if (typeof error === "string") {
        message = error
      }
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  // Modal handlers
  const handleOpenCreateModal = () => {
    setShowCreateModal(true)
    setCategoryName("")
    setSelectedGeneralCategoryId("")
    setErrorMessage("")
  }

  const handleOpenEditModal = () => {
    setShowEditModal(true)
    setCategoryName("")
    setEditCategoryId("")
    setErrorMessage("")
    fetchAllCategories() // Load all data when opening edit modal
  }

  // Modal close handlers
  const handleCloseCreateModal = () => {
    setShowCreateModal(false)
    setCategoryName("")
    setSelectedGeneralCategoryId("")
    setErrorMessage("")
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setCategoryName("")
    setEditCategoryId("")
    setAllCategories([])
    setAllSubCategories({})
    setEditSubCategoryId("")
    setErrorMessage("")
  }

  const handleCloseSubCategoryModal = () => {
    setShowSubCategoryModal(false)
    setSubCategoryName("")
    setSubCategoryParentId("")
    setEditSubCategoryId("")
    setErrorMessage("")
  }

  // Success modal close
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
  }

  // Handle input changes
  const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value)
  }

  const handleSubCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubCategoryName(e.target.value)
  }

  const handleSubCategoryParentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubCategoryParentId(e.target.value)
  }

  const handleGeneralCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGeneralCategoryName(e.target.value)
  }

  // Handle general category selection in modal
  const handleGeneralCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGeneralCategoryId(e.target.value)
  }

  // Edit existing category (populate fields and open modal)
  const handleEditCategoryClick = (category: Category) => {
    setEditCategoryId(category.categoryId)
    setCategoryName(category.categoryName)
    setSelectedGeneralCategoryId(category.generalCategoryId || "")
    setErrorMessage("")
  }

  // Edit existing subcategory (populate fields and open modal)
  const handleEditSubCategoryClick = (subCategory: SubCategory) => {
    setEditSubCategoryId(subCategory.subCategoryId)
    setSubCategoryName(subCategory.subCategoryName)
    setSubCategoryParentId(subCategory.categoryId)
    setErrorMessage("")
  }

  // Call fetch general categories initially (on component mount)
  React.useEffect(() => {
    fetchGeneralCategories()
  }, [])

  return (
    <>
      {/* Header with buttons */}
      <header className="flex justify-between items-center pb-6 border-b border-solid border-b-gray-200 max-md:flex-col max-md:items-start">
        <h3 className="text-3xl font-bold text-black">Products</h3>
        <div className="flex gap-2 mt-4 max-md:mt-2">
          {/* General Category Button */}
          <button
            className="flex items-center justify-center bg-[#4CAF50] rounded-full w-8 h-8 text-white text-xs"
            onClick={() => setShowCreateGeneralModal(true)}
            title="Add General Category"
          >
            G+
          </button>
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

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{errorMessage}</div>
      )}

      {/* Create General Category Modal */}
      {showCreateGeneralModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Create General Category</h2>
            {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
            <input
              type="text"
              placeholder="Enter general category name (e.g., Birthday Shop)"
              value={newGeneralCategoryName}
              onChange={handleGeneralCategoryNameChange}
              className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={() => setShowCreateGeneralModal(false)}
                disabled={isCreatingGeneralCategory}
              >
                Cancel
              </button>
              <button
                className="bg-green text-white px-4 py-2 rounded"
                onClick={handleCreateGeneralCategory}
                disabled={isCreatingGeneralCategory}
              >
                {isCreatingGeneralCategory ? "Creating..." : "Create General Category"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Category Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Create Product Category</h2>
            {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

            {/* General Category Selection inside modal */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select General Category:</label>
              <select
                value={selectedGeneralCategoryId}
                onChange={handleGeneralCategoryChange}
                className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
              >
                <option value="">Choose a general category...</option>
                {generalCategories.map((category) => (
                  <option key={category.generalCategoryId} value={category.generalCategoryId}>
                    {category.name}
                  </option>
                ))}
              </select>
              {selectedGeneralCategoryId && (
                <p className="text-sm text-green-600 mt-1">
                  Selected: {generalCategories.find((cat) => cat.generalCategoryId === selectedGeneralCategoryId)?.name}
                </p>
              )}
            </div>

            <input
              type="text"
              placeholder="Enter product category name (e.g., International Bouquet)"
              value={categoryName}
              onChange={handleCategoryNameChange}
              className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={handleCloseCreateModal}
                disabled={isCreatingCategory}
              >
                Cancel
              </button>
              <button
                className="bg-black text-white px-4 py-2 rounded"
                onClick={handleCreateCategory}
                disabled={isCreatingCategory}
              >
                {isCreatingCategory ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Manage Categories & Subcategories</h2>
            {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

            {/* Comprehensive Hierarchical View */}
            <div className="space-y-6">
              {generalCategories.map((genCat) => {
                const categoriesInGenCat = allCategories.filter(
                  (cat) => cat.generalCategoryId === genCat.generalCategoryId,
                )

                return (
                  <div key={genCat.generalCategoryId} className="border border-gray-200 rounded-lg p-4">
                    {/* General Category Header */}
                    <div className="bg-green-50 p-3 rounded-lg mb-4">
                      <h3 className="text-lg font-semibold text-green-800">📁 {genCat.name}</h3>
                      <p className="text-sm text-green-600">General Category</p>
                    </div>

                    {/* Product Categories under this General Category */}
                    <div className="ml-4 space-y-3">
                      {categoriesInGenCat.length === 0 ? (
                        <p className="text-gray-500 italic">No product categories found</p>
                      ) : (
                        categoriesInGenCat.map((category) => (
                          <div key={category.categoryId} className="border border-gray-100 rounded-lg p-3">
                            {/* Product Category */}
                            {editCategoryId === category.categoryId ? (
                              // Edit mode for category
                              <div className="bg-blue-50 p-3 rounded mb-3">
                                <h4 className="text-sm font-medium text-blue-800 mb-2">Edit Product Category</h4>
                                <div className="space-y-2">
                                  <select
                                    value={selectedGeneralCategoryId}
                                    onChange={handleGeneralCategoryChange}
                                    className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                                  >
                                    <option value="">Select General Category</option>
                                    {generalCategories.map((genCat) => (
                                      <option key={genCat.generalCategoryId} value={genCat.generalCategoryId}>
                                        {genCat.name}
                                      </option>
                                    ))}
                                  </select>
                                  <input
                                    type="text"
                                    value={categoryName}
                                    onChange={handleCategoryNameChange}
                                    className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                                    placeholder="Category name"
                                  />
                                  <div className="flex gap-2">
                                    <button
                                      onClick={handleUpdateCategory}
                                      className="bg-green text-white px-3 py-1 rounded text-xs"
                                      disabled={isLoading}
                                    >
                                      {isLoading ? "Saving..." : "Save"}
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditCategoryId("")
                                        setCategoryName("")
                                        setSelectedGeneralCategoryId("")
                                      }}
                                      className="bg-gray-300 px-3 py-1 rounded text-xs"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              // View mode for category
                              <div className="bg-blue-50 p-3 rounded mb-3">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h4 className="font-medium text-blue-800">📂 {category.categoryName}</h4>
                                    <p className="text-xs text-blue-600">
                                      Product Category • {category.noOfProducts} products
                                    </p>
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleEditCategoryClick(category)}
                                      className="text-blue-600 hover:underline text-xs"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteCategory(category.categoryId)}
                                      className="text-red-600 hover:text-red-800 text-xs"
                                    >
                                      Delete
                                    </button>
                                    <button
                                      onClick={() => {
                                        setSubCategoryParentId(category.categoryId)
                                        setShowSubCategoryModal(true)
                                      }}
                                      className="text-green-600 hover:underline text-xs"
                                    >
                                      + Add Subcategory
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Subcategories under this Product Category */}
                            <div className="ml-4 space-y-2">
                              {allSubCategories[category.categoryId]?.length === 0 ||
                              !allSubCategories[category.categoryId] ? (
                                <p className="text-gray-400 text-sm italic">No subcategories</p>
                              ) : (
                                allSubCategories[category.categoryId]?.map((subCategory) => (
                                  <div key={subCategory.subCategoryId} className="bg-gray-50 p-2 rounded">
                                    {editSubCategoryId === subCategory.subCategoryId ? (
                                      // Edit mode for subcategory
                                      <div className="space-y-2">
                                        <input
                                          type="text"
                                          value={subCategoryName}
                                          onChange={handleSubCategoryNameChange}
                                          className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                                          placeholder="Subcategory name"
                                        />
                                        <select
                                          value={subCategoryParentId}
                                          onChange={handleSubCategoryParentChange}
                                          className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                                        >
                                          <option value="">Select Parent Category</option>
                                          {allCategories.map((cat) => (
                                            <option key={cat.categoryId} value={cat.categoryId}>
                                              {cat.categoryName}
                                            </option>
                                          ))}
                                        </select>
                                        <div className="flex gap-2">
                                          <button
                                            onClick={handleUpdateSubCategory}
                                            className="bg-green text-white px-2 py-1 rounded text-xs"
                                            disabled={isLoading}
                                          >
                                            {isLoading ? "Saving..." : "Save"}
                                          </button>
                                          <button
                                            onClick={() => {
                                              setEditSubCategoryId("")
                                              setSubCategoryName("")
                                              setSubCategoryParentId("")
                                            }}
                                            className="bg-gray-300 px-2 py-1 rounded text-xs"
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      // View mode for subcategory
                                      <div className="flex justify-between items-center">
                                        <div>
                                          <span className="text-sm">📄 {subCategory.subCategoryName}</span>
                                          <p className="text-xs text-gray-500">Subcategory</p>
                                        </div>
                                        <div className="flex gap-2">
                                          <button
                                            onClick={() => handleEditSubCategoryClick(subCategory)}
                                            className="text-blue-600 hover:underline text-xs"
                                          >
                                            Edit
                                          </button>
                                          <button
                                            onClick={() => handleDeleteSubCategory(subCategory)}
                                            className="text-red-600 hover:text-red-800 text-xs"
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-end mt-6">
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={handleCloseEditModal}>
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
            {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
            <input
              type="text"
              placeholder="Enter subcategory name (e.g., JetStream)"
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
              {allCategories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryName} ({cat.generalCategoryName})
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
            <button className="bg-black text-white px-4 py-2 rounded" onClick={handleCloseSuccessModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
