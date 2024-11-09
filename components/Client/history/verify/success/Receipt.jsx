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

const Summary = ({ amount, type, status }) => {
  // Define inline styles based on the status
  const statusStyles = {
    Pending: { color: 'yellow', iconFilter: 'none', iconColor: 'yellow' },
    Failed: { color: '#FF0000', iconFilter: 'none', iconColor: '#FF0000' }, // Red icon color for failed
    Reversed: { color: '#B2B2B2', iconFilter: 'grayscale(100%)', iconColor: '#B2B2B2' }, // Ash color (gray) for reversed
    Successful: { color: 'green', iconFilter: 'hue-rotate(90deg)', iconColor: 'green' }, // Green icon for successful
  };

  const currentStyle = statusStyles[status] || { color: 'black', iconFilter: 'none', iconColor: 'black' };

  return (
    <section className="flex flex-col items-center pt-2 pb-4 w-full">
      <div className="flex gap-1 justify-center items-center">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/64553941dfa8bce4e1e75825c1f045da249a5c1fd5ec11ec5ecf8c9ba4410f1a?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a"
          alt=""
          className="w-5 h-5"
          style={{ filter: currentStyle.iconFilter, color: currentStyle.iconColor }} // Apply icon color and filter
        />
        <div className="text-xs" style={{ color: currentStyle.color }}> {/* Apply text color */}
          {status}
        </div>
      </div>
      <div className="flex flex-col items-center mt-2">
        <div className="text-2xl text-black">{amount}</div>
        <div className="text-xs font-medium text-neutral-500">{type} Payment</div>
      </div>
    </section>
  );
};

const TransactionDetail = ({ transactionDetails }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <section className="flex flex-col p-3 w-full bg-neutral-100 rounded-lg">
      <h2 className="text-sm font-semibold text-black">Transaction Detail</h2>
      <div className="flex flex-col mt-2">
        {transactionDetails.map((detail, index) => (
          <div key={index} className="flex justify-between items-center mt-2">
            <span className="text-xs text-neutral-500">{detail.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-black">{detail.value}</span>
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
        ))}
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

const CallToAction = ({ onSave, onClose }) => (
  <div className="flex gap-2 pb-4 text-sm font-medium text-center">
    <button
      onClick={onClose}
      className="flex-1 px-3 py-2 border border-neutral-500 rounded-full"
    >
      Done
    </button>
    <button
      onClick={onSave}
      className="flex-1 px-3 py-2 text-white rounded-full"
      style={{ background: '#08AA3B' }}
    >
      Save
    </button>
  </div>
);

const Receipt = ({ onClose, data }) => {
  const handleSavePDF = () => {
    const popupElement = document.querySelector('.popup-container');
    html2canvas(popupElement, {
      scale: 3, // Increase scale for better clarity
      useCORS: true,
      allowTaint: true,
    }).then((canvas) => {
      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imageData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('receipt.pdf');
    });
  };

  // Map transaction details
  const transactionDetails = [
    { label: 'Payment Type', value: data.type },
    { label: 'Total Amount', value: data.amount },
    { label: 'Transaction Date', value: data.date },
    { label: 'Sender ID', value: data.senderId },
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
        <Summary amount={data.amount} type={data.type} status={data.status} />
        <TransactionDetail transactionDetails={transactionDetails} />
        <SupportMessage />
        <CallToAction onSave={handleSavePDF} onClose={onClose} />
      </div>
    </div>
  );
};

export default Receipt;
