"use client";
import * as React from "react";
import { CalendarHeader } from "./CalendarHeader";
import { ScheduleItem } from "./ScheduleItem";
import { SeeMoreButton } from "./SeeMoreButton";
import { DecorativeElements } from "./DecorativeElements";

const scheduleData = [
  {
    title: "The Future of Digital Innovation",
    time: "10:00 AM - 11:00 AM",
    date: "Jan 28",
    description:
      "Harnessing emerging technologies to revolutionize industries, enhance user experiences, and drive growth.",
    imageUrl:
      "https://api.builder.io/api/v1/image/assets/TEMP/4fe9eadf3b287823ec33640489b026470f173a0f?width=780",
    backgroundColor: "bg-orange-100",
  },
  {
    title: "Trends AI and Machine Learning",
    time: "11:15 AM - 12:30 PM",
    date: "Feb 19",
    description:
      "AI and Machine Learning are revolutionizing industries by enabling advanced data analysis and intelligent automation.",
    imageUrl:
      "https://api.builder.io/api/v1/image/assets/TEMP/07bf1445d299dc645b6413d09f177d3c44e493a4?width=780",
    backgroundColor: "bg-violet-100",
  },
  {
    title: "Digital Marketing for a New Era",
    time: "2:00 PM - 3:00 PM",
    date: "May 27",
    description:
      "Navigate the evolving landscape of digital marketing, harnessing innovative strategies to create compelling campaigns.",
    imageUrl:
      "https://api.builder.io/api/v1/image/assets/TEMP/b5575dccda8f054fd47ce2a0952cdd3711616448?width=780",
    backgroundColor: "bg-sky-100",
  },
  {
    title: "Introduction to Blockchain",
    time: "3:00 PM - 4:00 PM",
    date: "Jun 30",
    description:
      "Blockchain introduction: Decentralized ledger tech records secure, transparent, immutable transactions across networks.",
    imageUrl:
      "https://api.builder.io/api/v1/image/assets/TEMP/2376a2e0136789a6e00843f7fdde915fbb301494?width=780",
    backgroundColor: "bg-rose-100",
  },
];

export const Schedules: React.FC = () => {
  const [mobileIndex, setMobileIndex] = React.useState(0);

  const prevItem = () => {
    setMobileIndex((prev) =>
      prev === 0 ? scheduleData.length - 1 : prev - 1
    );
  };

  const nextItem = () => {
    setMobileIndex((prev) =>
      prev === scheduleData.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=ADLaM+Display:wght@400&family=Manrope:wght@400;500;600;700&family=Actor:wght@400&display=swap"
      />
      <section className="flex relative flex-col gap-16 items-center px-32 py-32 mx-auto my-0 w-full bg-white max-w-[1440px] max-md:gap-12 max-md:px-10 max-md:py-20 max-sm:gap-8 max-sm:px-5 max-sm:py-16">
        <header className="flex flex-col gap-4 items-center">
          <h1 className="text-5xl tracking-wider text-center leading-[50.6px] text-stone-950 max-md:text-4xl max-sm:text-3xl max-sm:tracking-wide">
            All Upcoming Events This 2025
          </h1>
          <p className="text-base leading-6 text-center text-neutral-700 w-[507px] max-md:w-full max-md:max-w-[507px] max-sm:text-sm">
            Explore the complete event schedule to find sessions, speakers,
            and activities that match your interests and needs.
          </p>
        </header>

        {/* --- Mobile Carousel --- */}
        <div className="flex w-full md:hidden relative items-center">
          <button
            onClick={prevItem}
            className="absolute left-0 z-10 px-3 py-2 text-2xl font-bold text-stone-950 bg-white rounded-full shadow-md"
          >
            ‹
          </button>
          <div className="w-full flex justify-center">
            <ScheduleItem {...scheduleData[mobileIndex]} />
          </div>
          <button
            onClick={nextItem}
            className="absolute right-0 z-10 px-3 py-2 text-2xl font-bold text-stone-950 bg-white rounded-full shadow-md"
          >
            ›
          </button>
        </div>

        {/* --- Desktop & Tablet --- */}
        <div className="hidden md:flex flex-col gap-12 items-center w-full">
          <CalendarHeader />
          {scheduleData.map((schedule, index) => (
            <ScheduleItem key={index} {...schedule} />
          ))}
          <SeeMoreButton />
        </div>

        <DecorativeElements />
      </section>
    </>
  );
};

export default Schedules;
