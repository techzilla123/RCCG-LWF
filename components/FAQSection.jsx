"use client";

import React, { useState } from 'react';

const initialFaqData = [
  {
    question: "Is there a free trial available?",
    answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    isOpen: true,
  },
  {
    question: "Can I change my plan later?",
    answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    isOpen: false,
  },
  {
    question: "What is your cancellation policy?",
    answer: "You can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your service will continue until the end of your current billing period.",
    isOpen: false,
  },
  {
    question: "Can other info be added to an invoice?",
    answer: "Yes, you can add custom fields to your invoices. This includes purchase order numbers, project IDs, or any other information you need for your records.",
    isOpen: false,
  },
  {
    question: "How does billing work?",
    answer: "We bill on a monthly or annual basis, depending on the plan you choose. Payment is due at the beginning of each billing cycle.",
    isOpen: false,
  },
  {
    question: "How do I change my account email?",
    answer: "You can change your account email in your profile settings. After making the change, you'll need to verify your new email address.",
    isOpen: false,
  },
];

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="flex flex-col mt-8 w-full max-md:max-w-full">
      {/* Divider line above each question if it's closed */}
      {!isOpen && <div className="w-full bg-zinc-300 min-h-[1px]" />}
      
      {/* Button for the FAQ question */}
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full text-left mt-6"
        aria-expanded={isOpen}
      >
        {/* FAQ question text */}
        <div className={`flex-1 ${isOpen ? 'text-lg font-semibold' : 'text-xl font-medium'} text-black`}>
          {question}
        </div>

        {/* Toggle icon based on whether it's open or closed */}
        <img
          src={isOpen ? "/expand.png" : "/normal.png"}
          alt={isOpen ? "Collapse answer" : "Expand answer"}
          className="w-6 h-6 object-contain"
        />
      </button>

      {/* Answer section that only appears if open */}
      {isOpen && (
        <div className="mt-4 text-base leading-6 text-neutral-600">
          {answer}
        </div>
      )}
    </div>
  );
}

function FAQSection() {
  const [faqData, setFaqData] = useState(initialFaqData);

  const toggleFAQ = (index) => {
    setFaqData(
      faqData.map((item, i) => ({
        ...item,
        isOpen: i === index ? !item.isOpen : item.isOpen,
      }))
    );
  };

  return (
    <section className="flex flex-col items-center px-6 py-16 w-full bg-neutral-100">
      {/* Section Header */}
      <header className="text-center mb-12">
        <h2 className="text-4xl font-semibold tracking-tight text-green-900">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-xl text-neutral-500">
          Everything you need to know about the product and billing.
        </p>
      </header>

      {/* FAQ Items */}
      <div className="w-full max-w-3xl">
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={item.isOpen}
            onClick={() => toggleFAQ(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default FAQSection;
