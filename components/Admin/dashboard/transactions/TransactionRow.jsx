'use client';

import React, { useState } from 'react';
import Receipt from './Receipt';  // Assuming the Receipt component is in the same folder
import crypto from 'crypto-js'; // Ensure you have this package installed


function TransactionRow({
  registration,
  name,
  email,
  phone,
  description,
  date,
  transactionId,
  amount,
  status,
  
}) {
  // Helper function to get the color for status indicators
  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS':
        return '#08AA3B'; // Green color for successful status
      case 'PENDING':
        return '#FFBB33'; // Yellow color for pending status
      case 'FAILED':
        return '#FF0000'; // Red color for failed status
      default:
        return '#D1D5DB'; // Default color for undefined status
    }
  };

  // Copy Transaction ID to Clipboard
  const handleImageClick = () => {
    navigator.clipboard.writeText(transactionId).then(() => {
      alert('Transaction ID copied to clipboard!');
    });
  };

  // Function to truncate email (hides @domain but shows full on hover)
  const formatEmail = (email) => {
    const [localPart, domain] = email.split('@');
    return domain ? `${localPart}@...` : email;
  };

  const [currentStatus, setCurrentStatus] = useState(status);
  // State to manage receipt visibility
  const [showReceipt, setShowReceipt] = useState(false);

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY; // Replace with your actual secret key
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Get the base URL from .env file
  

  // Generate HMAC
  const generateHMAC = (message, secretKey) => {
    const hash = crypto.HmacSHA256(message, secretKey);
    return crypto.enc.Base64.stringify(hash);
  };


  const updateStatus = async (transactionId) => {
    const nonce = Math.random().toString(36).substring(2);
    const timestamp = Date.now().toString();
    const method = 'GET';
    const path = `/payment/process/fetch`;

    const message = `${method}:${nonce}:${timestamp}`;
    const apiKey = generateHMAC(message, secretKey);

    const apiUrl = `${apiBaseUrl}${path}?transactionId=${transactionId}`;
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'X-API-Key': apiKey,
          'X-Timestamp': timestamp,
          'X-Nonce': nonce,
        },
      });
      const data = await response.json();
      if (data.status && data.status !== currentStatus) {
        setCurrentStatus(data.status);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSummaryClick = async () => {
    if (currentStatus === 'AUTHORIZED') {
      await updateStatus(transactionId);
    }
    setShowReceipt(!showReceipt);
  };


  // // Function to handle summary click
  // const handleSummaryClick = () => {
  //   setShowReceipt(!showReceipt);  // Toggle the receipt visibility
  //   if (onSummaryClick) {
  //     onSummaryClick({
  //       registration,
  //       name,
  //       email,
  //       phone,
  //       description,
  //       date,
  //       transactionId,
  //       amount,
  //       status,
  //     });
  //   }
  // };

  return React.Children.toArray(
    <>
      {/* Transaction Row */}
      <td className="px-4 py-3 text-xs font-medium text-black whitespace-nowrap">
        {registration}
        <br />
        <span className="text-neutral-500 mt-3 block">{name}</span>
      </td>

      <td className="px-4 py-3 text-xs text-neutral-500 whitespace-nowrap">
  <span className="block max-w-[140px] truncate text-black" title={email}>
    {formatEmail(email)}
  </span>
  <br />
  <span className="mt-2">{phone}</span>
</td>


      <td className="flex-1 p-4 text-xs font-medium leading-4 text-neutral-500 min-w-[180px]">
        <span className="text-black">{description}</span>
        <br />
        <span className="mt-2 block">{date}</span>
      </td>

      <td className="flex items-center mt-3 flex-1 p-4 gap-3 min-w-[180px]">
        <span className="text-xs text-neutral-500 flex-1 truncate" style={{ width: '40px' }}>
          {transactionId}
        </span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1b8f2d08e1b65d6fd3e351a8838957669993cf9dcfbd47815d3bcf98844fff1e?apiKey=73dffa2d4bac468cb175120cf834230a"
          alt="Transaction Icon"
          className="inline-block w-5 h-5 ml-3 cursor-pointer"
          onClick={handleImageClick}
        />
      </td>

      <td className="px-4 py-2 text-black" style={{ fontFamily: "Roboto", fontWeight: 400, fontSize: "14px", lineHeight: "16.41px", letterSpacing: "0%" }}>
        {amount}
      </td>

      <td className="px-4 py-2 text-xs">
  {status !== "AUTHORIZED" && (
    <span
      className="w-3 h-3 inline-block rounded-full"
      style={{ backgroundColor: getStatusColor(status) }}
    ></span>
  )}
  <span className="ml-2">{status}</span>
</td>


      <td className="px-4 py-2 text-xs">
        <button className="text-blue-600 underline" onClick={handleSummaryClick}>
          Summary
        </button>
      </td>

      {showReceipt && (
  <tr>
    <td colSpan="7">
      <Receipt {...{ registration, name, email, phone, description, date, transactionId, amount, status }} />
    </td>
  </tr>
)}

    </>
  );
}

export default TransactionRow;
