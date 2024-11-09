"use client";

import React, { useState } from 'react';

function PaymentOption() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const options = ['BEDC','WAEC/NECO', 'NHIS', 'Insurance'];
  
  
 

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setIsOpen(false); // Close dropdown when an option is selected
  };

  // Toggle dropdown state
  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col w-full min-h-[100px]">
      {/* Label */}
      <label htmlFor="paymentOption" className="text-base text-neutral-500 mb-2">
        Choose Payment
      </label>

      {/* Dropdown Container */}
      <div className="relative flex items-center w-full bg-white rounded-lg border border-solid shadow-sm border-zinc-300 h-12">
        {/* Dropdown Button */}
        <select
          id="paymentOption"
          value={selectedOption}
          onChange={handleSelectChange}
          onClick={handleDropdownToggle}
          className={`flex-1 px-4 text-sm ${selectedOption ? 'text-black' : 'text-zinc-400'} bg-transparent border-none outline-none appearance-none cursor-pointer`}
        >
          <option value="" disabled>Choose option</option>
          {options.map((option, index) => (
            <option key={index} value={option} className="text-black">
              {option}
            </option>
          ))}
        </select>

        {/* Dropdown Icon */}
        <div className="absolute right-4 flex items-center pointer-events-none">
          <img
            src={isOpen ? '/down.png' : '/down.png'}
            alt="Toggle"
            className="w-4 h-4"
          />
        </div>
      </div>
    </div>
  );
}

export default PaymentOption;
