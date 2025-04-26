"use client";

import { useState } from "react";
import { AccordionItem } from "./Faq/AccordionItem";
import { FaqItem } from "./Faq/types";

const faqItems: FaqItem[] = [
  {
    question: "Lorem Ipsum - question",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Euismod venenatis pharetra dolor posuere mi id...",
  },
  {
    question: "Lorem Ipsum - Accordion",
    answer: "Aliquam lorem ut curabitur duis dapibus proin commodo.",
  },
  {
    question: "Lorem Ipsum - Accordion",
    answer: "Aliquam lorem ut curabitur duis dapibus proin commodo.",
  },
  {
    question: "Lorem Ipsum - Accordion",
    answer: "Aliquam lorem ut curabitur duis dapibus proin commodo.",
  },
  {
    question: "Lorem Ipsum - Accordion",
    answer: "Aliquam lorem ut curabitur duis dapibus proin commodo.",
  },
  {
    question: "Lorem Ipsum - Accordion",
    answer: "Aliquam lorem ut curabitur duis dapibus proin commodo.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="flex overflow-hidden flex-col justify-center self-stretch px-32 py-16 bg-stone-50 max-md:px-5">
      <header className="flex flex-col justify-center items-center w-full text-black min-w-[200px] max-md:max-w-full">
        <h1 className="text-4xl">FAQ</h1>
        <p className="mt-2 text-base tracking-normal leading-6">
          Some of your questions already answered
        </p>
      </header>

      <div className="flex flex-col justify-center self-center mt-6 max-w-full w-[800px] gap-4">
        {faqItems.map((item, index) => (
          <AccordionItem
            key={index}
            index={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
}
