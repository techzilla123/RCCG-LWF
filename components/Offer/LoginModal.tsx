import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc"; 
import { FaLock, FaEnvelope } from "react-icons/fa6";
import { ForgotPasswordModal } from "./ForgotPasswordModal"; // Import the modal

interface LoginModalProps {
  onClose: () => void;
  onOpenSignUp: () => void;
  onLoginSuccess?: () => void; // <-- make it optional
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onOpenSignUp, onLoginSuccess }) => {
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [email, setEmail] = useState<string>("");  // Manage email state
  const [password, setPassword] = useState<string>("");  // Manage password state
  const [isLoading, setIsLoading] = useState<boolean>(false);  // Manage loading state

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed, please try again.");
    }

    const result = await response.json();
    const token = `Bearer ${result.data.token}`;

    // Save token
    localStorage.setItem("accessToken", token);

    // Save firstname and lastname
    const userData = result.data.data; // ✅ this is the inner data object
    localStorage.setItem("firstname", userData.firstname);
    localStorage.setItem("lastname", userData.lastname);

    // Trigger success callback or close modal
    if (onLoginSuccess) {
      onLoginSuccess();
    } else {
      onClose();
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Login failed, please try again.");
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

          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-black/80">Login</h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Welcome back! Login to continue your shopping adventure
          </p>

          <div className="flex flex-col gap-3 mb-6">
            <button className="flex items-center text-black/80 justify-center gap-3 p-3 border rounded-full hover:bg-gray-50 transition text-sm font-medium">
              <FcGoogle size={20} />
              Continue with Google
            </button>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="text-gray-400 text-xs">OR</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
              />
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            </div>

            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
              />
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`p-3 mt-2 ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-full text-sm font-semibold transition`}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
            <span>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={onOpenSignUp}
                className="text-blue-600 hover:underline"
              >
                Create one
              </button>
            </span>
           <button
  type="button"
  onClick={() => setShowForgotModal(true)}
  className="text-blue-600 hover:underline"
>
  Forgot password
</button>

          </div>
          {showForgotModal && (
  <ForgotPasswordModal onClose={() => setShowForgotModal(false)} />
)}
        </div>
      </div>
    </div>
  );
};
