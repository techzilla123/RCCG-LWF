"use client";
import { TableHeader } from './Table/TableHeader';
import { TableCell } from './Table/TableCell';
import { StatusTag } from './Table/StatusTag';
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from 'react-dom';
import OrderDetails from "./ProductView/ProductsAddOne/ProductDetailForm";
import OrderDetails1 from "./ProductView copy/ProductsAddOne/ProductDetailForm";

type Product = {
  productId: string;
  productName: string;
  categoryName: string;
  created_at: string;
  imageOne: string;
  price: number;
  quantity: number;
  status: 'Active' | 'Disabled' | 'Out of stock';
};

type PaginationData = {
  current_page: number;
  total_pages: number;
  total_products: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};

interface TableProps {
  onPaginationChange?: (paginationData: PaginationData) => void;
  currentPage?: number;
   selectedCategoryId?: string | null;
    searchTerm?: string; 
}

export const Table = ({ onPaginationChange, currentPage = 1, selectedCategoryId, searchTerm }: TableProps) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [dropdownDirection, setDropdownDirection] = useState<"up" | "down">("down");
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [modalType, setModalType] = useState<'edit' | 'view'>('edit');
  const [pagination, setPagination] = useState<PaginationData>({
    current_page: 1,
    total_pages: 1,
    total_products: 0,
    per_page: 10,
    next_page_url: null,
    prev_page_url: null,
  });

  useEffect(() => {
    console.log("Selected Product ID changed:", selectedProductId);
  }, [selectedProductId]);

  const handleOpenModal = (productId: string) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const toggleCheckbox = (index: number) => {
    setSelectedRows(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const isAllSelected = products.length > 0 && selectedRows.length === products.length;
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(products.map((_, index) => index));
    }
  };

  
  const fetchProducts = async (page: number = 1) => {
  try {
    const token = localStorage.getItem("accessToken") || "";
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_SECRET_KEY || "";

    let url = "";

    if (searchTerm?.trim()) {
      const encodedSearch = encodeURIComponent(searchTerm);
      url = `${baseURL}customer/fetch-product-by-name/${encodedSearch}`;
    } else if (selectedCategoryId) {
      url = `${baseURL}admin/products/filter-product/GCT/${selectedCategoryId}?page=${page}`;
    } else {
      url = `${baseURL}admin/products/list-product?page=${page}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        ...(token && { Authorization: token }),
      },
    });

    const result = await response.json();
    if (result?.statusCode === 200) {
      setProducts(result.data.product || []);
      const paginationData = result.data.pagination || {
        current_page: 1,
        total_pages: 1,
        total_products: 0,
        per_page: 10,
        next_page_url: null,
        prev_page_url: null,
      };
      setPagination(paginationData);
      if (onPaginationChange) onPaginationChange(paginationData);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};


useEffect(() => {
  fetchProducts(currentPage);
}, [currentPage, selectedCategoryId, searchTerm]);




  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        openDropdownIndex !== null &&
        dropdownRefs.current[openDropdownIndex] &&
        !dropdownRefs.current[openDropdownIndex]?.contains(e.target as Node)
      ) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openDropdownIndex]);

  const toggleDropdown = (index: number) => {
    if (openDropdownIndex === index) {
      setOpenDropdownIndex(null);
      return;
    }
    const rect = dropdownRefs.current[index]?.getBoundingClientRect();
    const spaceBelow = window.innerHeight - (rect?.bottom || 0);
    setDropdownDirection(spaceBelow < 100 ? "up" : "down");
    setOpenDropdownIndex(index);
  };

  const handleDelete = async (productId: string, closeDropdown: () => void) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("accessToken") || "";
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/delete-product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
          ...(token && { Authorization: token }),
        },
      });
      const result = await response.json();
      if (result?.statusCode === 200) {
        // Refresh the current page after deletion
        fetchProducts(pagination.current_page);
        alert("Product deleted successfully");
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    } finally {
      closeDropdown();
    }
  };

 const handleEdit = (productId: string, closeDropdown: () => void) => {
  setModalType('edit');
  handleOpenModal(productId);
  closeDropdown();
};
  const handleView = (productId: string, closeDropdown: () => void) => {
  setModalType('view');
  handleOpenModal(productId);
  closeDropdown();
};

  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const handleToggleStatus = async (product: Product, closeDropdown: () => void) => {
    const newStatus = product.status === "Active" ? "Disabled" : "Active";
    setLoadingProductId(product.productId);
    try {
      const token = localStorage.getItem("accessToken") || "";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/update-product-status/${product.productId}?status=${newStatus}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
        }
      );
      const result = await response.json();
      if (result?.statusCode === 200) {
        setProducts((prev) =>
          prev.map((p) =>
            p.productId === product.productId ? { ...p, status: newStatus } : p
          )
        );
        alert(`Product status updated to ${newStatus}`);
      } else {
        alert("Failed to update product status.");
      }
    } catch (error) {
      console.error("Error updating product status:", error);
      alert("An error occurred while updating the product status.");
    } finally {
      setLoadingProductId(null);
      closeDropdown();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
    <div className="w-full overflow-x-auto mt-8">
      <div className="flex min-w-[900px]">
        {/* Checkbox Column */}
        <div className="flex-1 min-w-[40px] max-w-[50px]">
          <TableHeader
            title={
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={toggleSelectAll}
                className="cursor-pointer"
              />
            }
          />
          {products.map((_, index) => (
            <TableCell key={index} className="py-3 px-2 justify-center">
              <input
                type="checkbox"
                checked={selectedRows.includes(index)}
                onChange={() => toggleCheckbox(index)}
                className="cursor-pointer"
              />
            </TableCell>
          ))}
        </div>

        {/* Image Column */}
        <div className="flex-1 min-w-[100px] max-w-[120px]">
          <TableHeader title="Image" />
          {products.map((item, index) => (
            <TableCell key={index} className="py-3 px-5 justify-center">
              <img src={item.imageOne || "/placeholder.svg"} className="object-contain rounded aspect-[1.7] w-[68px]" alt="" />
            </TableCell>
          ))}
        </div>

        {/* Product Name */}
        <div className="flex-1 min-w-[200px]">
          <TableHeader title="Product" />
          {products.map((item, index) => (
            <TableCell key={index} className="p-2">
              <div className="text-base text-black truncate mt-2" title={item.productName}>
                {item.productName}
              </div>
            </TableCell>
          ))}
        </div>

        {/* Category */}
        <div className="flex-1 min-w-[180px]">
          <TableHeader title="Category" />
          {products.map((item, index) => (
            <TableCell key={index} className="py-2 px-4">
              <div className="text-base text-black truncate mt-2" title={item.categoryName}>
                {item.categoryName}
              </div>
            </TableCell>
          ))}
        </div>

        {/* Date */}
        <div className="flex-1 min-w-[150px] max-w-[200px]">
          <TableHeader title="Date added" />
          {products.map((item, index) => (
            <TableCell key={index} className="py-2 px-4 whitespace-nowrap">
              <div className="text-base text-black mt-2">{item.created_at?.split(" ")[0]}</div>
            </TableCell>
          ))}
        </div>

        {/* Price */}
        <div className="flex-1 min-w-[100px] max-w-[120px]">
          <TableHeader title="Price" />
          {products.map((item, index) => (
            <TableCell key={index} className="py-2 px-4 text-right">
              <div className="text-base text-black mt-2">${item.price}</div>
            </TableCell>
          ))}
        </div>

        {/* Orders */}
        <div className="flex-1 min-w-[100px] max-w-[120px]">
          <TableHeader title="Orders" />
          {products.map((_, index) => (
            <TableCell key={index} className="py-2 px-4 text-right">
              <div className="text-base text-black mt-2">0</div>
            </TableCell>
          ))}
        </div>

        {/* Sales */}
        <div className="flex-1 min-w-[130px] max-w-[160px]">
          <TableHeader title="Sales" />
          {products.map((_, index) => (
            <TableCell key={index} className="py-2 px-4 text-right">
              <div className="text-base text-black mt-2">$0</div>
            </TableCell>
          ))}
        </div>

        {/* Stock */}
        <div className="flex-1 min-w-[120px] max-w-[140px]">
          <TableHeader title="Stock" />
          {products.map((item, index) => (
            <TableCell
              key={index}
              className={`py-2 px-4 text-right ${item.quantity === 0 ? "text-stone-300 font-medium" : "text-black"}`}
            >
              <div className="mt-2">{item.quantity}</div>
            </TableCell>
          ))}
        </div>

        {/* Status */}
        <div className="flex-1 min-w-[140px] max-w-[160px]">
          <TableHeader title="Status" />
          {products.map((item, index) => (
            <TableCell key={index} className="px-4 py-3">
              <StatusTag status={item.status} />
            </TableCell>
          ))}
        </div>

        {/* Actions */}
        <div className="flex-1 min-w-[100px]">
          <TableHeader title="Actions" />
          {products.map((item, index) => (
            <TableCell key={index} className="px-4 py-3 text-right">
              <div
                className="relative"
                ref={(el) => {
                  dropdownRefs.current[index] = el;
                }}
              >
                <div
                  className="flex items-center gap-1 cursor-pointer mt-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(index);
                  }}
                >
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                </div>
                {openDropdownIndex === index &&
                  dropdownRefs.current[index] &&
                  createPortal(
                    <div
                      className={`w-32 bg-white shadow-lg border -mx-9 -mt-6 rounded-xl py-2 text-sm text-black ${
                        dropdownDirection === "up" ? "bottom-full mb-2" : "top-full mt-2"
                      } absolute right-0 z-50`}
                      style={{
                        top:
                          dropdownRefs.current[index].getBoundingClientRect().bottom +
                          window.scrollY,
                        left:
                          dropdownRefs.current[index].getBoundingClientRect().left +
                          window.scrollX,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleEdit(item.productId, () => setOpenDropdownIndex(null))}
                      >
                        Edit
                      </div>
                      <div
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleView(item.productId, () => setOpenDropdownIndex(null))}
                      >
                        Duplicate
                      </div>
                      <div
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleToggleStatus(item, () => setOpenDropdownIndex(null))}
                      >
                        {loadingProductId === item.productId
                          ? item.status === "Active"
                            ? "Disabling..."
                            : "Enabling..."
                          : item.status === "Active"
                          ? "Disable"
                          : "Enable"}
                      </div>
                      <div
                        className="px-4 py-2 text-red-500 hover:bg-red-100 cursor-pointer"
                        onClick={() => handleDelete(item.productId, () => setOpenDropdownIndex(null))}
                      >
                        Delete
                      </div>
                    </div>,
                    document.body
                  )}
              </div>
            </TableCell>
          ))}
        </div>
      </div>

      {/* Modal */}
    {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
    <div className="min-h-screen flex items-center justify-center p-4">
      {modalType === 'edit' ? (
        <OrderDetails onClose={handleCloseModal} productId={selectedProductId} />
      ) : (
        <OrderDetails1 onClose={handleCloseModal} productId={selectedProductId} />
      )}
    </div>
  </div>
)}

    </div>
  );
};

export default Table;
