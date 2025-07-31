// ✅ app/ClientLayout.tsx
"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const res = await originalFetch(...args);
      if (res.status === 401) {
        setShowSessionModal(true);
      }
      return res;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  const handleSessionExpire = () => {
    localStorage.removeItem("accessToken");

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
