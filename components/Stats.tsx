import React from "react";
import Container from "./Container";
import statsImage from "../public/images/stats.jpg";
import Image from "next/image";

const Stats = () => {
  return (
    <div className="w-full bg-[#F5FFF8] py-[70px]">
      <Container className="w-full grid grid-cols-1 md:grid-cols-2 gap-[60px]">
        <div className="w-full overflow-hidden rounded-[40px] max-h-[487px]">
          <Image src={statsImage} className=" object-cover" alt="hero-logo" />
        </div>
        <div className="space-y-[40px]">
          <div className="space-y-3">
            <p className="text-text_color_01 text-sm">
              We’ve helped hundreds of companies
            </p>
            <h1 className="text-black text-[30px] leading-[30px] sm:leading-[54px] sm:text-[45px]">
              We’re only just getting started on our journey
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-[32px]">
            <div className="space-y-3">
              <h2 className="font-semibold text-green text-6xl">400+</h2>
              <p className="text-[18px] text-black">Project Completed</p>
            </div>
            <div className="space-y-3">
              <h2 className="font-semibold text-green text-6xl">600%</h2>
              <p className="text-[18px] text-black">Return on Investment</p>
            </div>
            <div className="space-y-3">
              <h2 className="font-semibold text-green text-6xl">100%</h2>
              <p className="text-[18px] text-black">Satisfaction rate</p>
            </div>
            <div className="space-y-3">
              <h2 className="font-semibold text-green text-6xl">100%</h2>
              <p className="text-[18px] text-black">Satisfaction rate</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Stats;
