"use client";
import React from "react";

interface BeliefItemProps {
  title: string;
  content?: string;
  references?: string[];
  isExpanded?: boolean;
  onToggle?: () => void;
}

export const BeliefItem: React.FC<BeliefItemProps> = ({
  title,
  content,
  references = [],
  isExpanded = false,
  onToggle,
}) => {
  return (
    <div className="w-full border-b border-gray-200">
      <button
        className={`flex justify-between items-center w-full px-4 py-4 text-lg font-semibold text-left transition-all ${
          isExpanded ? "bg-sky-50" : "bg-white hover:bg-gray-50"
        }`}
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <span className="text-black">{title}</span>
        <img
          src={
            isExpanded
              ? "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/c3ef34f44a914a02727db185b22d4b8f70249010"
              : "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/af7f3631282d795e3e7a8f9698a572c0929e5cfb"
          }
          alt={isExpanded ? "Collapse" : "Expand"}
          className="w-3 h-3 transition-transform duration-300 transform"
        />
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-96" : "max-h-0"
        }`}
      >
        {content && (
          <div className="px-6 py-4 bg-white text-gray-700">
            <p className="leading-6">{content}</p>

            {references.length > 0 && (
              <div className="mt-3 space-y-1">
                {references.map((ref, i) => (
                  <p key={i} className="text-sm text-cyan-600">
                    {ref}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
