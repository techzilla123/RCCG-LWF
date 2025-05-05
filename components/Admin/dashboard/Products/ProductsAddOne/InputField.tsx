import React, { useState } from 'react';

interface InputFieldProps {
  label: string;
  required?: boolean;
  value: string; // used as initial value & placeholder
  multiline?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  required,
  value,
  multiline = false,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-base text-black max-md:text-sm max-sm:text-xs">
        {label}
        {required && <span className="text-xl text-neutral-500">*</span>}
      </label>
      {multiline ? (
        <textarea
          placeholder={value}
          value={inputValue}
          onChange={handleChange}
          className="px-4 py-2 text-base bg-white rounded-lg border border-solid border-neutral-300 text-black min-h-16 max-md:text-sm max-sm:text-xs"
        />
      ) : (
        <input
          type="text"
          placeholder={value}
          value={inputValue}
          onChange={handleChange}
          className="px-4 py-2 text-base bg-white rounded-lg border border-solid border-neutral-300 text-black max-md:text-sm max-sm:text-xs"
        />
      )}
    </div>
  );
};
