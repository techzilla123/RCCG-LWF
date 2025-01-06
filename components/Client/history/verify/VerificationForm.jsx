"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import TransactionModal from "@/components/Client/popup";
import HmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";

function VerificationForm() {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(10); // Countdown timer set to 10 seconds initially
  const [showModal, setShowModal] = useState(false);

  // Refs for each input field
  const inputRefs = useRef([]);

  // Helper function to generate HMAC for API key
  const generateHMAC = (message, secretKey) => {
    const hash = HmacSHA256(message, secretKey);
    return Base64.stringify(hash);
  };

  // Handle input change for the verification code
  const handleInputChange = (index, value) => {
    if (!/^\d$/.test(value) && value !== "") return; // Only allow single digits or empty value

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Automatically move to the next input if a valid digit is entered
    if (value && index < verificationCode.length - 1) {
      inputRefs.current[index + 1]?.focus(); // Focus the next input
    }

    // Move back if cleared
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Focus the previous input if cleared
    }
  };

  // Handle form submission
  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  const code = verificationCode.join("");
  if (code.length === 6) {
    // Retrieve email from localStorage
    const email = localStorage.getItem("userEmail"); // Default email if not set

    // API request details
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY; // Replace with your actual secret key
    const nonce = Math.random().toString(36).substring(2); // Random nonce
    const timestamp = Date.now().toString(); // Current timestamp
    const method = "GET"; // HTTP method
    const message = `${method}:${nonce}:${timestamp}`; // Message to hash
    const apiKey = generateHMAC(message, secretKey); // Generate API Key

    const url = process.env.NEXT_PUBLIC_HISTORY_API_BASE_URL;
    const params = new URLSearchParams({
      token: code,
      page: "1",
      perPage: "50",
      email: email,
      regNo: "null",
    });

    try {
      setShowModal(true); // Show modal before processing

      // Send request to the server
      const response = await fetch(`${url}?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
          "X-Timestamp": timestamp,
          "X-Nonce": nonce,
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Verification successful:", result);

        // Save the response in localStorage
        localStorage.setItem("verificationResult", JSON.stringify(result)); // Save to localStorage

        // Navigate to success page after delay
        setTimeout(() => {
          router.push("/client/history/verify/success");
        }, 3000);
      } else {
        console.log("Verification failed:", response.statusText);
        setShowModal(false); // Hide modal on error
      }
    } catch (error) {
      console.log("An error occurred:", error);
      setShowModal(false); // Hide modal on error
    }
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
    router.push("/client/history");
  };

  return (
    <div className="flex flex-col items-center w-full max-md:w-full px-4" style={{ marginTop: "100px" }}>
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
            Input the 6-digit code sent to your email/phone
          </p>
        </div>

        {/* Verification Inputs Section */}
        <div className="flex flex-col justify-center mt-6 w-full text-lg font-medium tracking-tighter leading-tight text-center text-zinc-800">
          <div className="flex gap-3 items-center max-md:gap-2 max-md:justify-center">
            {verificationCode.map((digit, index) => (
              <div className="flex flex-col w-full max-w-[60px] max-md:max-w-[50px]" key={index}>
                <input
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-full h-12 px-2 py-3 border border-solid shadow-sm bg-neutral-100 border-zinc-300 rounded-lg text-center text-2xl max-md:text-xl"
                  style={{
                    maxWidth: "60px",
                    height: "70px",
                    borderRadius: "8px",
                  }}
                  aria-label="Verification code digit"
                />
              </div>
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
