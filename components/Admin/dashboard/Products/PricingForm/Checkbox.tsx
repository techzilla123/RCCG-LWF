"use client";
import React, { useState } from 'react';
import { CheckIcon } from './Icons';

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked = false, onChange }) => {
  // If no `checked` prop is passed, use local state to manage the checked value
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = () => {
    const newCheckedValue = !isChecked;
    setIsChecked(newCheckedValue); // Update local state
    if (onChange) {
      onChange(newCheckedValue); // Notify parent component (if `onChange` is passed)
    }
  };

  return (
    <label className="flex gap-2 items-center cursor-pointer" onClick={handleCheckboxChange}>
      <div
        className={`flex justify-center items-center w-4 h-4 rounded ${isChecked ? 'bg-blue-600' : 'border border-neutral-300'}`}
      >
        {isChecked && <CheckIcon />}
      </div>
      <span className="text-base text-neutral-500">{label}</span>
    </label>
  );
};
