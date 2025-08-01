'use client';

import { useState, useEffect, useRef } from 'react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!message.trim()) return;
    const phoneNumber = '14692487157'; // Your US WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  // Detect click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatBoxRef.current &&
        !chatBoxRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      {/* Floating Button */}
      <div
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          cursor: 'pointer',
        }}
        title="Chat with us on WhatsApp"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/4e27b654459ab6ffedb376d5485049c4f820b683?placeholderIfAbsent=true"
          alt="Chat Icon"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
            transition: 'transform 0.2s',
          }}
        />
      </div>

      {/* Chat Box */}
      {isOpen && (
        <div
          ref={chatBoxRef}
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '300px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
            padding: '16px',
            zIndex: 10000,
            fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#128C7E' }}>
              Send us a message
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                width: '28px',
                height: '28px',
                backgroundColor: '#eee',
                border: 'none',
                borderRadius: '50%',
                fontSize: '18px',
                color: '#555',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.3s ease',
              }}
              title="Close"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ccc')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#eee')}
            >
              &times;
            </button>
          </div>

          {/* Textarea */}
          <textarea
            placeholder="Type your message..."
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: '100%',
              marginTop: '12px',
              resize: 'none',
              padding: '10px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          ></textarea>

          {/* Send Button */}
          <button
            onClick={handleSend}
            style={{
              marginTop: '12px',
              width: '100%',
              backgroundColor: '#25D366',
              color: '#fff',
              padding: '10px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '15px',
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#20c65a')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#25D366')}
          >
            Send via WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
