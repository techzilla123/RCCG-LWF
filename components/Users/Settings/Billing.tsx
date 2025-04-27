"use client";
import * as React from "react";
import { BillingSection } from "./Payments/BillingSection";
import { ShippingSection } from "./Payments/ShippingSection";

export default function Billing() {
  return (
      <div className="bg-white w-full min-h-screen py-12">
        <div className="max-w-3xl bg-white mx-auto px-4">
      <BillingSection />
      <ShippingSection />
   </div></div>
  );
}
