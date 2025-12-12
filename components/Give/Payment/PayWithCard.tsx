"use client";
import React, { useState, useRef, useEffect } from "react";

declare global {
  interface Window {
    paypal: any;
  }
}

const PayWithCard: React.FC = () => {
  const [showPayPalModal, setShowPayPalModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [showButton, setShowButton] = useState(false);
  const paypalRef = useRef<HTMLDivElement>(null);

  // Load PayPal Button when amount is ready
  useEffect(() => {
    if (!showButton || !window.paypal) return;

    window.paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: { value: amount },
              description: "Church Offering",
            },
          ],
        });
      },

      onApprove: async (data: any, actions: any) => {
        const details = await actions.order.capture();
        alert("Offering received! Thank you ❤️");
        console.log(details);

        // close modal after payment
        setShowPayPalModal(false);
        setShowButton(false);
        setAmount("");
      },

      onError: (err: any) => {
        console.error(err);
        alert("Something went wrong. Try again.");
      },
    }).render(paypalRef.current);
  }, [showButton]);

  return (
    <>
      {/* PAY WITH CARD SECTION */}
      <section className="flex flex-col gap-6 items-start p-8 bg-teal-100 rounded-3xl w-full h-auto max-md:p-6">
        <h2 className="text-2xl font-bold text-slate-900">Pay With Card</h2>
        <p className="text-base text-neutral-600">
          We offer convenient and secure ways to make credit and debit card
          payments. Please select your preferred option below:
        </p>

        <div className="flex flex-row flex-wrap md:flex-nowrap justify-between items-center gap-8 w-full">
          {/* Stripe Image */}
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/3823fe909b5d03a41b0649bb089b0e076823e333?width=536"
            alt="Stripe"
            className="rounded-xl w-full md:w-1/2 h-auto object-contain transition-transform duration-300 hover:scale-105 cursor-pointer"
          />

          {/* PayPal Image */}
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/1898b4c2d5dd27c6a9345d848d5997b8254e4a6e?width=536"
            alt="PayPal"
            className="rounded-xl w-full md:w-1/2 h-auto object-contain transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => setShowPayPalModal(true)}
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

            {/* Show PayPal Button */}
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
