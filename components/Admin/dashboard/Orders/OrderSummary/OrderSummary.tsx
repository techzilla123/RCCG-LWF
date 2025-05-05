import React from 'react';

export const OrderSummary: React.FC = () => {
  return (
    <section className="flex flex-col gap-4 p-6 w-full rounded-lg bg-stone-50">
      <div className="flex justify-between w-full">
        <span className="text-base text-neutral-500 max-md:text-sm max-sm:text-xs">Items:</span>
        <span className="text-base text-black max-md:text-sm max-sm:text-xs">3</span>
      </div>
      <div className="flex justify-between w-full">
        <span className="text-base text-neutral-500 max-md:text-sm max-sm:text-xs">Total Amount:</span>
        <span className="text-base text-black max-md:text-sm max-sm:text-xs">$605.00</span>
      </div>
      <hr className="w-full h-px bg-gray-200 border-0" />
      <div className="flex justify-between w-full">
        <span className="text-base text-neutral-500 max-md:text-sm max-sm:text-xs">Transaction date:</span>
        <span className="text-base text-black max-md:text-sm max-sm:text-xs">03-05-2025, 10:11</span>
      </div>
      <div className="flex justify-between w-full">
        <span className="text-base text-neutral-500 max-md:text-sm max-sm:text-xs">Delivered:</span>
        <span className="text-base text-black max-md:text-sm max-sm:text-xs">13-05-2025, 16:22</span>
      </div>
      <div className="flex justify-between w-full">
        <span className="text-base text-neutral-500 max-md:text-sm max-sm:text-xs">Order ID:</span>
        <div className="flex gap-2 items-center">
          <span className="text-base text-black max-md:text-sm max-sm:text-xs">DEC-8492DK201</span>
          <button aria-label="Copy order ID">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.33366 7.52484V9.97484C9.33366 12.0165 8.51699 12.8332 6.47533 12.8332H4.02533C1.98366 12.8332 1.16699 12.0165 1.16699 9.97484V7.52484C1.16699 5.48317 1.98366 4.6665 4.02533 4.6665H6.47533C8.51699 4.6665 9.33366 5.48317 9.33366 7.52484Z" stroke="#007AFF" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.8337 4.02484V6.47484C12.8337 8.5165 12.017 9.33317 9.97533 9.33317H9.33366V7.52484C9.33366 5.48317 8.51699 4.6665 6.47533 4.6665H4.66699V4.02484C4.66699 1.98317 5.48366 1.1665 7.52533 1.1665H9.97533C12.017 1.1665 12.8337 1.98317 12.8337 4.02484Z" stroke="#007AFF" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};