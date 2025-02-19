'use client';

import React, { useState, useEffect } from "react";
import TransactionRow from "./TransactionRow";

function TransactionTable({ searchQuery, filters }) {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [error, setError] = useState(null);

  // **Format Payment Type (Remove Underscores)**
  const formatPaymentType = (type) => type.replace(/_/g, ' ');

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ` +
           `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  };
  
  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("authToken");
  
      if (!token) {
        setError("Authorization token is missing");
        return;
      }
  
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/dashboard/payments?`;
  
      if (filters.startDate) url += `startdate=${formatDate(filters.startDate)}&`;
      if (filters.endDate) url += `enddate=${formatDate(filters.endDate)}&`;
      if (filters.paymentType) url += `paymentType=${filters.paymentType}&`;
      if (filters.transactionId) url += `transactionId=${filters.transactionId}&`;
      if (filters.status) url += `status=${filters.status}&`;
  
      url = url.endsWith("&") ? url.slice(0, -1) : url; // Remove trailing '&'
  
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("No matching data found based on the selected filter.");
        }
  
        const data = await response.json();
        const transactionsList = (data.payments || []).sort(
          (a, b) => new Date(b.created_date_time) - new Date(a.created_date_time)
        );
  
        localStorage.setItem("transactions", JSON.stringify(transactionsList));
        setTransactions(transactionsList);
        setFilteredTransactions(transactionsList);
        setError(null);
      } catch (err) {
        setError(err.message);
        setTransactions([]);
        setFilteredTransactions([]);
      }
    };
  
    fetchTransactions();
  }, [filters]);
  

  // **Apply Filters & Search**
  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      const transactionValues = Object.values(transaction).join(" ").toLowerCase();
      let isValid = transactionValues.includes(searchQuery.toLowerCase());

      if (filters.paymentType && formatPaymentType(transaction.payment_type) !== filters.paymentType) {
        isValid = false;
      }
      if (filters.startDate && new Date(transaction.created_date_time) < new Date(filters.startDate)) {
        isValid = false;
      }
      if (filters.endDate && new Date(transaction.created_date_time) > new Date(filters.endDate)) {
        isValid = false;
      }
      if (filters.transactionId && !transaction.transaction_id.includes(filters.transactionId)) {
        isValid = false;
      }
      if (filters.status && transaction.status !== filters.status) {
        isValid = false;
      }

      return isValid;
    });

    setFilteredTransactions(filtered);
  }, [searchQuery, filters, transactions]);

  const handleCheckboxChange = () => {
    setSelectAll((prev) => {
      const newSelectAll = !prev;
      const newCheckedItems = {};
      filteredTransactions.forEach((transaction) => {
        newCheckedItems[transaction.transaction_id] = newSelectAll;
      });
      setCheckedItems(newCheckedItems);
      return newSelectAll;
    });
  };

  const handleRowCheckboxChange = (transactionId) => {
    setCheckedItems((prev) => ({
      ...prev,
      [transactionId]: !prev[transactionId],
    }));
  };

  if (error) return (
    <div>
      Error: {error}
      <button onClick={() => setError(null)} style={{ marginLeft: '6px', color: 'blue' }}> Retry</button>
    </div>
  );

  return (
  <div className="flex flex-col flex-1 mt-4 w-full rounded-xl max-md:max-w-full">
    <table className="table-auto w-full bg-neutral-100 rounded-lg">
      {/* Table Header */}
      <thead>
        <tr className="bg-neutral-200">
          <th className="flex gap-1 items-center px-4 py-2 w-12 h-full">
            <input
               type="checkbox"
               onChange={handleCheckboxChange}
               checked={selectAll}
               style={{ accentColor: "#08AA3B", marginTop:"5px" }}
               className="w-4 h-4"
            />
          </th>
          {["User ID", "Contact", "Description", "Transaction ID", "Amount", "Status", "Action"].map(
            (header, index) => (
              <th
                key={index}
                className={`px-4 py-2 text-sm font-medium text-black relative ${
                  index === 4 ? "text-right" : index === 5 ? "text-center" : "text-left"
                }`}
              >
                <div className="flex items-center gap-1">
                  {header}
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/936c5ae5899c0cc48ee2a69189a91288cc3e5042a1f0e5d39a5a808fcaff1acc?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a"
                    alt="Sort Icon"
                    className="object-contain shrink-0 w-[11px] aspect-[0.5]"
                  />
                </div>
              </th>
            )
          )}
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {filteredTransactions.map((transaction) => (
          <tr
            key={transaction.transaction_id}
            className="bg-white border-b border-zinc-300 hover:bg-neutral-50"
          >
            {/* Checkbox Column */}
            <td className="px-4 py-2">
              <input
                type="checkbox"
                checked={checkedItems[transaction.transaction_id] || false}
                onChange={() => handleRowCheckboxChange(transaction.transaction_id)}
                style={{ accentColor: "#08AA3B" }}
                className="w-4 h-4"
              />
            </td>

            {/* Row Data */}
            <TransactionRow
              registration={transaction.registration_no}
              name={transaction.name}
              email={transaction.email}
              phone={transaction.phone_no}
              description={formatPaymentType(transaction.payment_type)}
              date={transaction.created_date_time}
              transactionId={transaction.transaction_id}
              amount={`₦${(transaction.transaction_amount / 100).toLocaleString()}`}
              status={transaction.status}
            />
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

  
}

export default TransactionTable;
