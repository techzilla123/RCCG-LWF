"use client"
import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './PaymentOption';

// Add custom styles for the input labels
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
  // State for form values
  const [fullName, setFullName] = useState('');
  const [matricNumber, setMatricNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentOption, setPaymentOption] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Error state for validation
  const [errors, setErrors] = useState({
    matricNumber: false,
    email: false,
    termsAccepted: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {
      matricNumber: !matricNumber,
      email: !email,
      termsAccepted: !termsAccepted,
    };

    setErrors(newErrors);

    // If no errors, proceed with form submission and redirect manually
    if (!newErrors.matricNumber && !newErrors.email && !newErrors.termsAccepted) {
      // Manually redirect to /client/verify using window.location
      window.location.href = '/client/verify';
    }
  };

  return (
    <form
      className="flex flex-col flex-1 justify-center items-center p-6 w-full bg-white rounded-2xl max-md:px-5 max-md:max-w-full"
      style={{ marginTop: "-70px" }}
      onSubmit={handleSubmit} // Handling form submission
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
          {/* Full Name and Matric/Reg. Number */}
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

          {/* Email and Phone */}
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

          {/* Payment Option */}
          <SelectField label="Choose Payment" options={['Option 1', 'Option 2', 'Option 3']} value={paymentOption} onChange={(e) => setPaymentOption(e.target.value)} />

          {/* Checkbox for Terms of Service */}
          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="termsCheckbox"
              required
              style={{ accentColor: '#08AA3B' }} // Styling checkbox with green color
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)} // Toggle checkbox value
            />
            <label htmlFor="termsCheckbox" className="text-sm text-neutral-700">
              Agree to Terms of Service
            </label>
          </div>

          {/* Submit Button */}
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
  );
}

export default PaymentForm;
