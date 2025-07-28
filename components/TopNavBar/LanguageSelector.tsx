"use client";

import { useRouter } from "next/navigation";

export const LanguageSelector = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/blog")}
      className="flex items-center gap-2 px-3 h-10 rounded-lg cursor-pointer hover:bg-gray-100 transition"
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/04f52260c863ae8274894fd576ebdd5f063b23d1?placeholderIfAbsent=true"
        alt="Language"
        className="w-5 h-5 rounded-full"
      />
      <span className="text-sm text-black">US</span>
    </div>
  );
};
