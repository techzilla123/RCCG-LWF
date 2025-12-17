"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { SectionHeader } from "./SectionHeader";
import { MinistryCard } from "./MinistryCard";

const ministryData = [
  {
    image: "/child.jpg",
    title: "Children's Ministry",
    description: "Teaching and nurturing children in God's love.",
    altText: "Children's Ministry",
  },
  {
    image: "https://api.builder.io/api/v1/image/assets/TEMP/9c42a447e5f303b43e36122e9864dfa10446fdc3?width=560",
    title: "Youth Ministry",
    description: "Helping teenagers grow in faith and purpose.",
    altText: "Youth Ministry",
  },
  {
    image: "https://api.builder.io/api/v1/image/assets/TEMP/35fbd5221a3c966cf9bc18b06d910fce3bb8f11a?width=560",
    title: "Men's Ministry",
    description: "Equipping men to lead and serve like Christ.",
    altText: "Men's Ministry",
  },
  {
    image: "https://api.builder.io/api/v1/image/assets/TEMP/9a02569f2348fee5b9a298c0bd2f7826d5333c46?width=560",
    title: "Women's Ministry",
    description: "Empowering women to grow spiritually and in community.",
    altText: "Women's Ministry",
  },
];

export const MinistrySection: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <SectionHeader title="There's a place for everyone at RCCG LWF" />

      <main
        className="flex gap-8 items-start px-4 mx-auto mt-8 w-full max-w-[1232px]
        max-md:flex-col max-md:gap-6"
      >
        {/* 1st Column */}
        <section className="flex flex-col w-6/12 max-md:w-full">
          <div className="flex gap-6 max-md:flex-col">
            <div onClick={() => router.push("/ministries")} className="cursor-pointer">
              <MinistryCard {...ministryData[0]} />
            </div>
            <div onClick={() => router.push("/ministries")} className="cursor-pointer">
              <MinistryCard {...ministryData[1]} />
            </div>
          </div>
        </section>

        {/* 2nd Column */}
        <section className="flex flex-col w-6/12 max-md:w-full">
          <div className="flex gap-6 max-md:flex-col">
            <div onClick={() => router.push("/ministries")} className="cursor-pointer">
              <MinistryCard {...ministryData[2]} />
            </div>
            <div onClick={() => router.push("/ministries")} className="cursor-pointer">
              <MinistryCard {...ministryData[3]} />
            </div>
          </div>
        </section>
      </main>

      {/* 🔹 MORE BUTTON */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => router.push("/ministries")}
          className="px-8 py-3 text-sm font-semibold text-white
          bg-[#333064] rounded-full hover:bg-blue-400 mb-10
          transition-colors duration-300"
        >
          View All Ministries
        </button>
      </div>
    </>
  );
};

export default MinistrySection;
