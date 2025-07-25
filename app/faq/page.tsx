"use client";

import { useState } from "react";
import { AccordionItem } from "@/components/Faq/AccordionItem";
import Offer from "@/components/Offer"
import TopNavBar from "@/components/TopNavBar"
import Footer from "@/components/Footer"

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
  {
    question: "Do you offer international shipping ?",
    answer: "Unfortunately not at this time, we hope to expand our distribution soon - sign up for our email list to stay informed and send us a note on where we should launch next!",
  },
  {
    question: "What is your shipping policy ?",
    answer: "We offer local delivery and shipping to extended distances. We offer free, fast and reliable shipping to ensure your party supplies arrive in a timely manner (generally 3-5 business days). You will receive tracking information 24 hours after purchase.",
  },
  {
    question: "How do I ensure the quality of Party Place and Rentals party supplies ?",
    answer: "We take quality seriously. However, things happen. If you ever receive a defective item, please contact us at support@partyplaceandrentals.com, or call us directly and we'll make it right",
  },
  {
    question: "How can I stay updated with Party Place and Rentals supplies, news and promo ?",
    answer: "Stay in the loop by signing up on our website and following us on social media (Facebook, Instagram & Tiktok) @Partyplaceandrentals. You won't want to miss our exciting updates, promotions, and party inspiration.",
  },
    {
    question: "What is the rental period ?",
    answer: "The rental period for our rentals is 24hours.  DIY parties can pick up or arrange delivery a day before the party for a 2 night rental and hassle-free experience.  The rental period can be extended at an additional cost.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <Offer />
      <TopNavBar />
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
      <Footer />
    </>
  );
}
