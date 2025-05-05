import React, { useState } from 'react';
import { Checkbox } from './Checkbox';
import { InputField } from './InputField';
import { CaretDownIcon, CalendarIcon } from './Icons';

interface PricingFormProps {
  onCancel: () => void;  // Add the onCancel prop
  onPrevious: () => void;  // Add the onPrevious prop
  onNext: () => void;
}

export const PricingForm: React.FC<PricingFormProps> = ({ onCancel, onPrevious, onNext }) => {
  const [enableDiscount, setEnableDiscount] = useState(true); // Default: discount enabled
  const [enableShipping, setEnableShipping] = useState(true); // Default: shipping enabled

  const [price, setPrice] = useState('120.00');
  const [stock, setStock] = useState('100');
  const [discount, setDiscount] = useState('20%');
  const [discountExpires, setDiscountExpires] = useState('24-05-2025');
  const [couponCode, setCouponCode] = useState('');
  const [shippedFrom, setShippedFrom] = useState('USA');
  const [shippingFee, setShippingFee] = useState('24.00');
  const [waitingTime, setWaitingTime] = useState('7 working days');
  const [returnPolicy, setReturnPolicy] = useState('7 days');

  return (
    <section className="flex flex-col gap-6 p-10 mx-auto max-w-none bg-white rounded-2xl w-[640px] max-md:p-5 max-md:w-full max-md:max-w-[991px] max-sm:p-4 max-sm:max-w-screen-sm">
      <header className="flex flex-col gap-6">
        <div className="flex gap-1 items-center">
          <span className="text-base font-bold text-blue-600">3/3</span>
          <span className="text-base text-neutral-500">Add product</span>
        </div>
        <h1 className="text-3xl font-bold text-black max-md:text-3xl max-sm:text-2xl">
          Pricing
        </h1>
      </header>

      <form className="flex flex-col gap-4">
        <div className="flex gap-4">
          <InputField
            label="Price"
            required
            prefix="$"
            value={price}
            onChange={setPrice}  // Update price on change
          />
          <InputField
            label="Initial stock"
            required
            value={stock}
            onChange={setStock}  // Update stock on change
          />
        </div>

        {/* Discount Checkbox */}
        <Checkbox
          label="Enable discount"
          checked={enableDiscount}
          onChange={(checked) => setEnableDiscount(checked)} // Update state when checkbox is toggled
        />

        {/* Conditional rendering for discount fields */}
        {enableDiscount && (
          <>
            <div className="flex gap-4">
              <InputField
                label="Discount"
                value={discount}
                onChange={setDiscount}  // Update discount on change
                suffix={<CaretDownIcon />}
              />
              <InputField
                label="Discount expires"
                value={discountExpires}
                onChange={setDiscountExpires}  // Update discount expiration on change
                suffix={<CalendarIcon />}
              />
            </div>

            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}  // Update coupon code on change
                placeholder="Coupon code"
                className="flex-1 px-4 py-2 h-10 text-base bg-white rounded-3xl border border-solid border-neutral-300 text-stone-300"
              />
              <button
                type="button"
                className="px-4 py-0 h-10 text-sm font-medium text-white bg-blue-600 rounded-[50px] max-md:text-xs max-sm:text-xs"
              >
                Create coupon
              </button>
            </div>
          </>
        )}

        {/* Shipping Checkbox */}
        <Checkbox
          label="Enable shipping and delivery"
          checked={enableShipping}
          onChange={(checked) => setEnableShipping(checked)} // Update state when checkbox is toggled
        />

        {/* Conditional rendering for shipping fields */}
        {enableShipping && (
          <>
            <div className="flex gap-4">
              <InputField
                label="Shipped from"
                value={shippedFrom}
                onChange={setShippedFrom}  // Update shipped from on change
              />
              <InputField
                label="Shipping fee"
                prefix="$"
                value={shippingFee}
                onChange={setShippingFee}  // Update shipping fee on change
              />
            </div>

            <div className="flex gap-4">
              <InputField
                label="Waiting time"
                value={waitingTime}
                onChange={setWaitingTime}  // Update waiting time on change
                suffix={<CaretDownIcon />}
              />
              <InputField
                label="Return policy"
                value={returnPolicy}
                onChange={setReturnPolicy}  // Update return policy on change
                suffix={<CaretDownIcon />}
              />
            </div>
          </>
        )}

        <footer className="flex gap-4 justify-end max-sm:flex-col max-sm:items-end">
          <button
            type="button"
            onClick={onCancel}  // Trigger onCancel to cancel the form
            className="px-4 py-0 h-10 text-sm font-medium text-black rounded-[50px] max-md:text-xs max-sm:text-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onPrevious}  // Trigger onPrevious to go back to Step 2
            className="px-4 py-0 h-10 text-sm font-medium text-black rounded-[50px] max-md:text-xs max-sm:text-xs"
          >
            Previous
          </button>
          <button
            type="submit"
            className="px-4 py-0 h-10 text-sm font-medium text-white bg-blue-600 rounded-[50px] max-md:text-xs max-sm:text-xs"
            onClick={onNext}
          >
            Preview & finish
          </button>
        </footer>
      </form>
    </section>
  );
};

export default PricingForm;
