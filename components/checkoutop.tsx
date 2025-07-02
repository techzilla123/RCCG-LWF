'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const options = [
  {
    label: 'Pickup',
    image: '/ezgif-3c75295c92496b-removebg-preview.png',
  },
  {
    label: 'Local Delivery',
    image: '/Branded_Van__1_-removebg-preview.png',
  },
  {
    label: 'Shipping',
    image: 'https://cdn-icons-png.flaticon.com/512/1239/1239525.png',
  },
];

export default function CheckoutOptions() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % options.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = options[index];

  if (!visible) return null;

  return (
    <section className="relative w-full max-w-[240px] mx-auto bg-pink-50 px-3 py-1.5 rounded-lg shadow-md overflow-hidden">
      {/* Close "x" button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute top-1 right-2 text-xs text-gray-400 hover:text-red-500"
        aria-label="Close"
      >
        ×
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between gap-2"
        >
          <div className="flex flex-col justify-center text-[0.65rem] leading-[0.9rem]">
            <h2 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400 text-[0.75rem]">
              {current.label}
            </h2>
            <p className="text-gray-600 text-[0.6rem] -mt-0.5">available at checkout</p>
          </div>
          <img
            src={current.image}
            alt={current.label}
            className="w-8 h-8 object-contain"
          />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
