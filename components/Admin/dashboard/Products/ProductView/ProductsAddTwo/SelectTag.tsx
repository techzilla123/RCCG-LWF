"use client";

import { CloseIcon } from './Icons';

interface SelectTagProps {
  label: string;
  onRemove: () => void;
}

export const SelectTag: React.FC<SelectTagProps> = ({ label, onRemove }) => {
  return (
    <div className="flex gap-1 items-center px-2 py-1.5 text-sm text-black rounded border border-gray-300">
      <span>{label}</span>
      <button onClick={onRemove} aria-label={`Remove ${label}`}>
        <CloseIcon />
      </button>
    </div>
  );
};
