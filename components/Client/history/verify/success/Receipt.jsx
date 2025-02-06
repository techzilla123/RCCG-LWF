import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Header = () => (
  <header className="flex gap-10 justify-between items-end pt-4 w-full text-sm font-semibold whitespace-nowrap text-neutral-500">
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/54595b9efd08a06ef7c6cfae9566bd39d0ce6ad34b053425fe796b1056f4cefb?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a"
      alt="Company logo"
      className="object-contain shrink-0 w-[80px]"
    />
    <h1 className="text-sm font-semibold text-[#333]">Receipt</h1>
  </header>
);

const Summary = ({ totalAmount, paymentType, status }) => {
  const statusStyles = {
    PENDING: { color: 'yellow', iconFilter: 'yellow', iconColor: 'yellow' },
    AUTHORIZED: { color: '#A3A3A3', iconFilter: '#A3A3A3', iconColor: '#A3A3A3' },
    FAILED: {
      color: '#FF0000',
      iconFilter: 'hue-rotate(0deg) brightness(0.5) saturate(20)',
      iconColor: 'hue-rotate(0deg) brightness(0.5) saturate(1)',
    },
    REVERSED: { color: '#B2B2B2', iconFilter: 'grayscale(100%)', iconColor: '#B2B2B2' },
    SUCCESS: { color: 'green', iconFilter: 'hue-rotate(90deg)', iconColor: 'green' },
  };

  const currentStyle = statusStyles[status] || { color: 'black' };

  return (
    <section className="flex flex-col items-center pt-2 pb-4 w-full">
      <div className="flex gap-1 justify-center items-center">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/64553941dfa8bce4e1e75825c1f045da249a5c1fd5ec11ec5ecf8c9ba4410f1a?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a"
          alt=""
          className="w-5 h-5"
          style={{ filter: currentStyle.iconFilter, color: currentStyle.color }}
        />
        <div className="text-xs" style={{ color: currentStyle.color }}>
          {status}
        </div>
      </div>
      <div className="flex flex-col items-center mt-2">
        <div className="text-2xl text-black">₦{totalAmount}</div>
        <div className="text-xs font-medium text-neutral-500">{paymentType}</div>
      </div>
    </section>
  );
};

const TransactionDetail = ({ transactionDetails, fullTransactionId }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <section className="flex flex-col p-3 w-full bg-neutral-100 rounded-lg">
      <h2 className="text-sm font-semibold text-black">Transaction Details</h2>
      <div className="flex flex-col mt-2">
        {transactionDetails.map((detail, index) => {
          const isTransactionId = detail.label === 'Transaction ID';
          const isTotalAmount = detail.label === 'Total Amount';
          const displayValue = isTransactionId
            ? fullTransactionId
              ? detail.value // Display full Transaction ID if `fullTransactionId` is true
              : detail.value.slice(0, 18) + '...' // Shortened if not fullTransactionId
            : isTotalAmount
            ? `₦${detail.value}` // Add Naira sign to Total Amount
            : detail.value;

          return (
            <div key={index} className="flex justify-between items-center mt-2">
              <span className="text-xs text-neutral-500">{detail.label}</span>
              <div className="flex items-center gap-2">
                <span
                  className={`flex text-sm font-medium  text-black ${
                    detail.label === 'Transaction ID' ? 'truncate' : ''
                  }`}
                  title={detail.label === 'Transaction ID' && fullTransactionId ? detail.value : undefined} // Title shows full value on hover
                  style={
                    detail.label === 'Transaction ID'
                      ? { maxWidth: '100%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', position: 'relative', zIndex: 9999, fontSize: '10px', lineHeight: '2.2', flex: 'col' }
                      : {}
                  }
                >
                  {displayValue} {/* Conditionally display shortened value or full value */}
                </span>
                {detail.hasCopyIcon && (
                  <button
                    onClick={() => handleCopy(detail.value)}
                    className="text-blue-500 hover:text-blue-700"
                    aria-label="Copy to clipboard"
                  >
                    📋
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};




const SupportMessage = () => (
  <section className="pt-3 pb-4">
    <h3 className="text-xs font-medium" style={{ color: '#005E1E' }}>
      We appreciate your business
    </h3>
    <p className="mt-1 text-xs text-neutral-500">
      For questions, contact us at <span className="font-semibold">support@yctmb.com</span>.
    </p>
  </section>
);

const CallToAction = ({ onSave, onClose, isSaveDisabled }) => (
  <div className="call-to-action flex gap-2 pb-4 text-sm font-medium text-center">
    <button
      onClick={onClose}
      className="flex-1 px-3 py-2 border border-neutral-500 rounded-full"
    >
      Done
    </button>
    <button
      onClick={onSave}
      className={`flex-1 px-3 py-2 text-white rounded-full ${
        isSaveDisabled ? 'cursor-not-allowed bg-gray-400' : ''
      }`}
      style={{ background: isSaveDisabled ? '#A3A3A3' : '#08AA3B' }}
      disabled={isSaveDisabled}
    >
      Save
    </button>
  </div>
);

const Receipt = ({ onClose, data }) => {
  const handleSavePDF = () => {
    const popupElement = document.querySelector('.popup-container');
    const buttons = document.querySelector('.call-to-action');
  
    // Temporarily hide buttons for PDF generation
    if (buttons) buttons.style.visibility = 'hidden';
  
    html2canvas(popupElement, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
    }).then((canvas) => {
      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imageData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      // Add image to PDF
      pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  
      // Restore buttons visibility after PDF generation
      if (buttons) buttons.style.visibility = 'visible';
  
      // Save the PDF
      pdf.save('receipt.pdf');
    });
  };
  

  const transactionDetails = [
    { label: 'Payment Type', value: data.paymentType },
    { label: 'Total Amount', value: data.totalAmount },
    { label: 'Transaction Date', value: data.transactionDate },
    { label: 'Sender ID', value: data.email },
    { label: 'Transaction ID', value: data.transactionId, hasCopyIcon: true },
  ];

  return (
    <div
      className="fixed inset-0 flex justify-center items-start bg-black bg-opacity-50 z-[1000]"
      style={{ marginTop: '40px' }}
    >
      <div className="popup-container relative bg-white rounded-xl p-4 w-[90%] max-w-[450px] mt-12 md:mt-16 shadow-lg">
        <Header />
        <div className="my-2 h-px bg-gray-300"></div>
        <Summary
          totalAmount={data.totalAmount}
          paymentType={data.paymentType}
          status={data.status}
        />
        <TransactionDetail
          transactionDetails={transactionDetails}
          fullTransactionId={data.status === 'SUCCESS'}
        />
        <SupportMessage />
        <CallToAction
          onSave={handleSavePDF}
          onClose={onClose}
          isSaveDisabled={data.status !== 'SUCCESS'}
        />
      </div>
    </div>
  );
};

export default Receipt;
