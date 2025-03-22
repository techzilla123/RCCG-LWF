'use client'; // Ensure this file is treated as a Client Component

import React, { useState, useEffect } from 'react';
import ClientHistoryRow from './ClientHistoryRow';
import Receipt from './Receipt'; // Ensure this path is correct
import crypto from 'crypto-js'; // Ensure you have this package installed
import axios from 'axios';

function ClientHistoryTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [clientHistoryData, setClientHistoryData] = useState([]); // State to hold client history data
  const [selectedReceiptData, setSelectedReceiptData] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState([]); // State to hold the payment options

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY; // Replace with your actual secret key
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Get the base URL from .env file
  const paymentOptionsUrl = process.env.NEXT_PUBLIC_API_PAYMENT_LIST_URL; // API endpoint to fetch payment options

  // Generate HMAC
  const generateHMAC = (message, secretKey) => {
    const hash = crypto.HmacSHA256(message, secretKey);
    return crypto.enc.Base64.stringify(hash);
  };

  useEffect(() => {
    // Fetch payment options from the API
    const fetchPaymentOptions = async () => {
      const nonce = Math.random().toString(36).substring(2); // Random nonce
      const timestamp = Date.now().toString(); // Current timestamp in milliseconds
      const method = "GET"; // HTTP method
      const message = `${method}:${nonce}:${timestamp}`; // Generate message string
      const apiKey = generateHMAC(message, secretKey); // Generate API Key (HMAC)

      try {
        const headers = {
          "X-API-Key": apiKey,
          "X-Timestamp": timestamp,
          "X-Nonce": nonce,
        };

        const response = await axios.get(paymentOptionsUrl, { headers });
        const options = response.data.map(option => option.paymentName); // Extract payment names

        setPaymentOptions(['All', ...options]); // Set payment options (adding 'All' as the first option)
      } catch (error) {
        console.error("Error fetching payment options:", error);
      }
    };

    fetchPaymentOptions();
  }, [secretKey, paymentOptionsUrl]);

  useEffect(() => {
    const storedData = localStorage.getItem("verificationResult");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setClientHistoryData(parsedData.payments || []);
    }
  }, []);

  useEffect(() => {
    if (clientHistoryData.length > 0) {
      localStorage.setItem("verificationResult", JSON.stringify({ payments: clientHistoryData }));
    }
  }, [clientHistoryData]); // Save client history data whenever it changes

  const updateStatus = async (transactionId) => {
    const nonce = Math.random().toString(36).substring(2); // Random nonce
    const timestamp = Date.now().toString(); // Current timestamp in milliseconds
    const method = 'GET'; // HTTP method
    const path = `/payment/process/fetch`; // Request path

    const message = `${method}:${nonce}:${timestamp}`; // Generate message string
    const apiKey = generateHMAC(message, secretKey); // Generate API Key (HMAC)

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

      if (!response.ok) {
        throw new Error('Failed to fetch status');
      }

      const result = await response.json();
      const updatedStatus = result?.status;
      if (updatedStatus) {
        setClientHistoryData((prevData) =>
          prevData.map((item) =>
            item.transactionId === transactionId ? { ...item, status: updatedStatus } : item
          )
        );
        // Update the receipt data with the new status
        setSelectedReceiptData((prevData) => ({
          ...prevData,
          status: updatedStatus,
        }));
      }
    } catch {
      console.log('Error fetching status:');
    }
  };

  const filteredData = clientHistoryData
  .filter(item => {
    const normalizedPaymentType = item.paymentType.replace(/_/g, ' '); // Convert underscores to spaces
    const matchesSearch =
      normalizedPaymentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.totalAmount.includes(searchTerm) ||
      item.transactionDate.includes(searchTerm);

    const matchesType = selectedType === 'All' || normalizedPaymentType === selectedType;
    const matchesStatus = selectedStatus === 'All' || (item.status && item.status === selectedStatus);

    return matchesSearch && matchesType && matchesStatus;
  })
  .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const toggleTypeDropdown = () => {
    setShowTypeDropdown(!showTypeDropdown);
    setShowStatusDropdown(false);
  };

  const toggleStatusDropdown = () => {
    setShowStatusDropdown(!showStatusDropdown);
    setShowTypeDropdown(false);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setShowTypeDropdown(false);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setShowStatusDropdown(false);
  };

  const handleRowClick = (item) => {
    updateStatus(item.transactionId); // Update status when a row is clicked
    setSelectedReceiptData(item); // Update receipt data immediately
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setSelectedReceiptData(null);
  };

  return (
    <section className="flex flex-col gap-6 justify-center items-center p-6 w-full bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col justify-center w-full max-w-[600px]">
        <h2 className="py-2 w-full text-2xl font-bold text-left" style={{ color: '#005E1E' }}>
          History
        </h2>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
          <div className="relative w-full sm:w-auto">
            <button onClick={toggleTypeDropdown} className="px-4 py-2 bg-gray-200 rounded-lg w-full sm:w-auto">
              {selectedType} <span>▼</span>
            </button>
            {showTypeDropdown && (
              <ul className="absolute top-full left-0 bg-white border rounded-lg shadow-md w-full sm:w-auto z-10">
                {paymentOptions.map((type, index) => (
                  <li
                    key={index}
                    onClick={() => handleTypeSelect(type)}
                    className={`p-2 cursor-pointer ${type === selectedType ? 'font-bold' : ''}`}
                  >
                    {type}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative w-full sm:w-auto">
            <button onClick={toggleStatusDropdown} className="px-4 py-2 bg-gray-200 rounded-lg w-full sm:w-auto">
              {selectedStatus} <span>▼</span>
            </button>
            {showStatusDropdown && (
              <ul className="absolute top-full left-0 bg-white border rounded-lg shadow-md w-full sm:w-auto z-10">
                {['All', 'SUCCESS', 'PENDING', 'FAILED', 'REVERSED', 'AUTHORIZED'].map((status, index) => (
                  <li
                    key={index}
                    onClick={() => handleStatusSelect(status)}
                    className={`p-2 cursor-pointer ${status === selectedStatus ? 'font-bold' : ''}`}
                  >
                    {status}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form onSubmit={handleSearch} className="flex-1 flex items-center px-3 py-2 bg-white border rounded-full">
            <input
              type="search"
              placeholder="Search by status, type, or amount"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-2 text-sm text-gray-700 outline-none"
            />
            <button type="submit" className="text-gray-500">🔍</button>
          </form>
        </div>

        <div className="my-4 h-px w-full bg-gray-300" />

        <div className="flex flex-col w-full rounded-lg bg-white">
          {filteredData.map((item, index) => (
            <div key={index} className="cursor-pointer" onClick={() => handleRowClick(item)}>
              <ClientHistoryRow {...item} />
            </div>
          ))}
        </div>
      </div>

      {showReceipt && selectedReceiptData && (
        <Receipt data={selectedReceiptData} onClose={handleCloseReceipt} />
      )}
    </section>
  );
}

export default ClientHistoryTable;
