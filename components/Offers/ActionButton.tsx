"use client";

import * as React from "react";
import { SignUpModal } from "@/components/Offer/SignUpModal";
import { LoginModal } from "@/components/Offer/LoginModal";
import { SuccessModal } from "@/components/Offer/SuccessModal";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ children, onClick }) => {
  const [modalType, setModalType] = React.useState<"signup" | "login" | "success" | null>(null);

  const handleClose = () => {
    setModalType(null);
  };

  const handleLoginSuccess = () => {
    setModalType("success");
  };

  return (
    <>
      <button
  onClick={() => {
    onClick?.();
    setModalType("signup");
  }}
  className="mt-[-18px] md:mt-0 w-[120px] h-[40px] px-4 py-2 text-sm md:w-[180px] md:h-[64px] md:px-8 md:py-4 md:text-xl z-10 bg-black text-white rounded-[50px] tracking-normal leading-8 hover:bg-gray-900 transition-colors duration-200"
>
  {children}
</button>

      {/* Show modals based on modalType */}
      {modalType === "signup" && (
        <SignUpModal 
          onClose={handleClose} 
          onOpenLogin={() => setModalType("login")} 
        />
      )}

      {modalType === "login" && (
        <LoginModal 
          onClose={handleClose} 
          onOpenSignUp={() => setModalType("signup")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {modalType === "success" && (
        <SuccessModal 
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default ActionButton;
