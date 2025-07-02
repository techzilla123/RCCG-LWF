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
} from "lucide-react";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

export default function MobileSideDrawer({ onClose, isOpen }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex md:hidden">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-30"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-screen max-w-[100%] bg-white h-full overflow-y-auto shadow-lg z-50 p-4 pt-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <img
            src="/favicon-v2.png"
            alt="Logo"
            className="h-6"
          />
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="space-y-6 text-sm text-gray-800">
          {/* MY ACCOUNT */}
          <div>
            <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
              <span>MY ACCOUNT</span>
              <button className="text-blue-600 text-xs">Sign in</button>
            </div>
            <div className="space-y-2">
              <DrawerLink icon={<Heart size={16} />} label="Wishlist" />
              <DrawerLink icon={<ShoppingCart size={16} />} label="Cart" />
            </div>
          </div>

          <Divider />

          {/* SHOP CATEGORIES */}
          <div>
            <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
              <span>SHOP CATEGORIES</span>
              <button className="text-blue-600 text-xs">View all</button>
            </div>
            <div className="space-y-2">
              <DrawerLink icon={<CircleDot size={16} />} label="Balloons shop" />
              <DrawerLink icon={<Gift size={16} />} label="Birthday shop" />
              <DrawerLink icon={<PartyPopper size={16} />} label="Holidays & Occasions" />
              <DrawerLink icon={<Tags size={16} />} label="Party Supplies" />
              <DrawerLink icon={<Brush size={16} />} label="Decorations" />
            </div>
          </div>

          <Divider />

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-xs text-gray-500 mb-2">QUICK LINKS</h4>
            <div className="space-y-2">
              <DrawerLink icon={<Tags size={16} />} label="On sales" />
              <DrawerLink icon={<Store size={16} />} label="Rentals" />
              <DrawerLink icon={<Brush size={16} />} label="Balloons Decor" />
            </div>
          </div>

          <Divider />

          {/* PREFERENCES */}
          <div>
            <h4 className="text-xs text-gray-500 mb-2">PREFERENCES</h4>
            <div className="space-y-2">
              <DrawerLink icon={<Settings size={16} />} label="Settings" />
              <DrawerLink icon={<Globe size={16} />} label="English (UK)" />
              <DrawerLink
                icon={<LogOut size={16} />}
                label="Log out"
                textClass="text-red-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DrawerLink({
  icon,
  label,
  textClass = "text-gray-800",
}: {
  icon: React.ReactNode;
  label: string;
  textClass?: string;
}) {
  return (
    <div className={`flex items-center justify-between ${textClass}`}>
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
