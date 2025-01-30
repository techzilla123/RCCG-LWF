import React, { useState, useEffect } from "react";
import TransactionRow from "./TransactionRow";

function TransactionTable({ searchQuery, filters }) {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("authToken"); // Get token from localStorage

      if (!token) {
        setError("Authorization token is missing");
        setLoading(false);
        return;
      }

      // Helper function to format date as "YYYY-MM-DD HH:mm:ss"
      const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };

      // Build the query string based on filters
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/dashboard/payments?`;

      if (filters.startDate) {
        url += `startdate=${encodeURIComponent(formatDate(filters.startDate))}&`;
      }
      if (filters.paymentType) {
        url += `paymentType=${encodeURIComponent(filters.paymentType)}&`;
      }
      if (filters.endDate) {
        url += `enddate=${encodeURIComponent(formatDate(filters.endDate))}&`;
      }
      if (filters.transactionId) {
        url += `transactionId=${encodeURIComponent(filters.transactionId)}&`;
      }

      // Remove trailing '&' if any
      url = url.endsWith("&") ? url.slice(0, -1) : url;

      try {
        setLoading(true);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add Bearer token to header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();
        setTransactions(data.payments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [filters]); // Run whenever filters change

  // Apply the search query and filters
  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      const transactionValues = Object.values(transaction).join(" ").toLowerCase();
      let isValid = transactionValues.includes(searchQuery.toLowerCase());

      // Filter based on the filters
      if (filters.paymentType && transaction.payment_type !== filters.paymentType) {
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

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col flex-1 mt-4 w-full rounded-xl max-md:max-w-full">
      <div className="flex overflow-hidden flex-wrap px-0 py-0.5 w-full rounded-lg bg-neutral-100 max-md:max-w-full">
        <div className="flex gap-1 items-center px-4 py-2 w-12 h-full">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={selectAll}
            style={{ accentColor: "#08AA3B" }}
            className="w-4 h-4"
          />
        </div>

        {["User ID", "Contact", "Description", "Transaction ID", "Amount", "Status", "Action"].map(
          (header, index) => (
            <div
              key={index}
              className={`flex relative flex-1 shrink gap-1 px-2 py-4 h-full text-sm font-medium leading-loose text-black ${
                index === 4 ? "text-right" : index === 5 ? "text-center" : ""
              } ${index > 3 ? "" : "whitespace-nowrap"} basis-4 ${
                index < 4 ? "min-w-[160px]" : ""
              } max-sm:hidden`}
            >
              <div className="absolute -left-px top-2/4 z-0 shrink-0 self-start w-0 border border-solid -translate-y-2/4 bg-zinc-300 border-zinc-300 h-[22px] translate-x-[0%]" />
              <div className="z-0 flex-1 shrink my-auto basis-0">{header}</div>
              {index < 7 && (
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/936c5ae5899c0cc48ee2a69189a91288cc3e5042a1f0e5d39a5a808fcaff1acc?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a"
                  alt=""
                  className="object-contain z-0 shrink-0 aspect-[0.5] w-[11px]"
                />
              )}
            </div>
          )
        )}
      </div>

      {filteredTransactions.map((transaction) => (
        <div key={transaction.transaction_id} className="flex items-center justify-between px-4 py-2">
          <input
            type="checkbox"
            checked={checkedItems[transaction.transaction_id] || false}
            onChange={() => handleRowCheckboxChange(transaction.transaction_id)}
            style={{ accentColor: "#08AA3B" }}
            className="w-4 h-4 mr-2"
          />
          <TransactionRow
            registration={transaction.registration_no}
            name={transaction.name}
            email={transaction.email}
            phone={transaction.phone_no}
            description={transaction.payment_type}
            date={transaction.created_date_time}
            transactionId={transaction.transaction_id}
            amount={`₦${(transaction.transaction_amount / 100).toLocaleString()}`}
            status={transaction.status}
          />
        </div>
      ))}
    </div>
  );
}

export default TransactionTable;
