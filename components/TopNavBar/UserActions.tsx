"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { CartDropdown } from "./CartDropdown";
import { NotificationBadge } from "./NotificationBadge";
import { useRouter } from "next/navigation";
import { LoginModal } from "@/components/Offer/LoginModal";
import { SignUpModal } from "@/components/Offer/SignUpModal";
import { SuccessModal } from "@/components/Offer/SuccessModal";

type ModalState = "none" | "login" | "signup" | "success";

export const UserActions = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [modalState, setModalState] = useState<ModalState>("none");

  // ✅ NEW STATE for profile
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [initials, setInitials] = useState<string>("");

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

  // ✅ Fetch profile on token change
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      if (!token || !baseUrl) return;

      try {
        const res = await fetch(`${baseUrl}customer/account/profile-details`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            Authorization: token,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const json = await res.json();
        const data = json.data;

        if (data?.profile_picture) {
          setProfileImage(data.profile_picture);
        } else {
          const first = data?.firstname?.[0] || "";
          const last = data?.lastname?.[0] || "";
          setInitials((first + last).toUpperCase());
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, [token]);

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
          <div
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-300 text-xs font-semibold text-white overflow-hidden cursor-pointer"
            onClick={handleGoToSettings}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="User"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              initials || "?"
            )}
          </div>
        ) : (
          <button
            onClick={() => setModalState("login")}
            className="px-3 py-1.5 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-full transition min-w-[60px] flex justify-center items-center"
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
        <SuccessModal onClose={() => setModalState("none")} />
      )}
    </>
  );
};
