import React from 'react';

function ClientHistoryRow({ status, type, amount, date }) {
  // Determine badge style based on status
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { backgroundColor: '#F59E0B' }; // Yellow
      case 'failed':
        return { backgroundColor: '#DC2626' }; // Red
      case 'successful':
        return { backgroundColor: '#08AA3B' }; // Green
      case 'reversed':
        return { backgroundColor: '#9CA3AF' }; // Gray
      default:
        return { backgroundColor: '#A3A3A3' }; // Neutral Gray
    }
  };

  return (
    <div data-layername="rowText" className="flex overflow-hidden flex-wrap gap-4 items-center px-0 py-2 py-3.5 w-full bg-white border-b border-solid border-b-zinc-300 min-h-[64px] max-md:max-w-full">
      
      {/* Status Icon and Info */}
      <div data-layername="description" className="flex flex-1 shrink gap-2 items-center self-stretch my-auto basis-0 min-w-[240px]">
        <div data-layername="icon" className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-9 h-9 bg-neutral-100 rounded-[100px]">
          <span data-layername="aIconSizeable" className="flex gap-2.5 items-center self-stretch my-auto w-5">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/25253b664beb1720c17981679000ba88197e8b1fd123ba70b7d32221b30b1b0f?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" alt="" className="object-contain self-stretch my-auto w-5 aspect-square" />
          </span>
        </div>
        
        <div data-layername="text" className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-4 min-w-[240px]">
          <div data-layername="badgeStatus" className="flex gap-1 items-center self-start">
            <div data-layername="badgeDot" className="flex flex-col items-center self-stretch my-auto w-1.5 h-1.5 bg-green-600 rounded-[100px]">
              <div data-layername="dot" style={getStatusStyle(status)} className="flex overflow-hidden items-start w-1.5 h-1.5 rounded-[100px]">
                <div data-layername="height" className="flex gap-1.5 min-h-[6px] rotate-[-1.5707963267948966rad]" />
                <div data-layername="width" className="flex gap-1.5 min-h-0" />
              </div>
            </div>
            <div data-layername="text" className="self-stretch my-auto text-xs font-medium text-neutral-500">
              {status}
            </div>
          </div>
          <div data-layername="bedcPayment" className="mt-1 text-base text-black">
            {type}
          </div>
        </div>
      </div>

      {/* Amount */}
      <div className="flex flex-col self-stretch my-auto w-[121px]">
        <div data-layername="amount" className="flex flex-wrap items-center w-full text-base text-black rounded-lg min-h-[24px]">
          <div data-layername="text" className="self-stretch my-auto rounded-lg w-[65px]">
            {amount}
          </div>
        </div>
        
        {/* Date */}
        <div data-layername="date" className="text-xs text-neutral-500">
          {date}
        </div>
      </div>
    </div>
  );
}

export default ClientHistoryRow;
