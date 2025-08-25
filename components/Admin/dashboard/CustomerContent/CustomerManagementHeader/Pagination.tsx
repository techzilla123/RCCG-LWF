"use client"

import { ArrowLeftIcon, ArrowRightIcon, DotsIcon } from "./Icons"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePageClick = (page: number) => {
    onPageChange(page)
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`w-6 h-6 text-sm rounded ${
              currentPage === i ? "text-white bg-blue-600" : "text-black bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>,
        )
      }
    } else {
      // Show first page
      pages.push(
        <button
          key={1}
          className={`w-6 h-6 text-sm rounded ${
            currentPage === 1 ? "text-white bg-blue-600" : "text-black bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => handlePageClick(1)}
        >
          1
        </button>,
      )

      // Show dots if current page is far from start
      if (currentPage > 3) {
        pages.push(
          <span key="start-dots" className="flex justify-center items-center w-6 h-6">
            <DotsIcon />
          </span>,
        )
      }

      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(
            <button
              key={i}
              className={`w-6 h-6 text-sm rounded ${
                currentPage === i ? "text-white bg-blue-600" : "text-black bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => handlePageClick(i)}
            >
              {i}
            </button>,
          )
        }
      }

      // Show dots if current page is far from end
      if (currentPage < totalPages - 2) {
        pages.push(
          <span key="end-dots" className="flex justify-center items-center w-6 h-6">
            <DotsIcon />
          </span>,
        )
      }

      // Show last page
      if (totalPages > 1) {
        pages.push(
          <button
            key={totalPages}
            className={`w-6 h-6 text-sm rounded ${
              currentPage === totalPages ? "text-white bg-blue-600" : "text-black bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handlePageClick(totalPages)}
          >
            {totalPages}
          </button>,
        )
      }
    }

    return pages
  }

  if (totalPages === 0) {
  return null // no data at all
}


  return (
    <nav
      className="flex gap-1 justify-center items-center mt-6 max-md:flex-col max-md:items-start max-sm:flex-col max-sm:items-start"
      aria-label="Pagination"
    >
      <button
        className={`flex justify-center items-center w-6 h-6 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"
        }`}
        aria-label="Previous page"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon />
      </button>

      <div className="flex gap-1 items-center">{renderPageNumbers()}</div>

      <button
        className={`flex justify-center items-center w-6 h-6 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"
        }`}
        aria-label="Next page"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <ArrowRightIcon />
      </button>
    </nav>
  )
}
