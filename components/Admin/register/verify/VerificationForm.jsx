"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import TransactionModal from "@/components/Admin/register/popup"; // Import the modal
import HmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";
import CryptoJS from "crypto-js";

function VerificationForm() {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(300);
  const [showModal, setShowModal] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef([]);

  const generateHMAC = (message, secretKey) => {
    const hash = HmacSHA256(message, secretKey);
    return Base64.stringify(hash);
  };

  // Handle input change for the verification code
  const handleInputChange = (index, value) => {
    if (!/^\d$/.test(value) && value !== "") return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    setHasError(false); // Clear error state on input change

    if (value && index < verificationCode.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = verificationCode.join('');
    if (code.length === 6) {
      const email = localStorage.getItem('userEmail');
      const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
      const nonce = Math.random().toString(36).substring(2);
      const timestamp = Date.now().toString();
      const method = "POST";
      const message = `${method}:${nonce}:${timestamp}`;
      const apiKey = generateHMAC(message, secretKey);

      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const payload = { email, verificationCode: code };

      try {
        // Make the API call to verify the email
        const response = await fetch(`${apiBaseUrl}/verify/email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": apiKey,
            "X-Timestamp": timestamp,
            "X-Nonce": nonce,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          // Show the transaction modal and redirect after 3 seconds
          setShowModal(true);
          setTimeout(() => {
            router.push("/auth/register/verify/success");
          }, 3000);
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "Verification failed.");
          setHasError(true);
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setErrorMessage("Failed to connect to the server.");
        setHasError(true);
      }
    } else {
      setErrorMessage("Please enter the complete 6-digit code.");
      setHasError(true);
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
  
    // Function to format the time as MM:SS
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };

  const handleResendCode = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        alert("No email found. Please try again.");
        return;
      }
  
      // Get environment variables
      const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
      if (!secretKey) {
        console.error("Secret key is missing from environment variables.");
        return;
      }
  
      const apiUrl = `${process.env.NEXT_PUBLIC_API_HISTORY_URL}`;
  
      // Generate HMAC and headers
      const nonce = Math.random().toString(36).substring(2);
      const timestamp = Date.now().toString();
      const method = "POST";
      const message = `${method}:${nonce}:${timestamp}`;
      const hash = CryptoJS.HmacSHA256(message, secretKey);
      const apiKey = CryptoJS.enc.Base64.stringify(hash);
  
      // Create request headers
      const headers = {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
        "X-Timestamp": timestamp,
        "X-Nonce": nonce,
      };
  
      // Request body
      const body = JSON.stringify({
        email: email,
        regNo: "", // Ensure regNo is included as an empty string
      });
  
      // Make the API call
      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body,
      });
  
      if (response.ok) {
        alert("Verification code resent successfully!");
        setTimer(10);
        setIsResendDisabled(true);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to resend code.");
      }
    } catch (err) {
      alert("Failed to connect to the server.");
      console.error("Error resending verification code:", err);
    }
  };
  

  return (
    <div className="flex flex-col items-center w-full max-md:w-full px-4" style={{ marginTop: "100px" }}>
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 self-center max-w-full rounded-xl w-[420px] max-md:w-full">
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
                  className={`w-full h-12 px-2 py-3 border border-solid shadow-sm bg-neutral-100 rounded-lg text-center text-2xl max-md:text-xl ${hasError ? "border-red-500" : "border-zinc-300"}`}
                  style={{ maxWidth: "60px", height: "70px", borderRadius: "8px" }}
                  aria-label="Verification code digit"
                />
              </div>
            ))}
          </div>
          {hasError && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
        </div>

        {/* Action Buttons Section */}
        <div className="flex flex-col mt-8 w-full text-sm font-medium text-center">
          <button
            type="submit"
            className="overflow-hidden gap-2 self-stretch px-4 py-3.5 w-full text-white bg-green-600 border border-transparent rounded-full hover:bg-green-700 transition-all duration-200"
            style={{ background: "#08AA3B" }}
            disabled={verificationCode.some((digit) => digit === '')} // Disable the button until the code is complete
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
            {isResendDisabled ? `Resend Code in ${formatTime(timer)}s` : "Resend Code"}
          </button>
        </div>
      </form>

      {/* Transaction Modal */}
      {showModal && <TransactionModal />}
    </div>
  );
}

export default VerificationForm;
