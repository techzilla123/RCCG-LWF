import React from 'react';
import FeatureCard from './FeatureCard';

const featureData = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d722594e3b185833c1e2c32ea856a847a82b5a5dececb32e3890b0b448a2bca2?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a",
    bgColor: "bg-teal-50",
    title: "Care about our team",
    description: "Understand what matters to our employees. Give them what they need to do their best work."
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d01dfaa8bfd67f9fbd89b363467b7e18407a883e40bc62dc0d1d6cbd6254c0f3?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a",
    bgColor: "bg-yellow-50",
    title: "Care about our team",
    description: "Understand what matters to our employees. Give them what they need to do their best work."
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/bf59ad79ffdb742e8b14b48084de0f2f71d29a806c85d95ee3dc0e3aab800fa0?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a",
    bgColor: "bg-violet-50",
    title: "Care about our team",
    description: "Understand what matters to our employees. Give them what they need to do their best work."
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c89c489efd4cdab31b7059c1f85feb9af4bfdbd94076ea6eb4737626158cb60c?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a",
    bgColor: "bg-red-50",
    title: "Care about our team",
    description: "Understand what matters to our employees. Give them what they need to do their best work."
  }
];

function AdminFeaturesSection() {
  return (
    <section data-layername="adminFeatures" className="flex overflow-hidden z-0 flex-wrap gap-10 justify-center px-32 py-20 w-full bg-white max-md:px-5 max-md:max-w-full">
      <div data-layername="content" className="flex flex-col flex-1 shrink self-start basis-0 min-w-[240px] max-md:max-w-full">
        <div className="flex w-full bg-gray-200 min-h-[389px] rounded-[40px] max-md:max-w-full" aria-hidden="true" />
        <div data-layername="headingAndSupportingText" className="flex flex-col mt-8 w-full max-md:max-w-full">
          <div data-layername="headingAndSubheading" className="flex flex-col w-full max-md:max-w-full">
            <h2 data-layername="heading" className="text-5xl font-bold text-green-900 max-md:max-w-full max-md:text-4xl">
              Make fast and secure transactions
            </h2>
            <p data-layername="subheading" className="mt-3 text-4xl font-semibold text-yellow-600 max-md:max-w-full">
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