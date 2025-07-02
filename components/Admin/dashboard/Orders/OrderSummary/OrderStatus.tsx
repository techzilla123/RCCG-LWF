import React from 'react';
import { StatusIcon } from './StatusIcon';

interface OrderStatusProps {
  status: string | null;
}

export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
  const getIconType = (step: 'start' | 'middle' | 'end') => {
    if (!status) return 'pending';

    
    switch (status.toLowerCase()) {
      case 'pending':
        return step === 'start' ? 'pending' : 'inactive';
      case 'success':
      case 'delivered':
        return 'success';
      case 'cancelled':
        return step === 'start' ? 'cancelled' : 'inactive';
      default:
        return 'pending';
    }
  };

 const getMiddleOuterBgColor = () => {
  switch (status?.toLowerCase()) {
    case 'approved':
    case 'delivered':
      return 'bg-green';
    case 'in_progress':
      return 'bg-blue-400';
    case 'shipped':
      return 'bg-purple-400';
    case 'cancelled':
      return 'bg-red-400';
    case 'pending':
      return 'bg-orange-400';
    case 'returned':
      return 'bg-stone-400';
    case 'rejected':
      return 'bg-red-700';
    default:
      return 'bg-gray-200';
  }
};

const getMiddleInnerBgColor = () => {
  switch (status?.toLowerCase()) {
    case 'approved':
    case 'delivered':
      return 'bg-green';
    case 'in_progress':
      return 'bg-blue-400';
    case 'shipped':
      return 'bg-purple-400';
    case 'cancelled':
      return 'bg-red-400'; // Could use 'bg-red-500' if you prefer stronger contrast
    case 'pending':
      return 'bg-orange-400';
    case 'returned':
      return 'bg-stone-400';
    case 'rejected':
      return 'bg-red-700';
    default:
      return 'bg-gray-300';
  }
};

  return (
    <section className="flex items-center px-0 py-1.5 w-full">
      <StatusIcon type={getIconType('start')} />
      <div className="flex-1 h-px bg-gray-200" />

      <div className={`flex justify-center items-center w-10 h-10 ${getMiddleOuterBgColor()} rounded-full`}>
        <div className={`flex justify-center items-center ${getMiddleInnerBgColor()} rounded-full h-[25px] w-[25px]`}>
          <StatusIcon type={getIconType('middle')} />
        </div>
      </div>

      <div className="flex-1 h-px bg-gray-200" />
      <StatusIcon type={getIconType('end')} />
    </section>
  );
};
