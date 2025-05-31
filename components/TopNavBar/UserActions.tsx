"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { CartDropdown } from "./CartDropdown";
import { NotificationBadge } from "./NotificationBadge";
import { useRouter } from "next/navigation";
import { LoginModal } from "@/components/Offer/LoginModal";   // adjust path
import { SignUpModal } from "@/components/Offer/SignUpModal"; // adjust path
import { SuccessModal } from "@/components/Offer/SuccessModal"; // import your success modal

type ModalState = "none" | "login" | "signup" | "success";

export const UserActions = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [modalState, setModalState] = useState<ModalState>("none");

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);

    const handleTokenChange = () => {
      const updatedToken = localStorage.getItem("accessToken");
      setToken(updatedToken);
      if (updatedToken) {
        setModalState("none");
      }
    };

    window.addEventListener("accessTokenUpdated", handleTokenChange);
    return () => {
      window.removeEventListener("accessTokenUpdated", handleTokenChange);
    };
  }, []);

  const handleGoToWishlist = () => router.push("/wishlist");
  const handleGoToCart = () => router.push("/cart");
  const handleGoToSettings = () => router.push("/settings");

  const handleLoginSuccess = () => {
    setModalState("success");
  };

  return (
    <>
      <div className="flex gap-3 items-center">
        {/* Wishlist */}
        <div
          className="relative w-10 h-10 flex items-center justify-center cursor-pointer"
          onClick={handleGoToWishlist}
        >
          <Heart className="w-5 h-5 text-black" />
          <NotificationBadge count={1} />
        </div>

        {/* Cart */}
        <div className="cursor-pointer" onClick={handleGoToCart}>
          <CartDropdown />
        </div>

        {/* User Avatar or Sign In */}
        {token ? (
          <div className="w-7 h-7 cursor-pointer" onClick={handleGoToSettings}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/fb060f5627cc820a40e94ae5d1986afb624c42ee?placeholderIfAbsent=true"
              alt="User"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        ) : (
          <button
            onClick={() => setModalState("login")}
            className="
              px-3 py-1.5
              text-xs sm:text-sm
              bg-blue-600 hover:bg-blue-700
              text-white rounded-full
              transition
              min-w-[60px]
              flex justify-center items-center
            "
          >
            Log In
          </button>
        )}
      </div>

      {/* Login Modal */}
      {modalState === "login" && (
        <LoginModal
          onClose={() => setModalState("none")}
          onOpenSignUp={() => setModalState("signup")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Sign Up Modal */}
      {modalState === "signup" && (
        <SignUpModal
          onClose={() => setModalState("none")}
          onOpenLogin={() => setModalState("login")}
        />
      )}

      {/* Success Modal */}
      {modalState === "success" && (
        <SuccessModal
          onClose={() => setModalState("none")}
        />
      )}
    </>
  );
};
