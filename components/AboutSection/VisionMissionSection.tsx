"use client";

import React from "react";

export const VisionMissionSection: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-8 p-6 max-w-6xl mx-auto">
      <video
        src="/about2.mp4"
        className="w-full md:w-1/2 rounded-lg object-cover"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="md:w-1/2 space-y-6 text-black">
        <h2 className="text-3xl md:text-4xl font-bold">Our Vision and Mission</h2>
        <p className="text-lg leading-relaxed">
          To build word practitioners that will become examples of believers in
          word, conversation, charity, spirit, and purity. — James 1:22, 1 Timothy 4:12
        </p>
        <p className="text-lg leading-relaxed">
          Our Mission is to preach the gospel of reconciliation through the
          sacrifice of our Lord Jesus Christ — 2 Cor. 5:17-21
        </p>

        <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition">
          Our Core Values
        </button>
      </div>
    </section>
  );
};

export default VisionMissionSection;
