import React from 'react';

function Button({ children, type = 'button' }) {
  return (
    <button
      type={type}
      className="overflow-hidden gap-2 self-stretch px-4 py-3.5 w-full bg-green-600 border border-solid border-black border-opacity-0 min-h-[44px] rounded-[1000px]"
    >
      {children}
    </button>
  );
}

export default Button;