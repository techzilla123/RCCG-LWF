import React from 'react';
import Link from 'next/link'; // Import Link from next/link
import InputField from './InputField';
import SelectField from './PaymentOption';

// Add custom styles for the input labels
const labelStyle = {
  fontFamily: 'Roboto, sans-serif',
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '18.75px',
  textAlign: 'left',
  textUnderlinePosition: 'from-font',
  textDecorationSkipInk: 'none',
};

function PaymentForm() {
  return (
    <form
      className="flex flex-col flex-1 justify-center items-center p-6 w-full bg-white rounded-2xl max-md:px-5 max-md:max-w-full"
      style={{ marginTop: "-70px" }}
    >
      <div className="flex flex-col flex-1 justify-center max-w-full rounded-xl w-[477px]" style={{ marginTop: "-50px" }}>
        <header className="flex flex-col w-full">
          <h1 className="text-4xl font-semibold text-green-900 max-md:max-w-full" style={{ color: "#005E1E" }}>
            New Payment
          </h1>
          <p className="mt-3 text-base text-neutral-500 max-md:max-w-full">
            Verify your detail to initiate a new transaction. Asterisked (*) fields are required.
          </p>
        </header>

        <div className="flex flex-col mt-6 w-full max-md:max-w-full">
          {/* Full Name and Matric/Reg. Number */}
          <div className="flex gap-4 items-start w-full text-base max-md:max-w-full">
            <InputField label="Full Name" placeholder="John Doe" labelStyle={labelStyle} />
            <InputField label="Matric/Reg. Number *" placeholder="Input number" required labelStyle={labelStyle} />
          </div>

          {/* Email and Phone */}
          <div className="flex gap-4 items-start w-full text-base whitespace-nowrap max-md:max-w-full">
            <InputField label="Email *" type="email" placeholder="someone@email.com" required labelStyle={labelStyle} />
            <InputField label="Phone" type="tel" placeholder="+234-" labelStyle={labelStyle} />
          </div>

          {/* Payment Option */}
          <SelectField label="Choose Payment" options={['Option 1', 'Option 2', 'Option 3']} />

          {/* Checkbox for Terms of Service */}
          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="termsCheckbox"
              required
              style={{ accentColor: '#08AA3B' }} // Styling checkbox with green color
            />
            <label htmlFor="termsCheckbox" className="text-sm text-neutral-700">
              Agree to Terms of Service
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col mt-6 w-full text-sm font-medium text-center text-white whitespace-nowrap max-md:max-w-full">
            <Link href="/client/verify">
              <a
                className="overflow-hidden gap-2 self-stretch px-4 py-3.5 w-full bg-green-600 border border-solid border-black border-opacity-0 min-h-[44px] rounded-[1000px] max-md:max-w-full"
                style={{ background: "#08AA3B" }}
              >
                Proceed
              </a>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PaymentForm;
