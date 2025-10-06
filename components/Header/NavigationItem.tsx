"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { DropdownIcon } from "./DropdownIcon";

interface NavigationItemProps {
  label: string;
  hasDropdown?: boolean;
  isHighlighted?: boolean;
  hasStartHereIcon?: boolean;
  isMobile?: boolean;
  link?: string; // Added link prop
  onClick?: () => void;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  label,
  hasDropdown = false,
  isHighlighted = false,
  hasStartHereIcon = false,
  isMobile = false,
  link,
  onClick,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const router = useRouter();

  const containerClasses = isHighlighted
    ? "flex relative flex-wrap content-center items-center px-6 py-4 bg-gray-800 rounded hover:bg-gray-700 transition-colors cursor-pointer"
    : "flex relative flex-wrap content-center items-center p-4 rounded hover:bg-gray-100 transition-colors cursor-pointer";

  const textClasses = isHighlighted
    ? "relative text-sm font-medium leading-4 text-white uppercase"
    : "relative text-sm font-medium leading-4 uppercase text-zinc-800";

  const handleClick = () => {
    if (hasDropdown) {
      setIsDropdownOpen(!isDropdownOpen);
    } else if (link) {
      router.push(link); // Navigate to link
    }
    onClick?.();
  };

  return (
    <li className={`flex relative flex-col items-start ${isMobile ? "w-full" : ""}`}>
      <div className="flex relative flex-col items-start w-full">
        <div className={containerClasses} onClick={handleClick}>
          <div className="flex relative flex-col items-start">
            <span className={textClasses}>{label}</span>
          </div>
          {hasStartHereIcon && (
            <div className="flex relative flex-col items-start pl-1.5">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/ff272ea180af866b2806007578afb74de8862a3b?width=46"
                alt=""
                className="relative h-[23px] w-[23px]"
              />
            </div>
          )}
          {hasDropdown && (
            <div className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}>
              <DropdownIcon className="flex relative flex-col items-start pl-1.5" />
            </div>
          )}
        </div>
      </div>
    </li>
  );
};
