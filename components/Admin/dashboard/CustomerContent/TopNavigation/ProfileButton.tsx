"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

export const ProfileButton: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Get userType from localStorage (run only on client side)
  const [userType, setUserType] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType);
  }, []);

  // Toggle dropdown
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    router.push("/auth-login");
  };

  const handleCreateSubAdmin = () => {
    router.push("/admin-dashboard/auth-admin");
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/2edaecb760d5ecfabe8b85b71f478b16584a22ac?placeholderIfAbsent=true"
          alt="Profile"
          className="w-7 h-7 rounded-full object-cover"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/82c8f9d069e7aa215abfaeb6a6822903eb0491ec?placeholderIfAbsent=true"
          alt="Dropdown arrow"
          className="w-4 h-4 object-contain"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
          {/* Show this button only if userType === 'admin' */}
          {userType === "admin" && (
            <button
              onClick={handleCreateSubAdmin}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Create Sub Admin
            </button>
          )}
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};
