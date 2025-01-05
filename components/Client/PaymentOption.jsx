"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import crypto from 'crypto-js'; // Install this library with npm install crypto-js

const PaymentOption = ({ setPaymentOption }) => { // Accept the setPaymentOption function as a prop
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [paymentOptions, setPaymentOptions] = useState([]);

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  
  const method = "GET"; // HTTP method

  // Generate dynamic headers
  const generateHMAC = (message, secretKey) => {
    const hash = crypto.HmacSHA256(message, secretKey);
    return hash.toString(crypto.enc.Base64); // Convert the hash to Base64 format
  };

  // Generate API Key, Nonce, and Timestamp
  const getAPIHeaders = () => {
    const nonce = Math.random().toString(36).substring(2); // Random nonce
    const timestamp = Date.now().toString(); // Current timestamp in milliseconds
    const message = `${method}:${nonce}:${timestamp}`; // Message format for HMAC generation

    const apiKey = generateHMAC(message, secretKey);
    return { nonce, timestamp, apiKey };
  };

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      const { nonce, timestamp, apiKey } = getAPIHeaders();

      try {
        const headers = {
          "X-API-Key": apiKey,
          "X-Timestamp": timestamp,
          "X-Nonce": nonce,
        };

        const response = await axios.get(url, { headers });
        const options = response.data.map(option => ({
          paymentName: option.paymentName,
          paymentAmount: option.paymentAmount,
        }));

        setPaymentOptions(options); // Set the payment options to the state
      } catch (error) {
        console.log("Error fetching payment options:", error);
      }
    };

    fetchPaymentOptions();
  }, [secretKey, url]);

  const handleSelectChange = (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);
    setPaymentOption(selected); // Update the parent component's payment option
    setIsOpen(false); // Close dropdown when an option is selected
  };

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
          {paymentOptions.map((option, index) => (
            <option key={index} value={option.paymentName} className="text-black">
              {`${option.paymentName} - ₦${option.paymentAmount}`}
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
