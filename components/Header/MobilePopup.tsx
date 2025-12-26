"use client"

import * as React from "react"

interface Props {
  title: string
  onClose: () => void
  children: React.ReactNode
  position?: "bottom" | "middle" // add position prop
}

export const MobilePopup: React.FC<Props> = ({
  title,
  onClose,
  children,
  position = "bottom", // default is bottom
}) => {
  // Determine classes based on position
  const positionClasses =
    position === "middle"
      ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[80vh] rounded-xl"
      : "inset-x-0 bottom-0 rounded-t-2xl max-h-[90vh]";

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[60]"
        onClick={onClose}
      />

      {/* Popup */}
      <div
        className={`
          fixed z-[61] bg-white overflow-y-auto animate-slide-up
          ${positionClasses}
        `}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-4 py-4 flex justify-between items-center">
          <span className="text-sm font-semibold uppercase">{title}</span>
          <button onClick={onClose} className="text-sm text-zinc-600">
            Close
          </button>
        </div>

        {/* Content */}
        <div className="p-4">{children}</div>
      </div>
    </>
  )
}
