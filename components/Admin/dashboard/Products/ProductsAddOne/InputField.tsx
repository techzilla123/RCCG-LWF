import React from 'react';

interface InputFieldProps {
  label: string;
  required?: boolean;
  value: string; // current input value from parent
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  multiline?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  required,
  value,
  onChange,
  placeholder,
  multiline = false,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-base text-black max-md:text-sm max-sm:text-xs">
        {label}
        {required && <span className="text-xl text-neutral-500">*</span>}
      </label>
      {multiline ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="px-4 py-2 text-base bg-white rounded-lg border border-solid border-neutral-300 text-black min-h-16 max-md:text-sm max-sm:text-xs"
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="px-4 py-2 text-base bg-white rounded-lg border border-solid border-neutral-300 text-black max-md:text-sm max-sm:text-xs"
        />
      )}
    </div>
  );
};
