"use client";

import React from "react";
import { CountdownTimer } from "./CountdownTimer";

interface ActionButtonsProps {
  onVerifyAction: () => void;
  onResendAction: () => void;
  isVerifyEnabled: boolean;
  isLoading: boolean;  // Add this line
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onVerifyAction,
  onResendAction,
  isVerifyEnabled,
  isLoading,  // Add this line
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <button
        onClick={onVerifyAction}
        disabled={!isVerifyEnabled || isLoading}
        className={`mb-1 w-full h-14 text-base font-medium text-white rounded-[50px] max-sm:text-sm ${
          isVerifyEnabled && !isLoading ? "bg-blue-600" : "bg-blue-300"
        }`}
      >
        {isLoading ? "Verifying..." : "Verify"}
      </button>
      <CountdownTimer initialSeconds={15} onCompleteAction={onResendAction} />
    </div>
  );
};
