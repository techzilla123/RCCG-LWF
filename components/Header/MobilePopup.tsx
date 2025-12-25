"use client"

import * as React from "react"

interface Props {
  title: string
  onClose: () => void
  children: React.ReactNode
}

export const MobilePopup: React.FC<Props> = ({
  title,
  onClose,
  children,
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[60]"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-[61] bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-white border-b px-4 py-4 flex justify-between items-center">
          <span className="text-sm font-semibold uppercase">{title}</span>
          <button
            onClick={onClose}
            className="text-sm text-zinc-600"
          >
            Close
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </>
  )
}
