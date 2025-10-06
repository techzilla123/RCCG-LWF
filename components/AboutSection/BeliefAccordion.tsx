"use client";
import React, { useState } from "react";
import { BeliefItem } from "./BeliefItem";

interface Belief {
  id: string;
  title: string;
  content?: string;
  references?: string[];
}

const beliefs: Belief[] = [
  {
    id: "god-creator",
    title: "God is the Creator and Ruler of the universe.",
    content:
      "He has eternally existed as the Father, the Son, and the Holy Spirit. The three are coequal and are one God.",
    references: ["Genesis 1:1, 26-27", "Psalm 90:2", "Matthew 28:19"],
  },
  { id: "jesus-son", title: "Jesus is the Son of God.", content:
      "He has eternally existed as the Father, the Son, and the Holy Spirit. The three are coequal and are one God.",
    references: ["Genesis 1:1, 26-27", "Psalm 90:2", "Matthew 28:19"], },
  {
    id: "holy-spirit",
    title: "The Holy Spirit lives in each Christian from salvation.",
  },
  { id: "bible-word", title: "The Bible is God's Word to us." },
  {
    id: "people-creation",
    title: "People are the supreme object of God's creation.",
  },
  {
    id: "salvation-gift",
    title: "Salvation is God's free gift to us, but we must accept it.",
  },
  {
    id: "eternal-existence",
    title: "People will exist eternally with or without God.",
  },
  {
    id: "baptism-symbolic",
    title:
      "Baptism is symbolic of the death, burial, and resurrection of Christ.",
  },
  {
    id: "essential-beliefs",
    title:
      "In addition to Essential Beliefs, we have liberty in Non-Essential Beliefs.",
  },
];

export const BeliefAccordion: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>("god-creator");

  const handleToggle = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      {beliefs.map((b) => (
        <BeliefItem
          key={b.id}
          title={b.title}
          content={b.content}
          references={b.references}
          isExpanded={expanded === b.id}
          onToggle={() => handleToggle(b.id)}
        />
      ))}
    </div>
  );
};
