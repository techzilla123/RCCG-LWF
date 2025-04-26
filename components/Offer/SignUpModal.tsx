import * as React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaXTwitter, FaLock, FaEnvelope } from "react-icons/fa6";

interface SignUpModalProps {
  onClose: () => void;
  onOpenLogin: () => void;
}

export const SignUpModal: React.FC<SignUpModalProps> = ({ onClose, onOpenLogin }) => {
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

          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">Sign up</h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Great start! Create your account to get better shopping experience
          </p>

          <div className="flex flex-col gap-3 mb-6">
            <button className="flex items-center justify-center gap-3 p-3 border rounded-full hover:bg-gray-50 transition text-sm font-medium">
              <FcGoogle size={20} />
              Continue with Google
            </button>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="text-gray-400 text-xs">OR</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <form className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <input
                type="text"
                placeholder="First name"
                className="flex-1 min-w-0 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
              />
              <input
                type="text"
                placeholder="Last name"
                className="flex-1 min-w-0 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
              />
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
              />
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
              />
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            </div>
            <button
              type="submit"
              className="p-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition"
            >
              Create account
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <button 
              type="button" 
              onClick={onOpenLogin}
              className="text-blue-600 hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
