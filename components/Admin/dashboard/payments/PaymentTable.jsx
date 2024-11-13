"use client";
import React, { useState, useEffect } from "react";

function PaymentTable({ searchQuery }) {
  const tableData = [
    { id: "14E4201200ER1", name: "John Doe", payment: "BEDC Payment", date: "Tue, 07-10-2024, 13:15", sales: "400,000", amount: "₦30,000", status: "Enabled" },
    { id: "14E4201200ER2", name: "Jane Doe", payment: "BEDC Payment", date: "Tue, 07-10-2024, 13:15", sales: "2,000", amount: "₦10,000", status: "Disabled" },
    { id: "14E4201200ER3", name: "Sam Smith", payment: "BEDC Payment", date: "Tue, 07-10-2024, 13:15", sales: "1,000", amount: "₦100,000", status: "Enabled" },
    { id: "14E4201200ER4", name: "Alice Johnson", payment: "BEDC Payment", date: "Tue, 07-10-2024, 13:15", sales: "50,000", amount: "₦4,000", status: "Disabled" }
  ];

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Effect to sync "Select All" checkbox state with individual checkboxes
  useEffect(() => {
    setSelectAll(selectedCheckboxes.length === tableData.length && tableData.length > 0);
  }, [selectedCheckboxes]);

  // Handler for "Select All" checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCheckboxes([]);
    } else {
      const allIds = tableData.map((row) => row.id);
      setSelectedCheckboxes(allIds);
    }
  };

  // Handler for individual checkbox click
  const handleCheckboxChange = (id) => {
    if (selectedCheckboxes.includes(id)) {
      setSelectedCheckboxes(selectedCheckboxes.filter((itemId) => itemId !== id));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, id]);
    }
  };

  // Filtered table data based on search query
  const filteredData = tableData.filter((row) => {
    return row.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           row.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
           row.payment.toLowerCase().includes(searchQuery.toLowerCase()) ||
           row.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
           row.sales.toLowerCase().includes(searchQuery.toLowerCase()) ||
           row.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
           row.status.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <section className="flex flex-col flex-1 justify-center p-4 w-full max-md:max-w-full">
      <div className="flex flex-col flex-1 w-full rounded-xl max-md:max-w-full">
        <div className="flex overflow-hidden flex-wrap px-0 py-0.5 w-full rounded-lg bg-neutral-100 max-md:max-w-full">
          <div className="flex gap-1 items-center px-4 py-2 w-12 h-full">
            <input
              type="checkbox"
              className="w-4 h-4 rounded-sm border border-solid border-zinc-300"
              style={{ accentColor: '#08AA3B' }}
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </div>
          {["User ID", "Payment", "Date Added", "Total Sales", "Amount", "Status", ""].map((header, index) => (
            <div key={index} className={`flex relative flex-1 shrink gap-1 px-2 py-4 h-full text-sm font-medium leading-loose text-black ${index === 3 || index === 4 ? 'text-right' : ''} ${index === 5 ? 'text-center' : ''} ${index === 6 ? 'w-16 max-w-[64px] min-w-[44px]' : 'basis-4'} ${index === 6 ? '' : 'min-w-[160px]'}`}>
              <div className="absolute -left-px top-2/4 z-0 shrink-0 self-start w-0 border border-solid -translate-y-2/4 bg-zinc-300 border-zinc-300 h-[22px] translate-x-[0%]" />
              <div className="z-0 flex-1 shrink my-auto basis-0">{header}</div>
            </div>
          ))}
        </div>
        {filteredData.map((row, rowIndex) => (
          <div key={rowIndex} className="flex overflow-hidden flex-wrap w-full bg-white border-b border-solid border-b-zinc-300 min-h-[64px] max-md:max-w-full">
            <div className="flex gap-1 items-center px-4 py-2 w-12 h-full">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-sm border border-solid border-zinc-300"
                style={{ accentColor: '#08AA3B' }}
                checked={selectedCheckboxes.includes(row.id)}
                onChange={() => handleCheckboxChange(row.id)}
              />
            </div>
            <div className="overflow-hidden flex-1 shrink p-2 text-xs font-medium leading-5 basis-4 min-w-[160px] text-neutral-500">
              <span className="text-xs leading-4 text-black">{row.id}</span>
              <br />
              <span className="text-xs leading-5">{row.name}</span>
            </div>
            <div className="overflow-hidden flex-1 shrink p-2 text-base text-black basis-4 min-w-[160px]">{row.payment}</div>
            <div className="overflow-hidden flex-1 shrink p-2 text-base text-black basis-4 min-w-[160px]">{row.date}</div>
            <div className="overflow-hidden flex-1 shrink p-2 text-base text-right text-black whitespace-nowrap basis-4">{row.sales}</div>
            <div className="overflow-hidden flex-1 shrink p-2 text-base text-right text-black basis-4">{row.amount}</div>
            <div className="flex overflow-hidden flex-col flex-1 shrink justify-center items-center p-2 basis-4">
              <div className="flex gap-2 items-center min-h-[22px]">
                <div
                  className="flex flex-col items-center self-stretch my-auto w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: row.status === "Enabled" ? "#08AA3B" : "#D6D6D6" }}
                ></div>
                <div className="self-stretch my-auto text-sm leading-loose text-neutral-500">{row.status}</div>
              </div>
            </div>
            <div className="flex overflow-hidden gap-2 justify-center items-center p-2 w-16 h-full text-sm leading-8 text-center whitespace-nowrap max-w-[64px] min-w-[44px] text-neutral-500 tracking-[2px]">
              <button aria-label="More options" className="z-10 self-stretch pt-0 my-auto w-3.5 max-md:pr-0">•••</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PaymentTable;
