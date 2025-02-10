"use client";

import React, { useState } from 'react';

const initialFaqData = [
  {
    question: "How long does it take for payments to be processed?",
    answer: "Payments happens instantly and receipts can be generated and saved for individual payments.",
    isOpen: true,
  },
  {
    question: "How do I view my transaction history?",
    answer: "Click on the History button and your transaction history should be available to you after confirming your identity of course.",
    isOpen: false,
  },
  {
    question: "Can other info be added to an invoice?",
    answer: "Yes, you can add custom fields to your invoices. This includes purchase order numbers, project IDs, or any other information you need for your records.",
    isOpen: false,
  },
  {
    question: "How long does it take for payments to be processed?",
    answer: "This is an instant payment platform and you should be able to make payments and generate receipts in seconds,",
    isOpen: false,
  },
  {
    question: "My payment is not going through.",
    answer: " What should I do? Check the transaction history to confirm the status of the payment it would be clearly stated if the payment is successful or has failed.",
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
        <h2 className="text-4xl font-semibold tracking-tight text-green-900" style={{color:'#005E1E'}}>
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
