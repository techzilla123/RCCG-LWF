"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import crypto from "crypto-js";
import { FaChevronDown } from "react-icons/fa";

const PaymentOption = ({ setPaymentOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [paymentOptions, setPaymentOptions] = useState([]);

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  const url = process.env.NEXT_PUBLIC_API_PAYMENT_LIST_URL;
  const method = "GET";

  // Format numbers with commas
  const formatAmount = (amount) => amount.toLocaleString();

  // Generate API Headers
  const generateHMAC = (message, secretKey) => {
    return crypto.HmacSHA256(message, secretKey).toString(crypto.enc.Base64);
  };

  const getAPIHeaders = () => {
    const nonce = Math.random().toString(36).substring(2);
    const timestamp = Date.now().toString();
    return {
      nonce,
      timestamp,
      apiKey: generateHMAC(`${method}:${nonce}:${timestamp}`, secretKey),
    };
  };

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      const { nonce, timestamp, apiKey } = getAPIHeaders();

      try {
        const response = await axios.get(url, {
          headers: {
            "X-API-Key": apiKey,
            "X-Timestamp": timestamp,
            "X-Nonce": nonce,
          },
        });

        const options = response.data.map((option) => ({
          paymentName: option.paymentName,
          paymentAmount: option.paymentAmount,
        }));

        setPaymentOptions(options);
      } catch (error) {
        console.error("Error fetching payment options:", error);
      }
    };

    fetchPaymentOptions();
  }, [secretKey, url]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setPaymentOption(option.paymentName);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col w-full">
    {/* Label */}
    <label htmlFor="paymentOption" className="text-sm font-semibold text-gray-700 mb-2">
      Choose Payment
    </label>
  
    {/* Dropdown Container */}
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full px-4 py-3 bg-white/80 backdrop-blur-lg rounded-xl border border-gray-300 shadow-lg transition-all duration-300 hover:ring-2 hover:ring-blue-400 focus:ring-2 focus:ring-blue-500"
        title={selectedOption ? `${selectedOption.paymentName} - ₦${formatAmount(selectedOption.paymentAmount)}` : "Choose option"}
      >
        <span className="w-[80%] text-left text-xs sm:text-sm whitespace-normal ">
          {selectedOption
            ? `${selectedOption.paymentName} - ₦${formatAmount(selectedOption.paymentAmount)}`
            : "Choose option"}
        </span>
        <FaChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>
  
      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute left-0 w-full mt-2 bg-white/90 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200 z-50 max-h-60 overflow-y-auto animate-fadeIn">
          {paymentOptions.length > 0 ? (
            paymentOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-4 py-3 text-gray-700 font-medium cursor-pointer hover:bg-blue-100 transition text-xs sm:text-sm"
                title={`${option.paymentName} - ₦${formatAmount(option.paymentAmount)}`}
              >
                <span className="block w-full whitespace-normal break-words">
                  {option.paymentName} - ₦{formatAmount(option.paymentAmount)}
                </span>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-gray-500 text-xs sm:text-sm">Loading options...</li>
          )}
        </ul>
      )}
    </div>
  </div>
  
  );
};

export default PaymentOption;
