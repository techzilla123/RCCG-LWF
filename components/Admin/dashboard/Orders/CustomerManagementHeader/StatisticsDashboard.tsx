"use client";

import React from 'react';
import { StatCard } from './StatCard';
import { ReceiptIcon } from './ReceiptIcon';
import { CheckCircleIcon } from './CheckCircleIcon';
import { InfoIcon } from './InfoIcon';
import { ReceiptXIcon } from './ReceiptXIcon';
import { CardsThreeIcon } from './CardsThreeIcon';

export const StatisticsDashboard: React.FC = () => {
  return (
    <section className="flex flex-wrap gap-6 items-start mt-8 max-md:gap-4 max-sm:flex-col max-sm:items-center">
      <StatCard
        icon={<ReceiptIcon />}
        value="350,000"
        label="Total Order"
      />
      <StatCard
        icon={<CheckCircleIcon />}
        value="104,930"
        label="Successful"
      />
      <StatCard
        icon={<InfoIcon />}
        value="290,064"
        label="Pending"
      />
      <StatCard
        icon={<ReceiptXIcon />}
        value="1190"
        label="Unsuccessful"
      />
      <StatCard
        icon={<CardsThreeIcon />}
        value="1190"
        label="Total Sales"
      />
    </section>
  );
};

export default StatisticsDashboard;