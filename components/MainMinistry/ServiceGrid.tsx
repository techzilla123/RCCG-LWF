// ServiceGrid.tsx
import React from "react";
import { ServiceCard } from "./ServiceCard";

const serviceData = [
  {
    title: "Host Team",
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/dc511c6bfdf25e19d833a03ab67e6e1d2ecfdfea?placeholderIfAbsent=true",
    description:
      "Create a welcoming environment online or in person and help everyone feel comfortable during weekly services.",
  },
  {
    title: "LifeKids",
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/d879e72a968fa8bf5b145e8030c5568dd03735d2?placeholderIfAbsent=true",
    description:
      "Help kids birth–6th grade learn about who God is and who they are through age-specific lessons, small groups, and fun.",
  },
  {
    title: "Operations Team",
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/4cea52f5b9c03ab2dd5588790c0fc980f9a87c5a?placeholderIfAbsent=true",
    description:
      "Help people take next steps by managing day-to-day operational needs, events, and details to celebrate people as they grow in their faith.",
  },
  {
    title: "Tech & Worship Team",
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/b071b765fa90104b0d85abfe1cdc971d4fa2b216?placeholderIfAbsent=true",
    description:
      "Serve on stage and behind the scenes to help people connect with God through worship, production, and creative arts.",
  },
  {
    title: "Switch",
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/a1f6d5e3c763fcf38c0118d332db114f9972244f?placeholderIfAbsent=true",
    description:
      "Be part of leading the next generation. Switch, our student ministry, addresses issues teens face through conversation, friendship, and teaching.",
  },
  {
    title: "Community",
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/4a4a1be1d2ebebafb2b7fd47504757bf3a508020?placeholderIfAbsent=true",
    description:
      "Help connect people to trusted relationships through LifeGroups — online or in person — and to opportunities to love their neighbors.",
  },
  {
    title: "Central Offices",
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/f78cf50f6f2266c8c93e0cd7b2f0e5aaf32f0e97?placeholderIfAbsent=true",
    description:
      "Central teams provide support and resources for all Life.Church locations and ministries, equipping the local and global Church.",
  },
  {
    title: "Life.Church Online",
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/604ef09d7ab9c8cea3a905c6527ee23e8622f608?placeholderIfAbsent=true",
    description:
      "Serve digitally with Life.Church Online! Care for our global church family through live services, chat, email, and social media.",
  },
];

export const ServiceGrid: React.FC = () => {
  return (
    <section className="px-6 py-16 md:px-12 lg:px-24 bg-white">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-2 xl:gap-16 max-w-6xl mx-auto">
        {serviceData.map((service, idx) => (
          <ServiceCard key={idx} {...service} />
        ))}
      </div>
    </section>
  );
};
