"use client";
import * as React from "react";
import { ProfileCard } from "./ProfileCard";
import { InfoCard } from "./InfoCard";

const Content: React.FC = () => {
  const personalInfo = [
    { label: "Phone", value: "+1-024930214" },
    { label: "Gender", value: "male" },
    { label: "Birthday", value: "Jul, 8th" },
    { label: "Address", value: "---" },
  ];

  const shippingInfo = [
    { label: "Country", value: "USA" },
    { label: "State/province", value: "West coast" },
    { label: "City", value: "Los Angeles" },
    { label: "Postal code", value: "290193" },
  ];

  return (
    <main className="self-stretch pt-6 pr-8 pb-4 pl-6 bg-white max-md:px-5">
      <div className="flex flex-wrap gap-6 w-full max-md:max-w-full">
        <ProfileCard />
        <InfoCard title="Personal info" rows={personalInfo} />
        <InfoCard title="Shipping info" rows={shippingInfo} />
      </div>
    </main>
  );
};

export default Content;
