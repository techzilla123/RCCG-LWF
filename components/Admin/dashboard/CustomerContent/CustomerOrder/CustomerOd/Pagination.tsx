"use client";

import { ArrowLeftIcon, ArrowRightIcon, DotsIcon } from "./Icons";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      // show all if few pages
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className="flex gap-1 justify-center items-center mt-6" aria-label="Pagination">
      <button
        className="flex justify-center items-center w-6 h-6 disabled:opacity-50"
        aria-label="Previous page"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon />
      </button>

      <div className="flex gap-1 items-center">
        {getPageNumbers().map((p, i) =>
          p === "..." ? (
            <span key={i} className="flex justify-center items-center w-6 h-6">
              <DotsIcon />
            </span>
          ) : (
            <button
              key={i}
              className={`w-6 h-6 text-sm rounded ${
                currentPage === p ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
              onClick={() => onPageChange(Number(p))}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        className="flex justify-center items-center w-6 h-6 disabled:opacity-50"
        aria-label="Next page"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowRightIcon />
      </button>
    </nav>
  );
};
