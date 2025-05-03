"use client";

import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  initialSeconds: number;
  onCompleteAction: () => void;  // Renamed onComplete to onCompleteAction
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialSeconds,
  onCompleteAction,  // Updated prop name
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onCompleteAction();  // Call onCompleteAction instead of onComplete
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onCompleteAction]);

  return (
    <button
      className="w-full h-14 text-base font-medium rounded-[50px] text-stone-300 max-sm:text-sm"
      disabled={seconds > 0}
    >
      {seconds > 0 ? `Resend code in ${seconds}s` : "Resend code"}
    </button>
  );
};
