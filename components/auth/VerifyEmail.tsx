"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { BackButton } from "./Verify/BackButton";
import { VerificationInput } from "./Verify/VerificationInput";
import { ActionButtons } from "./Verify/ActionButtons";
import { Eye, EyeOff } from "lucide-react";

export const VerifyEmail: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const router = useRouter();

  const handleVerify = async () => {
    const code = verificationCode.join("");
    if (!code || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        },
        body: JSON.stringify({
          code,
          password,
          password_confirmation: confirmPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password.");
      }

      // Show success modal
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error(error);
      alert("Error: Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendAction = useCallback(() => {
    console.log("Resending code...");
    setVerificationCode(Array(6).fill(""));
  }, []);

  const handleLoginRedirect = () => {
    router.push("/auth-login");
  };

  return (
    <main className="flex flex-col justify-center items-center px-0 py-10 mx-auto w-full max-w-none h-screen bg-neutral-100 max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <BackButton />
      <section className="flex flex-col items-center p-10 bg-white rounded-3xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] w-[560px] max-md:p-8 max-md:w-[90%] max-sm:p-5 max-sm:w-full">
        <header className="flex flex-col items-center mb-6 text-center">
          <h1 className="text-4xl text-black max-sm:text-3xl">Reset Password</h1>
          <p className="text-sm text-neutral-500 max-sm:text-xs">
            Enter the 6 digit code and set your new password.
          </p>
        </header>

        <div className="flex flex-col items-center w-[480px] max-md:w-full max-sm:w-full">
          <VerificationInput
            value={verificationCode}
            onChangeAction={setVerificationCode}
          />

          {/* New Password */}
          <div className="w-full my-2 relative">
            <label htmlFor="new-password" className="block text-sm font-medium text-neutral-600 mb-1">
              New Password
            </label>
            <input
              id="new-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[37px] right-3 text-neutral-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="w-full mb-2 relative">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-neutral-600 mb-1">
              Confirm New Password
            </label>
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your new password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-[37px] right-3 text-neutral-500"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <ActionButtons
            onVerifyAction={handleVerify}
            onResendAction={handleResendAction}
            isVerifyEnabled={
              verificationCode.every((digit) => digit !== "") &&
              password !== "" &&
              confirmPassword !== ""
            }
            isLoading={isLoading}
          />
        </div>
      </section>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[300px] text-center">
            <h2 className="text-xl font-semibold mb-2">Success!</h2>
            <p className="text-sm text-neutral-600 mb-4">Your password has been reset successfully.</p>
            <button
              onClick={handleLoginRedirect}
              className="w-full bg-black text-white rounded-md py-2 hover:bg-neutral-800 transition"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default VerifyEmail;
