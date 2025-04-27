"use client";
import React, { useState } from "react";
import { SecuritySection } from "./SecuritySection";
import { Button } from "./Button";

interface RadioOptionProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  label,
  selected,
  onSelect,
}) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div className="relative w-5 h-5">
        <input
          type="radio"
          checked={selected}
          onChange={onSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className={`w-full h-full rounded-full border-2 ${
            selected ? "border-blue-500" : "border-gray-300"
          } flex items-center justify-center`}
        >
          {selected && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
        </div>
      </div>
      <span
        className={`text-base ${
          selected ? "text-black" : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </label>
  );
};

export const TwoFactorAuth: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleActivate = () => {
    if (selectedOption) {
      console.log(`Activating 2FA using ${selectedOption}`);
      // Here you could trigger your 2FA API call
    }
  };

  return (
    <SecuritySection
      title="Two-factor authentication"
      description="When turned on, anyone who tries to sign in from a new device or browser will need to verify that they have access to your account."
      className="mt-10"
    >
      <div className="flex flex-wrap gap-6 mt-6 w-full text-base max-md:max-w-full">
        <RadioOption
          label="Phone verification"
          selected={selectedOption === "Phone verification"}
          onSelect={() => setSelectedOption("Phone verification")}
        />
        <RadioOption
          label="Authenticator app"
          selected={selectedOption === "Authenticator app"}
          onSelect={() => setSelectedOption("Authenticator app")}
        />
      </div>

      <Button
  variant={selectedOption ? "primary" : "disabled"}
  onClick={handleActivate}
  className="mt-6 w-[122px] h-10 px-4 py-2"
>
  <span className="flex items-center gap-2 justify-center w-full">
    Activate 2FA
  </span>
</Button>

    </SecuritySection>
  );
};
