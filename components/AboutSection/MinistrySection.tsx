"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { SectionHeader } from "./SectionHeader";
import { MinistryCard } from "./MinistryCard";

const ministryData = [
  {
    image: "https://api.builder.io/api/v1/image/assets/TEMP/824693b9d3ed35c7a76f0498eff548924faa155d?width=560",
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
  {
    image: "https://api.builder.io/api/v1/image/assets/TEMP/9a02569f2348fee5b9a298c0bd2f7826d5333c46?width=560",
    title: "Wiseones Ministry",
    description: "Supporting and honoring our seniors with love and care.",
    altText: "Wiseones Ministry",
  },
];

export const MinistrySection: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap"
        rel="stylesheet"
      />
      <SectionHeader title="There's a place for everyone at RCCG LWF" />

      <main className="flex gap-8 items-start px-4 py-0 mx-auto mt-8 w-full max-w-[1232px] min-h-[409px] 
        max-md:flex-col max-md:gap-6 max-md:px-6 max-sm:px-4">

        {/* 1st Column */}
        <section className="flex flex-col items-start w-6/12 max-md:w-full">
          <div className="flex gap-6 justify-center items-start w-full 
            max-md:flex-col max-md:gap-6">
            <div onClick={() => router.push("/ministries")} className="cursor-pointer">
              <MinistryCard {...ministryData[0]} />
            </div>
            <div onClick={() => router.push("/ministries")} className="cursor-pointer">
              <MinistryCard {...ministryData[1]} />
            </div>
          </div>
        </section>

        {/* 2nd Column */}
        <section className="flex flex-col items-start w-6/12 max-md:w-full">
          <div className="flex gap-6 justify-center items-start w-full 
            max-md:flex-col max-md:gap-6">
            <div onClick={() => router.push("/ministries")} className="cursor-pointer">
              <MinistryCard {...ministryData[2]} />
            </div>
            <div onClick={() => router.push("/ministries")} className="cursor-pointer">
              <MinistryCard {...ministryData[3]} />
            </div>
          </div>

          {/* Wiseones at bottom (centered)
          <div className="flex justify-center w-full mt-6">
            <div onClick={() => router.push("/ministries")} className="cursor-pointer">
              <MinistryCard {...ministryData[4]} />
            </div>
          </div> */}
        </section>

      </main>
    </>
  );
};

export default MinistrySection;
