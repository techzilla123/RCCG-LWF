import React from 'react';

interface OrderHeaderProps {
  orderId: string;
}

export const OrderHeader: React.FC<OrderHeaderProps> = ({ orderId }) => {
  return (
    <header className="flex flex-col items-start pb-4 w-full max-md:pb-3 max-sm:pb-2">
      <p className="text-base text-neutral-500">
        Order detail
      </p>
      <h1 className="text-3xl font-bold text-black max-md:text-3xl max-sm:text-2xl">
        {orderId}
      </h1>
    </header>
  );
};