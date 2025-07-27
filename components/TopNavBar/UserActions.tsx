"use client";
import React, { useState, useEffect, useRef } from "react";
import { Heart, ChevronDown } from "lucide-react";
import { LogOut, Settings, User } from "lucide-react";
import { NotificationBadge } from "./NotificationBadge";
import { CartDropdown } from "./CartDropdown";
import { useRouter } from "next/navigation";
import { LoginModal } from "@/components/Offer/LoginModal";
import { SignUpModal } from "@/components/Offer/SignUpModal";
import { SuccessModal } from "@/components/Offer/SuccessModal";


type ModalState = "none" | "login" | "signup" | "success";

export const UserActions = () => {
  const router = useRouter();
  const handleGoToSettings = () => router.push("/settings");
  const [token, setToken] = useState<string | null>(null);
  const [modalState, setModalState] = useState<ModalState>("none");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [initials, setInitials] = useState<string>("");
  const [wishlistCount, setWishlistCount] = useState(0);
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("accessToken") || "";
        if (token) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}customer/wish-list`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
              Authorization: token,
            },
          });

          const result = await response.json();
          const items = result?.data || [];
          setWishlistCount(items.length);
        } else {
          const localWishlist = localStorage.getItem("localWishlist");
          const items = localWishlist ? JSON.parse(localWishlist) : [];
          setWishlistCount(items.length);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };

    fetchWishlist();

    const handleWishlistChange = () => fetchWishlist();
    window.addEventListener("wishlistUpdated", handleWishlistChange);

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistChange);
    };
  }, []);

  const handleGoToWishlist = () => router.push("/wishlist");
  const handleGoToCart = () => router.push("/cart");

  const handleLogout = () => {
    localStorage.clear();
    location.reload();
  };

  // Close dropdown on outside click
 const dropdownWrapperRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownWrapperRef.current &&
      !dropdownWrapperRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  return (
    <>
      <div className="flex gap-3 items-center">
        {/* Wishlist */}
        <div
          className="relative w-10 h-10 flex items-center justify-center cursor-pointer"
          onClick={handleGoToWishlist}
        >
          <Heart className="w-5 h-5 text-black" />
          <NotificationBadge count={wishlistCount} />
        </div>

        {/* Cart */}
        <div className="cursor-pointer" onClick={handleGoToCart}>
          <CartDropdown />
        </div>

        {/* User Dropdown */}
      {token ? (
 <div className="relative" ref={dropdownWrapperRef}>
    <button
      onClick={() => setShowDropdown(prev => !prev)}
      className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 transition"
    >
      <div className="w-7 h-7 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center text-xs font-semibold text-white">
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
      <ChevronDown className="w-4 h-4 text-black" />
    </button>

    {showDropdown && (
      <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-lg z-10 p-2" ref={dropdownRef}>
      <button
  className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm hover:bg-gray-100 rounded"
  onClick={() => router.push("/settings")}
>
  <User className="w-4 h-4 text-gray-500" />
  Profile
</button>
<button
  className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm hover:bg-gray-100 rounded"
  onClick={handleGoToSettings}
>
  <Settings className="w-4 h-4 text-gray-500" />
  Settings
</button>
<button
  className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded"
  onClick={handleLogout}
>
  <LogOut className="w-4 h-4 text-red-500" />
  Logout
</button>

      </div>
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
      

      {/* Modals */}
      {modalState === "login" && (
        <LoginModal
          onClose={() => setModalState("none")}
          onOpenSignUp={() => setModalState("signup")}
          onLoginSuccess={() => setModalState("success")}
        />
      )}
      {modalState === "signup" && (
        <SignUpModal
          onClose={() => setModalState("none")}
          onOpenLogin={() => setModalState("login")}
        />
      )}
      {modalState === "success" && <SuccessModal onClose={() => setModalState("none")} />}
    </>
  );
};
