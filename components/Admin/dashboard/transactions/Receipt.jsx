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

const Summary = ({ amount, status }) => {
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
          className="status-icon w-5 h-5"
          style={{ filter: currentStyle.iconFilter, color: currentStyle.color }}
        />
        <div className="text-xs" style={{ color: currentStyle.color }}>
          {status}
        </div>
      </div>
      <div className="flex flex-col items-center mt-2">
        <div className="text-2xl text-black">{amount}</div>
      </div>
    </section>
  );
};

const TransactionRow = ({ registration, name, email, phone, description, date, transactionId, amount, isSaving }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // Determine how to display the transaction ID
  const displayTransactionId = isSaving ? transactionId : `${transactionId.slice(0, 8)}...`;

  return (
    <section className="flex flex-col p-3 w-full bg-neutral-100 rounded-lg">
      <h2 className="text-sm font-semibold text-black">Transaction Details</h2>
      <div className="flex flex-col mt-2">
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-neutral-500">Registration</span>
          <span className="text-xs text-black">{registration}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-neutral-500">Name</span>
          <span className="text-xs text-black">{name}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-neutral-500">Email</span>
          <span className="text-xs text-black">{email}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-neutral-500">Phone</span>
          <span className="text-xs text-black">{phone}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-neutral-500">Description</span>
          <span className="text-xs text-black">{description}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-neutral-500">Date</span>
          <span className="text-xs text-black">{date}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-neutral-500">Transaction ID</span>
          <div className="flex items-center gap-2">
            <span
              className="transaction-id flex text-sm font-medium text-black max-w-[150px] overflow-hidden"
              title={transactionId} // Full value on hover
              data-full-value={transactionId} // Store full value for restoration
            >
              {displayTransactionId}
            </span>
            <button
              onClick={() => handleCopy(transactionId)}
              className="copy-icon text-blue-500 hover:text-blue-700"
              aria-label="Copy to clipboard"
            >
              📋
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-neutral-500">Amount</span>
          <span className="text-xs text-black">{amount}</span>
        </div>
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

const Receipt  = ({ registration, name, email, phone, description, date, transactionId, amount, status }) => {
  // const popupElement = document.getElementById('receipt-popup');


  const handleSavePDF = () => {
    const popupElement = document.querySelector('.popup-container > div'); // Selects only the inner popup
    if (!popupElement) return console.error("Popup not found!");

    const buttons = document.querySelector('.call-to-action');
    const copyIcons = document.querySelectorAll('.copy-icon'); // Select all copy icons
    const statusIcon = document.querySelector('.status-icon'); // Select status icon
    
    if (buttons) buttons.style.visibility = 'hidden';
    copyIcons.forEach(icon => icon.style.display = 'none'); // Hide all copy icons before saving
    
    if (statusIcon) {
      statusIcon.style.display = 'none'; // Hide the status icon
    }
  
    document.querySelectorAll('.transaction-id').forEach(el => {
      el.style.whiteSpace = 'pre-wrap';  // Allows wrapping but preserves formatting
      el.style.wordBreak = 'break-word'; // Ensures long words break properly
      el.style.fontSize = '10px';        // Adjust font size for better readability
      el.style.textAlign = 'center';     // Center-align for a neater look
      el.style.display = 'block';        // Ensure it appears in block format
      el.style.padding = '5px 10px';     // Add spacing
      el.style.maxWidth = '350px';       // Prevents text from being too wide
      el.style.color = '#333';           // Ensure good text contrast
      el.innerText = el.getAttribute('data-full-value'); // Display full value
    });
  
    html2canvas(popupElement, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null, // Makes transparent background
        logging: false
    }).then((canvas) => {
      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imageData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  
      // Restore truncated view after PDF is generated
      document.querySelectorAll('.transaction-id').forEach(el => {
        el.innerText = el.getAttribute('data-full-value').slice(0, 8) + '...'; // Restore truncation
      });
      
      copyIcons.forEach(icon => icon.style.display = 'inline-block'); // Show copy icons back
      if (buttons) buttons.style.visibility = 'visible';
  
      // Restore status icon visibility if needed
      if (statusIcon) {
        statusIcon.style.display = 'inline-block'; // Show the status icon again
      }
  
      pdf.save('receipt.pdf');
    });
  };

  const handleClosePopup = () => {
    const popupElement = document.querySelector('.popup-container');
    if (popupElement) {
      popupElement.remove();
    }
   
  };
  
  return (
    <div id="receipt-popup"
      className="popup-container fixed inset-0 flex justify-center items-start bg-black bg-opacity-50 z-[1000]"
      style={{ marginTop: '0px' }}
    >
      <div className="popup-container fixed bg-white rounded-xl p-4 w-[90%] max-w-[450px] mt-12 md:mt-16 shadow-lg"
        style={{ marginTop: '11vh' }}>
        <Header />
        <div className="my-2 h-px bg-gray-300"></div>
        <Summary
          amount={amount}
          status={status}
        />
        <TransactionRow
          registration={registration}
          name={name}
          email={email}
          phone={phone}
          description={description}
          date={date}
          transactionId={transactionId}
          amount={amount}
          status={status}
        />
        <SupportMessage />
        <CallToAction
          onSave={handleSavePDF}
          onClose={handleClosePopup}
          isSaveDisabled={status !== 'SUCCESS'}
        />
      </div>
    </div>
  );
};

export default Receipt;
