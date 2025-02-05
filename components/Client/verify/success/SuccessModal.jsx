'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Receipt from './Receipt';
import CryptoJS from 'crypto-js';

function SuccessModal() {
  const router = useRouter();
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionId, setTransactionId] = useState(null);

  // Extract transactionId (reference) from the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('reference');  // Extract the reference parameter
    console.log('Extracted Reference (Transaction ID):', ref);
    setTransactionId(ref);
  }, []);

  // Fetch transaction details on component mount
  useEffect(() => {
    if (transactionId) {
      fetchTransactionDetails();
    }
  }, [transactionId]); // Runs when transactionId is updated

  const fetchTransactionDetails = async () => {
    if (!transactionId) {
      console.log('Transaction ID is missing');
      return;
    }

    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
    const nonce = Math.random().toString(36).substring(2);
    const timestamp = Date.now().toString();
    const method = 'GET';
    const path = `/payment/process/fetch?transactionId=${transactionId}`;
    const message = `${method}:${nonce}:${timestamp}`;
    console.log('Constructed API Path:', path);

    const generateHMAC = (message, secretKey) => {
      const hash = CryptoJS.HmacSHA256(message, secretKey);
      return CryptoJS.enc.Base64.stringify(hash);
    };

    const apiKey = generateHMAC(message, secretKey);
    console.log('Generated API Key:', apiKey);

    try {
      const apiUrl = `https://payment-collections-service-f353c2fd4b8a.herokuapp.com${path}`;
      console.log('Complete API URL:', apiUrl);

      const response = await fetch(apiUrl, {
        method,
        headers: {
          'X-API-Key': apiKey,
          'X-Timestamp': timestamp,
          'X-Nonce': nonce,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response Status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Transaction Details:', data);

        // Clear previous transaction details and store the new data
        localStorage.removeItem('transactionDetails');
        localStorage.setItem('transactionDetails', JSON.stringify(data));

        // Update state to reflect the new transaction data
        setTransactionId(data.transactionId); // Or use other relevant states to reflect changes in UI
      } else {
        const errorData = await response.json();
        console.log('Failed to fetch transaction details:', errorData);
      }
    } catch (error) {
      console.log('Error fetching transaction details:', error);
    }
  };

  const handleViewReceiptClick = () => {
    console.log('View Receipt Button Clicked');
    setShowReceipt(true);
  };

  const handleFinishClick = () => {
    console.log('Finish Button Clicked');
    router.push('/');
  };

  return (
    <div
      className="flex flex-col justify-center items-center px-14 py-10 w-full bg-white max-w-[528px] rounded-[32px] max-md:px-5 max-md:max-w-full"
      style={{ marginTop: '-60px' }}
    >
      <div className="flex gap-2.5 justify-center items-center" style={{ width: '120px', height: '120px' }}>
        <img
          loading="lazy"
          src="/success-0u6rqMvimp.png"
          alt="Success Icon"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      <h2 className="self-stretch pb-4 mt-4 w-full text-4xl font-semibold text-black text-center" style={{ color: '#000000' }}>
        Transaction successful!
      </h2>

      <div className="flex gap-2.5 items-center justify-center mt-4 w-full text-sm font-medium text-center max-w-[400px]">
        <button
          onClick={handleFinishClick}
          className="overflow-hidden flex-1 px-4 py-3 h-10 text-black whitespace-nowrap border border-solid bg-black bg-opacity-0 border-neutral-500 min-h-[40px] rounded-[1000px] flex items-center justify-center"
        >
          Finish
        </button>

        <button
          onClick={handleViewReceiptClick}
          className="overflow-hidden flex-1 px-4 py-3 h-10 text-white bg-green-600 border border-solid border-black border-opacity-0 min-h-[40px] rounded-[1000px] flex items-center justify-center text-base max-md:text-sm"
          style={{ background: '#08AA3B' }}
        >
          <span style={{ fontSize: '20px', marginRight: '8px' }}>✔</span>
          <span>View Receipt</span>
        </button>
      </div>

      {showReceipt && <Receipt onClose={() => setShowReceipt(false)} />}
    </div>
  );
}

export default SuccessModal;
