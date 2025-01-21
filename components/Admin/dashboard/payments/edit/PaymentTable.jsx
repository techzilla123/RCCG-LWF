"use client";
import React, { useState, useEffect } from "react";

function PaymentTable({ searchQuery }) {
  const [tableData, setTableData] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const params = new URLSearchParams(window.location.search);
        const paymentName = params.get("paymentName");

        if (!paymentName) {
          console.log("No paymentName provided in the query.");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/config/single?paymentName=${encodeURIComponent(
            paymentName
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        // Check if the data contains `paymentConfigurations` or is a single object
        if (Array.isArray(data.paymentConfigurations)) {
          setTableData(data.paymentConfigurations.reverse());
        } else if (data.paymentName) {
          setTableData([data]); // Wrap the single object in an array
        } else {
          console.log("Unexpected response format:", data);
        }
      } catch (error) {
        console.log("Error fetching payment data:", error);
      }
    };

    fetchPaymentData();
  }, []);

  useEffect(() => {
    setSelectAll(
      selectedCheckboxes.length === tableData.length && tableData.length > 0
    );
  }, [selectedCheckboxes, tableData]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCheckboxes([]);
    } else {
      const allIds = tableData.map((_, index) => index);
      setSelectedCheckboxes(allIds);
    }
  };

  const handleCheckboxChange = (index) => {
    if (selectedCheckboxes.includes(index)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((itemIndex) => itemIndex !== index)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, index]);
    }
  };

  const filteredData = tableData.filter((row) => {
    return (
      row.paymentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.createdDateTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.paymentAmount.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <section className="flex flex-col flex-1 justify-center p-4 w-full max-md:max-w-full">
      <div className="flex flex-col flex-1 w-full rounded-xl max-md:max-w-full">
        <div className="flex overflow-hidden flex-wrap px-0 py-0.5 w-full rounded-lg bg-neutral-100 max-md:max-w-full">
          <div className="flex gap-1 items-center px-4 py-2 w-12 h-full">
            <input
              type="checkbox"
              className="w-4 h-4 rounded-sm border border-solid border-zinc-300"
              style={{ accentColor: "#08AA3B" }}
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </div>
          {["Payment", "Date Added", "Total Sales", "Amount", "Status", ""].map(
            (header, index) => (
              <div
                key={index}
                className={`flex relative flex-1 shrink gap-1 px-2 py-4 h-full text-sm font-medium leading-loose text-black ${index === 2 || index === 3 ? "text-right" : ""} ${index === 4 ? "text-center" : ""} ${index === 5 ? "w-16 max-w-[64px] min-w-[44px]" : "basis-4"} ${index === 5 ? "" : "min-w-[160px]"}`}
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
        {filteredData.map((row, rowIndex) => (
          <div
          key={rowIndex}
          className="row flex overflow-hidden flex-wrap w-full bg-white border-b-zinc-300 min-h-[64px] max-md:max-w-full relative"
        >
        
            <div className="flex gap-1 items-center px-4 py-2 w-12 h-full">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-sm border border-solid border-zinc-300"
                style={{ accentColor: "#08AA3B" }}
                checked={selectedCheckboxes.includes(rowIndex)}
                onChange={() => handleCheckboxChange(rowIndex)}
              />
            </div>
            <div className="overflow-hidden flex-1 shrink p-2 text-base text-black basis-4 min-w-[160px]" style={{ paddingTop: "20px" }}>
              {row.paymentName}
            </div>
            <div className="overflow-hidden flex-1 shrink p-2 text-base text-black basis-4 min-w-[160px]" style={{ paddingTop: "20px" }}>
              {row.createdDateTime}
            </div>
            <div
              className="overflow-hidden flex-1 shrink p-2 text-base text-right text-black whitespace-nowrap basis-4"
              style={{ paddingTop: "20px" }}
            >
              {row.paymentAmount}
            </div>
            <div
              className="overflow-hidden flex-1 shrink p-2 text-base text-right text-black basis-4"
              style={{ paddingTop: "20px" }}
            >
              ₦{row.paymentAmount}
            </div>
            <div className="flex overflow-hidden flex-col flex-1 shrink justify-center items-center p-2 basis-4">
              <div className="flex gap-2 items-center min-h-[22px]">
                <div
                  className="flex flex-col items-center self-stretch my-auto w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: row.status === "ENABLED" ? "#08AA3B" : "#D6D6D6",
                  }}
                ></div>
                <div className="self-stretch my-auto text-sm leading-loose text-neutral-500">
                  {row.status}
                </div>
              </div>
            </div>
            <div className="relative flex overflow-hidden gap-2 justify-center items-center p-2 w-16 h-full text-sm leading-8 text-center whitespace-nowrap max-w-[64px] min-w-[44px] text-neutral-500 tracking-[2px]">
              <button
                aria-label="More options"
                className="z-80"
              >
                •••
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PaymentTable;
