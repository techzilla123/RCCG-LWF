"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import ImageSection from "./ImageSection";
import LearnMoreSection from "./LearnMoreSection";
import HorizontalBorder from "./HorizontalBorder";

function Background() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center px-16 max-md:px-5 bg-[linear-gradient(90deg,#333064,#7345FF)]">
      <div className="max-w-full w-[1080px] max-md:w-full">
        <div className="flex gap-5 max-md:flex-col">
          {/* Left Column */}
          <div className="w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start w-full max-md:max-w-full">
              {/* First Image with GROUPS text */}
              <div className="relative overflow-visible">
                <ImageSection
                  src="/sss.jpeg"
                  aspectRatio="aspect-[0.8]"
                  className="self-end grayscale relative"
                />

                {/* GROUPS text responsive */}
                <div className="absolute top-[1rem] right-[-3.0rem] h-full flex items-center pointer-events-none
                                max-md:top-0 max-md:right-0 max-md:text-[3rem]">
                  <span className="text-transparent text-[5.7rem] font-extrabold tracking-widest
                                   [writing-mode:vertical-rl] [-webkit-text-stroke:2px_white]
                                   max-md:text-[3rem]">
                    GROUPS
                  </span>
                </div>
              </div>

              {/* First Learn More Section */}
              <div className="self-stretch max-md:max-w-full">
                <div className="flex items-center gap-5 max-md:flex-col max-md:gap-3">
                  <LearnMoreSection
                    alignment="right"
                    topPadding="pt-32 max-md:pt-8"
                    onClick={() => router.push("/groups")}
                  />
                  <HorizontalBorder
                    topPadding="pt-36 max-md:pt-8"
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Second Image with EVENTS text */}
              <div className="relative overflow-visible mt-20 max-md:mt-10">
                <ImageSection
                  src="/wal1.jpeg"
                  aspectRatio="aspect-[0.75]"
                  className="grayscale"
                />
                {/* EVENTS text responsive */}
                <div className="absolute top-[1rem] left-[-2.5rem] h-full flex items-center pointer-events-none
                                max-md:top-0 max-md:left-0 max-md:text-[3rem]">
                  <span className="text-transparent text-[5.7rem] font-extrabold tracking-widest
                                   [writing-mode:vertical-rl] [-webkit-text-stroke:2px_white]
                                   max-md:text-[3rem]">
                    EVENTS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto w-full max-md:mt-10 max-md:max-w-full">
              {/* Second Learn More Section */}
              <div className="max-md:max-w-full">
                <div className="flex items-center gap-5 max-md:flex-col max-md:gap-3">
                  <HorizontalBorder
                    topPadding="pt-36 max-md:pt-8"
                    className="flex-1"
                  />
                  <LearnMoreSection
                    alignment="left"
                    topPadding="pt-32 max-md:pt-8"
                    onClick={() => router.push("/ministries")}
                  />
                </div>
              </div>

              {/* Third Image with SERVE text */}
              <div className="relative overflow-visible mt-28 max-md:mt-10">
                <ImageSection
                  src="/wal.jpeg"
                  aspectRatio="aspect-[0.8]"
                  className="self-end grayscale"
                />
                {/* SERVE text responsive */}
                <div className="absolute top-[-8rem] right-[-0.08rem] h-full flex items-center pointer-events-none
                                max-md:top-0 max-md:right-0 max-md:text-[3rem]">
                  <span className="text-transparent text-[5.7rem] font-extrabold tracking-widest
                                   [writing-mode:vertical-rl] [-webkit-text-stroke:2px_white]
                                   max-md:text-[3rem]">
                    SERVE
                  </span>
                </div>
              </div>

              {/* Third Learn More Section */}
              <div className="max-md:max-w-full">
                <div className="flex items-center gap-5 max-md:flex-col max-md:gap-3">
                  <HorizontalBorder
                    topPadding="pt-36 max-md:pt-8"
                    className="flex-1"
                  />
                  <LearnMoreSection
                    alignment="left"
                    topPadding="pt-32 max-md:pt-8"
                    onClick={() => router.push("/events")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Background;
