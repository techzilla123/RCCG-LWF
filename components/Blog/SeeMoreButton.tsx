"use client";
import * as React from "react";

interface SeeMoreButtonProps {
  onClick?: () => void;
}

export function SeeMoreButton({ onClick }: SeeMoreButtonProps) {
  return (
    <div className="mt-16 text-center">
      <button
        className="px-8 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
        onClick={onClick}
      >
        See More
      </button>
    </div>
  );
}
