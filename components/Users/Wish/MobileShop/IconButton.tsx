"use client"

import type React from "react"

interface IconButtonProps {
  onClick: () => void
  children: React.ReactNode
  ariaLabel: string
  disabled?: boolean
}

export const IconButton: React.FC<IconButtonProps> = ({ onClick, children, ariaLabel, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center p-1 bg-white rounded-[50px] disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
