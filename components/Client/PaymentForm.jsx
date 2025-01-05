"use client";
import React, { useState } from 'react';
import axios from 'axios';
import crypto from 'crypto-js'; // Install this library with npm install crypto-js
import InputField from './InputField';
import PaymentOption from './PaymentOption'; // Make sure it's correctly imported

const labelStyle = {
  color: "#717171",
  fontSize: '16px',
  fontWeight: '200',
  lineHeight: '18.75px',
  textAlign: 'left',
  textUnderlinePosition: 'from-font',
  textDecorationSkipInk: 'none',
};

function PaymentForm() {
  const [fullName, setFullName] = useState('');
  const [matricNumber, setMatricNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentOption, setPaymentOption] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [errors, setErrors] = useState({
    matricNumber: false,
    email: false,
    termsAccepted: false,
  });

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

  const nonce = Math.random().toString(36).substring(2);
  const timestamp = Date.now().toString();
  const method = "POST";
  const message = `${method}:${nonce}:${timestamp}`;

  const generateHMAC = (message, secretKey) => {
    const hash = crypto.HmacSHA256(message, secretKey);
    return hash.toString(crypto.enc.Base64);
  };

  const apiKey = generateHMAC(message, secretKey);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      matricNumber: !matricNumber,
      email: !email,
      termsAccepted: !termsAccepted,
    };

    setErrors(newErrors);

    if (!newErrors.matricNumber && !newErrors.email && !newErrors.termsAccepted) {
      try {
        localStorage.setItem('userEmail', email);

        const data = {
          fullName,
          regNo: matricNumber,
          email,
          phoneNumber: phone,
          paymentType: paymentOption,
        };

        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_PAYMENT_NEW_URL,
          data,
          {
            headers: {
              'X-API-Key': apiKey,
              'X-Timestamp': timestamp,
              'X-Nonce': nonce,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Payment request success:', response.data);

        const token = response.data.token;
        window.location.href = `/client/verify?token=${token}&email=${email}`;
      } catch (error) {
        console.log('Error processing payment:', error);
        if (error.response && error.response.data && error.response.data.responseMessage) {
          // Show error modal if response contains the error message
          setErrorMessage(error.response.data.responseMessage);
          setShowErrorModal(true);
        }
      }
    }
  };

  const handleCloseModal = () => {
    setShowErrorModal(false);
    // Redirect to the same verification page after closing the modal
    window.location.href = `/client/verify?token=&email=${email}`;
  };

  return (
    <>
      <form
        className="flex flex-col flex-1 justify-center items-center p-6 w-full bg-white rounded-2xl max-md:px-5 max-md:max-w-full"
        style={{ marginTop: "-70px" }}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col flex-1 justify-center max-w-full rounded-xl w-[477px]" style={{ marginTop: "-50px" }}>
          <header className="flex flex-col w-full">
            <h1 className="text-4xl font-semibold text-green-900 max-md:max-w-full" style={{ color: "#005E1E" }}>
              New Payment
            </h1>
            <p className="mt-3 text-base text-neutral-500 max-md:max-w-full">
              Verify your details to initiate a new transaction. Asterisked (*) fields are required.
            </p>
          </header>

          <div className="flex flex-col mt-6 w-full max-md:max-w-full">
            <div className="flex gap-4 items-start w-full text-base max-md:max-w-full">
              <InputField label="Full Name" placeholder="John Doe" labelStyle={labelStyle} value={fullName} onChange={(e) => setFullName(e.target.value)} />
              <InputField
                label="Matric/Reg. Number *"
                placeholder="Input number"
                required
                labelStyle={labelStyle}
                value={matricNumber}
                onChange={(e) => setMatricNumber(e.target.value)}
                error={errors.matricNumber}
              />
            </div>

            <div className="flex gap-4 items-start w-full text-base whitespace-nowrap max-md:max-w-full">
              <InputField
                label="Email *"
                type="email"
                placeholder="someone@email.com"
                required
                labelStyle={labelStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
              <InputField
                label="Phone"
                type="tel"
                placeholder="+234-"
                labelStyle={labelStyle}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <PaymentOption setPaymentOption={setPaymentOption} />

            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="termsCheckbox"
                required
                style={{ accentColor: '#08AA3B' }}
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <label htmlFor="termsCheckbox" className="text-sm text-neutral-700">
                Agree to Terms of Service
              </label>
            </div>

            <div className="flex flex-col mt-6 w-full text-sm font-medium text-center text-white whitespace-nowrap max-md:max-w-full">
              <button
                type="submit"
                className="overflow-hidden gap-2 self-stretch px-4 py-3.5 w-full bg-green-600 border border-solid border-black border-opacity-0 min-h-[44px] rounded-[1000px] max-md:max-w-full"
                style={{ background: "#08AA3B" }}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[300px] text-center">
            <p className="text-sm text-red-500">{errorMessage}</p>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-blue-400 text-white px-4 py-2 rounded"  
            >
              Close and Redirect
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PaymentForm;
