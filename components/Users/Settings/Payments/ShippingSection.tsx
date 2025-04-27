"use client";
import * as React from "react";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";

export function ShippingSection() {
  return (
    <section className="flex flex-col mt-12 w-full">
      <header className="flex flex-col pb-6 border-b border-gray-300">
      <h3 className="text-xl font-bold mb-2" style={{color: "#000000"}}>Shipping address</h3>
        <p className="mt-1 text-base text-neutral-500">
          Include a pickup location for shipping and delivery. Shipping fees may apply
        </p>
      </header>

     
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full">
        <FormSelect label="Country" value="USA" />
        <FormSelect label="State/province" optional placeholder="Choose option" />
        <FormSelect label="City" placeholder="Choose option" />
        <FormInput label="Postal code" placeholder="Add postal code" />
        <FormInput label="Address" placeholder="Add address" />

      </form>
      <div>
        <button
          type="submit"
          className="self-start mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
        >
          Save changes
        </button>
        </div>
    </section>
  );
}
