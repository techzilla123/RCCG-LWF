"use client";

import React, { useState, useEffect } from "react";
import VerificationInput from "./VerificationInput";
import { useRouter } from "next/navigation";
import TransactionModal from "@/components/Client/popup";

function VerificationForm() {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(10); // Countdown timer set to 10 seconds initially
  const [showModal, setShowModal] = useState(false);

  // Handle input change for the verification code
  const handleInputChange = (index, value) => {
    if (!/^\d$/.test(value) && value !== "") return; // Only allow single digits or empty value

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Automatically move to the next input if a valid digit is entered
    if (value && index < verificationCode.length - 1) {
      const nextInput = document.getElementById(`input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Move back if cleared
    if (!value && index > 0) {
      const prevInput = document.getElementById(`input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Ensure the user cannot focus on random input fields
  const handleInputFocus = (index) => {
    // Prevent skipping inputs by ensuring all previous inputs are filled
    for (let i = 0; i < index; i++) {
      if (verificationCode[i] === "") {
        const firstEmptyInput = document.getElementById(`input-${i}`);
        if (firstEmptyInput) firstEmptyInput.focus();
        return;
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const code = verificationCode.join("");
    if (code.length === 4) {
      console.log("Submitted code:", code);

      setShowModal(true);

      setTimeout(() => {
        router.push("/client/verify/success");
      }, 3000);
    }
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
            {verificationCode.map((digit, index) => (
              <VerificationInput
                key={index}
                id={`input-${index}`}
                value={digit}
                onChange={(value) => handleInputChange(index, value)}
                onFocus={() => handleInputFocus(index)} // Prevent skipping inputs
              />
            ))}
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="flex flex-col mt-8 w-full text-sm font-medium text-center">
          <button
            type="submit"
            className="overflow-hidden gap-2 self-stretch px-4 py-3.5 w-full text-white bg-green-600 border border-transparent rounded-full hover:bg-green-700 transition-all duration-200"
            style={{
              background: "#08AA3B",
              cursor: verificationCode.includes("") ? "not-allowed" : "pointer",
              opacity: verificationCode.includes("") ? 0.7 : 1,
            }}
            disabled={verificationCode.includes("")} // Disable if any input is empty
          >
            Verify
          </button>

          {/* Resend Code Button */}
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
