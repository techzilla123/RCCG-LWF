"use client";
import * as React from "react";
import { SuccessIcon } from "./SuccessIcon";
import { InvoiceDetails } from "./InvoiceDetails";
import { ActionButton } from "./ActionButton";

function Content() {
  return (
    <main className="flex flex-col py-10 max-w-[539px]">
      <SuccessIcon />

      <section className="flex flex-col items-center self-center mt-6 text-center max-md:max-w-full">
        <h1 className="text-4xl text-black max-md:max-w-full">
          Payment successful!
        </h1>
        <p className="mt-2 text-xl tracking-normal leading-8 text-neutral-500 max-md:max-w-full">
          Your order has been confirmed and payment successful.{" "}
        </p>
      </section>

      <InvoiceDetails />
      <ActionButton />
    </main>
  );
}

export default Content;
