import React, { useState, useEffect } from 'react';
import { Checkbox } from './Checkbox';
import { InputField } from './InputField';
import { CaretDownIcon, CalendarIcon } from './Icons';

interface PricingFormProps {
  onCancel: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const PricingForm: React.FC<PricingFormProps> = ({ onCancel, onPrevious, onNext }) => {
  // // Load saved form data
  // useEffect(() => {
  //   const saved = localStorage.getItem('pricingFormData');
  //   if (saved) {
  //     const parsed = JSON.parse(saved);
  //     setEnableDiscount(parsed.enableDiscount ?? true);
  //     setEnableShipping(parsed.enableShipping ?? true);
  //     setPrice(parsed.price ?? '');
  //     setStock(parsed.stock ?? '');
  //     setDiscount(parsed.discount ?? '');
  //     setDiscountExpires(parsed.discountExpires ?? '');
  //     setCouponCode(parsed.couponCode ?? '');
  //     setShippedFrom(parsed.shippedFrom ?? '');
  //     setShippingFee(parsed.shippingFee ?? '');
  //     setWaitingTime(parsed.waitingTime ?? '');
  //     setReturnPolicy(parsed.returnPolicy ?? '');
  //   }
  // }, []);

  // State definitions
  const [enableDiscount, setEnableDiscount] = useState(true);
  const [enableShipping, setEnableShipping] = useState(true);
  const [price, setPrice] = useState('120.00');
  const [stock, setStock] = useState('100');
  const [discount, setDiscount] = useState('20%');
  const [discountExpires, setDiscountExpires] = useState('24-05-2025');
  const [couponCode, setCouponCode] = useState('');
  const [shippedFrom, setShippedFrom] = useState('USA');
  const [shippingFee, setShippingFee] = useState('24.00');
  const [waitingTime, setWaitingTime] = useState('7 working days');
  const [returnPolicy, setReturnPolicy] = useState('7 days');

  // Save all fields to localStorage on any change
  useEffect(() => {
    const data = {
      enableDiscount,
      enableShipping,
      price,
      stock,
      discount,
      discountExpires,
      couponCode,
      shippedFrom,
      shippingFee,
      waitingTime,
      returnPolicy,
    };
    localStorage.setItem('pricingFormData', JSON.stringify(data));
  }, [
    enableDiscount,
    enableShipping,
    price,
    stock,
    discount,
    discountExpires,
    couponCode,
    shippedFrom,
    shippingFee,
    waitingTime,
    returnPolicy,
  ]);

  return (
    <section className="flex flex-col gap-6 p-10 mx-auto w-[640px] bg-white rounded-2xl max-md:p-5 max-sm:p-4 max-md:w-full">
      <header className="flex flex-col gap-6">
        <div className="flex gap-1 items-center">
          <span className="text-base font-bold text-blue-600">3/3</span>
          <span className="text-base text-neutral-500">Add product</span>
        </div>
        <h1 className="text-3xl font-bold text-black">Pricing</h1>
      </header>

      <form className="flex flex-col gap-4">
        <div className="flex gap-4">
<InputField
  label="Price"
  required
  prefix="$"
  value={price}
  defaultValue="120.00"
  onChange={(value) => {
    setPrice(value);
    localStorage.setItem("price", value);
  }}
/>
<InputField
  label="Initial stock"
  required
  value={stock}
  defaultValue="100"
  onChange={(value) => {
    setStock(value);
    localStorage.setItem("stock", value);
  }}
/>
        </div>

        <Checkbox label="Enable discount" checked={enableDiscount} onChange={setEnableDiscount} />

        {enableDiscount && (
          <>
            <div className="flex gap-4">
             <InputField
  label="Discount"
  value={discount}
  defaultValue="20%"
  onChange={setDiscount}
  suffix={<CaretDownIcon />}
/>

             <InputField
  label="Discount expires"
  value={discountExpires}
  defaultValue="24-05-2025"
  onChange={setDiscountExpires}
  suffix={<CalendarIcon />}
/>

            </div>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon code"
                className="flex-1 px-4 py-2 h-10 text-base bg-white rounded-3xl border border-neutral-300 text-stone-300"
              />
              <button type="button" className="px-4 h-10 text-sm text-white bg-blue-600 rounded-[50px]">
                Create coupon
              </button>
            </div>
          </>
        )}

        <Checkbox label="Enable shipping and delivery" checked={enableShipping} onChange={setEnableShipping} />

        {enableShipping && (
          <>
            <div className="flex gap-4">
              <InputField
  label="Shipped from"
  value={shippedFrom}
  defaultValue="USA"
  onChange={setShippedFrom}
/>
              <InputField
  label="Shipping fee"
  prefix="$"
  value={shippingFee}
  defaultValue="24.00"
  onChange={setShippingFee}
/>
            </div>
            <div className="flex gap-4">
              <InputField
  label="Waiting time"
  value={waitingTime}
  defaultValue="7 working days"
  onChange={setWaitingTime}
  suffix={<CaretDownIcon />}
/>

              <InputField
  label="Return policy"
  value={returnPolicy}
  defaultValue="7 days"
  onChange={setReturnPolicy}
  suffix={<CaretDownIcon />}
/>
            </div>
          </>
        )}

        <footer className="flex gap-4 justify-end max-sm:flex-col max-sm:items-end">
          <button type="button" onClick={onCancel} className="px-4 h-10 text-sm text-black rounded-[50px]">
            Cancel
          </button>
          <button type="button" onClick={onPrevious} className="px-4 h-10 text-sm text-black rounded-[50px]">
            Previous
          </button>
          <button type="submit" className="px-4 h-10 text-sm text-white bg-blue-600 rounded-[50px]" onClick={onNext}>
            Preview & finish
          </button>
        </footer>
      </form>
    </section>
  );
};

export default PricingForm;
