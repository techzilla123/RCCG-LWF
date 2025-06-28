"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { FormHeader } from "./FormHeader"
import { InputField } from "./InputField"
import { URLInput } from "./URLInput"
import { KeywordTags } from "./KeywordTags"
import { MediaUpload } from "./MediaUpload"
import type { UploadedFile } from "./MediaUpload"
import { FormActions } from "./FormActions"
import { CloseButton } from "./CloseButton"
import CustomerOptionsForm from "../ProductsAddTwo/CustomerOptionsForm"
import PricingForm from "../PricingForm/PricingForm"
import PreviewNew from "../PreviewSave/PreviewNew"

// Updated interfaces to match the three-level hierarchy
interface GeneralCategory {
  name: string
  generalCategoryId: string
}

interface Category {
  categoryId: string
  categoryName: string
  noOfProducts: number
  generalCategoryId?: string
}

interface SubCategory {
  subCategoryId: string
  subCategoryName: string
  categoryId?: string
}

type FormData = {
  productName: string
  description: string
  producer: string
  url: string
  generalCategory: string
  generalCategoryId: string
  category: string
  subCategoryId: string
  subCategoryName: string
  categoryId: string
  keywords: string[]
  uploadedFiles: UploadedFile[]
}

type ProductDetailFormProps = {
  onClose: () => void
  productId: string | null
}

