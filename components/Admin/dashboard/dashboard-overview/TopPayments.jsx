import React from 'react';

function TopPayments() {
  const payments = [
    { name: "BEDC Payment", percentage: "17.54%" },
    { name: "BEDC Payment", percentage: "17.54%" },
    { name: "BEDC Payment", percentage: "17.54%" },
    { name: "BEDC Payment", percentage: "17.54%" },
    { name: "BEDC Payment", percentage: "17.54%" }
  ];

  return (
    <div data-layername="chartGroup" className="flex overflow-hidden flex-col flex-1 shrink self-start px-6 py-4 bg-white rounded-lg border border-solid basis-0 border-zinc-300 min-w-[240px] max-md:px-5 max-md:max-w-full">
      <div data-layername="heading" className="flex gap-2 items-center w-full max-md:max-w-full">
        <div data-layername="title" className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px]">
          <div data-layername="figureAmount" className="text-sm font-semibold text-black">Top Payments</div>
          <div data-layername="figureAmount" className="mt-1 text-xs text-neutral-700">Over the past week</div>
        </div>
        <div data-layername="more" className="flex overflow-hidden gap-2 justify-center items-center self-stretch px-1 my-auto w-8 h-8 border border-solid bg-black bg-opacity-0 border-black border-opacity-0 min-h-[32px] rounded-[1000px]">
          <div data-layername="aIconSizeable" className="flex gap-2.5 items-center self-stretch my-auto">
            <div data-layername="moreMenu" className="flex gap-1 self-stretch py-1.5 my-auto min-h-[13px]" />
          </div>
        </div>
      </div>
      <div data-layername="chart" className="flex gap-2.5 justify-center items-start w-full rounded-lg border border-solid bg-black bg-opacity-0 border-black border-opacity-0 h-[289px] max-md:max-w-full">
        <div data-layername="list" className="flex flex-col flex-1 shrink py-2 w-full basis-0 min-w-[240px] max-md:max-w-full">
          {payments.map((payment, index) => (
            <div key={index} data-layername="rowText" className="flex overflow-hidden gap-4 items-center px-0 py-2 py-3.5 w-full bg-white border-b border-solid border-b-zinc-300 min-h-[64px] max-md:max-w-full">
              <div data-layername="description" className="flex flex-1 shrink gap-2 items-center self-stretch my-auto basis-0 min-w-[240px]">
                <div data-layername="icon" className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-9 h-9 bg-neutral-100 rounded-[100px]">
                  <div data-layername="aIconSizeable" className="flex gap-2.5 items-center self-stretch my-auto w-5">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/29527e7362feee70dabab28e5354772f4c258f1e19d39b065b4c1e9b940a25c8?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" className="object-contain self-stretch my-auto w-5 aspect-square" alt="" />
                  </div>
                </div>
                <div data-layername="text" className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-4 min-w-[240px]">
                  <div data-layername="bedcPayment" className="text-base text-black">{payment.name}</div>
                  <div data-layername="bedcPayment" className="mt-1 text-xs text-neutral-500">{payment.name}</div>
                </div>
              </div>
              <div className="flex flex-col self-stretch my-auto text-base text-black whitespace-nowrap w-[52px]">
                <div data-layername="iconText" className="flex flex-wrap items-center w-full rounded-lg min-h-[24px]">
                  <div data-layername="text" className="flex-1 shrink self-stretch my-auto w-full rounded-lg">
                    {payment.percentage}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopPayments;