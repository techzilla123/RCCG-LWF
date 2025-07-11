"use client"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const pagesToShow = () => {
    const pages = []
    if (currentPage > 2) pages.push(1)
    if (currentPage > 3) pages.push("...")
    if (currentPage > 1) pages.push(currentPage - 1)
    pages.push(currentPage)
    if (currentPage < totalPages) pages.push(currentPage + 1)
    if (currentPage < totalPages - 2) pages.push("...")
    if (currentPage < totalPages - 1) pages.push(totalPages)
    return pages
  }

  return (
    <nav className="flex gap-2 justify-center items-center w-full p-4 mt-3 rounded">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {pagesToShow().map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-2 text-gray-400">
            <MoreHorizontal className="w-4 h-4" />
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => goToPage(page as number)}
            className={`px-3 py-1 rounded ${
              currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ),
      )}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  )
}
