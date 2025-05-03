"use client";
import { TableHeader } from './Table/TableHeader';
import { TableCell } from './Table/TableCell';
import { StatusTag } from './Table/StatusTag';
import React, { useState, useRef, useEffect } from "react";
import Actions from "./Dropdown/Actions";
import { createPortal } from 'react-dom';

export const Table = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [dropdownDirection, setDropdownDirection] = useState<"up" | "down">("down");

  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  // ✅ Handle outside click
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
  return (
    <div className="w-full overflow-x-auto mt-8">
    <div className="flex min-w-[900px]"> {/* Added gap between columns */}

  
        {/* Left Image */}
        <img
          src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/ddea918870f375ce53a047f37bb138b8c9d80a7a?placeholderIfAbsent=true"
          className="object-contain shrink-0 w-10 aspect-[0.12]"
          alt=""
        />

        {/* Image Column */}
        <div className="flex-1 min-w-[100px] max-w-[120px]">
          <TableHeader title="Image" />
          {[
            "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/f787e17a6d7c5de797075819be6e830ad2215ceb?placeholderIfAbsent=true",
            "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/10fe93c6dbfdd551ab0f1bf623522d4ace36355d?placeholderIfAbsent=true",
            "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/fddde9f7a2c5735a183b984f1b45c27794af0cd5?placeholderIfAbsent=true",
            "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/fabc870d34a2df2cd9b3f4d7d5fa1429cb2eead1?placeholderIfAbsent=true",
            "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/b05fe33e78cfea949604e566849a0cde9b93ef5f?placeholderIfAbsent=true"
          ].map((url, index) => (
            <TableCell key={index} className="py-3 px-5 justify-center">
              <img
                src={url}
                className="object-contain rounded aspect-[1.7] w-[68px]"
                alt=""
              />
            </TableCell>
          ))}
        </div>

        {/* Product Column */}
        <div className="flex-1 min-w-[200px]">
  <TableHeader title="Product" />
  {[
    "Colourful Kids Birthday Latex Balloons",
    "Transparent Bubble Balloon with Custom Sticker...",
    "Elegant Golden Age Birthday Celebration Set...",
    "All-In-One Happy Birthday Bash Décor Kit...",
    "Deluxe Dessert Station Setup Kit – For Insta..."
  ].map((text, index) => (
    <TableCell key={index} className="p-2">
         <div className="text-base text-black truncate mt-2 "   title={text}>{text}</div>
    </TableCell>
  ))}
</div>



        {/* Category Column */}
        <div className="flex-1 min-w-[180px]">
          <TableHeader title="Category" />
          {[
            "Birthday shop",
            "Balloon shop",
            "Party supplies",
            "Decoration",
            "Holidays & Occasions"
          ].map((text, index) => (
            <TableCell key={index} className="py-2 px-4">
              <div className="text-base text-black truncate mt-2"   title={text}>{text}</div>
            </TableCell>
          ))}
        </div>

        {/* Date Column */}
        <div className="flex-1 min-w-[150px] max-w-[200px]">
          <TableHeader title="Date added" />
          {Array(5).fill("03-04-2025").map((date, index) => (
            <TableCell key={index} className="py-2 px-4 whitespace-nowrap">
              <div className="text-base text-black mt-2">{date}</div>
            </TableCell>
          ))}
        </div>

        {/* Price Column */}
        <div className="flex-1 min-w-[100px] max-w-[120px]">
          <TableHeader title="Price" />
          {["$720", "$950", "$20", "$120", "$1,020"].map((price, index) => (
            <TableCell key={index} className="py-2 px-4 text-right">
              <div className="text-base text-black mt-2">{price}</div>
            </TableCell>
          ))}
        </div>

        {/* Orders Column */}
        <div className="flex-1 min-w-[100px] max-w-[120px]">
          <TableHeader title="Orders" />
          {["20", "120", "10", "700", "10"].map((orders, index) => (
            <TableCell key={index} className="py-2 px-4 text-right">
              <div className="text-base text-black mt-2">{orders}</div>
            </TableCell>
          ))}
        </div>

        {/* Sales Column */}
        <div className="flex-1 min-w-[130px] max-w-[160px]">
          <TableHeader title="Sales" />
          {["$14,400", "$45,520", "$200", "$84,000", "$10,200"].map((sales, index) => (
            <TableCell key={index} className="py-2 px-4 text-right">
              <div className="text-base text-black mt-2">{sales}</div>
            </TableCell>
          ))}
        </div>

        {/* Stock Column */}
        <div className="flex-1 min-w-[120px] max-w-[140px]">
          <TableHeader title="Stock" />
          {[
            { value: "200", disabled: false },
            { value: "314", disabled: false },
            { value: "400", disabled: false },
            { value: "0", disabled: true },
            { value: "5", disabled: false }
          ].map((stock, index) => (
            <TableCell
              key={index}
              className={`py-2 px-4 text-right ${
                stock.disabled ? "text-stone-300 font-medium" : "text-black"
              }`}
            >
              <div className="mt-2">{stock.value}</div>
            </TableCell>
          ))}
        </div>

        {/* Status Column */}
        <div className="flex-1 min-w-[140px] max-w-[160px]">
          <TableHeader title="Status" />
          {[
            "Active",
            "Disabled",
            "Active",
            "Out of stock",
            "Disabled"
          ].map((status, index) => (
            <TableCell key={index} className="px-4 py-3">
              <StatusTag status={status as 'Active' | 'Disabled' | 'Out of stock'} />
            </TableCell>
          ))}
        </div>

       <div className="flex-1 min-w-[80px] max-w-[100px]">
  <TableHeader title="" />
  {Array(5).fill(null).map((_, index) => (
    <TableCell key={index} className="px-4 py-3 text-right">
      <div
        className="relative"
         ref={
                    ((el: HTMLDivElement | null) => {
                      dropdownRefs.current[index] = el;
                    }) as React.Ref<HTMLDivElement>
                  }
                  
      >
        <div
          className="flex items-center gap-1 cursor-pointer mt-3"
          onClick={() => toggleDropdown(index)}
        >
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
        </div>

        {openDropdownIndex === index && dropdownRefs.current[index] &&
  createPortal(
    <div
      className="absolute z-[9999]"
      style={{
        top: dropdownRefs.current[index].getBoundingClientRect().bottom + window.scrollY,
        left: dropdownRefs.current[index].getBoundingClientRect().left + window.scrollX,
      }}
    >
      <Actions direction={dropdownDirection} />
    </div>,
    document.body
  )
}
      </div>
    </TableCell>
  ))}
</div>

      </div>
    </div>
  );
};

export default Table;
