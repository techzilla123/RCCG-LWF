"use client";
import React, { useState, useRef, useEffect } from "react";
import Script from "next/script";

//
// 1️⃣ Define Fully Typed PayPal Interfaces
//
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

//
// 2️⃣ Component
//
const PayWithCard: React.FC = () => {
  const [showPayPalModal, setShowPayPalModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [showButton, setShowButton] = useState(false);
  const paypalRef = useRef<HTMLDivElement>(null);

  // Initialize PayPal Buttons when amount is ready
  useEffect(() => {
    if (!showButton || !window.paypal) return;

    const paypal = window.paypal;

    paypal
      .Buttons({
        createOrder: (_data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: amount },
                description: "Church Offering",
              },
            ],
          });
        },

        onApprove: async (_data, actions) => {
          const details = await actions.order.capture();
          console.log("PAYMENT DETAILS:", details);

          alert("Offering received! Thank you ❤️");

          // Reset UI
          setShowPayPalModal(false);
          setShowButton(false);
          setAmount("");
        },

        onError: (err: Error) => {
          console.error("PayPal Error:", err);
          alert("Unable to process payment. Please try again.");
        },
      })
      .render(paypalRef.current);
  }, [showButton, amount]);

  return (
    <>
      {/* 1️⃣ Load PayPal SDK dynamically using your client ID */}
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`}
        strategy="afterInteractive"
      />

      {/* PAY WITH CARD SECTION */}
     <section className="flex flex-col gap-4 items-center p-5 bg-teal-100 rounded-3xl w-full max-md:p-4">
  <h2 className="text-xl font-bold text-slate-900 text-center">
    Pay With Stripe{" "}
    <span className="block md:inline">(Coming Soon)</span>
  </h2>

  <p className="text-sm text-neutral-600 text-center max-w-lg">
    We offer convenient and secure ways to make credit and debit card
    payments. Please select your preferred option below:
  </p>

  <div className="flex justify-center items-center w-full">
    <img
      src="https://api.builder.io/api/v1/image/assets/TEMP/3823fe909b5d03a41b0649bb089b0e076823e333?width=536"
      alt="Stripe"
      className="rounded-xl w-64 md:w-72 h-auto object-contain opacity-80 cursor-not-allowed"
      onClick={() => alert("Stripe payments coming soon!")}
    />
  </div>
</section>



      {/* PAYPAL MODAL */}
      {showPayPalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-3">Pay with PayPal</h2>

            <label className="text-sm text-gray-700">Enter Amount</label>
            <input
              type="number"
              className="w-full p-3 rounded-xl border border-gray-300 mt-1 mb-4"
              placeholder="Enter amount ($)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            {/* PayPal Button */}
            {showButton ? (
              <div ref={paypalRef} />
            ) : (
              <button
                onClick={() => {
                  if (!amount || Number(amount) <= 0) {
                    alert("Enter a valid amount.");
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
