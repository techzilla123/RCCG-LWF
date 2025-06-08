"use client";

import { useState } from 'react';
import { SelectTag } from './SelectTag';
import { CaretDownIcon } from './Icons';

interface MultiSelectProps {
  label: string;
  selectedItems: string[];
  allOptions: string[];
  onAddItem: (item: string) => void;
  onRemoveItem: (item: string) => void;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  selectedItems,
  allOptions,
  onAddItem,
  onRemoveItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const availableOptions = allOptions.filter((opt) => !selectedItems.includes(opt));

  return (
    <div className="flex flex-col gap-2">
      <label className="text-base text-black">{label}</label>

      <div className="flex relative flex-col gap-2 p-4 bg-white rounded-lg border border-solid border-neutral-300 min-h-10">
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            <SelectTag
              key={item}
              label={item}
              onRemove={() => onRemoveItem(item)}
            />
          ))}
        </div>

        <button
          className="absolute right-4 top-2/4 -translate-y-2/4"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle dropdown"
        >
          <CaretDownIcon />
        </button>

        {isOpen && availableOptions.length > 0 && (
          <div className="absolute z-10 top-full mt-2 w-full bg-white border rounded shadow-md p-2 max-h-48 overflow-y-auto">
            {availableOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onAddItem(option);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-2 py-1 hover:bg-neutral-100 text-sm text-black"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {isOpen && availableOptions.length === 0 && (
          <div className="absolute z-10 top-full mt-2 w-full bg-white border rounded shadow-md p-2 text-sm text-neutral-500">
            No more options
          </div>
        )}
      </div>
    </div>
  );
};
