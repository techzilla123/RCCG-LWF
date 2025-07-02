"use client";
import * as React from "react";
import { PaymentCard } from "./PaymentCard";

export function BillingSection() {
  return (
    <section className="flex flex-col w-full max-md:max-w-full">
      <header className="flex flex-col pb-6 border-b border-gray-300">
      <h3 className="text-xl font-bold mb-2" style={{color: "#000000"}}>Billing information</h3>
        <p className="mt-1 text-base text-neutral-500">
          Add billing information and easily choose from your saved billings when checking out
        </p>
      </header>

      <div className="flex flex-col gap-4 mt-6">
        <PaymentCard
          cardType="Mastercard"
          cardNumber="3450 **** **** 1234"
          holderName="John Doe"
        />
        <button className="self-start text-blue-600 font-medium hover:underline mt-2">
          Add payment method
        </button>
      </div>
    </section>
  );
}
