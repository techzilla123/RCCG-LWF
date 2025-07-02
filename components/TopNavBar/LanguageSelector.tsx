"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 h-full rounded-lg hover:bg-gray-100 transition"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/04f52260c863ae8274894fd576ebdd5f063b23d1?placeholderIfAbsent=true"
          alt="Language"
          className="w-5 h-5 rounded-full"
        />
        <span className="text-sm text-black">EN</span>
        <ChevronDown className="w-4 h-4 text-black" />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 bg-white shadow-md rounded-lg p-2 z-10">
          {/* Language options here */}
        </div>
      )}
    </div>
  );
};
