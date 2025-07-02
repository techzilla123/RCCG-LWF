"use client";
import React from "react";

export const ReviewsHeader: React.FC = () => {
  return (
    <header className="relative flex flex-col items-start w-full mb-4">
      <h1 className="text-4xl font-bold text-black">Reviews</h1>
      <p className="mt-1 text-gray-700" style={{fontWeight:"600"}}>See what our customers are saying</p>
      <button className="absolute top-0 right-0 px-4 py-1 text-sm font-medium bg-white rounded-full shadow">
        See more
      </button>
    </header>
  );
};
