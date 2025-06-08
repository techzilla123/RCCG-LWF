// app/admin-customer/order/page.tsx
import React, { Suspense } from 'react';
import OrderWrapper from '@/components/Admin/dashboard/CustomerContent/CustomerOrder/OrderWrapper';
import Footer from '@/components/auth/Footer';

export default function MainPage() {
  return (
    <div className="">
      <Suspense fallback={<div>Loading order section...</div>}>
        <OrderWrapper />
      </Suspense>
      <Footer />
    </div>
  );
}
