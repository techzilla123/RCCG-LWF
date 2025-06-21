import { useState, useRef, useEffect } from "react";
import { FormHeader } from "./FormHeader";
import { InputField } from "./InputField";
import { URLInput } from "./URLInput";
import { KeywordTags } from "./KeywordTags";
import { MediaUpload } from "./MediaUpload";
import type { UploadedFile } from "./MediaUpload";
import { FormActions } from "./FormActions";
import { CloseButton } from "./CloseButton";
import CustomerOptionsForm from "../ProductsAddTwo/CustomerOptionsForm";
import PricingForm from "../PricingForm/PricingForm";
import PreviewNew from "../PreviewSave/PreviewNew";

interface Category {
  categoryId: string;
  categoryName: string;
  noOfProducts: number;
}

interface SubCategory {
  subCategoryId: string;
  subCategoryName: string;
}

type FormData = {
  productName: string;
  description: string;
  producer: string;
  url: string;
  category: string;
 subCategoryId: string; // optional: can rename this to subCategoryId to make it clear
  subCategoryName: string;
  categoryId: string;
  keywords: string[];
  uploadedFiles: UploadedFile[];
};

type ProductDetailFormProps = {
  onClose: () => void;
};

const ProductDetailForm: React.FC<ProductDetailFormProps> = ({ onClose }: ProductDetailFormProps) => {
  
  
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    description: "",
    producer: "",
    url: "",
    category: "",
   subCategoryId: "", // ✅ use correct key
  subCategoryName: "",
    categoryId: "",
    keywords: [],
    uploadedFiles: [],
  });

  const [step, setStep] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load saved data on mount from localStorage
  useEffect(() => {
  const fields: (keyof FormData)[] = [
    "productName",
    "description",
    "producer",
    "url",
    "category",
     "subCategoryId", // ✅ correct
  "subCategoryName", // ✅ added
    "categoryId",
    "keywords",
    "uploadedFiles",
  ];

  const loaded: FormData = { ...formData };

  fields.forEach((field) => {
    const saved = localStorage.getItem(field);
    if (saved) {
      if (field === "keywords" || field === "uploadedFiles") {
        try {
          loaded[field] = JSON.parse(saved);
        } catch {
          // fallback in case of parsing error
          loaded[field] = field === "keywords" ? [] : [];
        }
      } else {
        loaded[field] = saved;
      }
    }
  });

  setFormData(loaded);
}, []);




  // Save to localStorage when formData changes (only string fields)
  useEffect(() => {
    localStorage.setItem("productName", formData.productName);
  }, [formData.productName]);

  useEffect(() => {
    localStorage.setItem("description", formData.description);
  }, [formData.description]);

  useEffect(() => {
    localStorage.setItem("producer", formData.producer);
  }, [formData.producer]);

  useEffect(() => {
    localStorage.setItem("url", formData.url);
  }, [formData.url]);

  useEffect(() => {
    localStorage.setItem("category", formData.category);
  }, [formData.category]);

  useEffect(() => {
    localStorage.setItem("subCategory", formData.subCategory);
  }, [formData.subCategory]);

  useEffect(() => {
    localStorage.setItem("categoryId", formData.categoryId);
  }, [formData.categoryId]);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setSearchTerm("");
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  

  // Fetch categories from API
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

  // Fetch subcategories based on categoryId
  const fetchSubCategories = async (categoryId: string) => {
    setIsLoading(true);
    setErrorMessage("");
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

  // Filter categories for search
  const filteredCategories = categories.filter((cat) =>
    cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigation handlers
  const handleClose = () => onClose();
  const handleCancel = () => handleClose();
  const handlePrevious = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleNext = () => {
    if (uploadedFiles.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    // Save rest of formData except uploadedFiles to localStorage
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === "string") {
        localStorage.setItem(key, value);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    });

    // Don't save uploadedFiles in localStorage (File objects)

    setStep((prev) => Math.min(prev + 1, 4));
  };

  // Step 1 form UI
  if (step === 1) {
    return (
      <main className="flex flex-col gap-6 p-10 mx-auto max-w-none bg-white rounded-2xl w-[640px] max-md:p-5 max-md:w-full max-md:max-w-[991px] max-sm:p-4 max-sm:max-w-screen-sm">
        <FormHeader step={step} totalSteps={4} title="Product detail" subtitle="Add product" />

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
          <URLInput
            value={formData.url}
            onChange={(url) => setFormData({ ...formData, url })}
          />

          <div className="relative" ref={dropdownRef}>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              readOnly
              value={formData.category}
              placeholder="Select a category"
              className="w-full border rounded px-3 py-2 cursor-pointer"
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
                if (!isDropdownOpen && categories.length === 0) {
                  fetchCategories();
                }
              }}
            />

            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-auto">
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border-b px-3 py-2"
                />

                {isLoading ? (
                  <div className="p-2 text-center text-gray-500">Loading...</div>
                ) : errorMessage ? (
                  <div className="p-2 text-red-500">{errorMessage}</div>
                ) : filteredCategories.length === 0 ? (
                  <div className="p-2 text-gray-500">No categories found</div>
                ) : (
                  <ul>
                    {filteredCategories.map((cat) => (
                      <li
                        key={cat.categoryId}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            category: cat.categoryName,
                            categoryId: cat.categoryId,
                              subCategoryId: "",   // ✅ correct
                            subCategoryName: "", // ✅ correct

                          });
                          localStorage.setItem("categoryId", cat.categoryId);
                          setIsDropdownOpen(false);
                          setSearchTerm("");
                          fetchSubCategories(cat.categoryId);
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

          <label className="block mb-1 font-medium">Sub category</label>
       <select
  value={formData.subCategoryId} // ✅ use subCategoryId here
  onChange={(e) => {
    const selectedId = e.target.value;
    const selectedSub = subCategories.find(
      (sub) => sub.subCategoryId === selectedId
    );

    setFormData({
      ...formData,
      subCategoryId: selectedId, // ✅ correct key
      subCategoryName: selectedSub?.subCategoryName || "",
    });

    localStorage.setItem("subCategoryId", selectedId);
    localStorage.setItem("subCategoryName", selectedSub?.subCategoryName || "");
  }}
  className="w-full border rounded px-3 py-2"
  required
>
  <option value="" disabled>Select a subcategory</option>

  {subCategories.length === 0 ? (
    <option disabled>No subcategories available</option>
  ) : (
    subCategories.map((subCat) => (
      <option key={subCat.subCategoryId} value={subCat.subCategoryId}>
        {subCat.subCategoryName}
      </option>
    ))
  )}
</select>


          <KeywordTags />
          <MediaUpload files={uploadedFiles} onFilesChange={setUploadedFiles} />
        </section>

        <FormActions
          onCancel={handleCancel}
          onPrevious={handlePrevious}
          onNext={handleNext}
          canGoPrevious={false}
        />

        <CloseButton onClick={handleClose} />
      </main>
    );
  }
  if (!formData.subCategoryId) {
  alert("Please select a valid subcategory.");
  return;
}


  if (step === 2) {
    return (
      <>
        <CustomerOptionsForm
          onPrevious={handlePrevious}
          onNext={handleNext}
          onCancel={handleCancel}
          onClose={handleClose}
        />
        <CloseButton onClick={handleClose} />
      </>
    );
  }

  if (step === 3) {
    return (
      <>
        <PricingForm
          onCancel={handleCancel}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
        <CloseButton onClick={handleClose} />
      </>
    );
  }

  if (step === 4) {
    return (
      <>
        <PreviewNew
          onCancel={handleCancel}
          onPrevious={handlePrevious}
          uploadedFiles={uploadedFiles}
        />
        <CloseButton onClick={handleClose} />
      </>
    );
  }

  return null;
};

export default ProductDetailForm;
