"use client";

import React, { useRef } from "react";

interface VerificationInputProps {
  value: string[];
  onChangeAction: (value: string[]) => void;  // Renamed to onChangeAction
}

export const VerificationInput: React.FC<VerificationInputProps> = ({
  value,
  onChangeAction, // Updated to reflect the new prop name
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = (index: number, inputValue: string) => {
    // Ensure input is numeric and no more than one character
    if (!/^\d*$/.test(inputValue) || inputValue.length > 1) return;

    const newValue = [...value];
    newValue[index] = inputValue;
    onChangeAction(newValue);  // Using the updated prop

    // Automatically move to the next input if the current one is filled
    if (inputValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();  // Move to previous input on backspace
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    if (paste.every((char) => /^\d$/.test(char))) {
      const newValue = [...value];
      paste.forEach((char, i) => {
        newValue[i] = char;
      });
      onChangeAction(newValue);  // Using the updated prop
      inputRefs.current[paste.length - 1]?.focus();
    }
    e.preventDefault();  // Prevent the default paste action to ensure only numbers are pasted
  };

  return (
    <div className="flex justify-between mb-6 w-full max-md:gap-3 max-sm:gap-2">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className="flex justify-center items-center h-14 bg-white rounded-lg border border-solid border-neutral-300 w-[44.8px] max-md:w-10 max-md:h-[50px] max-sm:w-9 max-sm:h-[45px]"
        >
          <input
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleInput(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-full h-full text-center bg-transparent outline-none"
            aria-label={`Digit ${index + 1} of verification code`}
          />
        </div>
      ))}
    </div>
  );
};
