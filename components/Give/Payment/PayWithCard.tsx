"use client";
import React, { useState, useRef, useEffect } from "react";
import Script from "next/script";

/* ---------------------------------- */
/* PAYPAL TYPES */
/* ---------------------------------- */
interface PayPalPurchaseUnit {
  amount: { value: string };
  description: string;
}

interface PayPalOrderCreateRequest {
  purchase_units: PayPalPurchaseUnit[];
}

interface PayPalActions {
  order: {
    create: (data: PayPalOrderCreateRequest) => Promise<string>;
    capture: () => Promise<PayPalCaptureResult>;
  };
}

interface PayPalCaptureResult {
  id?: string;
  status?: string;
  payer?: {
    name?: { given_name?: string; surname?: string };
    email_address?: string;
  };
}

interface PayPalButtonsRender {
  render: (element: HTMLElement | null) => void;
}

interface PayPalButtonsConfig {
  createOrder: (data: {}, actions: PayPalActions) => Promise<string>;
  onApprove: (data: {}, actions: PayPalActions) => Promise<void>;
  onError: (err: Error) => void;
}

interface PayPalNamespace {
  Buttons: (config: PayPalButtonsConfig) => PayPalButtonsRender;
}

declare global {
  interface Window {
    paypal?: PayPalNamespace;
  }
}

/* ---------------------------------- */
/* COMPONENT */
/* ---------------------------------- */
const PayWithCard: React.FC = () => {
  const [showPayPalModal, setShowPayPalModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [offeringType, setOfferingType] = useState("Offering");
  const [showButton, setShowButton] = useState(false);
  const paypalRef = useRef<HTMLDivElement>(null);

  /* ---------------------------------- */
  /* INITIALIZE PAYPAL BUTTONS */
  /* ---------------------------------- */
  useEffect(() => {
    if (!showButton || !window.paypal || !paypalRef.current) return;

    paypalRef.current.innerHTML = ""; // prevent duplicate renders

    window.paypal
      .Buttons({
        createOrder: (_data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: amount },
                description: `Church ${offeringType}`,
              },
            ],
          });
        },

        onApprove: async (_data, actions) => {
          const details = await actions.order.capture();
          console.log("PAYMENT DETAILS:", details);

          if (details.status === "COMPLETED") {
            alert(
              `${offeringType} received! Thank you ${
                details.payer?.name?.given_name ?? ""
              } ❤️`
            );

            // Reset UI
            setShowPayPalModal(false);
            setShowButton(false);
            setAmount("");
            setOfferingType("Offering");
          } else {
            alert("Payment was not completed. Please try again.");
          }
        },

        onError: (err: Error) => {
          console.error("PayPal Error:", err);
          alert("Unable to process payment. Please try again.");
        },
      })
      .render(paypalRef.current);
  }, [showButton, amount, offeringType]);

  return (
    <>
      {/* PAYPAL SDK */}
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`}
        strategy="afterInteractive"
      />

      {/* PAY WITH PAYPAL SECTION */}
      <section className="flex flex-col gap-6 items-start p-8 bg-teal-100 rounded-3xl w-full max-md:p-6">
        <h2 className="text-2xl font-bold text-slate-900">Pay With PayPal</h2>

        <p className="text-base text-neutral-600">
         We offer convenient and secure ways to make credit and debit card payments. Please select your preferred option below:
        </p>

        <div className="flex justify-center items-center w-full">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/1898b4c2d5dd27c6a9345d848d5997b8254e4a6e?width=536"
            alt="PayPal"
            className="rounded-xl w-64 md:w-72 h-auto object-contain cursor-pointer hover:scale-105 transition"
            onClick={() => setShowPayPalModal(true)}
          />
        </div>
      </section>

      {/* PAYPAL MODAL */}
      {showPayPalModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">Pay with PayPal</h2>

            {/* OFFERING TYPE */}
            <label className="text-sm text-gray-700 mb-1 block">
              Offering Type
            </label>
            <select
              value={offeringType}
              onChange={(e) => setOfferingType(e.target.value)}
              className="w-full p-3 rounded-xl border mb-4"
            >
              <option value="Offering">Offering</option>
              <option value="Tithe">Tithe</option>
              <option value="Seed">Seed</option>
              <option value="Thanksgiving">Thanksgiving</option>
              <option value="Donation">Donation</option>
            </select>

            {/* AMOUNT */}
            <label className="text-sm text-gray-700 mb-1 block">
              Enter Amount (USD)
            </label>
            <input
              type="number"
              className="w-full p-3 rounded-xl border mb-4"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            {/* PAYPAL BUTTON */}
            {showButton ? (
              <div ref={paypalRef} />
            ) : (
              <button
                onClick={() => {
                  if (!amount || Number(amount) <= 0) {
                    alert("Please enter a valid amount.");
                    return;
                  }
                  setShowButton(true);
                }}
                className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
              >
                Continue to PayPal
              </button>
            )}

            <button
              onClick={() => {
                setShowPayPalModal(false);
                setShowButton(false);
                setAmount("");
                setOfferingType("Offering");
              }}
              className="mt-4 w-full text-center text-red-600 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PayWithCard;
