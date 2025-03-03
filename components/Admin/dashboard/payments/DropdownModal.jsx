"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function DropdownModal({ isVisible, paymentName, paymentAmount, status }) {
  const router = useRouter();

  useEffect(() => {
    if (isVisible) {
      const queryParams = new URLSearchParams({
        paymentName,
        paymentAmount,
        status,
      }).toString();

      router.push(`/dashboard/payments/edit?${queryParams}`);
    }
  }, [isVisible, router, paymentName, paymentAmount, status]);

  return null;
}

export default DropdownModal;
