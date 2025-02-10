import React from 'react';
import FeatureCard from './FeatureCard';

const featureData = [
  {
    icon: "/sfs.svg",
    bgColor: "bg-teal-50",
    title: "Stop chasing invoices",
    description: "We make it easy to send professional invoices, accept online payments, and track your earnings – all in one place."
  },
  {
    icon: "/spfr.svg",
    bgColor: "bg-yellow-50",
    title: "Spend less time",
    description: "Spend less time managing payments. We automate your payment process, so you can focus on growing your business."
  },
  {
    icon: "/spdfy.svg",
    bgColor: "bg-violet-50",
    title: "Grow with YCT Microfinance bank",
    description: "YCT Microfinance bank helps you grow by simplifying your payment process. From invoicing to reporting, we've got you covered, so you can focus on expanding your business."
  },
  {
    icon: "/spdfd.svg",
    bgColor: "bg-red-50",
    title: "Accept payments online with just a few clicks.",
    description: "Seamlessly accept payments online with just a few clicks, making transactions effortless and secure. Our intuitive platform simplifies the payment process, ensuring fast transactions."
  }
];

// New StyledImage component
const StyledImage = () => (
  <div
    className="flex w-full bg-gray-200 min-h-[389px] rounded-[40px] max-md:max-w-full relative"
    aria-hidden="true"
    style={{
      backgroundImage: "url('/af.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      
    }}
  >
    {/* Top-right box */}
    <div className="absolute top-4 right-4 bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-lg font-semibold">Transfer Money</h3>
      <p className="text-gray-600">How much are you sending?</p>
      <div className="flex space-x-2 mt-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded-lg">₦2000</button>
        <button className="bg-blue-500 text-white px-3 py-1 rounded-lg">₦20,000</button>
        <button className="bg-blue-500 text-white px-3 py-1 rounded-lg">₦50,000</button>
      </div>
    </div>

    {/* Bottom-left box */}
    <div className="absolute bottom-4 right-4 bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-lg font-semibold">Spending Trend</h3>
      <p className="text-gray-600">Money In: ₦550,000</p>
      <p className="text-gray-600">Money Out: ₦950,000</p>
      <div className="mt-2">
        <div className="h-2 bg-green-500 w-1/2 rounded-full mb-2"></div>
        <div className="h-2 bg-red-500 w-3/4 rounded-full"></div>
      </div>
    </div>
  </div>
);

function AdminFeaturesSection() {
  return (
    <section
      data-layername="adminFeatures"
      className="flex overflow-hidden z-0 flex-wrap gap-10 justify-center px-32 py-20 w-full bg-zinc-50 max-md:px-5 max-md:max-w-full"
    >
      <div
        data-layername="content"
        className="flex flex-col flex-1 shrink self-start basis-0 min-w-[240px] max-md:max-w-full"
      >
        {/* Replace the placeholder div with StyledImage */}
        <StyledImage />
        <div
          data-layername="headingAndSupportingText"
          className="flex flex-col mt-8 w-full max-md:max-w-full"
        >
          <div
            data-layername="headingAndSubheading"
            className="flex flex-col w-full max-md:max-w-full"
          >
            <h2
              data-layername="heading"
              className="text-5xl font-bold text-green-900 max-md:max-w-full max-md:text-4xl"
              style={{ color: "#005E1E" }}
            >
              Make fast and secure transactions
            </h2>
            <p
              data-layername="subheading"
              className="mt-3 text-4xl font-semibold text-yellow-600 max-md:max-w-full"
              style={{ color: "#B39200" }}
            >
              No sign-up needed!
            </p>
          </div>
        </div>
      </div>
      <div
        data-layername="features"
        className="flex flex-col flex-1 shrink justify-center basis-0 min-w-[240px] max-md:max-w-full"
      >
        <div
          data-layername="featuresTop"
          className="flex flex-wrap gap-6 items-start w-full max-md:max-w-full"
        >
          {featureData.slice(0, 2).map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        <div
          data-layername="featuresBottom"
          className="flex flex-wrap gap-6 items-start mt-8 w-full max-md:max-w-full"
        >
          {featureData.slice(2).map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminFeaturesSection;
