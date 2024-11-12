import React, { useState } from 'react';
import TransactionRow from './TransactionRow';

const transactionData = [
  {
    userId: '14E4201200ER',
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '0801234567',
    description: 'BEDC',
    date: 'Tue, 07-10-2024, 13:15',
    transactionId: '18SH28018SAH2830',
    amount: '₦30,000',
    status: 'Successful',
  },
  {
    userId: '14E4201200ER',
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '0801234567',
    description: 'NHIS',
    date: 'Tue, 07-10-2024, 13:15',
    transactionId: '4FAH28018SAH2830',
    amount: '₦10,000',
    status: 'Pending',
  },
  {
    userId: '14E4201200ER',
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '0801234567',
    description: 'Insurance',
    date: 'Tue, 07-10-2024, 13:15',
    transactionId: '12EF28018SAH2830',
    amount: '₦100,000',
    status: 'Failed',
  },
  {
    userId: '14E4201200ER',
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '0801234567',
    description: 'Loan',
    date: 'Tue, 07-10-2024, 13:15',
    transactionId: '332128018SAH2830',
    amount: '₦4,000',
    status: 'Reversed',
  },
];

function TransactionTable({ searchQuery }) {
  // Filter transactions based on search query
  const filteredTransactions = transactionData.filter((transaction) => {
    const transactionValues = Object.values(transaction).join(' ').toLowerCase();
    return transactionValues.includes(searchQuery.toLowerCase());
  });

  // State for checkboxes
  const [checkedItems, setCheckedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = () => {
    // Toggle the selectAll checkbox state
    setSelectAll((prev) => {
      const newSelectAll = !prev;
      const newCheckedItems = {};

      // Toggle all checkboxes based on selectAll state
      filteredTransactions.forEach((transaction) => {
        newCheckedItems[transaction.transactionId] = newSelectAll;
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

  return (
    <div className="flex flex-col flex-1 mt-4 w-full rounded-xl max-md:max-w-full">
      <div className="flex overflow-hidden flex-wrap px-0 py-0.5 w-full rounded-lg bg-neutral-100 max-md:max-w-full">
        {/* Checkbox before User ID */}
        <div className="flex gap-1 items-center px-4 py-2 w-12 h-full">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={selectAll}
            style={{ accentColor: '#08AA3B' }}
            className="w-4 h-4"
          />
        </div>

        {/* Column headers */}
        {['User ID', 'Contact', 'Description', 'Transaction ID', 'Amount', 'Status', 'Action'].map(
          (header, index) => (
            <div
              key={index}
              className={`flex relative flex-1 shrink gap-1 px-2 py-4 h-full text-sm font-medium leading-loose text-black ${
                index === 4 ? 'text-right' : index === 5 ? 'text-center' : ''
              } ${index > 3 ? '' : 'whitespace-nowrap'} basis-4 ${
                index < 4 ? 'min-w-[160px]' : ''
              } max-sm:hidden`}
            >
              <div className="absolute -left-px top-2/4 z-0 shrink-0 self-start w-0 border border-solid -translate-y-2/4 bg-zinc-300 border-zinc-300 h-[22px] translate-x-[0%]" />
              <div className="z-0 flex-1 shrink my-auto basis-0">{header}</div>
              {index < 5 && (
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

      {/* Display filtered transactions */}
      {filteredTransactions.map((transaction) => (
        <div key={transaction.transactionId} className="flex items-center justify-between px-4 py-2">
          {/* Render Transaction Row with checkbox only before user ID */}
          <input
            type="checkbox"
            checked={checkedItems[transaction.transactionId] || false}
            onChange={() => handleRowCheckboxChange(transaction.transactionId)}
            style={{ accentColor: '#08AA3B' }}
            className="w-4 h-4 mr-2"
          />
          <TransactionRow {...transaction} />
        </div>
      ))}
    </div>
  );
}

export default TransactionTable;
