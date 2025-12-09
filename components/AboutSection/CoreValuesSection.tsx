"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export const CoreValuesSection: React.FC = () => {
  const values = [
    "R – Respect and Honor – 1st Samuel 2:30, Hebrews 12:28–29",
    "E – Excellence:  – 2nd Peter 1:3, Colossians 3:23",
    "S – Stewardship – 1st Corinthians 4:1–2",
    "P – Purity – Hebrews 1:9, Proverbs 22:11",
    "E – Example of believers. – 1st Timothy 4:12",
    "C – Compassion – Colossians 3:12",
    "T – Trust – Psalm 20:7; 60:12",
    "G – God – Ephesians 3:21",
  ];

  // For modal
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  return (
    <>
      <footer className="flex flex-col items-center justify-center gap-6 py-6 px-2 w-full text-center bg-slate-700 bg-opacity-30 overflow-hidden">
        
        <h2 className="text-3xl md:text-4xl font-black text-black">
          OUR CORE VALUES
        </h2>

        <div className="relative w-full overflow-hidden whitespace-nowrap py-4">
          <motion.div
            className="inline-flex gap-16 text-lg md:text-xl font-medium text-black"
            initial={{ x: "0%" }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 43,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* MAIN LIST */}
            {values.map((value, index) => (
              <span
                key={index}
                className="cursor-pointer hover:underline"
                onClick={() => setSelectedValue(value)}
              >
                {value}
              </span>
            ))}

            {/* DUPLICATE LIST */}
            {values.map((value, index) => (
              <span
                key={`dup-${index}`}
                className="cursor-pointer hover:underline"
                onClick={() => setSelectedValue(value)}
              >
                {value}
              </span>
            ))}
          </motion.div>
        </div>
      </footer>

      {/* MODAL */}
      {selectedValue && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[999]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl p-6 max-w-lg w-[90%] text-center shadow-xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Core Value</h3>

            <p className="text-gray-800 text-lg leading-relaxed">
              {selectedValue}
            </p>

            <button
              onClick={() => setSelectedValue(null)}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-purple-700"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};
