"use client";

import React, { useState, useCallback } from "react";
import { BackButton } from "./Verify/BackButton";
import { VerificationInput } from "./Verify/VerificationInput";
import { ActionButtons } from "./Verify/ActionButtons";

export const VerifyEmail: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(""));

  const handleVerify = () => {
    const code = verificationCode.join("");
    console.log("Verifying code:", code);
  };

  const handleResendAction = useCallback(() => {
    console.log("Resending code");
    setVerificationCode(Array(6).fill(""));  // Reset verification code after resend
  }, []);  // Empty dependency array to keep the function stable

  return (
    <main className="flex flex-col justify-center items-center px-0 py-10 mx-auto w-full max-w-none h-screen bg-neutral-100 max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <BackButton />
      <section className="flex flex-col items-center p-10 bg-white rounded-3xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] w-[560px] max-md:p-8 max-md:w-[90%] max-sm:p-5 max-sm:w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fbfd1da09655196d9881ba5ab41c970b85f1b8e0?placeholderIfAbsent=true"
          alt="Logo"
          className="w-20 h-[60px]"
        />
        <header className="flex flex-col items-center mb-6 text-center">
          <h1 className="text-4xl text-black max-sm:text-3xl">Verify email</h1>
          <p className="text-sm text-neutral-500 max-sm:text-xs">
            Enter the 6 digit code sent to
            <span className="text-black"> johndoe@email.com</span>
          </p>
        </header>
        <div className="flex flex-col items-center w-[480px] max-md:w-full max-sm:w-full">
          <VerificationInput
            value={verificationCode}
            onChangeAction={setVerificationCode}  // Ensure the name is 'onChangeAction'
          />
          <ActionButtons
            onVerifyAction={handleVerify}
            onResendAction={handleResendAction}  // Renamed to onResendAction
            isVerifyEnabled={verificationCode.every((digit) => digit !== "")}
          />
        </div>
      </section>
    </main>
  );
};

export default VerifyEmail;
