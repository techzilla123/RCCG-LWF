import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import crypto from "crypto-js";
import { useRouter } from "next/navigation";
import TransactionModal from "@/components/Client/popup";

function VerificationForm() {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(10); // Countdown timer set to 10 seconds initially
  const [showModal, setShowModal] = useState(false);
  const [authorizationUrl, setAuthorizationUrl] = useState(null); // New state for storing the authorization URL
  const [responseMessage, setResponseMessage] = useState(""); // State for error message

  // Refs for each input field
  const inputRefs = useRef([]);
  

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = verificationCode.join("");
    if (code.length === 6) {
      console.log("Submitted code:", code);

      // Retrieve email from localStorage
      const email = localStorage.getItem("userEmail"); // Updated to 'userEmail'

      // Check if email exists in localStorage
      if (!email) {
        console.log("Email not found in localStorage");
        return;
      }

      // Pre-request HMAC generation for headers
      const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY; // Secret key
      const nonce = Math.random().toString(36).substring(2); // Random nonce
      const timestamp = Date.now().toString(); // Current timestamp
      const method = "POST"; // HTTP method
      const message = `${method}:${nonce}:${timestamp}`; // Message format

      // Generate HMAC using crypto-js
      const generateHMAC = (message, secretKey) => {
        const hash = crypto.HmacSHA256(message, secretKey);
        return hash.toString(crypto.enc.Base64);
      };

      // Generate API Key
      const apiKey = generateHMAC(message, secretKey);

      // Data to send to the API
      const data = {
        token: code,
        email: email, // Include email from localStorage
      };

      try {
        // Post the data to API endpoint
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_VERIFY_URL, // API URL
          data,
          {
            headers: {
              "X-API-Key": apiKey,
              "X-Timestamp": timestamp,
              "X-Nonce": nonce,
              "Content-Type": "application/json", // Ensure the content type is set to JSON
            },
          }
        );

        console.log("Verification success:", response.data);

        // Check if the authorizationUrl is in the response and set it
        if (response.data.authorizationUrl) {
          setAuthorizationUrl(response.data.authorizationUrl); // Store the URL
        }

        setShowModal(true);
        setResponseMessage(""); // Clear any previous error message
      } catch (error) {
        console.log("Error during verification:", error);
        setResponseMessage(
          error.response?.data?.message || "An unknown error occurred."
        ); // Set exact error message from backend
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
          <h1
            className="text-4xl font-semibold text-green-900"
            style={{ color: "#005E1E" }}
          >
            Verify Your ID
          </h1>
          <p className="mt-3 text-base text-neutral-500 w-full md:w-[340px]">
            Input the 6-digit code sent to your email/phone
          </p>
        </div>

        {/* Verification Inputs Section */}
        <div
          className="flex flex-col justify-center mt-6 w-full text-6xl font-medium tracking-tighter leading-tight text-center whitespace-nowrap min-h-[96px] text-zinc-300 max-md:text-4xl"
          style={{ color: "#000000" }}
        >
          <div className="flex gap-3 items-center max-md:gap-2 max-md:justify-center">
            {verificationCode.map((digit, index) => (
              <div className="flex flex-col" key={index}>
                <input
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Backspace" &&
                      !digit &&
                      inputRefs.current[index - 1]
                    ) {
                      e.preventDefault();
                      inputRefs.current[index - 1]?.focus();
                    }
                  }}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-md border border-solid shadow-sm bg-neutral-100 focus:border-green-500 ${
                    responseMessage ? "border-red-500" : "border-zinc-300"
                  } text-center text-lg md:text-xl lg:text-2xl`}
                  aria-label="Verification code digit"
                />
              </div>
            ))}
          </div>
          {/* Display error message */}
          {responseMessage && (
            <p className="text-red-500 self-stretch text-sm mt-2 " style={{letterSpacing: '0.5px'}}>{responseMessage}</p>
          )}
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
              border: isResendDisabled
                ? "1px solid #D1D5DB"
                : "1px solid transparent",
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
      {showModal && <TransactionModal authorizationUrl={authorizationUrl} />}
    </div>
    
  );
}

export default VerificationForm;
