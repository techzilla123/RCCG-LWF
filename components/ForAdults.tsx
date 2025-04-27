"use client";
import * as React from "react";
import { TitleSection } from "./ForAdults/TitleSection";
import { ProductCard } from "./ForAdults/ProductCard";

const ForAdults: React.FC = () => {
  return (
    <section className="flex flex-col gap-6 px-6 py-10 bg-sky-50 md:px-20">
      <div className="flex flex-col md:flex-row flex-wrap gap-6 items-start xxl:flex-nowrap">
        {/* Left Title + 6 Cards */}
        <div className="flex flex-wrap gap-4 flex-1 min-w-[280px]">
          <TitleSection />

          <ProductCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/81c6d95d2bcbd39bc5304011b824540992ebb6e7?placeholderIfAbsent=true"
            title="Anniversaries"
          />
          <ProductCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/3005fdd58172243a6976a17460f1a3032583c9fc?placeholderIfAbsent=true"
            title="Mother's Day"
          />
          <ProductCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/37dc43cc3efd1617c6d0e0f9f42cf3da226f9073?placeholderIfAbsent=true"
            title="Retirement"
          />
          <ProductCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/0592b126763a61d7fdb2a326c676d6767149c37c?placeholderIfAbsent=true"
            title="Valentine's Day"
          />
          
          {/* <ProductCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/11a4e9741ebb66c7a4ef460a3a31daac9ceb7585?placeholderIfAbsent=true"
            title="Father's Day"
          /> */}
        </div>

        {/* Right Large Card
        <div className="flex-1 min-w-[280px]  max-w-sm self-stretch">
          <ProductCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/ea90d964fb1634b3d683c7f41856680a846102f0?placeholderIfAbsent=true"
            title="Weddings"
            isLarge
          />
        </div> */}
      </div>
    </section>
  );
};

export default ForAdults;
