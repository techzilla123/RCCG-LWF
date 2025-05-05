"use client";

import React from 'react';
import { OrderHeader } from './OrderHeader';
import { OrderStatus } from './OrderStatus';
import { OrderItems } from './OrderItems';
import { OrderSummary } from './OrderSummary';

type Props = {
  onClose: () => void;
};

const OrderDetails: React.FC<Props> = ({ onClose }) => {
  return (
    <article className="flex flex-col items-center p-10 bg-white rounded-2xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] w-[575px] max-md:p-5 max-md:w-full max-sm:p-4 relative">
      <OrderHeader orderId="ORD-9284FHT7" />
      <OrderStatus />
      <h2 className="text-xl text-black max-md:text-lg max-sm:text-base">
        Successful
      </h2>
      <OrderItems />
      <OrderSummary />
      
      <button
        onClick={onClose}
        className="absolute top-4 right-4 flex justify-center items-center w-10 h-10 max-sm:top-2 max-sm:right-2 max-sm:w-8 max-sm:h-8"
        aria-label="Close"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.333 26.6668L26.6663 13.3335"
            stroke="#717171"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.3337 13.3335L26.667 26.6668"
            stroke="#717171"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </article>
  );
};

export default OrderDetails;