const ProductDetailForm: React.FC<ProductDetailFormProps> = ({ onClose, productId }: ProductDetailFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    description: "",
    producer: "",
    url: "",
    generalCategory: "",
    generalCategoryId: "",
    category: "",
    subCategoryId: "",
    subCategoryName: "",
    categoryId: "",
    keywords: [],
    uploadedFiles: [],
  })

  const [step, setStep] = useState(1)
  const [isGeneralDropdownOpen, setIsGeneralDropdownOpen] = useState(false)
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
  const [generalSearchTerm, setGeneralSearchTerm] = useState("")
  const [categorySearchTerm, setCategorySearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoadingProduct, setIsLoadingProduct] = useState(false)

  // Updated state arrays for three-level hierarchy
  const [generalCategories, setGeneralCategories] = useState<GeneralCategory[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [subCategories, setSubCategories] = useState<SubCategory[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const generalDropdownRef = useRef<HTMLDivElement>(null)
  const categoryDropdownRef = useRef<HTMLDivElement>(null)

  // Updated API helper function with window check
  const getApiHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") || "" : ""
    return {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
      ...(token && { Authorization: token }),
    }
  }

  // Helper function to save form data to localStorage
  const saveFormDataToLocalStorage = (data: FormData) => {
    localStorage.setItem("productName", data.productName)
    localStorage.setItem("description", data.description)
    localStorage.setItem("producer", data.producer)
    localStorage.setItem("url", data.url)
    localStorage.setItem("generalCategory", data.generalCategory)
    localStorage.setItem("generalCategoryId", data.generalCategoryId)
    localStorage.setItem("category", data.category)
    localStorage.setItem("subCategoryId", data.subCategoryId)
    localStorage.setItem("subCategoryName", data.subCategoryName)
    localStorage.setItem("categoryId", data.categoryId)
    localStorage.setItem("keywords", JSON.stringify(data.keywords))
    localStorage.setItem("uploadedFiles", JSON.stringify(data.uploadedFiles))
  }

  // Fetch product details when productId is provided
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) return

      setIsLoadingProduct(true)
      setErrorMessage("")

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/fetch-product/${productId}`,
          {
            method: "GET",
            headers: getApiHeaders(),
          },
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to fetch product details.")
        }

        const data = await response.json()
        const productData = data.data

        // Convert images to UploadedFile format
        const convertedImages: UploadedFile[] = []
        if (productData.imageOne) {
          convertedImages.push({
            image: productData.imageOne,
            name: "Image 1",
            type: "image/jpeg",
            file: new File([], "image1.jpg", { type: "image/jpeg" }),
          })
        }
        if (productData.imageTwo) {
          convertedImages.push({
            image: productData.imageTwo,
            name: "Image 2",
            type: "image/jpeg",
            file: new File([], "image2.jpg", { type: "image/jpeg" }),
          })
        }
        if (productData.imageThree) {
          convertedImages.push({
            image: productData.imageThree,
            name: "Image 3",
            type: "image/jpeg",
            file: new File([], "image3.jpg", { type: "image/jpeg" }),
          })
        }

        // First, fetch the general categories to populate the dropdown
        const fetchedGeneralCategories = await fetchGeneralCategories()
        let foundGeneralCategoryId = ""
        let foundCategoryId = ""

        // Find general category ID by name
        if (productData.generalCategoryName && fetchedGeneralCategories.length > 0) {
          const foundGeneralCategory = fetchedGeneralCategories.find(
            (cat: GeneralCategory) => cat.name === productData.generalCategoryName,
          )
          if (foundGeneralCategory) {
            foundGeneralCategoryId = foundGeneralCategory.generalCategoryId
          }
        }

        // If we found general category, fetch categories and find category ID
        if (foundGeneralCategoryId && productData.categoryName) {
          const fetchedCategories = await fetchCategories(foundGeneralCategoryId)
          const foundCategory = fetchedCategories.find((cat: Category) => cat.categoryName === productData.categoryName)
          if (foundCategory) {
            foundCategoryId = foundCategory.categoryId
          }
        }

        // If we found category, fetch subcategories
        if (foundCategoryId && productData.subCategoryName) {
          await fetchSubCategories(foundCategoryId)
        }

        // Convert SKU array to keywords format for KeywordTags component
        const keywordsForTags = Array.isArray(productData.sku)
          ? productData.sku.map((keyword: string) => ({ text: keyword, color: "blue" as const }))
          : []

        // Save keywords to localStorage for KeywordTags component
        if (keywordsForTags.length > 0) {
          localStorage.setItem("productTags", JSON.stringify(keywordsForTags))
        }

        // Create the form data object
        const newFormData = {
          productName: productData.productName || "",
          description: productData.description || "",
          producer: productData.producer || "",
          url: "",
          generalCategory: productData.generalCategoryName || "",
          generalCategoryId: foundGeneralCategoryId,
          category: productData.categoryName || "",
          subCategoryId: productData.subCategoryId || "",
          subCategoryName: productData.subCategoryName || "",
          categoryId: foundCategoryId,
          keywords: Array.isArray(productData.sku) ? productData.sku : [],
          uploadedFiles: convertedImages,
        }

        // Populate form data with fetched product details
        setFormData(newFormData)

        // IMPORTANT: Save API data to localStorage so it persists across steps
        saveFormDataToLocalStorage(newFormData)

        // Set uploaded files for the MediaUpload component
        setUploadedFiles(convertedImages)
      } catch (error) {
        let message = "Failed to load product details. Please try again."
        if (error instanceof Error) {
          message = error.message
        } else if (typeof error === "string") {
          message = error
        }
        setErrorMessage(message)
      } finally {
        setIsLoadingProduct(false)
      }
    }

    fetchProductDetails()
  }, [productId])

  // Load saved data on mount from localStorage (only if no productId)
  useEffect(() => {
    if (productId) return // Don't load from localStorage if editing existing product

    const fields: (keyof FormData)[] = [
      "productName",
      "description",
      "producer",
      "url",
      "generalCategory",
      "generalCategoryId",
      "category",
      "subCategoryId",
      "subCategoryName",
      "categoryId",
      "keywords",
      "uploadedFiles",
    ]

    const loaded: Partial<FormData> = {}
    fields.forEach((field) => {
      const saved = localStorage.getItem(field)
      if (saved) {
        if (field === "keywords" || field === "uploadedFiles") {
          try {
            loaded[field] = JSON.parse(saved)
          } catch {
            loaded[field] = []
          }
        } else {
          loaded[field] = saved
        }
      }
    })

    setFormData((prev) => ({
      ...prev,
      ...loaded,
    }))

    // Load general categories on mount for new products
    fetchGeneralCategories()
  }, [productId])

  // Save to localStorage when formData changes
  useEffect(() => {
    localStorage.setItem("productName", formData.productName)
  }, [formData.productName])

  useEffect(() => {
    localStorage.setItem("description", formData.description)
  }, [formData.description])

  useEffect(() => {
    localStorage.setItem("producer", formData.producer)
  }, [formData.producer])

  useEffect(() => {
    localStorage.setItem("url", formData.url)
  }, [formData.url])

  useEffect(() => {
    localStorage.setItem("generalCategory", formData.generalCategory)
  }, [formData.generalCategory])

  useEffect(() => {
    localStorage.setItem("generalCategoryId", formData.generalCategoryId)
  }, [formData.generalCategoryId])

  useEffect(() => {
    localStorage.setItem("category", formData.category)
  }, [formData.category])

  useEffect(() => {
    localStorage.setItem("subCategoryName", formData.subCategoryName)
  }, [formData.subCategoryName])

  useEffect(() => {
    localStorage.setItem("subCategoryId", formData.subCategoryId)
  }, [formData.subCategoryId])

  useEffect(() => {
    localStorage.setItem("categoryId", formData.categoryId)
  }, [formData.categoryId])

  useEffect(() => {
    localStorage.setItem("keywords", JSON.stringify(formData.keywords))
  }, [formData.keywords])

  // Set subcategory ID when subcategories are loaded and we have a subcategory name
  useEffect(() => {
    if (productId && formData.subCategoryName && subCategories.length > 0 && !formData.subCategoryId) {
      const foundSubCategory = subCategories.find(
        (sub: SubCategory) => sub.subCategoryName === formData.subCategoryName,
      )
      if (foundSubCategory) {
        setFormData((prev) => ({
          ...prev,
          subCategoryId: foundSubCategory.subCategoryId,
        }))
      }
    }
  }, [subCategories, formData.subCategoryName, formData.subCategoryId, productId])

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (generalDropdownRef.current && !generalDropdownRef.current.contains(event.target as Node)) {
        setIsGeneralDropdownOpen(false)
        setGeneralSearchTerm("")
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false)
        setCategorySearchTerm("")
      }
    }

    if (isGeneralDropdownOpen || isCategoryDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isGeneralDropdownOpen, isCategoryDropdownOpen])

  // Fetch general categories from API
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
      return data.data || []
    } catch (error) {
      let message = "Something went wrong. Please try again."
      if (error instanceof Error) {
        message = error.message
      } else if (typeof error === "string") {
        message = error
      }
      setErrorMessage(message)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch product categories based on general category ID
  const fetchCategories = async (generalCategoryId: string) => {
    setIsLoading(true)
    setErrorMessage("")
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/list-product-category/${generalCategoryId}`,
        {
          method: "GET",
          headers: getApiHeaders(),
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch categories.")
      }

      const data = await response.json()
      setCategories(data.data || [])
      return data.data || []
    } catch (error) {
      let message = "Something went wrong. Please try again."
      if (error instanceof Error) {
        message = error.message
      } else if (typeof error === "string") {
        message = error
      }
      setErrorMessage(message)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch subcategories based on categoryId
  const fetchSubCategories = async (categoryId: string) => {
    setIsLoading(true)
    setErrorMessage("")
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/list-product-sub-category/${categoryId}`,
        {
          method: "GET",
          headers: getApiHeaders(),
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch subcategories.")
      }

      const data = await response.json()
      setSubCategories(data.data || [])
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

  // Filter categories for search
  const filteredGeneralCategories = generalCategories.filter((cat: GeneralCategory) =>
    cat.name.toLowerCase().includes(generalSearchTerm.toLowerCase()),
  )

  const filteredCategories = categories.filter((cat: Category) =>
    cat.categoryName.toLowerCase().includes(categorySearchTerm.toLowerCase()),
  )

  // Navigation handlers
  const handleClose = () => onClose()
  const handleCancel = () => handleClose()
  const handlePrevious = () => setStep((prev) => Math.max(prev - 1, 1))
  const handleNext = () => {
    // Validation before proceeding to next step
    if (!formData.subCategoryId) {
      alert("Please select a valid subcategory.")
      return
    }

    // For editing existing products, check if we have either uploaded files or existing images from API
    if (productId) {
      // When editing, we should have either new uploaded files or existing images in formData
      if (uploadedFiles.length === 0 && formData.uploadedFiles.length === 0) {
        alert("Please upload at least one image.")
        return
      }
    } else {
      // For new products, require uploaded files
      if (uploadedFiles.length === 0) {
        alert("Please upload at least one image.")
        return
      }
    }

    // Save rest of formData to localStorage
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === "string") {
        localStorage.setItem(key, value)
      } else {
        localStorage.setItem(key, JSON.stringify(value))
      }
    })

    setStep((prev) => Math.min(prev + 1, 4))
  }

  // Show loading state while fetching product details
  if (isLoadingProduct) {
    return (
      <main className="flex flex-col gap-6 p-10 mx-auto max-w-none bg-white rounded-2xl w-[640px] max-md:p-5 max-md:w-full max-md:max-w-[991px] max-sm:p-4 max-sm:max-w-screen-sm">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </div>
      </main>
    )
  }

  // Step 1 form UI
  if (step === 1) {
    return (
      <main className="flex flex-col gap-6 p-10 mx-auto max-w-none bg-white rounded-2xl w-[640px] max-md:p-5 max-md:w-full max-md:max-w-[991px] max-sm:p-4 max-sm:max-w-screen-sm">
        <FormHeader
          step={step}
          totalSteps={4}
          title={productId ? "Edit Product" : "Product detail"}
          subtitle={productId ? "Update product" : "Add product"}
        />

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{errorMessage}</div>
        )}

        <section className="flex flex-col gap-4 max-md:gap-3 max-sm:gap-2.5">
          <InputField
            label="Product name"
            required
            placeholder="All-In-One Happy Birthday Bash Décor Kit"
            value={formData.productName}
            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
          />

          <InputField
            label="Description"
            required
            multiline
            placeholder="All-In-One Happy Birthday Bash Décor Kit"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <InputField
            label="Producer"
            placeholder="Savic birthday"
            value={formData.producer}
            onChange={(e) => setFormData({ ...formData, producer: e.target.value })}
          />

          <URLInput value={formData.url} onChange={(url) => setFormData({ ...formData, url })} />

          {/* General Category Dropdown */}
          <div className="relative" ref={generalDropdownRef}>
            <label className="block mb-1 font-medium">General Category</label>
            <input
              type="text"
              readOnly
              value={formData.generalCategory}
              placeholder="Select a general category"
              className="w-full border rounded px-3 py-2 cursor-pointer"
              onClick={() => {
                setIsGeneralDropdownOpen(!isGeneralDropdownOpen)
                if (!isGeneralDropdownOpen && generalCategories.length === 0) {
                  fetchGeneralCategories()
                }
              }}
            />
            {isGeneralDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-auto">
                <input
                  type="text"
                  placeholder="Search general categories..."
                  value={generalSearchTerm}
                  onChange={(e) => setGeneralSearchTerm(e.target.value)}
                  className="w-full border-b px-3 py-2"
                />
                {isLoading ? (
                  <div className="p-2 text-center text-gray-500">Loading...</div>
                ) : errorMessage ? (
                  <div className="p-2 text-red-500">{errorMessage}</div>
                ) : filteredGeneralCategories.length === 0 ? (
                  <div className="p-2 text-gray-500">No general categories found</div>
                ) : (
                  <ul>
                    {filteredGeneralCategories.map((cat: GeneralCategory) => (
                      <li
                        key={cat.generalCategoryId}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            generalCategory: cat.name,
                            generalCategoryId: cat.generalCategoryId,
                            category: "",
                            categoryId: "",
                            subCategoryId: "",
                            subCategoryName: "",
                          })
                          localStorage.setItem("generalCategoryId", cat.generalCategoryId)
                          localStorage.setItem("generalCategory", cat.name)
                          setIsGeneralDropdownOpen(false)
                          setGeneralSearchTerm("")
                          setCategories([])
                          setSubCategories([])
                          fetchCategories(cat.generalCategoryId)
                        }}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {cat.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Product Category Dropdown */}
          <div className="relative" ref={categoryDropdownRef}>
            <label className="block mb-1 font-medium">Product Category</label>
            <input
              type="text"
              readOnly
              value={formData.category}
              placeholder={formData.generalCategoryId ? "Select a product category" : "Select general category first"}
              className="w-full border rounded px-3 py-2 cursor-pointer"
              disabled={!formData.generalCategoryId}
              onClick={() => {
                if (formData.generalCategoryId) {
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                  if (!isCategoryDropdownOpen && categories.length === 0) {
                    fetchCategories(formData.generalCategoryId)
                  }
                }
              }}
            />
            {isCategoryDropdownOpen && formData.generalCategoryId && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-auto">
                <input
                  type="text"
                  placeholder="Search product categories..."
                  value={categorySearchTerm}
                  onChange={(e) => setCategorySearchTerm(e.target.value)}
                  className="w-full border-b px-3 py-2"
                />
                {isLoading ? (
                  <div className="p-2 text-center text-gray-500">Loading...</div>
                ) : errorMessage ? (
                  <div className="p-2 text-red-500">{errorMessage}</div>
                ) : filteredCategories.length === 0 ? (
                  <div className="p-2 text-gray-500">No product categories found</div>
                ) : (
                  <ul>
                    {filteredCategories.map((cat: Category) => (
                      <li
                        key={cat.categoryId}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            category: cat.categoryName,
                            categoryId: cat.categoryId,
                            subCategoryId: "",
                            subCategoryName: "",
                          })
                          localStorage.setItem("categoryId", cat.categoryId)
                          localStorage.setItem("category", cat.categoryName)
                          setIsCategoryDropdownOpen(false)
                          setCategorySearchTerm("")
                          setSubCategories([])
                          fetchSubCategories(cat.categoryId)
                        }}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {cat.categoryName} ({cat.noOfProducts})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Sub Category Dropdown */}
          <div>
            <label className="block mb-1 font-medium">Sub Category</label>
            <select
              value={formData.subCategoryId}
              onChange={(e) => {
                const selectedId = e.target.value
                const selectedSub = subCategories.find((sub: SubCategory) => sub.subCategoryId === selectedId)
                setFormData({
                  ...formData,
                  subCategoryId: selectedId,
                  subCategoryName: selectedSub?.subCategoryName || "",
                })
                localStorage.setItem("subCategoryId", selectedId)
                localStorage.setItem("subCategoryName", selectedSub?.subCategoryName || "")
              }}
              className="w-full border rounded px-3 py-2"
              disabled={!formData.categoryId && subCategories.length === 0}
              required
            >
              {/* Default Option */}
              {!formData.categoryId && formData.subCategoryName ? (
                <option value={formData.subCategoryId} disabled>
                  {formData.subCategoryName}
                </option>
              ) : (
                <option value="" disabled>
                  {formData.categoryId ? "Select a subcategory" : "Select product category first"}
                </option>
              )}
              {/* If category is selected but no subcategories found */}
              {subCategories.length === 0 && formData.categoryId ? (
                <option disabled>No subcategories available</option>
              ) : (
                subCategories.map((subCat: SubCategory) => (
                  <option key={subCat.subCategoryId} value={subCat.subCategoryId}>
                    {subCat.subCategoryName}
                  </option>
                ))
              )}
            </select>
          </div>

          <KeywordTags
            onChange={(newTags) => {
              const newKeywords = newTags.map((tag) => tag.text)
              const isSame = JSON.stringify(formData.keywords) === JSON.stringify(newKeywords)
              if (!isSame) {
                setFormData((prev) => ({
                  ...prev,
                  keywords: newKeywords,
                }))
              }
            }}
          />

          <MediaUpload files={uploadedFiles} onFilesChange={setUploadedFiles} />
        </section>

        <FormActions onCancel={handleCancel} onPrevious={handlePrevious} onNext={handleNext} canGoPrevious={false} />
        <CloseButton onClick={handleClose} />
      </main>
    )
  }

  if (step === 2) {
    return (
      <>
        <CustomerOptionsForm
          onPrevious={handlePrevious}
          onNext={handleNext}
          onCancel={handleCancel}
          onClose={handleClose}
          productId={productId}
        />
        <CloseButton onClick={handleClose} />
      </>
    )
  }

  if (step === 3) {
    return (
      <>
        <PricingForm onCancel={handleCancel} productId={productId} onPrevious={handlePrevious} onNext={handleNext} />
        <CloseButton onClick={handleClose} />
      </>
    )
  }

  if (step === 4) {
    return (
      <>
        <PreviewNew
          onCancel={handleCancel}
          productId={productId}
          onPrevious={handlePrevious}
          uploadedFiles={uploadedFiles}
        />
        <CloseButton onClick={handleClose} />
      </>
    )
  }

  return null
}

export default ProductDetailForm
