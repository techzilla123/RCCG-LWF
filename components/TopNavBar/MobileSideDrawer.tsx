"use client";
import {
  X,
  Heart,
  ShoppingCart,
  PartyPopper,
  Gift,
  Tags,
  Settings,
  Globe,
  LogOut,
  ChevronRight,
  Store,
  Brush,
  CircleDot,
  NotebookPen,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SignUpModal } from "../Offer/SignUpModal";
import { LoginModal } from "../Offer/LoginModal";
import { SuccessModal } from "../Offer/SuccessModal";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

export default function MobileSideDrawer({ onClose, isOpen }: Props) {
  const router = useRouter();
  const [modalType, setModalType] = useState<"signup" | "login" | "success" | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
  }, []);

  if (!isOpen) return null;

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  const handleLogout = () => {
    if (localStorage.getItem("accessToken")) {
      localStorage.clear();
      onClose();
      router.push("/");
    }
  };

  const handleLoginSuccess = () => {
    setModalType("success");
    setIsLoggedIn(true);
  };

  const handleClose = () => {
    setModalType(null);
  };

  return (
    <>
      {/* Modals */}
      {modalType === "signup" && (
        <SignUpModal onClose={handleClose} onOpenLogin={() => setModalType("login")} />
      )}
      {modalType === "login" && (
        <LoginModal
          onClose={handleClose}
          onOpenSignUp={() => setModalType("signup")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {modalType === "success" && <SuccessModal onClose={handleClose} />}

      {/* Drawer */}
      <div className="fixed inset-0 z-40 flex md:hidden">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>

        <div className="relative w-screen max-w-[100%] bg-white h-full overflow-y-auto shadow-lg z-50 p-4 pt-2">
          <div className="flex items-center justify-between mb-4">
            <img src="/favicon-v2.png" alt="Logo" className="h-6" />
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="space-y-6 text-sm text-gray-800">
            {/* MY ACCOUNT */}
            <div>
              <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                <span>MY ACCOUNT</span>
                <button className="text-blue-600 text-xs" onClick={() => setModalType("login")}>
                  Sign in
                </button>
              </div>
              <div className="space-y-2">
                <DrawerLink icon={<Heart size={16} />} label="Wishlist" onClick={() => handleNavigate("/wishlist")} />
                <DrawerLink icon={<ShoppingCart size={16} />} label="Cart" onClick={() => handleNavigate("/cart")} />
              </div>
            </div>

            <Divider />

            {/* SHOP CATEGORIES */}
            <div>
              <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                <span>SHOP CATEGORIES</span>
                <button className="text-blue-600 text-xs" onClick={() => handleNavigate("/shop")}>View all</button>
              </div>
              <div className="space-y-2">
                <DrawerLink icon={<CircleDot size={16} />} label="Balloons shop" onClick={() => handleNavigate("/shop/balloon")} />
                <DrawerLink icon={<Gift size={16} />} label="Birthday shop" onClick={() => handleNavigate("/shop/birthday")} />
                <DrawerLink icon={<PartyPopper size={16} />} label="Holidays & Occasions" onClick={() => handleNavigate("/shop/holiday")} />
                <DrawerLink icon={<Tags size={16} />} label="Party Supplies" onClick={() => handleNavigate("/shop/party-supplies")} />
                <DrawerLink icon={<Brush size={16} />} label="Decorations" onClick={() => handleNavigate("/shop/decorations")} />
              </div>
            </div>

            <Divider />

            {/* QUICK LINKS */}
            <div>
              <h4 className="text-xs text-gray-500 mb-2">QUICK LINKS</h4>
              <div className="space-y-2">
                <DrawerLink icon={<Tags size={16} />} label="On sales" onClick={() => handleNavigate("/shop")} />
                <DrawerLink icon={<Store size={16} />} label="Rentals" onClick={() => handleNavigate("/rentals")} />
                <DrawerLink icon={<Brush size={16} />} label="Balloons Decor" onClick={() => handleNavigate("/shop/decoration")} />
                <DrawerLink icon={<NotebookPen size={16} />} label="Blog" onClick={() => handleNavigate("/blog")} />
              </div>
            </div>

            <Divider />

            {/* PREFERENCES */}
            <div>
              <h4 className="text-xs text-gray-500 mb-2">PREFERENCES</h4>
              <div className="space-y-2">
                <DrawerLink icon={<Settings size={16} />} label="Settings" onClick={() => handleNavigate("/settings")} />
                <DrawerLink icon={<Globe size={16} />} label="English (US)" />
                {isLoggedIn && (
                  <DrawerLink
                    icon={<LogOut size={16} />}
                    label="Log out"
                    textClass="text-red-600"
                    onClick={handleLogout}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DrawerLink({
  icon,
  label,
  onClick,
  textClass = "text-gray-800",
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  textClass?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between cursor-pointer ${textClass}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      <ChevronRight size={16} />
    </div>
  );
}

function Divider() {
  return <hr className="my-4 border-t border-gray-200" />;
}
