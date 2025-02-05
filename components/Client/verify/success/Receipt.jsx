import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PropTypes from 'prop-types';

const Header = () => (
  <header className="flex gap-10 justify-between items-end pt-4 w-full text-sm font-semibold whitespace-nowrap text-neutral-500">
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/54595b9efd08a06ef7c6cfae9566bd39d0ce6ad34b053425fe796b1056f4cefb?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a"
      alt="Company logo"
      className="object-contain shrink-0 w-[80px]"
    />
    <h1 className="text-sm font-semibold">Receipt</h1>
  </header>
);

const Summary = ({ totalAmount, paymentType, status }) => {
  let statusColor, iconSrc, iconStyle, textStyle;

  switch (status) {
    case 'SUCCESS':
      statusColor = 'text-green-500'; // Green for success
      iconSrc = 'https://cdn.builder.io/api/v1/image/assets/TEMP/64553941dfa8bce4e1e75825c1f045da249a5c1fd5ec11ec5ecf8c9ba4410f1a?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a'; // Success icon URL
      textStyle = { color: 'green' }; // Text color green
      iconStyle = { filter: 'hue-rotate(90deg)' }; // Adjust hue for green
      break;
    case 'PENDING':
      statusColor = 'text-yellow-500'; // Yellow for pending
      iconSrc = 'https://cdn.builder.io/api/v1/image/assets/TEMP/64553941dfa8bce4e1e75825c1f045da249a5c1fd5ec11ec5ecf8c9ba4410f1a?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a'; // Pending icon URL
      textStyle = { color: 'yellow' }; // Text color yellow
      iconStyle = { filter: 'hue-rotate(60deg)' }; // Adjust hue for yellow
      break;
    case 'FAILED':
      statusColor = 'text-red-500'; // Red for failed
      iconSrc = 'https://cdn.builder.io/api/v1/image/assets/TEMP/64553941dfa8bce4e1e75825c1f045da249a5c1fd5ec11ec5ecf8c9ba4410f1a?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a'; // Failed icon URL
      textStyle = { color: 'red' }; // Text color red
      iconStyle = { filter: 'hue-rotate(0deg)' }; // Adjust hue for red
      break;
    case 'REVERSED':
      statusColor = 'text-gray-500'; // Gray for reversed
      iconSrc = 'https://cdn.builder.io/api/v1/image/assets/TEMP/64553941dfa8bce4e1e75825c1f045da249a5c1fd5ec11ec5ecf8c9ba4410f1a?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a'; // Reversed icon URL
      textStyle = { color: 'gray' }; // Text color gray
      iconStyle = { filter: 'hue-rotate(180deg)' }; // Adjust hue for gray
      break;
    default:
      statusColor = 'text-gray-500'; // Default color if status is unknown
      iconSrc = 'https://cdn.builder.io/api/v1/image/assets/TEMP/64553941dfa8bce4e1e75825c1f045da249a5c1fd5ec11ec5ecf8c9ba4410f1a?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a'; // Default icon URL
      textStyle = { color: 'gray' };
      iconStyle = { filter: 'hue-rotate(180deg)' }; // Default hue adjustment for unknown status
  }

  return (
    <section className="flex flex-col items-center pt-2 pb-4 w-full">
      <div className="flex gap-1 justify-center items-center">
        <img
          loading="lazy"
          src={iconSrc}
          alt=""
          className="w-5 h-5"
          style={iconStyle} // Applying the iconStyle to the image
        />
        <div className={`text-xs ${statusColor}`} style={textStyle}>{status}</div>
      </div>
      <div className="flex flex-col items-center mt-2">
        <div className="text-2xl text-black">₦{totalAmount}</div>
        <div className="text-xs font-medium text-neutral-500">{paymentType || 'Unknown Payment Type'}</div>
      </div>
    </section>
  );
};

Summary.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  paymentType: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

