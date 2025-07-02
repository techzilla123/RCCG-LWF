import React, { useState } from "react";
import { FaEnvelope, FaKey, FaLock } from "react-icons/fa6";

interface ForgotPasswordModalProps {
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error("Failed to send reset code.");
      }
      alert("Verification code sent to your email.");
      setStep(2);
    } catch (error) {
      console.error(error);
      alert("Error: Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
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
      alert("Password updated! You can now log in.");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error: Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-fadeIn max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <div className="relative flex-1 overflow-y-auto p-6 sm:p-8">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-black transition text-2xl"
            onClick={onClose}
          >
            ✕
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-black/80">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h2>

          <form onSubmit={step === 1 ? handleNext : handleReset} className="flex flex-col gap-4 mt-4">
            {step === 1 && (
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                />
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              </div>
            )}

            {step === 2 && (
              <>
                <div className="relative">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Verification code"
                    className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  />
                  <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                </div>

                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password"
                    className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  />
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                </div>

                <div className="relative">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  />
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`p-3 mt-2 ${
                isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white rounded-full text-sm font-semibold transition`}
            >
              {isLoading
                ? "Please wait..."
                : step === 1
                ? "Send Verification Code"
                : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
