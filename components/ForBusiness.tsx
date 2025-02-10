import React from 'react';
import FeatureCard from './FeatureCard';

const featureData = [
  {
    icon: "/sfs.svg",
    bgColor: "bg-teal-50",
    title: "Stop chasing invoices",
    description: "We makes it easy to send professional invoices, accept online payments, and track your earnings – all in one place."
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
    title: "  Accept payments online with just a few clicks.",
    description: "Seamlessly accept payments online with just a few clicks, making transactions effortless and secure our intuitive platform simplifies the payment process, ensuring fast transactions."
  }
];

function AdminFeaturesSection() {
  return (
    <section data-layername="adminFeatures" className="flex overflow-hidden z-0 flex-wrap gap-10 justify-center px-32 py-20 w-full bg-zinc-50 max-md:px-5 max-md:max-w-full">
      <div data-layername="content" className="flex flex-col flex-1 shrink self-start basis-0 min-w-[240px] max-md:max-w-full">
        <div className="flex w-full bg-gray-200 min-h-[389px] rounded-[40px] max-md:max-w-full" aria-hidden="true" />
        <div data-layername="headingAndSupportingText" className="flex flex-col mt-8 w-full max-md:max-w-full">
          <div data-layername="headingAndSubheading" className="flex flex-col w-full max-md:max-w-full">
            <h2 data-layername="heading" className="text-5xl font-bold text-green-900 max-md:max-w-full max-md:text-4xl" style={{color:'#005E1E'}}>
              Make fast and secure transactions
            </h2>
            <p data-layername="subheading" className="mt-3 text-4xl font-semibold text-yellow-600 max-md:max-w-full" style={{color:'#B39200'}}>
              No sign-up needed!
            </p>
          </div>
        </div>
      </div>
      <div data-layername="features" className="flex flex-col flex-1 shrink justify-center basis-0 min-w-[240px] max-md:max-w-full">
        <div data-layername="featuresTop" className="flex flex-wrap gap-6 items-start w-full max-md:max-w-full">
          {featureData.slice(0, 2).map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        <div data-layername="featuresBottom" className="flex flex-wrap gap-6 items-start mt-8 w-full max-md:max-w-full">
          {featureData.slice(2).map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminFeaturesSection;