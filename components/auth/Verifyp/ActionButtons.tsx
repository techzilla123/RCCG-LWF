"use client";

import React from "react";
import { CountdownTimer } from "./CountdownTimer";

interface ActionButtonsProps {
  onVerifyAction: () => void;  // Renamed from onVerify to onVerifyAction
  onResendAction: () => void;  // Renamed from onResend to onResendAction
  isVerifyEnabled: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onVerifyAction,   // Use onVerifyAction
  onResendAction,   // Use onResendAction
  isVerifyEnabled,
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <button
        onClick={onVerifyAction}  // Updated to use onVerifyAction
        disabled={!isVerifyEnabled}
        className={`mb-1 w-full h-14 text-base font-medium text-white rounded-[50px] max-sm:text-sm ${
          isVerifyEnabled ? "bg-blue-600" : "bg-blue-300"
        }`}
      >
        Verify
      </button>
      <CountdownTimer initialSeconds={15} onCompleteAction={onResendAction} />  
    </div>
  );
};
