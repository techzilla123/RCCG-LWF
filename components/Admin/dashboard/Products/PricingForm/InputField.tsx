import React from 'react';

interface InputFieldProps {
  label: string;
  required?: boolean;
  prefix?: string;
  value: string;
<<<<<<< HEAD
  defaultValue?: string; // NEW: Add default value to compare
=======
>>>>>>> 3fb9c63ca731fd536dfd6a37fbacb746b7000412
  suffix?: React.ReactNode;
  onChange?: (value: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  required,
  prefix,
  value,
<<<<<<< HEAD
  defaultValue = '', // Default to empty if not provided
  suffix,
  onChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const isPlaceholderStyle = value === '' || value === defaultValue;

=======
  suffix,
  onChange
}) => {
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value); // Update the value when the user types
    }
  };

>>>>>>> 3fb9c63ca731fd536dfd6a37fbacb746b7000412
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
<<<<<<< HEAD
          onChange={handleChange}
          className={`flex-1 text-base bg-transparent border-none outline-none
            ${isPlaceholderStyle ? 'text-neutral-400 font-normal' : 'text-black font-semibold'}`}
=======
          onChange={handleChange} // Bind onChange event to handle typing
          className="flex-1 text-base text-neutral-500 bg-transparent border-none outline-none"
>>>>>>> 3fb9c63ca731fd536dfd6a37fbacb746b7000412
        />
        {suffix}
      </div>
    </div>
  );
};
