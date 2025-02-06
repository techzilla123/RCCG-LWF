import React from 'react';

function ClientHistoryRow({ status, totalAmount, paymentType, transactionDate }) {
  const getStatusStyle = (status) => {
    switch (status.toUpperCase()) {
      case 'PENDING': return { backgroundColor: '#F59E0B' };
      case 'FAILED': return { backgroundColor: '#DC2626' };
      case 'SUCCESS': return { backgroundColor: '#08AA3B' };
      case 'AUTHORIZED': return { backgroundColor: '#A3A3A3' };
      case 'REVERSED': return { backgroundColor: '#9CA3AF' };
      default: return { backgroundColor: '#A3A3A3' };
    }
  };

  return (
    <div className="flex flex-wrap items-center px-4 py-2 w-full bg-white border-b border-zinc-300 min-h-[64px]">
      {/* Status and Payment Type */}
      <div className="flex flex-1 items-center min-w-0 gap-2">
        <div className="flex justify-center items-center w-9 h-9 bg-neutral-100 rounded-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/25253b664beb1720c17981679000ba88197e8b1fd123ba70b7d32221b30b1b0f"
            alt="icon"
            className="w-5 h-5"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1">
            <div style={getStatusStyle(status)} className="w-2 h-2 rounded-full" />
            <div className="text-xs font-medium text-neutral-500">{status}</div>
          </div>

          {/* Payment Type with Hover Tooltip */}
          <div className="relative group">
            <div className="text-base text-black mt-1 truncate max-w-[180px] sm:max-w-full ">
              {paymentType.replace(/_/g, ' ')}
            </div>

            {/* Tooltip */}
            <div className="hidden absolute left-0 top-full mt-1 bg-white shadow-md border border-gray-300 p-2 rounded-md text-sm text-black group-hover:flex z-10 " >
              {paymentType.replace(/_/g, ' ')}
            </div>
          </div>
        </div>
      </div>

      {/* Amount and Date */}
      <div className="flex flex-col text-right min-w-[100px] sm:min-w-[120px]">
        <div className="text-base"
          style={{
            color: '#000000',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
          }}>₦{totalAmount}</div>
        <div     className="text-xs text-neutral-500 mt-1"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
            fontSize: '12px',
          }}>{transactionDate}</div>
      </div>

      <style jsx>{`
        @media (max-width: 600px) {
          .truncate {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      `}</style>
    </div>
  );
}

export default ClientHistoryRow;
