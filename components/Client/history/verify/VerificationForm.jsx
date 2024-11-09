"use client";

import React, { useState, useEffect } from "react";
import VerificationInput from "./VerificationInput";
import { useRouter } from "next/navigation"; // Import useRouter
import TransactionModal from "@/components/Client/history/popup"; // Import the modal

function VerificationForm() {
  const router = useRouter(); // Initialize useRouter
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(10); // Countdown timer set to 10 seconds initially
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Handle input change for the verification code
  const handleInputChange = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const code = verificationCode.join('');
    console.log("Submitted code:", code);

    // Show the transaction modal
    setShowModal(true);

    // Optionally, you can navigate after a delay or based on some condition
    setTimeout(() => {
      router.push("/client/history/verify/success");
    }, 3000); // Example delay of 3 seconds before navigation
  };

  // Countdown timer for the Resend Code button
  useEffect(() => {
    let countdown;
    if (isResendDisabled && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) {
      setIsResendDisabled(false);
      clearInterval(countdown);
    }

    return () => clearInterval(countdown);
  }, [timer, isResendDisabled]);

  // Handle Resend Code button click
  const handleResendCode = () => {
    router.push("/client");
  };

  return (
    <div
      className="flex flex-col items-center w-full max-md:w-full px-4"
      style={{ marginTop: "100px" }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-1 self-center max-w-full rounded-xl w-[420px] max-md:w-full"
      >
        {/* Header Section */}
        <div className="flex flex-col max-w-full w-[314px] max-md:w-full">
          <h1 className="text-4xl font-semibold text-green-900" style={{ color: "#005E1E" }}>
            Verify Your ID
          </h1>
          <p className="mt-3 text-base text-neutral-500 w-full md:w-[340px]">
            Input the 4-digit code sent to your email/phone
          </p>
        </div>

        {/* Verification Inputs Section */}
        <div
          className="flex flex-col justify-center mt-6 w-full text-6xl font-medium tracking-tighter leading-tight text-center whitespace-nowrap min-h-[96px] text-zinc-300 max-md:text-4xl"
          style={{ color: "#000000" }}
        >
          <div className="flex gap-3 items-center max-md:gap-2 max-md:justify-center">
            {[0, 1, 2, 3].map((index) => (
              <VerificationInput
                key={index}
                value={verificationCode[index]}
                onChange={(value) => handleInputChange(index, value)}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="flex flex-col mt-8 w-full text-sm font-medium text-center">
          <button
            type="submit"
            className="overflow-hidden gap-2 self-stretch px-4 py-3.5 w-full text-white bg-green-600 border border-transparent rounded-full hover:bg-green-700 transition-all duration-200"
            style={{ background: "#08AA3B" }}
          >
            Verify
          </button>

          {/* Resend Code Button with Navigation to /client */}
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isResendDisabled}
            style={{
              backgroundColor: isResendDisabled ? "transparent" : "#D3F9D8",
              color: isResendDisabled ? "#9CA3AF" : "#065F46",
              border: isResendDisabled ? "1px solid #D1D5DB" : "1px solid transparent",
              borderRadius: "9999px",
              padding: "14px",
              marginTop: "16px",
              cursor: isResendDisabled ? "not-allowed" : "pointer",
              width: "100%",
              transition: "background-color 0.3s ease",
            }}
          >
            {isResendDisabled ? `Resend Code in ${timer}s` : "Resend Code"}
          </button>
        </div>
      </form>

      {/* Transaction Modal */}
      {showModal && <TransactionModal />}
    </div>
  );
}

export default VerificationForm;
