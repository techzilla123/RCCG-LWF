"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

export const BackButton: React.FC = () => {
  const router = useRouter(); // Get router instance

  const handleBackClick = () => {
    router.push("/auth-admin"); // Navigate to /auth-admin when clicked
  };

  return (
    <button
      onClick={handleBackClick} // Add onClick handler to trigger navigation
      className="flex absolute top-5 left-5 justify-center items-center w-16 h-14 rounded-[50px] max-sm:top-2.5 max-sm:left-2.5"
      aria-label="Go back"
    >
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2026_5062)">
          <path
            d="M20.25 12.3633H3.75"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.5 5.61328L3.75 12.3633L10.5 19.1133"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_2026_5062">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(0 0.363281)"
            />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
};
