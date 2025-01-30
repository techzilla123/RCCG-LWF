'use client';

import React from 'react';

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

  return (
    <div className="flex flex-wrap w-full bg-white border-b border-zinc-300 min-h-[64px] max-md:max-w-full">
      {/* User Information Section */}
      <div className="flex-1 p-3 text-xs font-medium leading-5 text-neutral-500 min-w-[160px]">
        <span className="text-xs leading-4 text-black">{registration}</span>
        <br />
        <span className="text-xs leading-5">{name}</span>
      </div>

      {/* Contact Information Section (Email Truncated) */}
      <div className="flex-1 p-2 text-xs font-medium leading-5 text-neutral-500 min-w-[160px]">
        <div
          className="text-black truncate max-w-[120px] cursor-pointer"
          title={email} // Show full email on hover
        >
          {formatEmail(email)}
        </div>
        <div>{phone}</div>
      </div>

      {/* Description and Date Section */}
      <div className="flex-1 p-2 text-xs font-medium leading-5 text-neutral-500 min-w-[160px]">
        <div className="text-black">{description}</div>
        <div>{date}</div>
      </div>

      {/* Transaction ID and Image Section */}
      <div className="flex items-center flex-1 p-2 gap-2 min-w-[160px]">
        <div className="text-xs text-neutral-500 flex-1 truncate">{transactionId}</div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1b8f2d08e1b65d6fd3e351a8838957669993cf9dcfbd47815d3bcf98844fff1e?apiKey=73dffa2d4bac468cb175120cf834230a"
          alt="Transaction Icon"
          className="w-4 h-4 object-contain cursor-pointer"
          onClick={handleImageClick}
        />
      </div>

      {/* Amount Section */}
      <div className="flex-1 p-2 text-sm text-left text-black flex items-center" style={{ marginLeft: '44px' }}>
        {amount}
      </div>

      {/* Status Indicator Section */}
      <div className="flex items-center justify-center flex-1 p-2" style={{ marginLeft: '-94px' }}>
        {/* Conditional Icon Color */}
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: getStatusColor(status) }} // Apply dynamic color
        ></div>
        <div className="ml-2 text-sm text-neutral-500">{status}</div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-4 py-2 pr-2">
        <button className="text-xs text-blue-600 underline">Summary</button>
        <button className="text-xs text-red-600">Delete</button>
      </div>
    </div>
  );
}

export default TransactionRow;
