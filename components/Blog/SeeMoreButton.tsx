"use client"

interface SeeMoreButtonProps {
  onClick?: () => void
  isLoading?: boolean
}

export function SeeMoreButton({ onClick, isLoading }: SeeMoreButtonProps) {
  return (
    <div className="mt-16 text-center">
      <button
        className="px-8 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "See More"}
      </button>
    </div>
  )
}
