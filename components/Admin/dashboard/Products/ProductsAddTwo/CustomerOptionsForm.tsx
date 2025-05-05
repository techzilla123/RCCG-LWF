"use client";

import { useState } from 'react';
import { FormHeader } from './FormHeader';
import { MultiSelect } from './MultiSelect';
import { CloseCircleIcon } from './Icons';

interface CustomerOptionsFormProps {
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
  onClose: () => void;
}

const CustomerOptionsForm: React.FC<CustomerOptionsFormProps> = ({
  onPrevious,
  onNext,
  onCancel,
  onClose,
}) => {
  const allSizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
  const allColors = [
    'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet',
    'Black', 'White', 'Gray', 'Silver', 'Gold', 'Pink', 'Brown',
    'Cyan', 'Magenta', 'Maroon', 'Olive', 'Teal', 'Navy', 'Lime',
    'Coral', 'Turquoise', 'Beige', 'Tan', 'Lavender', 'Ivory',
    'Salmon', 'Chocolate', 'Crimson', 'Plum', 'Orchid', 'Azure',
    'Mint', 'Peach', 'SkyBlue', 'SlateGray', 'Seashell'
  ];

  const [sizes, setSizes] = useState(['medium', 'large']);
  const [colors, setColors] = useState(['Red']);

  const handleAddSize = (size: string) => {
    if (!sizes.includes(size)) {
      setSizes((prev) => [...prev, size]);
    }
  };

  const handleRemoveSize = (size: string) => {
    setSizes((prev) => prev.filter((s) => s !== size));
  };

  const handleAddColor = (color: string) => {
    if (!colors.includes(color)) {
      setColors((prev) => [...prev, color]);
    }
  };

  const handleRemoveColor = (color: string) => {
    setColors((prev) => prev.filter((c) => c !== color));
  };

  return (
    <main className="flex relative flex-col gap-6 p-10 mx-auto max-w-none bg-white rounded-2xl w-[640px] max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <FormHeader
        step={2}
        totalSteps={3}
        title="Customer options"
        subtitle="Add product"
      />

      <section className="flex flex-col gap-6">
        <MultiSelect
          label="Choose available sizes"
          selectedItems={sizes}
          allOptions={allSizes}
          onAddItem={handleAddSize}
          onRemoveItem={handleRemoveSize}
        />

        <MultiSelect
          label="Choose available colors"
          selectedItems={colors}
          allOptions={allColors}
          onAddItem={handleAddColor}
          onRemoveItem={handleRemoveColor}
        />
      </section>

      <footer className="flex gap-4 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-0 h-14 text-base font-medium text-black cursor-pointer rounded-[50px]"
        >
          Cancel
        </button>
        <button
          onClick={onPrevious}
          className="px-4 py-0 h-14 text-base font-medium text-black cursor-pointer rounded-[50px]"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          className="px-4 py-0 h-14 text-base font-medium text-white bg-blue-600 cursor-pointer rounded-[50px]"
        >
          Next
        </button>
      </footer>

      <button
        onClick={onClose}
        className="flex absolute top-4 right-4 justify-center items-center w-14 h-14 rounded-lg"
        aria-label="Close"
      >
        <CloseCircleIcon />
      </button>
    </main>
  );
};

export default CustomerOptionsForm;
