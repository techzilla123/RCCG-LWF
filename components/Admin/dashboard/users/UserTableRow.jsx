import React from 'react';

function UserTableRow({ id, name, email, phone, lastTransaction, totalTransactions, status, isChecked, onCheckboxChange }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#08AA3B';
      case 'Regular':
        return 'bg-yellow-500';
      case 'Inactive':
        return 'bg-red-600';
      default:
        return 'bg-zinc-300';
    }
  };

  return (
    <div className="flex overflow-hidden flex-wrap w-full bg-white border-b border-solid border-b-zinc-300 min-h-[64px] max-md:max-w-full">
      <div className="flex gap-1 items-center px-4 py-2 w-12 h-full">
        <div className="flex gap-1 items-center self-stretch my-auto w-4">
          <div className="flex overflow-hidden flex-col justify-center items-center self-stretch my-auto w-4 h-4 bg-white bg-opacity-0">
            <div className="flex flex-col justify-center items-center w-full rounded-sm">
            <input
  type="checkbox"
   style={{ accentColor: '#08AA3B' }}
  className="flex w-4 h-4 rounded-sm border border-solid border-zinc-300 cursor-pointer"
  checked={isChecked}
  onChange={onCheckboxChange}
        
/>

            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden flex-1 shrink p-2 text-xs font-medium leading-5 basis-4 min-w-[160px] text-neutral-500">
        <span className="text-xs leading-4 text-black">{id}</span>
        <br />
        <span className="text-xs leading-5">{name}</span>
      </div>
      <div className="overflow-hidden flex-1 shrink p-2 text-xs font-medium leading-5 basis-4 min-w-[160px] text-neutral-500">
        <span className="text-xs leading-4 text-black">{email}</span>
        <br />
        <span className="text-xs leading-5">{phone}</span>
      </div>
      <div className="overflow-hidden flex-1 shrink p-2 text-xs font-medium leading-5 basis-4 min-w-[160px] text-neutral-500"
      style={{marginLeft:"23px"}}>
        <span className="text-xs leading-4 text-black">{lastTransaction.type}</span>
        <br />
        <span className="text-xs leading-5">{lastTransaction.date}</span>
      </div>
      <div className="overflow-hidden flex-1 shrink p-2 text-sm text-black whitespace-nowrap basis-4"
      style={{marginLeft:"90px"}}>
        {totalTransactions}
      </div>
      <div className="flex overflow-hidden flex-col flex-1 shrink justify-center items-center p-2 basis-4"
      style={{marginLeft:"-52px"}}>
        <div className="flex gap-2 items-center min-h-[22px]">
          <div className={`flex flex-col items-center self-stretch my-auto w-1.5 h-1.5 rounded-[100px] ${getStatusColor(status)}`}>
            <div className={`flex overflow-hidden items-start w-1.5 h-1.5 rounded-[100px] ${getStatusColor(status)}`}>
              <div className="flex gap-1.5 min-h-[6px] rotate-[-1.5707963267948966rad]" />
              <div className="flex gap-1.5 min-h-0" />
            </div>
          </div>
          <div className="self-stretch my-auto text-sm leading-loose text-neutral-500"
          >{status}</div>
        </div>
      </div>
      <div className="flex overflow-hidden flex-1 shrink gap-2 items-center py-2 pr-2 h-full basis-6">
        <div className="flex gap-2.5 self-stretch my-auto w-0 bg-zinc-300 min-h-[12px]">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d39475b17c017706cb6906551477c7fe26bbf5b0f6f1a44b40aeea9e950ab51d?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" alt="" className="object-contain w-0 aspect-[0.08] stroke-[1px] stroke-zinc-300" />
        </div>
        <button className="self-stretch my-auto text-xs font-medium text-blue-600 underline">History</button>
        <div className="flex gap-2.5 self-stretch my-auto w-0 bg-zinc-300 min-h-[12px]">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3034eeb57af42334fce3a0aeb0db57f97abc0c1ecf54263e5e7db07f2d9fae4c?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" alt="" className="object-contain w-0 aspect-[0.08] stroke-[1px] stroke-zinc-300" />
        </div>
        <button className="self-stretch my-auto text-xs font-medium text-red-600">Delete</button>
      </div>
    </div>
  );
}

export default UserTableRow;