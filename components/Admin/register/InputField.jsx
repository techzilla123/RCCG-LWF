"use client"; // This line makes this a client component

import React, { useState, useRef } from 'react';

function InputField({ label, placeholder, type = 'text', name, value, onChange }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef(null); // Create a reference to the input field
  const isPasswordField = type === 'password';

  // Function to clear the input and keep the focus
  const handleClearInput = () => {
    onChange({ target: { name, value: '' } }); // Clear the input value by calling onChange with an empty string
    inputRef.current?.focus(); // Keep the input field focused
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <div className="flex flex-col w-full min-h-[100px]">
      <label className="gap-2.5 self-start text-base text-neutral-500">{label}</label>
      <div
        className={`flex gap-3 items-center px-4 py-1.5 mt-2 w-full h-10 bg-white rounded-lg border-2 ${
          value ? 'border-[#08AA3B]' : 'border-[#e0e0e0]'
        } border-solid min-h-[40px]`}
      >
        {/* Eye Icon for Password Toggle (Positioned on the far left) */}
        {isPasswordField && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="flex justify-center items-center w-5 h-5"
          >
            <img
              src={isPasswordVisible ? '/eyeON.png' : '/eyeCLOSE.png'}
              alt="Toggle Password Visibility"
              className="w-5 h-5 object-contain"
            />
          </button>
        )}

        <input
          type={isPasswordField && !isPasswordVisible ? 'password' : 'text'}
          name={name} // Attach the name prop to the input field
          value={value}
          placeholder={placeholder}
          ref={inputRef} // Attach the ref to the input field
          onChange={onChange} // Pass the onChange prop to handle changes
          className="flex-1 text-base text-black outline-none"
          aria-label={label}
        />

        {/* Close Icon (Clear Input) */}
        {value && (
          <button
            type="button"
            onClick={handleClearInput}
            className="flex justify-center items-center w-5 h-5 text-black"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default InputField;
