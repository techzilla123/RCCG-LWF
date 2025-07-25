"use client";

import { useState } from "react";
import { AccordionItem } from "./Faq/AccordionItem";

interface FaqItem {
  question: string;
  answer?: string;
}

const faqItems: FaqItem[] = [
  {
    question: "What is Party Place and Rentals all about ?",
    answer:
      "Party Place and Rentals is your one-stop shop for everything party, from Party supplies, Balloon Décor and design to Party equipment rentals",
  },
  {
    question: "What are the Services Party Place and Rentals Offers ?",
    answer: "We deal in a variety of themed Party Supplies for kids & adults, Balloons & Balloon Décor. And Party Equipment Rentals",
  },
  {
    question: "How can I contact Party Place & Rentals?",
    answer: "We are here for you, get ahold of us via the following: Call us at 469-248-2060, email us support@partyplaceandrentals.com.  DM us on Facebook, instagram @partyplaceandrentals",
  },
  {
    question: "Do you help blow balloons purchased somewhere else ?",
    answer: "Yes, we understand we might not have your balloon choice in stock, so we can offer to blow the balloons at a price depending on the size and the quantity of the balloons",
  },
  {
    question: "Can I cancel or modify my order after it’s been placed ?",
    answer: "We strive to process orders as quickly as possible, but if you need to cancel or modify your order, please contact us at support@partyplaceandrentals.com  or call us (469-248-2060) immediately, and we'll do our best to assist you.",
  },
  {
    question: "What is your return policy ?",
    answer: "We have a “NO” return policy, however we want you to be thrilled with your party supplies, as such we offer exchange. If you're not satisfied, please contact us within 10 days of receiving your order, and we'll assist you with the exchange process.",
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
