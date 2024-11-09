import React from 'react';

function VerificationInput({ value, onChange }) {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d?$/.test(inputValue)) {
      onChange(inputValue);
      if (inputValue && e.target.nextElementSibling) {
        e.target.nextElementSibling.focus();
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && !value && e.target.previousElementSibling) {
      e.preventDefault();
      e.target.previousElementSibling.focus();
    }
  };

  return (
    <div className="flex flex-col w-20 rounded-lg max-md:w-16 max-md:text-4xl">
      <input
        type="text"
        maxLength="1"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="flex-1 shrink gap-2 self-stretch px-2 py-3 w-20 h-20 rounded-lg border border-solid shadow-sm bg-neutral-100 border-zinc-300 min-h-[80px] max-md:w-16 max-md:h-16 max-md:text-4xl text-center"
        aria-label="Verification code digit"
      />
    </div>
  );
}

export default VerificationInput;