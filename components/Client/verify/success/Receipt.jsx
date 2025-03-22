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
            className="status-icon w-5 h-5" 
            src={iconSrc} 
            alt="status icon"
            style={iconStyle}  // Applying the iconStyle to the image
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

  const TransactionDetail = ({ transactionDetails, fullTransactionId, isSaving }) => {
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
          {transactionDetails.map((detail, index) => {
            const isTransactionId = detail.label === 'Transaction ID';
            const isTotalAmount = detail.label === 'Total Amount';
            // const displayValue = isTransactionId
            //   ? fullTransactionId || isSaving
            //     ? detail.value
            //     : detail.value.slice(0, 8) + '...' // Truncate normally
            //   : isTotalAmount
            //   ? `₦${detail.value}`
            //   : detail.value;
            //   console.log(displayValue);

            return (
              <div key={index} className="flex justify-between items-center mt-2">
                <span className="text-xs text-neutral-500">{detail.label}</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`flex text-sm font-medium text-black ${
                      isTransactionId ? 'truncate max-w-[150px] overflow-hidden transaction-id' : ''
                    }`}
                    title={isTransactionId && fullTransactionId ? detail.value : undefined}
                    data-full-value={detail.value} // Store full value for easy restoration
                  >
                    {isSmallScreen && detail.label === 'Transaction ID' ? `${detail.value} (TxID)` : detail.value}
                  </span>
                  {detail.hasCopyIcon && (
                    <button
                      onClick={() => handleCopy(detail.value)}
                      className="copy-icon text-blue-500 hover:text-blue-700"
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
        For questions, contact us at <span className="font-semibold">support@yctmb.net</span>.
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

  CallToAction.propTypes = {
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    isSaveDisabled: PropTypes.bool.isRequired,
  };

  const Receipt = ({ onClose }) => {
    const [transactionData, setTransactionData] = useState(null);

    useEffect(() => {
      const fetchTransactionData = () => {
        const storedTransactionData = localStorage.getItem('transactionDetails');
        if (storedTransactionData) {
          const parsedData = JSON.parse(storedTransactionData);
          
          setTransactionData(prevData => 
            JSON.stringify(prevData) !== JSON.stringify(parsedData) ? parsedData : prevData
          );
        }
      };
    
      // Polling: Check every second
      const interval = setInterval(fetchTransactionData, 1000);
    
      // Storage Event Listener (detects changes from other tabs)
      const storageListener = (event) => {
        if (event.key === 'transactionDetails') {
          fetchTransactionData();
        }
      };
      window.addEventListener('storage', storageListener);
    
      return () => {
        clearInterval(interval);
        window.removeEventListener('storage', storageListener);
      };
    }, []);
    // Dependency array empty to run only on component mount
    
    // Adding a reload function to force re-fetch when localStorage changes
    useEffect(() => {
      const fetchTransactionData = () => {
        const storedTransactionData = localStorage.getItem('transactionDetails');
        if (storedTransactionData) {
          setTransactionData(JSON.parse(storedTransactionData));
        }
      };
    
      fetchTransactionData(); // Fetch on mount
    
      window.addEventListener('storage', fetchTransactionData); // Listen for changes
    
      return () => {
        window.removeEventListener('storage', fetchTransactionData);
      };
    }, []);
    
    const handleSavePDF = () => { 
      const popupElement = document.querySelector('.popup-container');
      const buttons = document.querySelector('.call-to-action');
      const copyIcons = document.querySelectorAll('.copy-icon'); 
      const statusIcon = document.querySelector('.status-icon'); 
      const statusText = document.querySelector('.status-text'); 
    
      if (buttons) buttons.style.visibility = 'hidden';
      copyIcons.forEach(icon => icon.style.display = 'none'); 
    
      let originalIconDisplay = "";
      let greenCircle = null; 
      let statusContainer = statusIcon?.parentElement;
    
      // Ensure statusContainer exists and transaction is SUCCESS
      if (statusContainer && transactionData.status === 'SUCCESS') {
        originalIconDisplay = statusIcon.style.display;
        statusIcon.style.display = 'none';  // Hide original icon
    
        // Ensure parent container is inline-flex for proper alignment
        statusContainer.style.display = 'inline-flex';
        statusContainer.style.alignItems = 'center';
        statusContainer.style.gap = '5px';
    
        // Create a plain span element with green check styling
        greenCircle = document.createElement('span');
        greenCircle.classList.add('green-check-icon');
        greenCircle.style.width = '16px';
        greenCircle.style.height = '16px';
        greenCircle.style.display = 'inline-block';
        greenCircle.style.marginRight = '5px';
        greenCircle.style.flexShrink = '0';
        greenCircle.style.position = 'relative';
        greenCircle.style.zIndex = '10';
        greenCircle.style.backgroundColor = '#2ECC71';
        greenCircle.style.borderRadius = '50%';
    
        // Use CSS ::before for checkmark (Ensures it renders in PDF)
        greenCircle.style.content = '""';
        greenCircle.style.display = 'flex';
        greenCircle.style.alignItems = 'center';
        greenCircle.style.justifyContent = 'center';
    
        // Append green circle before status text
        if (statusText) {
          statusContainer.insertBefore(greenCircle, statusText);
        }
    
        // **Force reflow to ensure it renders**
        void document.body.offsetHeight;
      }
    
      document.querySelectorAll('.transaction-id').forEach(el => {
        el.style.whiteSpace = 'pre-wrap';  
        el.style.wordBreak = 'break-word'; 
        el.style.fontSize = '10px';        
        el.style.textAlign = 'center';     
        el.style.display = 'block';        
        el.style.padding = '5px 10px';     
        el.style.maxWidth = '230px';       
        el.style.color = '#333';           
        el.innerText = el.getAttribute('data-full-value'); 
      });
    
      // **Wait a tiny bit to ensure DOM updates**
      setTimeout(() => {
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
    
          // Restore truncated view after PDF is generated
          document.querySelectorAll('.transaction-id').forEach(el => {
            el.innerText = el.getAttribute('data-full-value').slice(0, 8) + '...'; 
          });
    
          copyIcons.forEach(icon => icon.style.display = 'inline-block'); 
          if (buttons) buttons.style.visibility = 'visible';
    
          // Restore original status icon
          if (statusIcon) {
            statusIcon.style.display = originalIconDisplay || 'inline-block';
          }
    
          // Remove the green check icon
          if (greenCircle) greenCircle.remove();
    
          // Save the PDF
          pdf.save('receipt.pdf');
        });
      }, 100);  // Small delay to ensure rendering
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
          <TransactionDetail transactionDetails={transactionDetails} 
          fullTransactionId={transactionData.status === 'SUCCESS'}
          />
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
