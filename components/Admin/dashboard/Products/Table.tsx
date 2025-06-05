"use client";
import { TableHeader } from './Table/TableHeader';
import { TableCell } from './Table/TableCell';
import { StatusTag } from './Table/StatusTag';
import React, { useState, useRef, useEffect } from "react";
import Actions from "./Dropdown/Actions";
import { createPortal } from 'react-dom';

type Product = {
  productName: string;
  categoryName: string;
  created_at: string;
  imageOne: string;
  price: number;
  quantity: number;
  status: 'Active' | 'Disabled' | 'Out of stock';
};


export const Table = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [dropdownDirection, setDropdownDirection] = useState<"up" | "down">("down");
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
const [products, setProducts] = useState<Product[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

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
  // Fetch product data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/list-product`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
        });

        const result = await response.json();
        if (result?.statusCode === 200) {
          setProducts(result.data.product || []);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle outside click for dropdown
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
              <img
                src={item.imageOne}
                className="object-contain rounded aspect-[1.7] w-[68px]"
                alt=""
              />
            </TableCell>
          ))}
        </div>

        {/* Product Column */}
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

        {/* Category Column */}
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

        {/* Date Column */}
        <div className="flex-1 min-w-[150px] max-w-[200px]">
          <TableHeader title="Date added" />
          {products.map((item, index) => (
            <TableCell key={index} className="py-2 px-4 whitespace-nowrap">
              <div className="text-base text-black mt-2">{item.created_at?.split(" ")[0]}</div>
            </TableCell>
          ))}
        </div>

        {/* Price Column */}
        <div className="flex-1 min-w-[100px] max-w-[120px]">
          <TableHeader title="Price" />
          {products.map((item, index) => (
            <TableCell key={index} className="py-2 px-4 text-right">
              <div className="text-base text-black mt-2">${item.price}</div>
            </TableCell>
          ))}
        </div>

        {/* Orders Column */}
        <div className="flex-1 min-w-[100px] max-w-[120px]">
          <TableHeader title="Orders" />
          {products.map((_, index) => (
            <TableCell key={index} className="py-2 px-4 text-right">
              <div className="text-base text-black mt-2">0</div>
            </TableCell>
          ))}
        </div>

        {/* Sales Column */}
        <div className="flex-1 min-w-[130px] max-w-[160px]">
          <TableHeader title="Sales" />
          {products.map((_, index) => (
            <TableCell key={index} className="py-2 px-4 text-right">
              <div className="text-base text-black mt-2">$0</div>
            </TableCell>
          ))}
        </div>

        {/* Stock Column */}
        <div className="flex-1 min-w-[120px] max-w-[140px]">
          <TableHeader title="Stock" />
          {products.map((item, index) => (
            <TableCell
              key={index}
              className={`py-2 px-4 text-right ${
                item.quantity === 0 ? "text-stone-300 font-medium" : "text-black"
              }`}
            >
              <div className="mt-2">{item.quantity}</div>
            </TableCell>
          ))}
        </div>

        {/* Status Column */}
        <div className="flex-1 min-w-[140px] max-w-[160px]">
          <TableHeader title="Status" />
          {products.map((item, index) => (
            <TableCell key={index} className="px-4 py-3">
              <StatusTag status={item.status as 'Active' | 'Disabled' | 'Out of stock'} />
            </TableCell>
          ))}
        </div>

        {/* Actions Column */}
        <div className="flex-1 min-w-[80px] max-w-[100px]">
          <TableHeader title="" />
          {products.map((_, index) => (
            <TableCell key={index} className="px-4 py-3 text-right">
              <div
                className="relative"
                ref={(el) => {
                  dropdownRefs.current[index] = el;
                }}
              >
                <div
                  className="flex items-center gap-1 cursor-pointer mt-3"
                  onClick={() => toggleDropdown(index)}
                >
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                </div>

                {openDropdownIndex === index &&
                  dropdownRefs.current[index] &&
                  createPortal(
                    <div
                      className="absolute z-[9999]"
                      style={{
                        top:
                          dropdownRefs.current[index].getBoundingClientRect().bottom +
                          window.scrollY,
                        left:
                          dropdownRefs.current[index].getBoundingClientRect().left +
                          window.scrollX,
                      }}
                    >
                      <Actions direction={dropdownDirection} />
                    </div>,
                    document.body
                  )}
              </div>
            </TableCell>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
  