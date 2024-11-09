import React from 'react';

function CheckboxField({ label }) {
  const id = label.toLowerCase().replace(/\s/g, '-');
  return (
    <div className="flex items-center w-full max-md:max-w-full">
      <div className="flex gap-2 items-center self-stretch my-auto">
        <input
          type="checkbox"
          id={id}
          className="w-4 h-4 bg-white rounded border border-solid border-zinc-300 min-h-[16px]"
        />
        <label htmlFor={id} className="self-stretch my-auto text-xs font-medium text-neutral-500">
          {label}
        </label>
      </div>
    </div>
  );
}

export default CheckboxField;