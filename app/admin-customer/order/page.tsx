// app/admin-customer/order/page.tsx
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/auth/Footer";

// Dynamically import the Order component with SSR disabled (client component)
const Order = dynamic(
  () => import("@/components/Admin/dashboard/CustomerContent/CustomerOrder/Order"),
  { ssr: false }
);

export default function MainPage() {
  return (
    <div className="">
      <Suspense fallback={<div>Loading order section...</div>}>
        <Order />
      </Suspense>
      <Footer />
    </div>
  );
}
