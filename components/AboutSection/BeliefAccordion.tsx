"use client";
import React, { useState } from "react";
import { BeliefItem } from "./BeliefItem";

const values = [
  {
    id: "respect",
    title: "R – Respect and honor to God and His people.",
    content:
      "We honor God and show respect to His people in all we do.",
    references: ["1 Samuel 2:30", "Hebrews 12:28–29"],
  },
  {
    id: "excellence",
    title: "E – Excellence to the glory of God.",
    content:
      "We strive to do everything with excellence because it reflects God's nature.",
    references: ["2 Peter 1:3", "Colossians 3:23"],
  },
  {
    id: "stewardship",
    title: "S – Stewardship: Accountability and faithfulness to God.",
    content:
      "We manage God’s resources responsibly and serve Him faithfully.",
    references: ["1 Corinthians 4:1–2"],
  },
  {
    id: "purity",
    title: "P – Purity: Loving what God loves.",
    content:
      "We pursue purity, aligning our lives with what God loves and rejecting what He hates.",
    references: ["Hebrews 1:9", "Proverbs 22:11"],
  },
  {
    id: "example",
    title: "E – Example of believers.",
    content:
      "We strive to be examples in speech, conduct, love, faith, and purity.",
    references: ["1 Timothy 4:12"],
  },
  {
    id: "compassion",
    title: "C – Compassion: Showing mercy and bearing with one another.",
    content:
      "We show compassion, kindness, humility, and patience toward all.",
    references: ["Colossians 3:12"],
  },
  {
    id: "trust",
    title: "T – Trust: Our trust is only in God.",
    content:
      "We rely on God alone for victory, strength, and direction.",
    references: ["Psalm 20:7", "Psalm 60:12"],
  },
  {
    id: "god",
    title: "G – God: All the glory belongs to Him alone.",
    content:
      "We live to glorify God in everything we do.",
    references: ["Ephesians 3:21"],
  },
];

export const BeliefAccordion: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null); // nothing expanded initially

  const handleToggle = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg mb-10 shadow-sm overflow-hidden">
      {values.map((v) => (
        <BeliefItem
          key={v.id}
          title={v.title}
          content={v.content}
          references={v.references}
          isExpanded={expanded === v.id}
          onToggle={() => handleToggle(v.id)}
        />
      ))}
    </div>
  );
};
