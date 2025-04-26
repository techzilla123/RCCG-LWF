"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const HeroButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/shop")}
      className="flex gap-2 justify-center items-center mt-6 py-4 px-8 bg-blue-600 rounded-full text-white text-xl font-semibold shadow-lg hover:bg-blue-700 transition"
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/819f9f37e799d627477ac436d54e8e89d325c4fa?placeholderIfAbsent=true"
        alt="Shop icon"
        className="w-6 h-6"
      />
      Shop now
    </button>
  );
};
