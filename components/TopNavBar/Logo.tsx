"use client";

import { useRouter } from "next/navigation";

export const Logo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="w-32 h-10 flex items-center cursor-pointer"
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/4e27b654459ab6ffedb376d5485049c4f820b683?placeholderIfAbsent=true"
        alt="Logo"
        className="object-contain w-full h-[52px]"
      />
    </div>
  );
};
