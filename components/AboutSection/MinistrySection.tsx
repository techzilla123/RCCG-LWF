"use client";
import * as React from "react";
import { SectionHeader } from "./SectionHeader";
import { MinistryCard } from "./MinistryCard";

const ministryData = [
  {
    image: "https://api.builder.io/api/v1/image/assets/TEMP/824693b9d3ed35c7a76f0498eff548924faa155d?width=560",
    title: "Kids Ministry",
    description: "Children from birth-6th grade learn who God is and understand who they are in LifeKids.",
    altText: "Kids Ministry"
  },
  {
    image: "https://api.builder.io/api/v1/image/assets/TEMP/9c42a447e5f303b43e36122e9864dfa10446fdc3?width=560",
    title: "Student Ministry",
    description: "Switch exists to lead 6th-12th grade students to become fully devoted followers of Christ.",
    altText: "Student Ministry"
  },
  {
    image: "https://api.builder.io/api/v1/image/assets/TEMP/35fbd5221a3c966cf9bc18b06d910fce3bb8f11a?width=560",
    title: "LifeGroups",
    description: "Find community where you can grow spiritually and be encouraged in the highs and lows of life.",
    altText: "LifeGroups"
  },
  {
    image: "https://api.builder.io/api/v1/image/assets/TEMP/9a02569f2348fee5b9a298c0bd2f7826d5333c46?width=560",
    title: "Missions",
    description: "Bring the hope and healing of Christ to people of every age, location, and language.",
    altText: "Missions"
  }
];

export const MinistrySection: React.FC = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap"
        rel="stylesheet"
      />
      <SectionHeader title="There's a place for everyone at RCCG LWF" />
      <main className="flex gap-8 items-start px-4 py-0 mx-auto my-0 mt-8 w-full max-w-[1232px] min-h-[409px] max-md:flex-col max-md:gap-6 max-md:px-6 max-md:py-0 max-sm:px-4 max-sm:py-0 max-sm:mt-6">
        <section className="flex flex-col items-start w-6/12 max-md:w-full">
          <div className="flex gap-6 justify-center items-start w-full max-md:flex-col max-md:gap-6">
            <MinistryCard {...ministryData[0]} />
            <MinistryCard {...ministryData[1]} />
          </div>
        </section>
        <section className="flex flex-col items-start w-6/12 max-md:w-full">
          <div className="flex gap-6 justify-center items-start w-full max-md:flex-col max-md:gap-6">
            <MinistryCard {...ministryData[2]} />
            <MinistryCard {...ministryData[3]} />
          </div>
        </section>
      </main>
    </>
  );
};

export default MinistrySection;
