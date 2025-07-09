import * as React from "react";
import { SignUpModal } from "./SignUpModal";
import { LoginModal } from "./LoginModal";
import { SuccessModal } from "./SuccessModal";

export const SignUpLink: React.FC = () => {
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
        className="text-sm font-semibold underline hover:text-black/80 transition"
        onClick={() => setModalType("signup")}
      >
        Sign up
      </button>
      

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
