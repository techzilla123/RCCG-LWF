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
  isColorDropdown?: boolean;
}


export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  selectedItems,
  allOptions,
  onAddItem,
  onRemoveItem,
  isColorDropdown,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const availableOptions = allOptions.filter(
    (opt) =>
      !selectedItems.includes(opt) &&
      opt.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleAddCustomItem = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !selectedItems.includes(trimmed)) {
      onAddItem(trimmed);
      setInputValue('');
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomItem();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-base text-black">{label}</label>

      <div className="flex relative flex-col gap-2 p-4 bg-white rounded-lg border border-solid border-neutral-300 min-h-10">
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            <SelectTag key={item} label={item} onRemove={() => onRemoveItem(item)} />
          ))}
        </div>

        <button
          className="absolute right-4 top-2/4 -translate-y-2/4"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle dropdown"
        >
          <CaretDownIcon />
        </button>

       {isOpen && (
  <div className="absolute z-10 top-full mt-2 w-full bg-white border rounded shadow-md p-2">
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Search or type to add..."
      className="w-full border px-2 py-1 mb-2 text-sm rounded"
    />

    {availableOptions.length > 0 ? (
      <div className="max-h-48 overflow-y-auto">
        {availableOptions.map((option) => (
          <button
            key={option}
            onClick={() => {
              onAddItem(option);
              setInputValue('');
              setIsOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left px-2 py-1 hover:bg-neutral-100 text-sm text-black"
          >
            {isColorDropdown && (
              <span
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: option }}
              />
            )}
            {option}
          </button>
        ))}
      </div>
    ) : (
      <div className="text-sm text-neutral-500 px-2">No matches found</div>
    )}

    {inputValue.trim() && !allOptions.includes(inputValue.trim()) && (
      <button
        onClick={handleAddCustomItem}
        className="w-full mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
      >
        Add &quot;{inputValue.trim()}&quot;
      </button>
    )}
  </div>
)}

      </div>
    </div>
  );
};
