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
      <div className="max-w-full w-[1080px]">
        <div className="flex gap-5 max-md:flex-col">
          {/* Left Column */}
          <div className="w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start w-full max-md:max-w-full">
              {/* First Image */}
              <ImageSection
                src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/913204a128dde6f0d87551af34083dd84a193b53?placeholderIfAbsent=true"
                aspectRatio="aspect-[0.8]"
              />

              {/* First Learn More Section */}
              <div className="self-stretch max-md:max-w-full">
                <div className="flex items-center gap-5">
                  <LearnMoreSection
                    alignment="right"
                    topPadding="pt-32 max-md:pt-24"
                    onClick={() => router.push("/groups")}
                  />
                  <HorizontalBorder
                    topPadding="pt-36 max-md:pt-24"
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Second Image */}
              <ImageSection
                src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/7d827b30b5b3d5e71319d21568d10c6882f95448?placeholderIfAbsent=true"
                aspectRatio="aspect-[0.75]"
                className="mt-20 max-md:mt-10"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto w-full max-md:mt-10 max-md:max-w-full">
              {/* Second Learn More Section */}
              <div className="max-md:max-w-full">
                <div className="flex items-center gap-5">
                  <HorizontalBorder
                    topPadding="pt-36 max-md:pt-24"
                    className="flex-1"
                  />
                  <LearnMoreSection
                    alignment="left"
                    topPadding="pt-32 max-md:pt-24"
                    onClick={() => router.push("/ministries")}
                  />
                </div>
              </div>

              {/* Third Image */}
              <ImageSection
                src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/f45734d07c11659104f503bf005bd90b2d93dae2?placeholderIfAbsent=true"
                aspectRatio="aspect-[0.8]"
                className="self-end mt-28 max-md:mt-10"
              />

              {/* Third Learn More Section */}
              <div className="max-md:max-w-full">
                <div className="flex items-center gap-5">
                  <HorizontalBorder
                    topPadding="pt-36 max-md:pt-24"
                    className="flex-1"
                  />
                  <LearnMoreSection
                    alignment="left"
                    topPadding="pt-32 max-md:pt-24"
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
