import React from 'react';

function FeatureCard({ icon, bgColor, title, description }) {
  return (
    <div data-layername="featureText" className="flex flex-col flex-1 shrink px-6 py-4 bg-white rounded-3xl shadow-sm basis-0 max-md:px-5">
      <div data-layername="featuredIcon" className={`flex gap-2.5 items-center self-center p-3 w-14 h-14 ${bgColor} rounded-3xl`}>
        <div data-layername="aIconSizeable" className="flex gap-2.5 items-center self-stretch my-auto w-8">
          <img loading="lazy" src={icon} alt="" className="object-contain self-stretch my-auto w-8 aspect-square" />
        </div>
      </div>
      <div className="flex flex-col mt-2 w-full text-center">
        <h3 data-layername="text" className="text-base font-semibold text-black">
          {title}
        </h3>
        <p data-layername="supportingText" className="mt-2 text-sm text-neutral-500">
          {description}
        </p>
      </div>
    </div>
  );
}

export default FeatureCard;