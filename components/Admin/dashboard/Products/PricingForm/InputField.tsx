import React from 'react';

interface InputFieldProps {
  label: string;
  required?: boolean;
  prefix?: string;
  value: string;
  defaultValue?: string; // NEW: Add default value to compare
  suffix?: React.ReactNode;
  onChange?: (value: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  required,
  prefix,
  value,
  defaultValue = '', // Default to empty if not provided
  suffix,
  onChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const isPlaceholderStyle = value === '' || value === defaultValue;

  return (
    <div className="flex flex-col flex-1 gap-2">
      <label className="text-base text-black">
        <span>{label}</span>
        {required && <span className="text-xl text-neutral-500">*</span>}
      </label>
      <div className="flex gap-2 items-center px-4 py-2 h-10 bg-white rounded-lg border border-solid border-neutral-300">
        {prefix && <span className="text-base text-neutral-500">{prefix}</span>}
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className={`flex-1 text-base bg-transparent border-none outline-none
            ${isPlaceholderStyle ? 'text-neutral-400 font-normal' : 'text-black font-semibold'}`}
        />
        {suffix}
      </div>
    </div>
  );
};
