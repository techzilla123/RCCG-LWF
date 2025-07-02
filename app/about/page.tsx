"use client";
import { useRouter } from "next/navigation";
import React from "react";

const About = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-teal-50 flex flex-col items-center px-6 sm:px-12 md:px-20 lg:px-40 py-12">
      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="self-start mb-6 px-4 py-2 text-white bg-[#66C47C] rounded-full hover:bg-green transition-all duration-300"
      >
        ←
      </button>

      {/* About Us Header */}
      <h1 className="text-4xl font-bold text-green-800 text-center sm:text-left">About Us</h1>

      {/* Introduction */}
      <p className="mt-4 text-lg text-gray-700 text-center sm:text-left">
        At <span className="font-semibold text-green-700">YCT Microfinance Bank</span>, we are dedicated to making a meaningful impact in the lives of individuals and communities through accessible financial services. Our commitment to financial inclusion, empowerment, and economic growth drives every aspect of our work.
      </p>

      {/* Sections */}
      <div className="mt-10 space-y-12 text-gray-700 w-full">
        {/* Mission */}
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-green-800">Our Mission</h2>
          <p className="mt-2">
            Our mission is to provide financial resources to those traditionally underserved by mainstream institutions. We empower individuals and small businesses through affordable, responsible, and tailored financial solutions.
          </p>
        </div>

        {/* Who We Are */}
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-green-800">Who We Are</h2>
          <p className="mt-2">
            YCT Microfinance Bank is a trusted and regulated institution, serving our community since inception. We are proud of our strong foundation, extensive experience, and unwavering commitment to ethical practices.
          </p>
        </div>

        {/* Core Values */}
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-green-800">Our Core Values</h2>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li><span className="font-medium text-green-700">Financial Inclusion:</span> Everyone deserves access to financial services.</li>
            <li><span className="font-medium text-green-700">Empowerment:</span> We help clients take control of their financial futures.</li>
            <li><span className="font-medium text-green-700">Transparency:</span> We uphold the highest standards of honesty and accountability.</li>
            <li><span className="font-medium text-green-700">Community Engagement:</span> We support and understand the communities we serve.</li>
          </ul>
        </div>

        {/* What Sets Us Apart */}
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-green-800">What Sets Us Apart</h2>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li><span className="font-medium text-green-700">Client-Centered Approach:</span> We customize financial solutions to clients needs.</li>
            <li><span className="font-medium text-green-700">Professional Team:</span> Our dedicated experts understand financial inclusion deeply.</li>
            <li><span className="font-medium text-green-700">Social Impact:</span> We measure success by the positive change we create.</li>
          </ul>
        </div>

        {/* Our Services */}
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-green-800">Our Services</h2>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li><span className="font-medium text-green-700">Microloans:</span> Small loans tailored for individuals and small businesses.</li>
            <li><span className="font-medium text-green-700">Savings Accounts:</span> Secure and accessible savings options.</li>
            <li><span className="font-medium text-green-700">Financial Education:</span> Resources and training for financial literacy.</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800">Join Us in Making a Difference</h2>
          <p className="mt-2 text-gray-700">
            We invite you to join us in creating a financially inclusive society. Together, we can empower communities and transform lives.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
