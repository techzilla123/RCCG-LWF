import React from 'react';
import { StatusIcon } from './StatusIcon';

export const OrderStatus: React.FC = () => {
  return (
    <section className="flex items-center px-0 py-1.5 w-full">
      <StatusIcon type="pending" />
      <div className="flex-1 h-px bg-gray-200" />
      <div className="flex justify-center items-center w-10 h-10 bg-green-100 rounded-full">
        <div className="flex justify-center items-center bg-white rounded-full h-[25px] w-[25px]">
          <StatusIcon type="success" />
        </div>
      </div>
      <div className="flex-1 h-px bg-gray-200" />
      <StatusIcon type="pending" />
    </section>
  );
};