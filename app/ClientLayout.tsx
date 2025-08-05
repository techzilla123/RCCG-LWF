"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

function SessionExpiredModal({ onConfirm }: { onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">Session Expired</h2>
        <p className="text-gray-700 mb-6">
          Your session has expired. You’ll be redirected shortly.
        </p>
        <button
          onClick={onConfirm}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [showSessionModal, setShowSessionModal] = useState(false);
  const lastShownTokenRef = useRef<string | null>(null);

  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const res = await originalFetch(...args);

      if (res.status === 401) {
        const currentToken = localStorage.getItem("accessToken");

        // Only show modal if there's a new token that hasn't already triggered the modal
        if (currentToken && currentToken !== lastShownTokenRef.current) {
          lastShownTokenRef.current = currentToken;
          setShowSessionModal(true);
        }
      }

      return res;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  const handleSessionExpire = () => {
    localStorage.removeItem("accessToken");
    lastShownTokenRef.current = null;

    if (pathname.startsWith("/admin-")) {
      router.push("/auth-login");
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      {children}
      {showSessionModal && <SessionExpiredModal onConfirm={handleSessionExpire} />}
    </>
  );
}
