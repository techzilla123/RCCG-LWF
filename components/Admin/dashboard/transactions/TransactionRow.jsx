'use client';

import React, { useState } from 'react';
import Receipt from './Receipt';  // Assuming the Receipt component is in the same folder

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
  onSummaryClick,
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

  // State to manage receipt visibility
  const [showReceipt, setShowReceipt] = useState(false);

  // Function to handle summary click
  const handleSummaryClick = () => {
    setShowReceipt(!showReceipt);  // Toggle the receipt visibility
    if (onSummaryClick) {
      onSummaryClick({
        registration,
        name,
        email,
        phone,
        description,
        date,
        transactionId,
        amount,
        status,
      });
    }
  };

  return (
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
