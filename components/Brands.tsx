import React from 'react';

const brandData = [
  { name: "Brand Name", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a2aeadc0a92a9f989354107c23b2632bc5bd3784368baf5484dbaf9c75aa411a?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" },
  { name: "Brand Name", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/311e75b915042e62ad1b08f15cbebdbf1a7290b4b170f8f7124e6ed740d3aa52?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" },
  { name: "Brand Name" },
  { name: "Brand Name", shape: "rounded-full" },
  { name: "Brand Name", shape: "rounded-md" }
];

function PartnersSection() {
  return (
    <section data-layername="partners" className="flex overflow-hidden z-0 flex-col gap-6 justify-center px-32 py-6 w-full bg-dark_green max-md:px-5 max-md:max-w-full">
      <p data-layername="supportingText" className="self-center text-base text-light_green">
        Trusted by 40,000+ business and 40 million+ users
      </p>
      <div data-layername="brands" className="flex gap-10 justify-center items-center mt-6 w-full max-md:max-w-full">
        {brandData.map((brand, index) => (
          <div key={index} data-layername="brands" className="flex gap-3 items-center self-stretch my-auto min-h-[32px]">
            {brand.icon && (
              <div data-layername="shapes" className="flex gap-4 items-center self-stretch my-auto w-8">
                <img loading="lazy" src={brand.icon} alt={`${brand.name} logo`} className="object-contain self-stretch my-auto w-8 h-8 aspect-square fill-white" />
              </div>
            )}
            {brand.shape && (
              <div data-layername="shapes" className="flex gap-4 items-center self-stretch my-auto w-[27px]">
                <div className={`flex self-stretch my-auto ${brand.shape} bg-zinc-300 h-[27px] min-h-[26px] w-[27px]`} />
              </div>
            )}
            <div data-layername="brandName" className="self-stretch my-auto text-xl text-white">
              {brand.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PartnersSection;