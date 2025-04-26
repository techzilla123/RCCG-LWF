"use client"
import React from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation instead

export const ActionButton: React.FC = () => {
  const router = useRouter();

  const handleContinueShopping = () => {
    // Navigate to /shop when the button is clicked
    router.push("/shop");
  };

  return (
    <div className="flex gap-2 items-center mt-6 w-full max-md:max-w-full">
      <button
        onClick={handleContinueShopping} // Add onClick event to handle navigation
        className="flex flex-wrap gap-2 justify-center items-center self-stretch my-auto w-full h-14 bg-blue-600 basis-[0%] flex-1 min-h-14 min-w-60 rounded-[50px] shrink-1 max-md:max-w-full"
      >
        <span className="self-stretch my-auto text-base font-medium tracking-normal leading-6 text-center text-white">
          Continue shopping
        </span>
        <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/0ce34641f59b37d52efa24ad3ed287cc1edba4f6?placeholderIfAbsent=true"
            alt="Continue shopping icon"
            className="object-contain self-stretch my-auto w-5 aspect-square"
          />
        </div>
      </button>
    </div>
  );
};
