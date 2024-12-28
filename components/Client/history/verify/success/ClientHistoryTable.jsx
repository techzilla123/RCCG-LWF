'use client'; // Ensure that this file is treated as a Client Component

import React, { useState } from 'react';
import ClientHistoryRow from './ClientHistoryRow';
import Receipt from './Receipt'; // Make sure this path is correct

const clientHistoryData = [
  { status: 'Pending', type: 'BEDC Payment', amount: '₦30,000', date: 'Tue, 07-10-2024, 13:15' },
  { status: 'Failed', type: 'BEDC Payment', amount: '₦25,000', date: 'Wed, 08-10-2024, 10:30' },
  { status: 'Successful', type: 'School Fees', amount: '₦50,000', date: 'Thu, 09-10-2024, 09:00' },
  { status: 'Pending', type: 'Rent Payment', amount: '₦100,000', date: 'Fri, 10-10-2024, 11:45' },
  { status: 'Reversed', type: 'BEDC Payment', amount: '₦30,000', date: 'Sat, 11-10-2024, 12:30' },
  { status: 'Successful', type: 'Hospital Bill', amount: '₦5,000', date: 'Sun, 12-10-2024, 15:00' },
  { status: 'Failed', type: 'Shopping', amount: '₦20,000', date: 'Mon, 13-10-2024, 16:00' },
  { status: 'Successful', type: 'BEDC Payment', amount: '₦30,000', date: 'Tue, 14-10-2024, 13:15' },
  { status: 'Successful', type: 'School Fees', amount: '₦80,000', date: 'Wed, 15-10-2024, 14:15' },
];

function ClientHistoryTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false); // State to show/hide receipt popup
  const [selectedReceiptData, setSelectedReceiptData] = useState(null); // State to store selected item data

  // Filter data based on search term, type, and status
  const filteredData = clientHistoryData.filter(item => {
    const matchesSearch =
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.amount.includes(searchTerm) ||
      item.date.includes(searchTerm);

    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Search form submission handler
  const handleSearch = (event) => {
    event.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  // Toggle functions
  const toggleTypeDropdown = () => {
    setShowTypeDropdown(!showTypeDropdown);
    setShowStatusDropdown(false);
  };

  const toggleStatusDropdown = () => {
    setShowStatusDropdown(!showStatusDropdown);
    setShowTypeDropdown(false);
  };

  // Select handlers
  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setShowTypeDropdown(false);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setShowStatusDropdown(false);
  };

  // Handle row click to show receipt
  const handleRowClick = (item) => {
    setSelectedReceiptData(item); // Set selected item data
    setShowReceipt(true); // Show receipt popup
  };

  // Close receipt popup
  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setSelectedReceiptData(null); // Clear selected data
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
                {['All', 'BEDC Payment', 'Insurance', 'NHIS', 'WAEC/NECO e-Pin'].map((type, index) => (
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
                {['All', 'Successful', 'Pending', 'Failed', 'Reversed'].map((status, index) => (
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

          {/* Search Box */}
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

        {/* Divider Line */}
        <div className="my-4 h-px w-full bg-gray-300" />

        {/* Client History List */}
        <div className="flex flex-col w-full rounded-lg bg-white">
          {filteredData.map((item, index) => (
            <div key={index} className="cursor-pointer" onClick={() => handleRowClick(item)}>
              <ClientHistoryRow {...item} />
            </div>
          ))}
        </div>
      </div>

      {/* Conditionally render receipt popup */}
      {showReceipt && selectedReceiptData && (
        <Receipt data={selectedReceiptData} onClose={handleCloseReceipt} />
      )}
    </section>
  );
}

export default ClientHistoryTable;
