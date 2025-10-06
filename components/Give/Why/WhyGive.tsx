import React from "react";

const reasons = [
  {
    number: "01",
    title: "Tithes and Offerings",
    description:
      "Giving our tithes and offerings shows our trust in God and provides support for the ongoing work of ministry.",
  },
  {
    number: "02",
    title: "Missions and Outreach",
    description:
      "Your generosity fuels local and global missions, helping others hear the gospel and experience God’s love.",
  },
  {
    number: "03",
    title: "Building and Growth",
    description:
      "As we grow, your giving provides facilities and resources to strengthen our fellowship and serve the community.",
  },
  {
    number: "04",
    title: "Benevolence and Care",
    description:
      "Through benevolence, we extend practical help and compassion to those in need, expressing Christ’s love tangibly.",
  },
];

const WhyGive: React.FC = () => {
  return (
    <section className="bg-[#4B4C8C] text-white px-6 py-16 md:px-16 lg:px-32">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">WHY GIVE?</h2>
        <p className="text-base md:text-lg max-w-xl mx-auto md:mx-0 text-gray-200">
          Discover why giving at RCCG Living Word Parley is an act of worship, a
          step of faith, and a way to impact lives for God’s kingdom.
        </p>
      </div>

      {/* Card Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {reasons.map((reason) => (
          <div
            key={reason.number}
            className="relative bg-[#1E1E1E] rounded-3xl p-8 overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Large gradient number in background */}
            <div
              className="absolute font-bold text-[10rem] md:text-[12rem] leading-none bottom-[-2rem] right-4 
              bg-gradient-to-b from-[#0147FF] to-[#012E9E] text-transparent bg-clip-text select-none opacity-40"
            >
              {reason.number}
            </div>

            {/* Card content */}
            <h3 className="text-xl md:text-2xl font-bold uppercase relative z-10">
              {reason.title}
            </h3>
            <p className="text-gray-200 mt-4 text-base md:text-lg relative z-10">
              {reason.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyGive;