const TransactionDetail = ({ transactionDetails }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 406);
    };

    handleResize();  // Check size on mount
    window.addEventListener('resize', handleResize);  // Check size on window resize
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <section className="flex flex-col p-3 w-full bg-neutral-100 rounded-lg">
      <h2 className="text-sm font-semibold text-black">Transaction Details</h2>
      <div className="flex flex-col mt-2">
        {transactionDetails.map((detail, index) => (
          <div key={index} className="flex justify-between items-center mt-2">
            <span className="text-xs text-neutral-500">{detail.label}</span>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-medium text-black ${detail.label === 'Transaction ID' ? 'truncate' : ''}`}
                title={detail.value} // Shows full text on hover
                style={detail.label === 'Transaction ID' ? { maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '2.2' } : {}}
              >
                {isSmallScreen && detail.label === 'Transaction ID' ? `${detail.value} (TxID)` : detail.value}
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
        ))}
      </div>
    </section>
  );
};

TransactionDetail.propTypes = {
  transactionDetails: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      hasCopyIcon: PropTypes.bool,
    })
  ).isRequired,
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
      disabled={isSaveDisabled}
    >
      Save
    </button>
  </div>
);

CallToAction.propTypes = {
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isSaveDisabled: PropTypes.bool.isRequired,
};

const Receipt = ({ onClose }) => {
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    const storedTransactionData = localStorage.getItem('transactionDetails');
    if (storedTransactionData) {
      setTransactionData(JSON.parse(storedTransactionData));
    }
  }, []);  // Dependency array empty to run only on component mount
  
  // Adding a reload function to force re-fetch when localStorage changes
  useEffect(() => {
    const storedTransactionData = localStorage.getItem('transactionDetails');
    if (storedTransactionData) {
      setTransactionData(JSON.parse(storedTransactionData));
    }
  }, [localStorage.getItem('transactionDetails')]);  // Triggered when 'transactionDetails' in localStorage changes
  
  const handleSavePDF = () => {
    const popupElement = document.querySelector('.popup-container');
    const buttons = document.querySelector('.call-to-action');
  
    // Temporarily hide the button container for PDF generation
    if (buttons) buttons.style.display = 'none';
  
    // Store the current value of the Transaction ID for full display in PDF
    const transactionIdElement = document.querySelector('[data-transaction-id]');
    const fullTransactionId = transactionIdElement ? transactionIdElement.getAttribute('data-transaction-id') : '';
  
    // Temporarily remove the "truncate" style for Transaction ID
    if (transactionIdElement) {
      transactionIdElement.style.maxWidth = 'none'; // Allow full text to show in the canvas
      transactionIdElement.textContent = fullTransactionId; // Set full text for canvas
    }
  
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
  
      pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  
      // Restore the button container and "truncate" style for Transaction ID
      if (buttons) buttons.style.display = 'block'; // Restore display property
  
      if (transactionIdElement) {
        transactionIdElement.style.maxWidth = '200px'; // Reapply truncation style
        transactionIdElement.textContent = fullTransactionId; // Revert to truncated text
      }
  
      pdf.save('receipt.pdf');
    });
  };
  
    
  
  if (!transactionData) {
    return <div>Loading...</div>;  // Wait until data is available
  }
  
  const transactionDetails = [
    { label: 'Payment Type', value: transactionData.paymentType },
    { label: 'Total Amount', value: `₦${transactionData.totalAmount}` },
    { label: 'Transaction Date', value: transactionData.transactionDate },
    { label: 'Sender ID', value: transactionData.email },
    { label: 'Transaction ID', value: transactionData.transactionId, hasCopyIcon: true },
  ];

  return (
    <div
      className="fixed inset-0 flex justify-center items-start bg-black bg-opacity-50 z-[9999]"
      style={{ marginTop: '40px' }}
    >
      <div className="popup-container relative bg-white rounded-xl p-4 w-[90%] max-w-[450px] mt-12 md:mt-16 shadow-lg">
        <Header />
        <div className="my-2 h-px bg-gray-300"></div>
        <Summary
          totalAmount={transactionData.totalAmount}
          paymentType={transactionData.paymentType}
          status={transactionData.status || 'Pending'}
        />
        <TransactionDetail transactionDetails={transactionDetails} />
        <SupportMessage />
        <CallToAction onSave={handleSavePDF} onClose={onClose} isSaveDisabled={transactionData.status !== 'SUCCESS'} />
      </div>
    </div>
  );
};

Receipt.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Receipt;
