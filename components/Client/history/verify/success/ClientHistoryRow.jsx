import React from 'react';

function ClientHistoryRow({ status, totalAmount, paymentType, transactionDate }){
  // Determine badge style based on status
  const getStatusStyle = (status) => {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return { backgroundColor: '#F59E0B' }; // Yellow
      case 'FAILED':
        return { backgroundColor: '#DC2626' }; // Red
      case 'SUCCESS':
        return { backgroundColor: '#08AA3B' }; // Green
        case 'AUTHORIZED':
        return { backgroundColor: '#A3A3A3' }; 
      case 'REVERSED':
        return { backgroundColor: '#9CA3AF' }; // Gray
      default:
        return { backgroundColor: '#A3A3A3' }; // Neutral Gray
    }
  };

  return (
    <div
      data-layername="rowText"
      className="flex flex-wrap gap-4 items-center px-4 py-2 w-full bg-white border-b border-solid border-b-zinc-300 min-h-[64px]"
    >
      {/* Status and Type */}
      <div
        data-layername="description"
        className="flex flex-1 shrink gap-2 items-center min-w-[240px]"
      >
        <div
          data-layername="icon"
          className="flex justify-center items-center w-9 h-9 bg-neutral-100 rounded-full"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/25253b664beb1720c17981679000ba88197e8b1fd123ba70b7d32221b30b1b0f?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a"
            alt="icon"
            className="w-5 h-5"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <div
              style={getStatusStyle(status)}
              className="w-2 h-2 rounded-full"
            />
            <div className="text-xs font-medium text-neutral-500">{status}</div>
          </div>
          <div
            className="text-base text-black mt-1"
            style={{
              color: '#000000',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
            }}
          >
            {paymentType.replace(/_/g, ' ')}
          </div>
        </div>
      </div>

      {/* Amount and Date */}
      <div
        data-layername="amountAndDate"
        className="flex flex-col min-w-[121px] text-right "
      >
        <div
          className="text-base"
          style={{
            color: '#000000',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
          }}
        >
          ₦{totalAmount}
        </div>
        <div
          className="text-xs text-neutral-500 mt-1"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
            fontSize: '12px',
          }}
        >
          {transactionDate}
        </div>
      </div>

      {/* CSS for media query */}
      <style jsx>{`
        @media (max-width: 502px) {
          [data-layername="rowText"] {
            flex-wrap: nowrap;
            align-items: center;
          }

          [data-layername="description"] {
            flex: 1 0 60%;
          }

          [data-layername="amountAndDate"] {
            flex: 1 0 40%;
            text-align: left;
            align-items: flex-start;
            margin-left: -50px; /* Move it closer to other content */
          }

          [data-layername="amountAndDate"] > div {
            margin: 0;
          }
        }
          @media (max-width: 400px) {
          [data-layername="rowText"] {
            flex-wrap: nowrap;
            align-items: center;
          }

          [data-layername="description"] {
            flex: 1 0 60%;
          }

          [data-layername="amountAndDate"] {
            flex: 1 0 40%;
            text-align: left;
            align-items: flex-start;
            margin-left: -60px; /* Move it closer to other content */
          }

          [data-layername="amountAndDate"] > div {
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default ClientHistoryRow;
